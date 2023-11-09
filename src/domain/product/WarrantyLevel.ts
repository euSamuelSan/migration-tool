import { Nutrient } from "./Nutrient.js"

export class WarrantyLevel {
    quantity!: number
    nutrient!: Nutrient

    constructor({ quantity, nutrient }: WarrantyLevelConstructor) {
        this.quantity = quantity
        this.nutrient = nutrient
    }
}

type WarrantyLevelConstructor = {
    quantity: number
    nutrient: Nutrient
}
