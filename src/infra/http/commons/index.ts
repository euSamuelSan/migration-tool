export type ResponseDto<T> = {
    data: T
    status: number
}

export type ResponseErrorDto = {
    message?: string
    code?: string
}

export class HTTPResponseError extends Error {
    constructor(response: ResponseErrorDto) {
        super(
            `HTTP Error Response: ${response.code}
            ${JSON.stringify(response.message)}`
        )
    }
}

type HTTPMethodsType = {
    [key: string]: "POST" | "PATCH"
}

export const HTTP_METHODS: HTTPMethodsType = {
    POST: "POST",
    PATCH: "PATCH",
}
