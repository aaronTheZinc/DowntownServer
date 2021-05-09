import { fetchClient } from "../Actions/client";
import { Client } from "../models";
import { validateUser } from "./auth";
import Verify from "./verify";

class Mutation extends Verify {
  authId: string;
  authorized: boolean;
  constructor(authId: string) {
    super();
    this.authId = authId;
    this.authorized = false;
  }
  /**
   * !Requires AuthId
   * ? Douvle Checks Auth
   * @returns Boolean
   */
  authorization = async (): Promise<boolean> => {
    const isAuth = await validateUser(this.authId);

    isAuth ? (this.authorized = true) : (this.authorized = false);
    return isAuth;
  };
  /**
   * !Requires AuthId && Product
   * ? Ensures No Bookmark Duplication
   * @returns Boolean
   */
  preventBookmarkMutation = async (product: string): Promise<boolean> => {
    const { authId, authorized, authenticateProduct } = this;
    if (authorized) {
      const productExist: boolean = await authenticateProduct(product);
      if (productExist) {
        const currentBookmarksQuery = await fetchClient(authId);
        const { bookMarked } = currentBookmarksQuery.data as Client;
        return bookMarked?.includes(product) ? true : false;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
}

export default Mutation;
