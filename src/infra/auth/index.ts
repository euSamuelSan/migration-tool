import { GoogleAuth, IdTokenClient } from "google-auth-library"
import { readFileSync } from "fs"

import { getBaseURL, getEnvVars, PARAMS } from "../../../environment.js"

export async function createClient(): Promise<IdTokenClient> {
    const auth = new GoogleAuth({
        credentials: JSON.parse(getServiceAccount()),
    })

    const serviceURL = getBaseURL()
    return await auth.getIdTokenClient(serviceURL)
}

const getServiceAccount = (): string => {
    const { profile } = getEnvVars()

    return profile === PARAMS.PROFILES.prd
        ? readFileSync("./service_account_prd.json").toString()
        : readFileSync("./service_account_dev.json").toString()
}
