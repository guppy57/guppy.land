import Image from "next/image";
import ContainerWide from "@/components/ContainerWide";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { NextSeo } from "next-seo";
import { motion } from "framer-motion";
import GuppyBadge from "@/components/GuppyBadge";
import { GetStaticProps } from "next";
import { readdir } from "fs/promises";
import path from "path";

interface GalleryProps {
  images: string[];
}

export default function Gallery({ images }: GalleryProps) {
  return (
    <div className="relative bg-[#F7F7F2]">
      <NextSeo
        title="Gallery"
        description="Photography and visual moments captured by Armaan Gupta"
      />
      <Navbar activeLink="gallery" />
      <ContainerWide className="pt-8 pb-[50px] sm:pb-[200px] md:pt-12">
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {images.map((image, index) => (
            <motion.div
              key={image}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="break-inside-avoid mb-4 md:mb-6"
            >
              <div className="relative overflow-hidden rounded-lg shadow-xl hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
                <Image
                  src={`/images/gallery/${image}`}
                  alt=""
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority={index < 8}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
            </motion.div>
          ))}
        </div>
      </ContainerWide>
      <Footer />
      <motion.div
        className="fixed bottom-4 right-4"
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

export const getStaticProps: GetStaticProps = async () => {
  try {
    const galleryDir = path.join(process.cwd(), "public", "images", "gallery");
    const files = await readdir(galleryDir);
    
    const images = files
      .filter((file) => /\.(jpg|jpeg|png|webp|avif)$/i.test(file))
      .sort();

    return {
      props: {
        images,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: {
        images: [],
      },
      revalidate: 60,
    };
  }
};