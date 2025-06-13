import Container from "../components/Container";
import GuppyBadge from "@/components/GuppyBadge";
import { NextSeo } from "next-seo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

export default function Custom404() {
  return (
    <div>
      <NextSeo title="404 Not Found" />
      <div className="bg-scared-dog h-[100vh] bg-cover text-white flex items-center justify-center">
        <Container className="p-6 text-center flex flex-col items-center justify-center">
          <Image src="/images/kreative-white.svg" alt="Kreative logo in White" className="h-6 w-auto mb-6" width={200} height={50} />
          <h1 className="text-7xl font-bold tracking-tighter mb-6">
            Yeah, you&apos;re lost.
          </h1>
          <p className="text-xl sm:w-[75%]">
            You were sent here because the page your were looking for
            couldn&apos;t be found.
          </p>
          <Link href="/">
            <Button className="mt-6" variant="secondary">Go home</Button>
          </Link>
        </Container>
      </div>
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
