import { cn } from "@/lib/utils";
import Link from "next/link";
import ContainerWide from "@/components/ContainerWide";
import Logo from "./Logo";
import Home from "./icons/Home";
import Heart from "./icons/Heart";
import Chat from "./icons/Chat";
import BookOpen from "./icons/BookOpen";
import Pin from "./icons/Pin";
import Shield from "./icons/Shield";
import Document from "./icons/Document";
import { List } from "@phosphor-icons/react/dist/ssr";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

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
          "font-bold tracking-tight text-lg",
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
                "flex items-center justify-center transition hover:underline py-2 sm:py-3",
                props.isActive ? "decoration-[rgba(38,38,38,1)]" : "decoration-inactive"
            )}
        >
            {props.icon}
            <p
                className={cn(
                    "font-bold tracking-tight text-3xl ml-1",
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
    <Sheet>
      <nav className="sticky top-0 pt-5 md:pt-4 pb-4 md:pb-4 z-50 bg-[#FFFFFD] bg-opacity-90 backdrop-blur-md">
        <ContainerWide className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Link href="/">
              <Logo className="h-8 w-auto -mt-1.5" />
            </Link>
          </div>
          <div className="hidden md:flex items-center justify-end space-x-2">
            <NavLink
              title="Home"
              href="/"
              icon={
                <Home
                  className="w-6 h-6 -mt-0.5"
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
                <Document
                  className="w-6 h-6 mr-0.5"
                  color={
                    props.activeLink === "articles"
                      ? "rgba(38,38,38,1)"
                      : "#B7B7B5"
                  }
                />
              }
              isActive={props.activeLink === "articles"}
            />
            <NavLink
              title="Support"
              href="https://support.kreativeusa.com"
              target="_blank"
              icon={<Heart className="w-6 h-6" color={"#B7B7B5"} />}
              isActive={false}
            />
            <NavLink
              title="About"
              href="/about"
              icon={
                <BookOpen
                  className="w-6 h-6"
                  color={
                    props.activeLink === "about"
                      ? "rgba(38,38,38,1)"
                      : "#B7B7B5"
                  }
                />
              }
              isActive={props.activeLink === "about"}
            />
            <NavLink
              title="MyKreative"
              href="https://my.kreativeusa.com/account"
              target="_blank"
              icon={<Shield className="w-6 h-6 -ml-1" color={"#B7B7B5"} />}
              isActive={false}
            />
            <NavLink
              title="Contact"
              href="mailto:hello@kreativeusa.com"
              target="_blank"
              icon={<Chat className="w-6 h-6" color={"#B7B7B5"} />}
              isActive={false}
            />
            <NavLink
              title="Legal"
              href="/legal"
              icon={
                <Pin
                  className="w-6 h-6 -ml-1"
                  color={props.activeLink === "legal" ? "#262626" : "#B7B7B5"}
                />
              }
              isActive={props.activeLink === "legal"}
            />
          </div>
          <div className="flex md:hidden items-start justify-center space-x-2">
            <SheetTrigger asChild>
              <List className="w-6 h-6" weight="bold" />
            </SheetTrigger>
            <SheetContent
              side={"top"}
              className="px-6 pb-8 flex flex-col items-start justify-center"
              onOpenAutoFocus={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Logo className="h-8 w-auto mb-6" />
              <div className={"grid grid-cols-2 gap-4 w-full"}>
                <div className="col-span-2 sm:col-span-1 flex flex-col items-start justify-center -ml-1">
                  <MobileNavLink
                    title="Home"
                    href="/"
                    icon={
                      <Home
                        className="w-10 h-10 -mt-0.5"
                        color={
                          props.activeLink === "home"
                            ? "rgba(38,38,38,1)"
                            : "#B7B7B5"
                        }
                      />
                    }
                    isActive={props.activeLink === "home"}
                  />
                  <MobileNavLink
                    title="Articles"
                    href="/articles"
                    icon={
                      <Document
                        className="w-10 h-10"
                        color={
                          props.activeLink === "articles"
                            ? "rgba(38,38,38,1)"
                            : "#B7B7B5"
                        }
                      />
                    }
                    isActive={props.activeLink === "articles"}
                  />
                  <MobileNavLink
                    title="Support"
                    href="https://support.kreativeusa.com"
                    target="_blank"
                    icon={<Heart className="w-10 h-10" color={"#B7B7B5"} />}
                    isActive={false}
                  />
                  <MobileNavLink
                    title="About"
                    href="/about"
                    icon={
                      <BookOpen
                        className="w-10 h-10"
                        color={
                          props.activeLink === "about"
                            ? "rgba(38,38,38,1)"
                            : "#B7B7B5"
                        }
                      />
                    }
                    isActive={props.activeLink === "about"}
                  />
                  <MobileNavLink
                    title="MyKreative"
                    href="https://my.kreativeusa.com/account"
                    target="_blank"
                    icon={
                      <Shield className="w-10 h-10 -ml-1" color={"#B7B7B5"} />
                    }
                    isActive={false}
                  />
                  <MobileNavLink
                    title="Contact"
                    href="mailto:hello@kreativeusa.com"
                    target="_blank"
                    icon={<Chat className="w-10 h-10" color={"#B7B7B5"} />}
                    isActive={false}
                  />
                  <MobileNavLink
                    title="Legal"
                    href="/legal"
                    icon={
                      <Pin
                        className="w-10 h-10 -ml-1"
                        color={
                          props.activeLink === "legal" ? "#262626" : "#B7B7B5"
                        }
                      />
                    }
                    isActive={props.activeLink === "legal"}
                  />
                </div>
                <div
                  className={
                    "hidden sm:block col-span-2 sm:col-span-1 relative"
                  }
                >
                  <div className={"rainbow-wrapper rounded-3xl"}>
                    <div
                      className={"w-full h-full flex items-end justify-end p-5"}
                    >
                      <p
                        className={
                          "font-departureMono text-xl text-white font-bold italic"
                        }
                      >
                        radical starts here
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </div>
        </ContainerWide>
      </nav>
    </Sheet>
  );
}
