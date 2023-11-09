import { BaseDomain } from "../BaseDomain.js"
import { Owner } from "./Owner.js"

export class Client extends BaseDomain {
    legacyCode!: string
    tradeName!: string
    companyName?: string
    address?: string
    billingAddress?: string
    stockSafetyDays?: number
    addressReference?: string
    debtor?: boolean
    note?: string
    millId!: string
    millLegacyId?: string
    owner!: Owner
    icmsAliquot?: number
    freightRate?: number

    constructor({
        id,
        legacyId,
        legacyCode,
        tradeName,
        companyName,
        address,
        billingAddress,
        stockSafetyDays,
        addressReference,
        debtor,
        note,
        millId,
        millLegacyId,
        owner,
        icmsAliquot,
        freightRate,
    }: ClientConstructor) {
        super({ id, legacyId })
        this.legacyCode = legacyCode
        this.tradeName = tradeName
        this.companyName = companyName
        this.address = address
        this.billingAddress = billingAddress
        this.stockSafetyDays = stockSafetyDays
        this.addressReference = addressReference
        this.debtor = debtor
        this.note = note
        this.millId = millId
        this.millLegacyId = millLegacyId
        this.owner = owner
        this.icmsAliquot = icmsAliquot
        this.freightRate = freightRate
    }

    static transform(item: any): Client {
        return new Client({
            id: item.gcpId,
            legacyId: item._id,
            legacyCode: item.legacyCode,
            tradeName: item.fancyName,
            companyName: item.corporateName,
            address: item.address,
            billingAddress: item.billingAddress,
            stockSafetyDays: item.stockSafetyDays,
            addressReference: item.addressReference,
            debtor: item.debtor,
            note: item.note,
            millId: item.mill.gcpId,
            millLegacyId: item.mill._id,
            owner: {
                name: item.owner.name,
                millId: item.mill.gcpId,
                birthDate: item.owner.birthDate,
                phone: item.owner.phone,
            },
            icmsAliquot: item.tributes?.icms,
            freightRate: item.tributes?.freightTributes,
        })
    }
}

type ClientConstructor = Omit<Client, "transform">
