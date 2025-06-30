import fs from "fs";
import path from "path";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import React from "react";
import Navbar from "@/components/Navbar";
import ContainerWide from "@/components/ContainerWide";
import Container from "@/components/Container";
import Link from "next/link";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import GuppyBadge from "@/components/GuppyBadge";
import { formatDate } from "@/lib/utils";
import { NextSeo } from "next-seo";
import StatusBadge from "@/components/StatusBadge";

export default function PostPage({
  source,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="relative min-h-screen bg-[#F7F7F2]">
      <NextSeo
        title={
          (source.frontmatter.title as string) + " | Guppy's Notes & Articles"
        }
        description={source.frontmatter.description as string}
      />
      <Navbar activeLink="articles" />
      <Container className="pb-[16rem] sm:pb-[20rem] lg:pb-[36rem]">
        <div className="pt-6">
          <Link className="no-underline italic font-semibold" href="/articles">
            &#8592; Get back to Notes and Articles
          </Link>
          <div className="bg-white px-10 py-12 rounded-lg drop-shadow-xl mt-12">
            <StatusBadge
              text={formatDate(source.frontmatter.publishingDate as string)}
              className="absolute top-4 right-4"
            />
            <h1 className="font-comingSoon font-bold text-5xl mb-4 leading-normal">
              {source.frontmatter.title as string}
            </h1>
            <h2 className="mb-10 text-2xl font-semibold tracking-tight font-comingSoon text-gray-400">
              {source.frontmatter.description as string}
            </h2>
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
