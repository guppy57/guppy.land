import { cn } from "@/lib/utils";
import Image from "next/image";
import { NextSeo } from "next-seo";
import ContainerWide from "@/components/ContainerWide";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useMemo, useState } from "react";
import IKreation from "@/types/IKreation";
import tags from "@/lib/tags";
import ITag from "@/types/ITag";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import StatusBadge from "@/components/StatusBadge";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Hash } from "@phosphor-icons/react/dist/ssr";
import { ScrollArea } from "@/components/ui/scroll-area";
import GuppyBadge from "@/components/GuppyBadge";
import { GetStaticProps } from 'next';
import { getKreationsFromFiles } from '@/lib/getKreationsFromFiles';

interface HomeProps {
  tags: ITag[];
  kreations: IKreation[];
}

export default function Home({ kreations }: HomeProps) {
  const [tag, setTag] = useState<string>("all");
  const [open, setOpen] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [hideBadge, setHideBadge] = useState<boolean>(false);
  const [selectedKreation, setSelectedKreation] = useState<IKreation | null>();

  const filteredKreations = useMemo(() => {
    return kreations.filter((kreation: IKreation) => {
      if (tag === "all") return true;
      return kreation.tags.includes(tag);
    });
  }, [kreations, tag]);

  return (
    <div className="relative">
      <NextSeo title="Home" description="Radical starts here." />
      <Navbar activeLink="home" />
      <ContainerWide className="pt-4 pb-[16rem] sm:pb-[20rem] lg:pb-[36rem]">
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
            {tags.map((_tag: ITag, index: number) => (
              <span
                key={index}
                className={cn(
                  tag === _tag.value ? "text-purple-600" : "text-gray-500",
                  "cursor-pointer hover:text-purple-500 font-departureMono tracking-tighter"
                )}
                onClick={() => setTag(_tag.value)}
              >
                {_tag.value}
              </span>
            ))}
          </div>
          <p className="font-departureMono text-sm tracking-tighter text-gray-400">
            {filteredKreations.length}{" "}
            {filteredKreations.length === 1 ? "kreation" : "kreations"}
          </p>
        </div>
        <div className={"hidden sm:block"}>
          <Dialog open={open} onOpenChange={setOpen}>
            <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <AnimatePresence mode="wait">
                {filteredKreations.map((kreation: IKreation, index: number) => (
                  <div
                    className="transition ease-out duration-150 hover:-translate-y-2"
                    key={index}
                  >
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 5 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, delay: 0.1 + index * 0.1 },
                      }}
                      exit={{ opacity: 0, y: 5, transition: { duration: 0.1 } }}
                      className="p-6 bg-[#F7F7F2] rounded-2xl xs:max-h-[32rem] cursor-pointer relative h-full"
                      onClick={() => {
                        setSelectedKreation(kreation);
                        setOpen(true);
                      }}
                    >
                      <StatusBadge
                        status={kreation.status}
                        className="absolute top-4 right-4"
                      />
                      <div className="h-72 w-full flex items-center justify-center">
                        <Image
                          src={kreation.icon.asset.url}
                          alt={kreation.name}
                          className="h-auto w-52"
                          width={200}
                          height={200}
                        />
                      </div>
                      <div className="text-center">
                        <h2 className="font-medium tracking-tight text-xl xs:text-md">
                          {kreation.name}
                        </h2>
                        <p className="text-md xs:text-sm">
                          {kreation.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </AnimatePresence>
            </div>
            <DialogContent
              className="max-h-[80vh] overflow-y-auto"
              onOpenAutoFocus={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.25, delay: 0.15 },
                }}
              >
                <DialogHeader className="flex flex-row items-center justify-start gap-4">
                  <Image
                    src={selectedKreation?.icon.asset.url!}
                    alt={selectedKreation?.name!}
                    width={135}
                    height={135}
                    className="-ml-1 h-32 w-auto"
                  />
                  <div className="space-y-2 pb-2">
                    <DialogTitle className="text-4xl tracking-tighter">
                      {selectedKreation?.name}
                    </DialogTitle>
                    <DialogDescription className="text-lg italic">
                      {selectedKreation?.description}
                    </DialogDescription>
                    <Button
                      disabled={!selectedKreation?.url}
                      onClick={() => {
                        window.open(selectedKreation?.url!, "_blank");
                      }}
                      size="sm"
                    >
                      Visit Kreation
                    </Button>
                  </div>
                </DialogHeader>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.35, delay: 0.35 },
                }}
              >
                <div className="grid grid-cols-4 gap-2 mt-4 mb-6">
                  <div className="col-span-1">
                    <p className="text-sm font-semibold mb-2">Status</p>
                    <StatusBadge
                      status={selectedKreation?.status!}
                      className="border-gray-300 text-sm"
                    />
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm font-semibold mb-2">Year founded</p>
                    <p>{selectedKreation?.founding_year}</p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm font-semibold mb-2">Email</p>
                    <Link href={`mailto:${selectedKreation?.email}`}>
                      <p className="underline hover:text-blue-600">
                        {selectedKreation?.email}
                      </p>
                    </Link>
                  </div>
                </div>
                <Image
                  className="w-full h-auto my-4 rounded-xl border border-gray-200"
                  src={selectedKreation?.logo.asset.url!}
                  alt={selectedKreation?.name + " logo"}
                  width={800}
                  height={450}
                />
                {/* <p className="mt-4">
                {selectedKreation?.brief
                  .split("\n")
                  .map((text: string, index: number) => (
                    <p key={index}>
                      {text}
                      <br />
                    </p>
                  ))}
              </p> */}
                <p className="text-sm font-semibold mt-6 mb-3">Tags</p>
                <div className="flex items-center justify-start flex-wrap space-x-3 mb-6">
                  {selectedKreation?.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="text-sm py-1 px-3.5 rounded-lg bg-gray-200/75"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        </div>
        <div className={"block sm:hidden"}>
          <Drawer
            open={openDrawer}
            onOpenChange={(val: boolean) => {
              if (val === false) {
                setTimeout(() => setHideBadge(false), 250);
              }
              setOpenDrawer(val);
            }}
          >
            <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <AnimatePresence mode="wait">
                {filteredKreations.map((kreation: IKreation, index: number) => (
                  <motion.div
                    key={index}
                    layout
                    initial={{ opacity: 0, y: 5 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, delay: 0.1 + index * 0.1 },
                    }}
                    exit={{ opacity: 0, y: 5, transition: { duration: 0.1 } }}
                    className="p-6 bg-[#F7F7F2] rounded-2xl xs:max-h-[32rem] cursor-pointer relative h-full"
                    onClick={() => {
                      setSelectedKreation(kreation);
                      setHideBadge(true);
                      setOpenDrawer(true);
                    }}
                  >
                    <StatusBadge
                      status={kreation.status}
                      className="absolute top-4 right-4"
                    />
                    <div className="h-72 w-full flex items-center justify-center">
                      <Image
                        src={kreation.icon.asset.url}
                        alt={kreation.name}
                        className="h-auto w-52"
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="text-center">
                      <h2 className="font-medium tracking-tight text-xl xs:text-md">
                        {kreation.name}
                      </h2>
                      <p className="text-md xs:text-sm">
                        {kreation.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <DrawerContent
              className={"rounded-t-3xl"}
              onOpenAutoFocus={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <ScrollArea className={"overflow-y-auto"}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.25, delay: 0.15 },
                  }}
                >
                  <DrawerHeader className={"px-5"}>
                    <Image
                      src={selectedKreation?.icon.asset.url!}
                      alt={selectedKreation?.name!}
                      width={135}
                      height={135}
                      className="-ml-1.5 mb-2 h-32 w-auto"
                    />
                    <div className="space-y-2 py-2 flex flex-col items-start justify-start">
                      <DrawerTitle className="text-4xl tracking-tighter text-left">
                        {selectedKreation?.name}
                      </DrawerTitle>
                      <DrawerDescription className="text-lg italic text-left">
                        {selectedKreation?.description}
                      </DrawerDescription>
                      <Button
                        className="-ml-1"
                        disabled={!selectedKreation?.url}
                        onClick={() => {
                          window.open(selectedKreation?.url!, "_blank");
                        }}
                        size="sm"
                      >
                        Visit Kreation
                      </Button>
                    </div>
                  </DrawerHeader>
                </motion.div>
                <div className={"px-4"}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.35, delay: 0.35 },
                    }}
                  >
                    <Image
                      className="w-full h-auto mb-6 rounded-xl border border-gray-200"
                      src={selectedKreation?.logo.asset.url!}
                      alt={selectedKreation?.name + " logo"}
                      width={800}
                      height={450}
                    />
                    <div className="grid grid-cols-2 gap-2 mt-4 mb-6">
                      <div className="col-span-1">
                        <p className="text-sm font-semibold mb-2">Status</p>
                        <StatusBadge
                          status={selectedKreation?.status!}
                          className="border-gray-300 text-sm"
                        />
                      </div>
                      <div className="col-span-1">
                        <p className="text-sm font-semibold mb-2">
                          Year founded
                        </p>
                        <p>{selectedKreation?.founding_year}</p>
                      </div>
                      <div className="col-span-1 mt-4">
                        <p className="text-sm font-semibold mb-2">Email</p>
                        <Link href={`mailto:${selectedKreation?.email}`}>
                          <p className="underline hover:text-blue-600">
                            {selectedKreation?.email}
                          </p>
                        </Link>
                      </div>
                    </div>

                    {/* <p className="mt-4">
                {selectedKreation?.brief
                  .split("\n")
                  .map((text: string, index: number) => (
                    <p key={index}>
                      {text}
                      <br />
                    </p>
                  ))}
              </p> */}
                    <p className="text-sm font-semibold mt-4 mb-3">Tags</p>
                    <div className="flex items-center justify-start flex-wrap space-x-3 mb-6">
                      {selectedKreation?.tags.map(
                        (tag: string, index: number) => (
                          <span
                            key={index}
                            className="text-sm py-1 px-3 rounded-lg bg-gray-200/75 flex items-center justify-center"
                          >
                            <Hash
                              className={"h-3 w-3 mr-1 -mb-0.5 text-gray-500"}
                            />
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  </motion.div>
                </div>
              </ScrollArea>
            </DrawerContent>
          </Drawer>
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
        <GuppyBadge />
      </motion.div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const kreations = await getKreationsFromFiles();

  return {
    props: {
      kreations,
    },
    revalidate: 60, // Revalidate every minute
  };
};
