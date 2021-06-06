import { FC, useState } from "react";
import { AuthNavProps } from "../../types";
import fonts from "../../styles/Fonts.module.css";
import { ProductSearch } from "./searchBar";
import Image from "next/image";
/**
 * Authenticated Header
 * @param FirstName
 * @returns AuthenticatedHeader
 */
export const AuthNav: FC<AuthNavProps> = ({ firstName, id }): JSX.Element => {
  const [search, setSearch] = useState<string>("");
  return (
    <div className="pt-10 shadow-2xl ... pb-7">
      <div
        className="flex w-screen sm:justify-center   "
        style={{ justifyContent: "space-between" }}
      >
        <div className=" w-3/6 pl-7  h-auto">
          <ProductSearch value={search} setVal={setSearch} />
        </div>
        <div className="flex">
          <div className={fonts.MontserratEB}>
            <div className="h-full pt-4 transform motion-safe:hover:scale-110 ...">
              <label className=" xl:pr-36 h-auto  text-xl text-white  transform motion-safe:hover:scale-110 ...">
                Shop
              </label>
            </div>
          </div>
          <div className={fonts.MontserratEB}>
            <div className="h-full pt-4 transform motion-safe:hover:scale-110 ...">
              <label className=" h-auto  text-xl text-white xl:pr-36 transform motion-safe:hover:scale-110 ...">
                {firstName}
              </label>
            </div>
          </div>
          <div className={fonts.MontserratEB}>
            <div className="transform motion-safe:hover:scale-110 ... mr-7">
              <Image
                className="rounded-full"
                src="https://static01.nyt.com/images/2021/05/16/fashion/13DOGECOIN-1/13DOGECOIN-1-mediumSquareAt3X.jpg"
                width={50}
                height={50}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UnAuthNav: FC = (): JSX.Element => {
  return (
    <div className="pt-16">
      <div className="flex w-screen sm:justify-center xl:justify-end ">
        <div className={fonts.MontserratEB}>
          <div className="transform motion-safe:hover:scale-110 ...">
            <a
              className="text-xl text-white xl:pr-40 transform motion-safe:hover:scale-110 ..."
              href="/register"
            >
              Register
            </a>
          </div>
        </div>
        <div className={fonts.MontserratEB}>
          <div className="transform motion-safe:hover:scale-110 ...">
            <a className="text-xl text-white xl:pr-20" href="/register">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
