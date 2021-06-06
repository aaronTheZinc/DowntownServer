import Head from "next/head";
import styles from "../styles/Home.module.css";
import fonts from "../styles/Fonts.module.css";
import Image from "next/image";
import { HomePageContent, AuthNav } from "./components";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { parseCookies } from "./utils/cookie";
import type { HomePage } from '../types'

export default function Home({ token }: HomePage) {
  const [didLoad, setDidload] = useState<boolean>(false);
  const [cookie, setCookie] = useCookies(["user"]);
  useEffect(() => {
    console.log(token.user);
    setTimeout(() => {
      setCookie("user", JSON.stringify({ firstName: "Aaron" ,lastName: "Marsh" }), {
        path: "/",
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
      });
    }, 3000);
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Downtown</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div>
          <div>
            <div className="flex w-screen sm:justify-center xl:justify-end ">
              <AuthNav firstName="Aaron" id="" />
            </div>
          </div>
        </div>
        <div className="transform rotate-90 ..."></div>
        <div className="flex justify-center">
          <div>
            <HomePageContent />
          </div>
        </div>
      </div>
    </div>
  );
}

Home.getInitialProps = ({ req, res }) => {
  const data = parseCookies(req);

  if (res) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      res.writeHead(301, { Location: "/" });
      res.end();
    }
  }

  return {
    token: data 
  };
};
