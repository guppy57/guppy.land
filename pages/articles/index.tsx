import Image from "next/image";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { InferGetStaticPropsType } from "next";
import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import { PostPreview } from "@/types/posts";
import Navbar from "@/components/Navbar";
import ContainerWide from "@/components/ContainerWide";
import Footer from "@/components/Footer";
import GuppyBadge from "@/components/GuppyBadge";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";

export default function Articles({
  postPreviews,
  count,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="relative min-h-screen bg-[#F7F7F2]">
      <NextSeo
        title="Articles"
        description="Useful writings on topics that keep me occupied."
      />
      <Navbar activeLink="articles" />
      <ContainerWide className="mt-16 pb-[6rem] sm:pb-[14rem] lg:pb-[18rem]">
        {count === 0 ? (
          <div className="pt-12 pb-72">
            <h2 className="text-2xl font-comingSoon mb-4">
              No articles found 😢
            </h2>
            <p className="max-w-2xl">
              I&apos;m sorry, but it seems like there are no articles to show
              right now. Please check back later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
            <div className="hidden lg:block col-span-1 space-y-4">
              {postPreviews.col1.map((postPreview, i: number) => {
                return (
                  <div key={i}>
                      <PostCard postPreview={postPreview} count={i} key={i} />
                  </div>
                );
              })}
            </div>
            <div className="hidden lg:block col-span-1 space-y-4">
              {postPreviews.col2.map((postPreview, i: number) => {
                return (
                  <div key={i}>
                    <PostCard postPreview={postPreview} count={i} key={i} />
                  </div>
                );
              })}
            </div>
            <div className="hidden lg:block col-span-1 space-y-4">
              {postPreviews.col3.map((postPreview, i: number) => {
                return (
                  <div key={i}>
                    <PostCard postPreview={postPreview} count={i} key={i} />
                  </div>
                );
              })}
            </div>
            <div className="block lg:hidden col-span-1 space-y-4">
              {postPreviews.mobileCol1.map((postPreview, i: number) => {
                return (
                  <div key={i}>
                    <PostCard postPreview={postPreview} count={i} key={i} />
                  </div>
                );
              })}
            </div>
            <div className="block lg:hidden col-span-1 space-y-4">
              {postPreviews.mobileCol2.map((postPreview, i: number) => {
                return (
                  <div key={i}>
                    <PostCard postPreview={postPreview} count={i} key={i} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
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
        <GuppyBadge />
      </motion.div>
    </div>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'data/posts');
  const postFilePaths = fs.readdirSync(postsDirectory).filter((postFilePath) => {
    return /\.mdx?$/.test(postFilePath);
  });

  const postPreviews: PostPreview[] = [];

  // read the frontmatter for each file
  for (const postFilePath of postFilePaths) {
    const fullPath = path.join(postsDirectory, postFilePath);
    const postFile = fs.readFileSync(fullPath, "utf8");

    // serialize the MDX content to a React-compatible format
    // and parse the frontmatter
    const serializedPost = await serialize(postFile, {
      parseFrontmatter: true,
    });

    postPreviews.push({
      ...serializedPost.frontmatter,
      // add the slug to the frontmatter info
      slug: "articles/" + postFilePath.replace(".mdx", ""),
    } as PostPreview);
  }

  const postPreviewsSorted = postPreviews.sort((a, b) => {
    return (
      new Date(b.publishingDate).getTime() -
      new Date(a.publishingDate).getTime()
    );
  });

  const col1 = postPreviewsSorted.slice(
    0,
    Math.ceil(postPreviewsSorted.length / 3)
  );
  const col2 = postPreviewsSorted.slice(
    Math.ceil(postPreviewsSorted.length / 3),
    Math.ceil((postPreviewsSorted.length / 3) * 2)
  );
  const col3 = postPreviewsSorted.slice(
    Math.ceil((postPreviewsSorted.length / 3) * 2)
  );

  const mobileCol1 = postPreviewsSorted.slice(
    0,
    Math.ceil(postPreviewsSorted.length / 2)
  );

  const mobileCol2 = postPreviewsSorted.slice(
    Math.ceil(postPreviewsSorted.length / 2)
  );

  return {
    props: {
      count: postPreviews.length,
      postPreviews: {
        col1,
        col2,
        col3,
        mobileCol1,
        mobileCol2,
      },
    },
    // enable ISR
    revalidate: 60,
  };
}
