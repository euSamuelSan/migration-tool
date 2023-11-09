# Migration Tool

This Repo is a POC made to migrate data from a legacy database to a new one set into the google cloud platform (GCP) environment using a dump (txt) file.

## Setup

## **.env**

To specify the dump file to be used in the migration, it is necessary to change the variable into the _.env_, setting the file location accordingly.\
By convention, we are storing all dump files used into the _src/files_ folder, to keep track of what was migrated.\

Usage example:
`FILE_PATH=./src/files/your_migration_file.txt`

To generate a output log file, just set the LOG_OUTPUT environment variable as true.
Example:
`LOG_OUTPUT=true`

This setup will generate a log file into the _output_ folder, with each line containing a key/value pair representing the legacy id and the new database id of the processed item.

## Available scripts

## `npm run start:<entity>:dev`

Executes the migration of the given file into a development environment

## `npm run start:<entity>:prd`

Executes the migration of the given file into a production environment

After the execution of the migration, a error log will be available into the _logs_ folder with the following format: `entity-environment-[current-time-in-ms].log`

## Service account configuration

This repo uses `google-auth-library` to provide the necessary authentication credentials to make the API calls.
Since this is a public repository, you have to change the provided service account mock configuration with a working one.\
To do so, simply drop your service account json file at the project root, and then change the `src/infra/auth/index.js` file, providing the corresponding path to the new json.

## API URL setup

To provide the correct API URL to the cloud functions you're using, change the _URLS_ variable into the `environment.ts` file.
