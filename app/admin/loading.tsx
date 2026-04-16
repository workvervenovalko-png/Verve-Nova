import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
  return (
    <main className="min-h-screen bg-background p-6 pt-32">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Admin Header Skeleton */}
        <div className="flex justify-between items-center bg-white/[0.02] p-8 rounded-[2.5rem] border border-white/[0.06]">
          <div className="flex items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-2xl" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-3 w-64" />
            </div>
          </div>
          <div className="hidden md:flex gap-2">
            <Skeleton className="h-12 w-32 rounded-xl" />
            <Skeleton className="h-12 w-32 rounded-xl" />
          </div>
        </div>

        {/* Dashboard Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Skeleton className="h-40 w-full rounded-3xl" />
            <Skeleton className="h-40 w-full rounded-3xl" />
          </div>
          <div className="lg:col-span-3">
            <TableSkeleton rows={8} />
          </div>
        </div>
      </div>
    </main>
  );
}
