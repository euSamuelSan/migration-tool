export abstract class BaseDomain {
    id?: string
    legacyId!: string

    constructor({ id, legacyId }: BaseDomainConstructor) {
        this.legacyId = legacyId
        this.id = id
    }

    static transform(item: any): BaseDomain {
        throw new Error("Method 'transform' not implemented.")
    }
}

type BaseDomainConstructor = {
    id?: string
    legacyId: string
}
