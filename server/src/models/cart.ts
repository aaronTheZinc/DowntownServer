import { ProductLite } from "./core";

/**
 * Interface For Clirnt Checkout Cart
 */
export interface Cart {
    totalSavedCount: number,
    products: ProductLite[]
    totalCost: string

}