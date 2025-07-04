import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { PostPreview } from "@/types/posts";
import { formatDate } from "@/lib/utils";
import StatusBadge from "./StatusBadge";

export default function PostCard({
  postPreview,
  count,
}: {
  postPreview: PostPreview;
  count: number,
}) {
  return (
    <Link href={postPreview.slug}>
      <div
        className={cn(
          "cursor-pointer relative py-10 px-8 rounded-xl bg-[#eeeee2] transition-all duration-200 hover:shadow-lg hover:scale-[102%] hover:bg-yellow-100/85",
          count % 2 === 0 ? "hover:rotate-1" : "hover:-rotate-1"
        )}
      >
        <StatusBadge
          text={formatDate(postPreview.publishingDate)}
          className="absolute top-4 right-4"
        />
        <Image
          src="/images/file.png"
          alt="File icon"
          width={36}
          height={44}
          className="h-20 w-auto -ml-2 mb-6 -mt-4"
        />
        <h2 className="font-comingSoon text-3xl mb-3 font-bold">{postPreview.title}</h2>
        <p className="text-lg">{postPreview.description}</p>
      </div>
    </Link>
  );
}
