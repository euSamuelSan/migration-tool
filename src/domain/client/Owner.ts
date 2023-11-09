export class Owner {
    name!: string
    millId!: string
    birthDate?: Date
    phone?: string

    constructor({ name, millId, birthDate, phone }: Owner) {
        this.name = name
        this.millId = millId
        this.birthDate = birthDate
        this.phone = phone
    }
}
