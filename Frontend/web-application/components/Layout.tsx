import React from "react";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Поиск поблизости</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
      </Head>
      <main>{children}</main>
    </>
  );
}
