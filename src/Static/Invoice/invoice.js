

import PdfPrinter from 'pdfmake';
import  fs from 'fs';
import path  from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


let fonts = {
    // Default font should still be available
    Roboto: {
        normal: __dirname + '/../Fonts/Roboto-Regular.ttf',
        bold: __dirname + '/../Fonts/Roboto-Medium.ttf',
        italics: __dirname + '/../Fonts/Roboto-Italic.ttf',
        bolditalics: __dirname + '/../Fonts/Roboto-Italic.ttf'
    },
    // Make sure you define all 4 components - normal, bold, italics, bolditalics - (even if they all point to the same font file)

};
var printer = new PdfPrinter(fonts);
export const genInvoice = async (model) => {

    let docDefinition = {


        content: [
            // Header
            {
                columns: [
                    {


                        svg: model.project.logo,
                        width: 150,
                        height: 100

                    },

                    [
                        {
                            text: 'INVOICE',
                            style: 'invoiceTitle',
                            width: '*'
                        },
                        {
                            stack: [
                                {
                                    columns: [
                                        {
                                            text: 'Invoice #',
                                            style: 'invoiceSubTitle',
                                            width: '*'

                                        },
                                        {
                                            text: model.invoiceNumber,
                                            style: 'invoiceSubValue',
                                            width: 100

                                        }
                                    ]
                                },
                                {
                                    columns: [
                                        {
                                            text: 'Date Issued',
                                            style: 'invoiceSubTitle',
                                            width: '*'
                                        },
                                        {
                                            text: model.dateIssued,
                                            style: 'invoiceSubValue',
                                            width: 100
                                        }
                                    ]
                                },
                                {
                                    columns: [
                                        {
                                            text: 'Due Date',
                                            style: 'invoiceSubTitle',
                                            width: '*'
                                        },
                                        {
                                            text: model.dateDue,
                                            style: 'invoiceSubValue',
                                            width: 100
                                        }
                                    ]
                                },
                            ]
                        }
                    ],
                ],
            },
            // Billing Headers
            {
                columns: [
                    {
                        text: 'Billing From',
                        style: 'invoiceBillingTitle',

                    },
                    {
                        text: 'Billing To',
                        style: 'invoiceBillingTitle',

                    },
                ]
            },
            // Billing Details
            {
                columns: [
                    {
                        text: `${model.userFrom.name} \n ${model.userFrom.nip && "Tax ID: " + model.userFrom.nip}`,
                        style: 'invoiceBillingDetails'
                    },
                    {
                        text: `${model.userTo.name} \n ${model.userTo.nip && "Tax ID: " + model.userTo.nip} \n`,
                        style: 'invoiceBillingDetails'
                    },
                ]
            },

            // Billing Address Title
            {
                columns: [
                    {
                        text: 'Address',
                        style: 'invoiceBillingAddressTitle'
                    },
                    {
                        text: 'Address',
                        style: 'invoiceBillingAddressTitle'
                    },
                ]
            },
            // Billing Address
            {
                columns: [
                    {
                        text: `${model.userFrom.street} \n ${model.userFrom.city}, ${model.userFrom.zip} \n   ${model.userFrom.country}`,
                        style: 'invoiceBillingAddress'
                    },
                    {
                        text: `${model.userTo.street} \n ${model.userTo.city}, ${model.userTo.zip} \n   ${model.userTo.country}`,
                        style: 'invoiceBillingAddress'
                    },
                ]
            },
            // Line breaks
            '\n\n',
            // Items
            {
                table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    headerRows: 1,
                    widths: ['*', 40, 80, 40, 'auto', 80],

                    body: [[
                        {
                            text: 'Product',
                            style: 'itemsHeader'
                        },
                        {
                            text: 'Qty',
                            style: ['itemsHeader', 'center']
                        },
                        {
                            text: 'Price',
                            style: ['itemsHeader', 'center']
                        },
                        {
                            text: 'Tax',
                            style: ['itemsHeader', 'center']
                        },
                        {
                            text: 'Discount',
                            style: ['itemsHeader', 'center']
                        },
                        {
                            text: 'Total',
                            style: ['itemsHeader', 'center']
                        }
                    ]
                        , ...model.items.map(i => {

                            return [[
                                {
                                    text: i.title,
                                    style: 'itemTitle'
                                },
                                {
                                    text: i.description,
                                    style: 'itemSubTitle'

                                }
                            ],
                            {
                                text: '1',
                                style: 'itemNumber'
                            },
                            {
                                text: i.price_net + " " + i.currency,
                                style: 'itemNumber'
                            },
                            {
                                text: i.tax + "%",
                                style: 'itemNumber'
                            },
                            {
                                text: (i.discount ? i.discount : "0") + "%",
                                style: 'itemNumber'
                            },
                            {
                                text: (i.price_net + i.price_tax) + " " + i.currency,
                                style: 'itemTotal'
                            }
                            ]

                        })

                        // Table Header



                        // Item 2

                        // END Items
                    ]
                }, // table
                //  layout: 'lightHorizontalLines'
            },
            // TOTAL
            {
                table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    headerRows: 0,
                    widths: ['*', 80],

                    body: [
                        // Total

                        [
                            {
                                text: 'Subtotal',
                                style: 'itemsFooterSubTitle'
                            },
                            {
                                text: model.price_net + " " + model.currency,
                                style: 'itemsFooterSubValue'
                            },
                        ],
                        [

                            {
                                text: 'Tax ',
                                style: 'itemsFooterSubTitle'
                            },
                            {
                                text: (model.price_tax + " " + model.currency),
                                style: 'itemsFooterSubValue'
                            },
                        ], [
                            {
                                text: 'TOTAL',
                                style: 'itemsFooterTotalTitle'
                            },
                            {
                                text: (model.price + " " + model.currency),

                                style: 'itemsFooterTotalValue'
                            }
                        ]

                    ]
                }, // table
                layout: 'lightHorizontalLines'
            },
            '\n\n',
            {
                columns: [
                    {
                        bold: true,

                        text: ` Account Number:`
                    },
                    {

                        text: ` ${model.userTo.bank_account_nr}`
                    }
                ]
            },
            '\n\n',

            {
                columns: [
                    {
                        text: model.userFrom.user_name,
                        style: 'invoiceBillingTitle',

                    },
                    {
                        text: model.userTo.user_name,
                        style: 'invoiceBillingTitle',
                        alignment: 'right'


                    },
                ]
            },
            // Signature


        ],
        styles: {
            // Document Header
            documentHeaderLeft: {
                fontSize: 10,
                margin: [5, 5, 5, 5],
                alignment: 'left'
            },
            documentHeaderCenter: {
                fontSize: 10,
                margin: [5, 5, 5, 5],
                alignment: 'center'
            },
            documentHeaderRight: {
                fontSize: 10,
                margin: [5, 5, 5, 5],
                alignment: 'right'
            },
            // Document Footer
            documentFooterLeft: {
                fontSize: 10,
                margin: [5, 5, 5, 5],
                alignment: 'left'
            },
            documentFooterCenter: {
                fontSize: 10,
                margin: [5, 5, 5, 5],
                alignment: 'center'
            },
            documentFooterRight: {
                fontSize: 10,
                margin: [5, 5, 5, 5],
                alignment: 'right'
            },
            // Invoice Title
            invoiceTitle: {
                fontSize: 22,
                bold: true,
                alignment: 'right',
                margin: [0, 0, 0, 15]
            },
            // Invoice Details
            invoiceSubTitle: {
                fontSize: 12,
                alignment: 'right'
            },
            invoiceSubValue: {
                fontSize: 12,
                alignment: 'right'
            },
            // Billing Headers
            invoiceBillingTitle: {
                fontSize: 14,
                bold: true,
                alignment: 'left',
                margin: [0, 20, 0, 5],
            },
            // Billing Details
            invoiceBillingDetails: {
                alignment: 'left'

            },
            invoiceBillingAddressTitle: {
                margin: [0, 7, 0, 3],
                bold: true
            },
            invoiceBillingAddress: {

            },
            // Items Header
            itemsHeader: {
                margin: [0, 5, 0, 5],
                bold: true
            },
            // Item Title
            itemTitle: {
                bold: true,
            },
            itemSubTitle: {
                italics: true,
                fontSize: 11
            },
            itemNumber: {
                margin: [0, 5, 0, 5],
                alignment: 'center',
            },
            itemTotal: {
                margin: [0, 5, 0, 5],
                bold: true,
                alignment: 'center',
            },

            // Items Footer (Subtotal, Total, Tax, etc)
            itemsFooterSubTitle: {
                margin: [0, 5, 0, 5],
                bold: true,
                alignment: 'right',
            },
            itemsFooterSubValue: {
                margin: [0, 5, 0, 5],
                bold: true,
                alignment: 'center',
            },
            itemsFooterTotalTitle: {
                margin: [0, 5, 0, 5],
                bold: true,
                alignment: 'right',
            },
            itemsFooterTotalValue: {
                margin: [0, 5, 0, 5],
                bold: true,
                alignment: 'center',
            },
            signaturePlaceholder: {
                margin: [0, 70, 0, 0],
            },
            signatureName: {
                bold: true,
                alignment: 'center',
            },
            signatureJobTitle: {
                italics: true,
                fontSize: 10,
                alignment: 'center',
            },
            notesTitle: {
                fontSize: 10,
                bold: true,
                margin: [0, 50, 0, 3],
            },
            notesText: {
                fontSize: 10
            },
            center: {
                alignment: 'center',
            },
        },
        defaultStyle: {
            columnGap: 20,
        }
    }
    var now = new Date();
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    let name = 'upload/' + new Date().getTime().toString() + '.pdf';
    await new Promise((res, rej) => {

        let stream = fs.createWriteStream(name)
        stream.on('finish', () => res());
        stream.on('error', rej);
        pdfDoc.pipe(stream);
        pdfDoc.end();

    })

    return {
        ...model,
        invoicePath: name
    }
}

