import { buildUrl } from "@/utils/buildUrl";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="cn">
      <Head />
      <body style={{ backgroundImage: `url(${buildUrl("/bg-c.png")})` }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
