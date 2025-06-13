import "@/styles/globals.css";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { DefaultSeo } from "next-seo";

const comingSoon = localFont({
  src: [
    {
      path: "../public/fonts/ComingSoon/ComingSoon-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ComingSoon/ComingSoon-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ComingSoon/ComingSoon-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ComingSoon/ComingSoon-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ComingSoon/ComingSoon-Regular.eot",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-comingsoon",
});

const departureMono = localFont({
  src: [
    {
      path: "../public/fonts/DepartureMono/DepartureMono-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/DepartureMono/DepartureMono-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/DepartureMono/DepartureMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-departuremono",
});

const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Italic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-MediumItalic.woff",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-BoldItalic.woff",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi/fonts/Satoshi-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const canonicalUrl = (
    `https://guppy.land` + (router.asPath === "/" ? "" : router.asPath)
  ).split("?")[0];

  return (
    <div
      className={`${satoshi.variable} ${departureMono.variable} ${comingSoon.variable} min-h-screen`}
    >
      <DefaultSeo
        title={undefined}
        titleTemplate="%s | Armaan Gupta"
        defaultTitle="Guppy"
        description="Software engineer, Christian apologist, and designer."
        canonical={canonicalUrl}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
          {
            rel: "apple-touch-icon",
            href: "/apple-touch-icon.png",
            sizes: "180x180",
          },
          {
            rel: "icon",
            href: "/favicon-32x32.png",
            sizes: "32x32",
          },
          {
            rel: "icon",
            href: "/favicon-16x16.png",
            sizes: "16x16",
          },
          {
            rel: "manifest",
            href: "/site.webmanifest",
          },
          {
            rel: "mask-icon",
            href: "/safari-pinned-tab.svg",
            color: "#ff5156",
          },
        ]}
        additionalMetaTags={[
          {
            name: "ms-application-TileColor",
            content: "#ff5156",
          },
          {
            name: "theme-color",
            content: "#ffffff",
          },
        ]}
        openGraph={{
          url: "https://guppy.land/",
          title: "Armaan 'Guppy' Gupta",
          description:
            "Software engineer, Christian apologist, and designer.",
          images: [
            {
              url: "/GUPPY-icon.png",
              width: 972,
              height: 972,
              alt: "Guppy's Animated Headshot",
            },
          ],
        }}
      />
      <style jsx global>{`
        html {
          font-family: ${satoshi.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </div>
  );
}
