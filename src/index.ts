import { stopLoadingFeedback } from "./utils/LoadingFeedback.js"
import { Config } from "./infra/config/Config.js"
import { runPipeline } from "./infra/server/Pipeline.js"
import { getEnvVars } from "../environment.js"
import * as Logger from "./utils/Logger.js"

const executionStartDate = Date.now()

const { useOutput } = getEnvVars()
Logger.initializeErrorLogger()
if (useOutput) Logger.initializeOutputLogger()

await runPipeline(Config)

stopLoadingFeedback()
console.log(`Execution finished, spent ${Date.now() - executionStartDate}ms.\n`)
for (const [key, value] of Object.entries(process.memoryUsage())) {
    console.log(`Memory usage by ${key}, ${value / 1000000}MB `)
}
