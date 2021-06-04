import { FC } from "react";
import { AuthNavProps } from "../../types";
import fonts from "../../styles/Fonts.module.css";

/**
 * Authenticated Header
 * @param FirstName
 * @returns AuthenticatedHeader
 */
export const AuthNav: FC<AuthNavProps> = ({ firstName, id }): JSX.Element => {
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
