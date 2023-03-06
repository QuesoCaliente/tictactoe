import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-brand-green-400">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
