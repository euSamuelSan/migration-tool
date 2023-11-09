import { Client } from "./client/Client"
import { Product } from "./product/Product"
import { ResponseDto } from "../infra/http/commons"

export interface IBaseAPI {
    create(
        item: BaseAPITypes["item"]
    ): Promise<ResponseDto<BaseAPITypes["item"]>>
    update(
        item: BaseAPITypes["item"]
    ): Promise<ResponseDto<BaseAPITypes["item"]>>
}

export type BaseAPITypes = {
    item: Client | Product
}
