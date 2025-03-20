
import { DimensionsList, GetValueByDim, StatusesList } from "justshare-shared";
import { v4 } from "uuid";

export const genInvoice = async function (user_src_id, dest_user_id) {
    let cur = GetValueByDim(DimensionsList.FINAL_PRICE_VALUE, this.itemTransaction, this.context.language).split(' ');
    let statusNew = await this.statusProjectServiceDI.setContext(this.context).getByToken({ name: StatusesList.NEW })
    let user_src = await this.userServiceDI.setContext(this.context).getUserInvoiceData({ user_id: user_src_id });
    let user_dest = await this.userServiceDI.setContext(this.context).getUserInvoiceData({ user_id: dest_user_id });
    let price_net = Number(this.itemTransaction.itemCategoryOption.filter(i => { return i.dim == DimensionsList.FINAL_PRICE_VALUE })[0].value);
    let price_full_tax = Number(this.itemTransaction.itemCategoryOption.filter(i => { return i.dim == DimensionsList.FINAL_PRICE_WITH_TAX_VALUE })[0].value)
    let price_tax = Number(this.itemTransaction.itemCategoryOption.filter(i => { return i.dim == DimensionsList.TAX_PRICE_VALUE })[0].value)
    let invoice_id = await this.invoiceServiceDI.setContext(this.context).createInvoice({
        model: {
            user_src_id: user_src.id,
            user_dest_id: user_dest.id,
            iua_id: this.IUA.id,
            item_id: this.IUA.item_id,
            dueDate: new Date(new Date().getTime() + (10 * 24 * 60 * 60 * 1000)),
            currency: cur[cur.length - 1],
            title: 'Reservation service',
            status: 'N',
            status_id: statusNew.id,
            items: [{
                title: GetValueByDim(DimensionsList.INVOICE_TITLE, this.itemTransaction, this.context.language),
                description: '',
                price_net: price_net,
                currency: cur[cur.length - 1],
                discount: 0,
                price_full_tax: price_full_tax,
                price_tax: price_tax,
                tax: this.itemTransaction.itemCategoryOption.find(i => { return i.dim == 'TAX' }).value * 100,
                amount: 1

            }],
            users: [{
                ...user_dest,
                user_id: this.context.project.user_id,
                user_type: 'D',

            }, {
                ...user_src,
                user_id: this.IUA.user_id,
                user_type: 'S'
            }]
        }
    })

    let invoice = await this.invoiceServiceDI.setContext(this.context).genInvoicePDF({ invoice_id: invoice_id })
    let blob_id = v4();
    let content = await fs.readFileSync(invoice.invoicePath, { encoding: 'base64' });

    let createBlobResult = await this.blobServiceDI.setContext(this.context).uploadUserProject({
        blob: {
            id: blob_id,
            uid: blob_id,
            type: "application/pdf",
            blob: content

        },
    });

    //#region mail sender
    console.log(content)

    await this.invoiceServiceDI.setContext(this.context).update({
        model: {
            blob_id: createBlobResult.dataValues.id,
            id: invoice_id
        }, withProject: true
    })


    await this.mailSenderDI.setContext(this.context).mailSend({
        type: 'NEW_INVOICE',
        model: {
            ...invoice,
            blob_id: createBlobResult.dataValues.blob_id,
        },
        email_to: user_src.user.email,
        language: user_src.user.language,
        attachments: [
            { 'filename': 'invoice.pdf', 'content': content }
        ]
    });

    await this.mailSenderDI.setContext(this.context).mailSend({
        type: 'NEW_INVOICE',
        model: {
            ...invoice,
            blob_id: createBlobResult.dataValues.blob_id,
        },
        email_to: user_dest.user.email,
        language: user_dest.user.language,
        attachments: [
            { 'filename': 'invoice.pdf', 'content': content }
        ]
    });
    fs.unlinkSync(invoice.invoicePath);

}

export default genInvoice