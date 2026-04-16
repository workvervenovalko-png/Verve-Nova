import { Skeleton } from "@/components/ui/skeleton";

export default function CareersLoading() {
  return (
    <main className="min-h-screen bg-background p-6 pt-32">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Banner Skeleton */}
        <div className="relative h-[400px] w-full bg-white/[0.02] border border-white/[0.06] rounded-[3rem] overflow-hidden p-8 md:p-16 flex flex-col justify-center gap-6">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-20 w-full max-w-xl" />
          <Skeleton className="h-6 w-full max-w-md" />
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-14 w-40 rounded-xl" />
            <Skeleton className="h-14 w-40 rounded-xl" />
          </div>
        </div>

        {/* Filters and List Skeleton */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <Skeleton className="h-12 w-full max-w-sm rounded-xl" />
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto justify-start">
               {Array.from({ length: 4 }).map((_, i) => (
                 <Skeleton key={i} className="h-10 w-24 rounded-lg flex-shrink-0" />
               ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-card p-8 rounded-[2rem] space-y-6">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                   <Skeleton className="h-4 w-24" />
                   <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
