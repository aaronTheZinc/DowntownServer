import { generateFeed as Feed, generateFeed } from '../Database/product'
import { ProductFeed } from '../models/types'

 const createFeed = async(): Promise<ProductFeed> => await generateFeed()
export { createFeed }