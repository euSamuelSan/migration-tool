import { IdTokenClient } from "google-auth-library"
import BaseAPI from "./BaseAPI.js"

export class ClientAPI extends BaseAPI {
    static readonly ENDPOINT = "/clients/{id}"

    constructor(client: IdTokenClient) {
        super(client, ClientAPI.ENDPOINT)
    }
}

export default ClientAPI
