import fs from "fs";
import path from "path";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import React from "react";
import Navbar from "@/components/Navbar";
import ContainerWide from "@/components/ContainerWide";
import Link from "next/link";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import DreamflowBadge from "@/components/DreamflowBadge";
import { formatDate } from "@/lib/utils";
import { NextSeo } from "next-seo";

export default function PostPage({
  source,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="relative">
      <NextSeo
        title={
          (source.frontmatter.title as string) + " | Guppy's Notes & Articles"
        }
        description={source.frontmatter.description as string}
      />
      <Navbar activeLink="articles" />
      <ContainerWide className="pb-[16rem] sm:pb-[20rem] lg:pb-[36rem]">
        <div className="max-w-3xl pt-6">
          <Link className="no-underline italic font-semibold" href="/articles">
            &#8592; Get back to Notes and Articles
          </Link>
          <h1 className="font-comingSoon text-5xl mt-16 mb-6 leading-normal">
            {source.frontmatter.title as string}
          </h1>
          <h2 className="mb-10 text-xl font-semibold tracking-tight font-comingSoon text-gray-400">
            {source.frontmatter.description as string}
          </h2>
          <div className="prose font-medium text-lg">
            <MDXRemote {...source} />
          </div>
          <p className="mt-8 italic font-bold">
            Published by Armaan Gupta on{" "}
            {formatDate(source.frontmatter.publishingDate as string)}
          </p>
        </div>
      </ContainerWide>
      <Footer />
      <motion.div
        className={"fixed bottom-4 right-4"}
        initial={{ opacity: 0, y: 5 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.25 },
        }}
      >
        <DreamflowBadge />
      </motion.div>
    </div>
  );
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'posts');
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

export async function getStaticProps(
  ctx: GetStaticPropsContext<{
    slug: string;
  }>,
) {
  const { slug } = ctx.params!;
  const postsDirectory = path.join(process.cwd(), 'posts');
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
