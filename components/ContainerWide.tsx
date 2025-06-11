import { cn } from "@/lib/utils";

export default function ContainerWide({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("px-4 max-w-[100rem] mx-auto", className)}>{children}</div>;
}
