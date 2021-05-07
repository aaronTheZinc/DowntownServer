import { generateFeed as Feed, generateFeed } from '../Database/product'
import { ProductFeed } from '../models'

 const createFeed = async(): Promise<ProductFeed> => await generateFeed()
export { createFeed }