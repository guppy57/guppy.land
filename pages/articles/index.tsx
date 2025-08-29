import PostCard from "@/components/PostCard";
import { InferGetStaticPropsType } from "next";
import fs from "fs";
import { serialize } from "next-mdx-remote/serialize";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import path from "path";
import { PostPreview } from "@/types/posts";
import Navbar from "@/components/Navbar";
import ContainerWide from "@/components/ContainerWide";
import Footer from "@/components/Footer";
import GuppyBadge from "@/components/GuppyBadge";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import articleTags from '@/lib/articleTags';
import { cn } from '@/lib/utils';
import ITag from '@/types/ITag';
import { useMemo, useState } from 'react';

export default function Articles({
  postPreviews,
  count,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [tag, setTag] = useState<string>("all");

  const filteredArticles = useMemo(() => {
    const postPreviewsFiltered = postPreviews.filter((preview: PostPreview) => {
      if (tag === "all") return true;
      return preview.categories.includes(tag);
    });

    const col1 = postPreviewsFiltered.slice(
      0,
      Math.ceil(postPreviewsFiltered.length / 3)
    );
    const col2 = postPreviewsFiltered.slice(
      Math.ceil(postPreviewsFiltered.length / 3),
      Math.ceil((postPreviewsFiltered.length / 3) * 2)
    );
    const col3 = postPreviewsFiltered.slice(
      Math.ceil((postPreviewsFiltered.length / 3) * 2)
    );

    const mobileCol1 = postPreviewsFiltered.slice(
      0,
      Math.ceil(postPreviewsFiltered.length / 2)
    );

    const mobileCol2 = postPreviewsFiltered.slice(
      Math.ceil(postPreviewsFiltered.length / 2)
    );

    return {
      col1,
      col2,
      col3,
      mobileCol1,
      mobileCol2,
      total: postPreviewsFiltered.length,
    }

  }, [postPreviews, tag])

  return (
    <div className="relative min-h-screen bg-[#F7F7F2]">
      <NextSeo
        title="Articles"
        description="Useful writings on topics that keep me occupied."
      />
      <Navbar activeLink="articles" />
      <ContainerWide className="mt-16 pb-[6rem] sm:pb-[14rem] lg:pb-[18rem]">
        <div className="flex items-center justify-end md:justify-between mb-2 sm:mb-6">
          <div className="space-x-4 hidden md:flex items-center justify-start flex-wrap">
            <span
              className={cn(
                tag === "all" ? "text-purple-600" : "text-gray-500",
                "cursor-pointer hover:text-purple-500 font-departureMono tracking-tighter"
              )}
              onClick={() => setTag("all")}
            >
              all
            </span>
            {articleTags.map((_tag: ITag, index: number) => (
              <span
                key={index}
                className={cn(
                  tag === _tag.value ? "text-purple-600" : "text-gray-500",
                  "cursor-pointer hover:text-purple-500 font-departureMono tracking-tighter"
                )}
                onClick={() => setTag(_tag.value)}
              >
                {_tag.value.replaceAll("-", " ")}
              </span>
            ))}
          </div>
          <p className="font-departureMono text-sm tracking-tighter text-gray-400">
            {filteredArticles.total}{" "}
            {filteredArticles.total === 1 ? "articles" : "articles"}
          </p>
        </div>
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
              {filteredArticles.col1.map((postPreview, i: number) => {
                return (
                  <div key={i}>
                      <PostCard postPreview={postPreview} count={i} key={i} />
                  </div>
                );
              })}
            </div>
            <div className="hidden lg:block col-span-1 space-y-4">
              {filteredArticles.col2.map((postPreview, i: number) => {
                return (
                  <div key={i}>
                    <PostCard postPreview={postPreview} count={i} key={i} />
                  </div>
                );
              })}
            </div>
            <div className="hidden lg:block col-span-1 space-y-4">
              {filteredArticles.col3.map((postPreview, i: number) => {
                return (
                  <div key={i}>
                    <PostCard postPreview={postPreview} count={i} key={i} />
                  </div>
                );
              })}
            </div>
            <div className="block lg:hidden col-span-1 space-y-4">
              {filteredArticles.mobileCol1.map((postPreview, i: number) => {
                return (
                  <div key={i}>
                    <PostCard postPreview={postPreview} count={i} key={i} />
                  </div>
                );
              })}
            </div>
            <div className="block lg:hidden col-span-1 space-y-4">
              {filteredArticles.mobileCol2.map((postPreview, i: number) => {
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
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
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

    return {
    props: {
      count: postPreviews.length,
      postPreviews: postPreviewsSorted,
    },
  };
}
