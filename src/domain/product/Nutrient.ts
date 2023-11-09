import { NutrientClassification } from "./NutrientClassification.js"

export class Nutrient {
    name!: string
    nutrientClassification!: NutrientClassification

    constructor({ name, nutrientClassification }: NutrientConstructor) {
        this.name = name
        this.nutrientClassification = nutrientClassification
    }
}

type NutrientConstructor = {
    name: string
    nutrientClassification: NutrientClassification
}
