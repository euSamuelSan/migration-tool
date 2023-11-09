import { pipeline } from "stream"
import { promisify } from "util"

import { ConfigTypes } from "../config/Config.js"
import {
    readFileStream,
    transformStream,
    migrateStream,
} from "../../application/Streams.js"

const pipelineAsync = promisify(pipeline)

export const runPipeline = async (Config: ConfigTypes) => {
    await pipelineAsync(
        readFileStream(),
        transformStream(Config),
        migrateStream(Config)
    )
}
