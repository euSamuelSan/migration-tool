import dotenv from "dotenv"
dotenv.config()

export const PARAMS = {
    PROFILES: {
        dev: "dev",
        prd: "prd",
    },
    ENTITIES: {
        products: "Product",
        clients: "Client",
    },
}

const [, , profile, entity] = process.argv

if (!profile || !Object.keys(PARAMS.PROFILES).includes(profile))
    throw new Error("Profile was not specified or is not valid.")

if (!entity || !Object.keys(PARAMS.ENTITIES).includes(entity))
    throw new Error("Entity was not specified or is not valid.")

const URLS = {
    dev: {
        CLOUD_FUNCTION_URL:
            "https://your-cloudfunction-url-dev.cloudfunctions.net",
    },
    prd: {
        CLOUD_FUNCTION_URL:
            "https://your-cloudfunction-url-prd.cloudfunctions.net",
    },
}

const FUNCTION_NAMES = {
    products: [PARAMS.ENTITIES.products],
    clients: [PARAMS.ENTITIES.clients],
}

const getFunctionName = () => {
    return Object.keys(FUNCTION_NAMES).find((functionName) =>
        FUNCTION_NAMES[functionName as keyof typeof FUNCTION_NAMES].includes(
            PARAMS.ENTITIES[entity as keyof typeof PARAMS.ENTITIES]
        )
    )
}

export const getBaseURL = () =>
    `${
        URLS[profile as keyof typeof URLS].CLOUD_FUNCTION_URL
    }/${getFunctionName()}`

export const getEnvVars = () => {
    return {
        profile: PARAMS.PROFILES[profile as keyof typeof PARAMS.PROFILES],
        entity: PARAMS.ENTITIES[entity as keyof typeof PARAMS.ENTITIES],
        filepath: process.env.FILE_PATH || "",
        useOutput: process.env.LOG_OUTPUT === "true",
    }
}
