export type AuthContextDTO = {

    language: string,
    user: {
        id: string | undefined,
        uid: string | undefined
    }
    project: any | undefined
    allowForAll: boolean | undefined
}

