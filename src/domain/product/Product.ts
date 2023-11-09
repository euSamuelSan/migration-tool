import { BaseDomain } from "../BaseDomain.js"
import { Classification } from "./Classification.js"
import { Label } from "./Label.js"
import { MeasurementUnit } from "./MeasurementUnit.js"

export class Product extends BaseDomain {
    legacyCode!: string
    name!: string
    description?: string
    category?: string
    price!: number
    discountMaxPercentage?: number
    increaseMaxPercentage?: number
    active!: boolean
    weight!: number
    millId?: string
    millLegacyId!: string
    trackStock!: boolean
    measurementUnit?: MeasurementUnit
    productClassification?: Classification
    label?: Label

    constructor({
        id,
        legacyId,
        legacyCode,
        name,
        description,
        category,
        price,
        discountMaxPercentage,
        increaseMaxPercentage,
        active,
        weight,
        millLegacyId,
        millId,
        trackStock,
        measurementUnit,
        productClassification,
        label,
    }: ProductConstructor) {
        super({ id, legacyId })
        this.legacyCode = legacyCode
        this.name = name
        this.description = description
        this.category = category
        this.price = price
        this.discountMaxPercentage = discountMaxPercentage
        this.increaseMaxPercentage = increaseMaxPercentage
        this.active = active
        this.weight = weight
        this.millId = millId
        this.millLegacyId = millLegacyId
        this.trackStock = trackStock
        this.measurementUnit = measurementUnit
        this.productClassification = productClassification
        this.label = label
    }

    static transform(item: any): Product {
        return new Product({
            id: item.gcpId,
            legacyId: item._id,
            legacyCode: item.legacyCode,
            name: item.name,
            description: item.description,
            category: item.category,
            price: item.price,
            discountMaxPercentage: item.discountMaxPercentage,
            increaseMaxPercentage: item.increaseMaxPercentage,
            active: item.active,
            weight: item.measurementUnit.quantity,
            millLegacyId: item.mill._id,
            millId: item.mill.gcpId,
            trackStock: item.trackStock,
            measurementUnit: new MeasurementUnit({
                unit: item.measurementUnit.weight,
                unitType: item.measurementUnit.unitType,
                measure: item.measurementUnit.measure,
            }),
            productClassification: new Classification({
                name: item.classification ? item.classification.name : null,
            }),
            label: item.productLabel
                ? new Label({
                      usageMode: item.productLabel?.usageMode,
                      shelfLife: item.productLabel?.shelfLife,
                      recommendedConsumption:
                          item.productLabel?.recommendedConsumption,
                      usageIndication: item.productLabel?.usageIndication,
                      warrantyLevels: item.productLabel?.warrantyLevels,
                      restrictions: item.productLabel?.restrictions,
                      productPresentation:
                          item.productLabel?.productPresentation,
                  })
                : undefined,
        })
    }
}

type ProductConstructor = {
    id?: string
    legacyId: string
    legacyCode: string
    name: string
    description?: string
    category?: string
    price: number
    discountMaxPercentage?: number
    increaseMaxPercentage?: number
    active: boolean
    weight: number
    millLegacyId: string
    millId: string
    trackStock: boolean
    measurementUnitId?: string
    productClassificationId?: string
    measurementUnit?: MeasurementUnit
    productClassification?: Classification
    label?: Label
}
