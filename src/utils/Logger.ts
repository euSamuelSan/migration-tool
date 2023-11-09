import { format } from "util"
import { fileURLToPath } from "url"
import fs from "fs"
import path from "path"

import { getEnvVars } from "../../environment.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getDirectory = (dir: string) => {
    const directory = path.resolve(__dirname, "..", "..", "..", dir)
    if (!fs.existsSync(directory)) fs.mkdirSync(directory)

    return directory
}

const { profile, entity } = getEnvVars()

let logErrorStream: fs.WriteStream
export const initializeErrorLogger = () => {
    const DIR_NAME = "logs"
    const directory = getDirectory(DIR_NAME)

    const filePath = `${directory}\\${entity}-${profile}-${new Date().getTime()}.log`
    logErrorStream = fs.createWriteStream(filePath)

    console.log(`Created Error Log at ${filePath}\n`)
}

export const logError = (error: any) => {
    logErrorStream.write(`${format(error)}\n`)
}

let logOutputStream: fs.WriteStream
export const initializeOutputLogger = () => {
    const DIR_NAME = "output"
    const directory = getDirectory(DIR_NAME)

    const filePath = `${directory}\\${entity}-${profile}-${new Date().getTime()}.log`
    logOutputStream = fs.createWriteStream(filePath)

    console.log(`Created Output Log at ${filePath}\n`)
}

export const logOutput = (externalId: string, internalId: string) => {
    logOutputStream.write(`${format(`"${externalId}": "${internalId}",`)}\n`)
}
