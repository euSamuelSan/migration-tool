import { WarrantyLevel } from "./WarrantyLevel.js"
import { Nutrient } from "./Nutrient.js"

export class Label {
    usageMode?: string
    shelfLife?: string
    recommendedConsumption?: string
    usageIndication?: string
    warrantyLevels?: WarrantyLevel[]
    restrictions?: string
    productPresentation?: string

    constructor({
        usageMode,
        shelfLife,
        recommendedConsumption,
        usageIndication,
        warrantyLevels,
        restrictions,
        productPresentation,
    }: LabelConstructor) {
        this.usageMode = usageMode
        this.shelfLife = shelfLife
        this.recommendedConsumption = recommendedConsumption
        this.usageIndication = usageIndication
        this.warrantyLevels = warrantyLevels
            ?.map(({ quantity, nutrient }) => {
                if (quantity && nutrient) {
                    return new WarrantyLevel({
                        quantity,
                        nutrient: new Nutrient(nutrient),
                    })
                }
            })
            .filter((warrantyLevel): warrantyLevel is WarrantyLevel =>
                Boolean(warrantyLevel)
            )
        this.restrictions = restrictions
        this.productPresentation = productPresentation
    }
}

type LabelConstructor = {
    usageMode?: string
    shelfLife?: string
    recommendedConsumption?: string
    usageIndication?: string
    warrantyLevels?: WarrantyLevel[]
    restrictions?: string
    productPresentation?: string
}
