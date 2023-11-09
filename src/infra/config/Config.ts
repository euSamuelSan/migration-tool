import { getEnvVars } from "../../../environment.js"

import { Product } from "../../domain/product/Product.js"
import { Client } from "../../domain/client/Client.js"

import { IBaseAPI } from "../../domain/IBaseAPI.js"
import ProductAPI from "../http/gateway/ProductAPI.js"
import ClientAPI from "../http/gateway/ClientAPI.js"

import { createClient } from "../auth/index.js"

const { entity } = getEnvVars()

const getEntity = () => {
    const entities = {
        Client,
        Product,
    }

    return entities[entity as keyof typeof entities]
}

const getAPI = async () => {
    const client = await createClient()

    const APIs = {
        Client: ClientAPI,
        Product: ProductAPI,
    }

    return new APIs[entity as keyof typeof APIs](client)
}

export type ConfigTypes = {
    Entity: typeof Client | typeof Product
    FunctionsAPI: IBaseAPI
}

export const Config: ConfigTypes = {
    Entity: getEntity(),
    FunctionsAPI: await getAPI(),
}
