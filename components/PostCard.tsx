import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { PostPreview } from "@/types/posts";
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
          "cursor-pointer relative py-8 sm:py-10 px-6 sm:px-8 rounded-xl bg-[#eeeee2] transition-all duration-200 hover:shadow-lg hover:scale-[102%] hover:bg-yellow-100/85",
          count % 2 === 0 ? "hover:rotate-1" : "hover:-rotate-1"
        )}
      >
        <div className={"absolute top-4 right-4 flex flex-wrap items-center justify-end gap-2"}>
          {postPreview.categories.map((category, index) => (
            <StatusBadge key={index} badgeType={category} />
          ))}
          {/*<StatusBadge badgeType={"publishDate"} text={formatDate(postPreview.publishingDate)} />*/}
        </div>
        <Image
          src="/images/file.png"
          alt="File icon"
          width={100}
          height={130}
          className={cn(
            "h-20 w-auto -ml-2 mb-6 drop-shadow-xl transition-all duration-300 hover:scale-[110%]",
            count % 2 === 0 ? "hover:-rotate-6" : "hover:rotate-6",
            postPreview.categories.length > 1 ? "mt-4 md:-mt-4" : "-mt-4",
          )}
        />
        <h2 className="font-comingSoon text-3xl mb-3 font-bold">{postPreview.title}</h2>
        <p className="text-lg">{postPreview.description}</p>
      </div>
    </Link>
  );
}
