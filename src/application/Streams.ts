import { Writable, Transform } from "stream"
import fs from "fs"
import split2 from "split2"

import { getEnvVars } from "../../environment.js"
import { ConfigTypes } from "../infra/config/Config.js"
import { HTTPResponseError } from "../infra/http/commons/index.js"
import * as Logger from "../utils/Logger.js"

const { filepath } = getEnvVars()

export const readFileStream = () =>
    fs.createReadStream(filepath, "utf8").pipe(split2())

export const transformStream = ({ Entity }: ConfigTypes) =>
    new Transform({
        transform(chunk, encoding, callback) {
            const rawItem = JSON.parse(chunk)
            const object = JSON.stringify(Entity.transform(rawItem))

            callback(null, object)
        },
    })

export const migrateStream = ({ Entity, FunctionsAPI }: ConfigTypes) =>
    new Writable({
        async write(chunk, encoding, callback) {
            try {
                const object = new Entity(JSON.parse(chunk))
                let response: any

                object.id
                    ? (response = await FunctionsAPI.update(object))
                    : (response = await FunctionsAPI.create(object))

                Logger.logOutput(response.data.legacyId, response.data.id)

                callback()
            } catch (err: any) {
                const { legacyId } = JSON.parse(chunk)
                if (err instanceof HTTPResponseError) {
                    Logger.logError({
                        legacyId,
                        error: {
                            message: err.message,
                        },
                    })
                } else {
                    Logger.logError({
                        legacyId,
                        error: err,
                    })
                }
                callback()
            }
        },
    })
