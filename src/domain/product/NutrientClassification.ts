export class NutrientClassification {
    name!: string
    measurementUnit!: string

    constructor({ name, measurementUnit }: NutrientClassificationConstructor) {
        this.name = name
        this.measurementUnit = measurementUnit
    }
}

type NutrientClassificationConstructor = {
    name: string
    measurementUnit: string
}
