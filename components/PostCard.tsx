import { cn } from "@/lib/utils";
import Link from "next/link";
import { PostPreview } from "@/types/posts";
import { formatDate } from "@/lib/utils";

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
          "py-10 px-8 rounded-lg bg-yellow-100 transition-all duration-200 hover:shadow-lg hover:scale-[102%] hover:bg-yellow-100/85",
          count % 2 === 0 ? "hover:rotate-1" : "hover:-rotate-1"
        )}
      >
        <p className="mb-4 text-sm font-medium">
          {formatDate(postPreview.publishingDate)}
        </p>
        <h2 className="font-comingSoon text-2xl mb-3">{postPreview.title}</h2>
        <p>{postPreview.description}</p>
      </div>
    </Link>
  );
}
