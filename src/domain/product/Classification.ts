export class Classification {
    name!: string

    constructor({
        name,
    }: ClassificationConstructor) {
        this.name = name
    }
}

type ClassificationConstructor = {
    name: string
}
