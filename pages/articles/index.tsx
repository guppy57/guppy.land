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
import DreamflowBadge from "@/components/DreamflowBadge";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";

export default function Articles({
  postPreviews,
  count,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="relative">
      <NextSeo
        title="Guppy's Notes and Articles"
        description="Useful writings on topics that keep me occupied."
      />
      <Navbar activeLink="articles" />
      <ContainerWide className="mt-16 pb-[16rem] sm:pb-[20rem] lg:pb-[36rem]">
        <h1 className="text-4xl sm:text-5xl font-comingSoon block md:flex items-center justify-start mb-6">
          <div className="flex items-center justify-start pb-4 md:pb-0">
            <span className="mr-3">Guppy&apos;s</span>
            <Image
              className="w-16 h-16 -rotate-6 mr-3"
              src="/guppy-headshot 1.png"
              alt="Guppy Headshot"
              width={100}
              height={100}
            />
          </div>
          <div>Notes and Articles 📝</div>
        </h1>
        <p className="font-comingSoon text-lg max-w-5xl mb-12">
          Hello, my name is Armaan Gupta but I go by “Guppy.” I&apos;m the
          founder of Kreative and whenever I find something useful to share,
          I&apos;ll put it here for you to read.{" "}
          <Link
            className="opacity-70 underline hover:opacity-100"
            href="https://guppy57.com"
            target="_blank"
          >
            Feel free to read more about me here.
          </Link>
        </p>
        <hr className="border-t-2 border-gray-200 mb-12" />
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
        <DreamflowBadge />
      </motion.div>
    </div>
  );
}

export async function getStaticProps() {
  // get all MDX files
  const postFilePaths = fs.readdirSync("posts").filter((postFilePath) => {
    return path.extname(postFilePath).toLowerCase() === ".mdx";
  });

  const postPreviews: PostPreview[] = [];

  // read the frontmatter for each file
  for (const postFilePath of postFilePaths) {
    const postFile = fs.readFileSync(`posts/${postFilePath}`, "utf8");

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
