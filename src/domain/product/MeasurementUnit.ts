export class MeasurementUnit {
    measure!: string
    unit!: string
    unitType: string

    constructor({ measure, unit, unitType }: MeasurementUnitConstructor) {
        this.measure = measure
        this.unit = unit
        this.unitType = unitType
    }
}

type MeasurementUnitConstructor = {
    measure: string
    unit: string
    unitType: string
}
