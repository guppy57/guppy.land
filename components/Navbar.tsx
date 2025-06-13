import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import ContainerWide from "@/components/ContainerWide";
import Logo from "./Logo";
import { List } from "@phosphor-icons/react/dist/ssr";
import { Kanban, CardsThree, HandWaving } from "@phosphor-icons/react/dist/ssr";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"

interface NavbarProps {
  activeLink: string;
}

interface LinkProps {
  title: string;
  href: string;
  target?: string;
  icon: React.ReactNode;
  isActive: boolean;
}

function NavLink(props: LinkProps) {
  return (
    <Link
      href={props.href}
      target={props.target}
      className={cn(
        "flex items-center justify-center transition hover:underline",
        props.isActive ? "decoration-[rgba(38,38,38,1)]" : "decoration-inactive"
      )}
    >
      {props.icon}
      <p
        className={cn(
          "pl-1 font-bold tracking-tight text-lg",
          props.isActive ? "text-[rgba(38,38,38,1)]" : "text-inactive"
        )}
      >
        {props.title}
      </p>
    </Link>
  );
}

function MobileNavLink(props: LinkProps) {
    return (
        <Link
            href={props.href}
            target={props.target}
            className={cn(
                "border-[3px] py-2 xs:py-3 px-4 xs:px-5 rounded-full flex items-center justify-center transition hover:underline",
                props.isActive ? "decoration-[rgba(38,38,38,1)]" : "decoration-inactive",
                props.isActive ? "border-black" : "border-grey"
            )}
        >
            {props.icon}
            <p
              className={cn(
                  "font-bold tracking-tight text-2xl xs:text-3xl ml-1",
                  props.isActive ? "text-[rgba(38,38,38,1)]" : "text-inactive"
              )}
            >
                {props.title}
            </p>
        </Link>
    );
}

export default function Navbar(props: NavbarProps) {
  return (
    <Drawer>
      <nav className="sticky top-0 pt-5 md:pt-4 pb-4 md:pb-4 z-50 bg-[#FFFFFD] bg-opacity-90 backdrop-blur-md">
        <ContainerWide className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Link href="/">
              <Image
                src="/GUPPY-icon.png"
                alt="Guppy Logo"
                width={54}
                height={54}
                className=""
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center justify-end space-x-5">
            <NavLink
              title="Projects"
              href="/"
              icon={
                <Kanban
                  className="w-6 h-6"
                  weight="bold"
                  color={
                    props.activeLink === "home" ? "rgba(38,38,38,1)" : "#B7B7B5"
                  }
                />
              }
              isActive={props.activeLink === "home"}
            />
            <NavLink
              title="Articles"
              href="/articles"
              icon={
                <CardsThree
                  className="w-6 h-6"
                  weight="bold"
                  color={
                    props.activeLink === "articles" ? "rgba(38,38,38,1)" : "#B7B7B5"
                  }
                />
              }
              isActive={props.activeLink === "articles"}
            />
            <NavLink
              title="About"
              href="/about"
              icon={
                <HandWaving
                  className="w-6 h-6"
                  weight="bold"
                  color={
                    props.activeLink === "about" ? "rgba(38,38,38,1)" : "#B7B7B5"
                  }
                />
              }
              isActive={props.activeLink === "about"}
            />
          </div>
          <div className="flex md:hidden items-start justify-center space-x-2">
            <DrawerTrigger asChild>
              <List className="w-6 h-6" weight="bold" />
            </DrawerTrigger>
            <DrawerContent
              className="px-6 pb-12 flex flex-col items-start justify-center"
              onOpenAutoFocus={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {/* <Image
                src="/GUPPY-icon.png"
                alt="Guppy Logo"
                width={108}
                height={108}
                className="mt-4"
              /> */}
              <div className="mt-6 flex flex-wrap gap-2 items-start">
                <MobileNavLink
                  title="Projects"
                  href="/"
                  icon={
                    <Kanban
                      className="w-10 h-10"
                      weight="bold"
                      color={
                        props.activeLink === "home" ? "rgba(38,38,38,1)" : "#B7B7B5"
                      }
                    />
                  }
                  isActive={props.activeLink === "home"}
                />
                <MobileNavLink
                  title="Articles"
                  href="/articles"
                  icon={
                    <CardsThree
                      className="w-10 h-10"
                      weight="bold"
                      color={
                        props.activeLink === "articles" ? "rgba(38,38,38,1)" : "#B7B7B5"
                      }
                    />
                  }
                  isActive={props.activeLink === "articles"}
                />
                <MobileNavLink
                  title="About"
                  href="/about"
                  icon={
                    <HandWaving
                      className="w-10 h-10"
                      weight="bold"
                      color={
                        props.activeLink === "about" ? "rgba(38,38,38,1)" : "#B7B7B5"
                      }
                    />
                  }
                  isActive={props.activeLink === "about"}
                />
              </div>
            </DrawerContent>
          </div>
        </ContainerWide>
      </nav>
    </Drawer>
  );
}
