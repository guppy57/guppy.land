import fs from "fs";
import path from "path";
import { InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import React from "react";
import Navbar from "@/components/Navbar";
import Container from "@/components/Container";
import Link from "next/link";
import Footer from "@/components/Footer";
import GuppyBadge from "@/components/GuppyBadge";
import { NextSeo } from "next-seo";
import StatusBadge from "@/components/StatusBadge";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

export default function PostPage({
  source,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { slug } = router.query;
  
  const title = source.frontmatter.title as string;
  const description = source.frontmatter.description as string || "";
  const publishingDate = source.frontmatter.publishingDate as string;
  const category = source.frontmatter.category as string || "Article";
  const author = (source.frontmatter.author as string) || "Armaan Gupta";
  const tags = (source.frontmatter.tags as string[]) || [];
  const featuredImage = (source.frontmatter.featuredImage as string) || "/og-image.png";
  
  const canonicalUrl = `https://guppy.land/articles/${slug}`;
  
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": `https://guppy.land${featuredImage}`,
    "datePublished": publishingDate,
    "dateModified": publishingDate,
    "author": {
      "@type": "Person",
      "name": author,
      "url": "https://guppy.land"
    },
    "publisher": {
      "@type": "Person",
      "name": "Armaan Gupta",
      "logo": {
        "@type": "ImageObject",
        "url": "https://guppy.land/guppy-badge.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "keywords": tags.join(", "),
    "articleSection": category
  };
  
  return (
    <div className="relative min-h-screen bg-[#F7F7F2]">
      <Head>
        <link rel="canonical" href={canonicalUrl} />
        <meta name="author" content={author} />
        <meta name="keywords" content={tags.join(", ")} />
        <meta property="article:published_time" content={publishingDate} />
        <meta property="article:modified_time" content={publishingDate} />
        <meta property="article:author" content={author} />
        <meta property="article:section" content={category} />
        {tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleStructuredData),
          }}
        />
      </Head>
      <NextSeo
        title={`${title} | Articles`}
        description={description}
        openGraph={{
          type: "article",
          title: title,
          description: description,
          url: canonicalUrl,
          images: [
            {
              url: `https://guppy.land${featuredImage}`,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
          article: {
            publishedTime: publishingDate,
            modifiedTime: publishingDate,
            authors: [author],
            section: category,
            tags: tags,
          },
        }}
        twitter={{
          handle: "@armaangupta",
          site: "@armaangupta",
          cardType: "summary_large_image",
        }}
      />
      <Navbar activeLink="articles" />
      <Container className="pb-[6rem] sm:pb-[14rem] lg:pb-[18rem] ">
        <div className="pt-6">
          <Link className="no-underline italic font-semibold" href="/articles">
            &#8592; Get back to Notes and Articles
          </Link>
          <div className="bg-white px-10 py-12 rounded-lg drop-shadow-xl mt-12">
            <div className={"absolute top-4 right-4 gap-2 flex items-end justify-end"}>
              <StatusBadge darker badgeType={source.frontmatter.category as string} />
              <StatusBadge darker badgeType={"publishDate"} text={formatDate(source.frontmatter.publishingDate as string)} />
            </div>
            <h1 className="font-comingSoon font-bold text-5xl mb-4 mt-8 leading-normal">
              {source.frontmatter.title as string}
            </h1>
            <h2 className="mb-10 text-2xl font-semibold tracking-tight font-comingSoon text-gray-400">
              {source.frontmatter.description as string}
            </h2>
            <Image src={featuredImage} alt={"Featured image for " + title} width={1000} height={500} placeholder={"blur"} className={"w-full h-auto mb-8 rounded-md"}/>
            <div className="prose font-medium text-xl">
              <MDXRemote {...source} />
            </div>
          </div>
        </div>
      </Container>
      <Footer />
      <GuppyBadge />
    </div>
  );
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'data/posts');
  const filenames = fs.readdirSync(postsDirectory);
  
  const paths = filenames
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => ({
      params: {
        slug: filename.replace(/\.mdx$/, ''),
      },
    }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const postsDirectory = path.join(process.cwd(), 'data/posts');
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  
  try {
    const postFile = fs.readFileSync(fullPath, "utf-8");
    const mdxSource = await serialize(postFile, { parseFrontmatter: true });

    return {
      props: {
        source: mdxSource,
      },
    };
  } catch (error) {
    console.error(`Error reading MDX file: ${error}`);
    return {
      notFound: true,
    };
  }
}
