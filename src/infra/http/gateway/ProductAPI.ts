import { IdTokenClient } from "google-auth-library"
import BaseAPI from "./BaseAPI.js"

export class ProductAPI extends BaseAPI {
    static readonly ENDPOINT = "/products/{id}/migrate"

    constructor(client: IdTokenClient) {
        super(client, ProductAPI.ENDPOINT)
    }
}

export default ProductAPI
