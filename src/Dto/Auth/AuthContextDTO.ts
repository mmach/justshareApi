export type AuthContextDTO = {

    language: string,
    user: {
        id: string | undefined,
        uid: string | undefined,
        is_root: boolean | undefined,
        is_admin: boolean | undefined,
        email: string | undefined
    }
    project: any | undefined
    allowForAll?: boolean | undefined
}

