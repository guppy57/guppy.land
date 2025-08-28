// @ts-nocheck

import { Html, Main, NextScript, Head } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Guppy's Notes & Articles RSS Feed"
          href="/api/rss.xml"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "e5bf4b7df0964101aa98acadd237b3ef"}'></script>
      </body>
    </Html>
  );
}
