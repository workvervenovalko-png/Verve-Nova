import { BlogSkeleton } from "@/components/skeletons/blog-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <main className="min-h-screen bg-background p-6 pt-32">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-16 w-full max-w-2xl" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>

        <div className="space-y-12">
          <div className="flex justify-between items-center">
            <Skeleton className="h-10 w-48 rounded-xl" />
            <Skeleton className="h-10 w-32 rounded-xl" />
          </div>
          <BlogSkeleton />
        </div>
      </div>
    </main>
  );
}
