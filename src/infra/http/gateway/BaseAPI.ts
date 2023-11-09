import { IdTokenClient } from "google-auth-library"
import {
    GaxiosError,
    GaxiosResponse,
    GaxiosOptions,
} from "gaxios/build/src/common"

import { getBaseURL } from "../../../../environment.js"
import { IBaseAPI, BaseAPITypes } from "../../../domain/IBaseAPI.js"

import {
    HTTPResponseError,
    ResponseDto,
    ResponseErrorDto,
    HTTP_METHODS,
} from "../commons/index.js"

export class BaseAPI implements IBaseAPI {
    client: IdTokenClient
    endpoint: string

    constructor(client: IdTokenClient, endpoint: string) {
        this.client = client
        this.endpoint = endpoint
    }

    public async create(
        item: BaseAPITypes["item"]
    ): Promise<ResponseDto<BaseAPITypes["item"]>> {
        const requestConfig: GaxiosOptions = {
            data: item,
            method: HTTP_METHODS.POST,
            url: this.getURL(),
        }

        return await this.client
            .request(requestConfig)
            .then((response: GaxiosResponse) => {
                const responseDto: ResponseDto<BaseAPITypes["item"]> = {
                    data: response.data.data,
                    status: response.status,
                }
                return responseDto
            })
            .catch((error: GaxiosError) => {
                const errorDto: ResponseErrorDto = {
                    message: error.message,
                    code: error?.code,
                }

                throw new HTTPResponseError(errorDto)
            })
    }

    public async update(
        item: BaseAPITypes["item"]
    ): Promise<ResponseDto<BaseAPITypes["item"]>> {
        const requestConfig: GaxiosOptions = {
            data: item,
            method: HTTP_METHODS.PATCH,
            url: this.getURL(item.id),
        }

        return await this.client
            .request(requestConfig)
            .then((response: GaxiosResponse) => {
                const responseDto: ResponseDto<BaseAPITypes["item"]> = {
                    data: response.data.data,
                    status: response.status,
                }
                return responseDto
            })
            .catch((error: GaxiosError) => {
                const errorDto: ResponseErrorDto = {
                    message: error.message,
                    code: error?.code,
                }

                throw new HTTPResponseError(errorDto)
            })
    }

    private getURL(id?: string) {
        return `${getBaseURL()}${
            id
                ? this.endpoint.replace("{id}", id)
                : this.endpoint.replace("/{id}", "")
        }`
    }
}

export default BaseAPI
