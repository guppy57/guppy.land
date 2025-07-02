import Image from "next/image";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { NextSeo } from "next-seo";
import { motion } from "framer-motion";
import GuppyBadge from "@/components/GuppyBadge";
import { cn } from "@/lib/utils";
const guppyPhotos = [
  '/images/guppyPhotos/image1.jpg',
  '/images/guppyPhotos/image2.jpg',
  '/images/guppyPhotos/image3.jpg',
  '/images/guppyPhotos/image4.jpg',
  '/images/guppyPhotos/image5.jpg',
];

function Photos() {
  let rotations = [
    'rotate-6',
    '-rotate-6',
    'rotate-6',
    'rotate-6',
    '-rotate-6',
  ];

  return (
    <div className="mt-16 sm:mt-20">
      <div className="flex justify-center overflow-hidden py-4">
        {guppyPhotos.map((image, imageIndex) => (
          <div
            key={image}
            className={cn(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-4xl drop-shadow-3xl -ml-8 first:ml-0 transition-transform duration-300 hover:-translate-y-1',
              rotations[imageIndex % rotations.length]
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
              width={288}
              height={320}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="relative bg-[#F7F7F2]">
      <NextSeo
        title="About"
        description="Projects, products, and services by to aid the human condition."
      />
      <Navbar activeLink="about" />
      <Photos />
      <Container className="pb-[6rem] sm:pb-[14rem] lg:pb-[18rem]">
        <div>
          <h1 className="text-5xl font-bold tracking-tight pt-12">
            I&apos;m Armaan Gupta. I live in Washington, DC (prev Ames, IA) where I work on software at John Deere, build beautiful
            products for humans, and study theology.
          </h1>
          <div className="mt-8 text-3xl tracking-tight space-y-8 font-medium text-[#4B4B4A]">
          <p>
                I&apos;ve been an entreprenuer since I was in elementary school
                when I started trading pens and pencils to fellow students. In
                middle school, I pivoted to selling second hand iPhones to kids
                who got theirs taken away. After that, I discovered how to make
                music with a Digital Audio Workstation (DAW) and started selling
                beats online. After that, I opened a failed gaming studio with a
                friend from my boy scout troop and a game developer in Romania I
                met on Reddit.
              </p>
              <p>
                Yet, near the end of high school, I found a bit of my stride:
                hackathons. After attending one on my own, I fell in love with
                the environment and connecting with fellow makers. So I decided
                to get into the hackathon business.
              </p>
              <p>
                In 2019, I ran my first event, BuildChicago, bringing together
                75 students from across the Chicagoland area. After that ended,
                I consulted on a few more hackathons and started working on four
                more across the nation. My business, Kreative, and the hackathon
                management subsidiary, Kreative Horizon, was going to bring over
                500 students together.
              </p>
              <p>
                Then COVID-19 came knocking. I had to shut down all of my events
                and pivotted to building beautiful websites for small businesses
                with my business Kreative Dreamflow. At Iowa State Universeity, I majored Management
                Information Systems and minored in Marketing, graduating in 2024. In addition to class, I ran Kreative Dreamflow and launched 4 new hackathons in the greater Des Moines area. Plus, I
                worked as a Software Engineer at John Deere with fellow ISU and
                UIUC students.
              </p>
              <p>
                Now, I've been blessed to continue to work at John Deere full-time at their Intelligent Solutions Group division. Outside of work, I design and build software, study philosophy and theology, and spend time with my lovely girlfriend and friends.
              </p>
              <p>
                Life&apos;s good and I&apos;m excited to continue to build
                useful and beautiful things for humans.
              </p>
          </div>
        </div>
      </Container>
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
