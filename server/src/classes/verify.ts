import { getOneProduct } from "../Database/product";

class Verify {
    //Checks If Product Exists
  authenticateProduct = async (product: string): Promise<boolean> => {
    const { error } = await getOneProduct(product)
       return error? false: true
  };
}
export default Verify;
