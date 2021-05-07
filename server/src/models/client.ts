import type { Product } from './core'

export interface AppendShop {
    authId: string
    shopName: string
}
export interface ClientProfile {
    bookmarkedCount: number
    purchasedCount: number
    purchased: Product[]
    account404: boolean
}