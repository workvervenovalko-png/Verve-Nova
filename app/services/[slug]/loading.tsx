import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceLoading() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navbar placeholder */}
      <div className="h-24 w-full border-b border-white/5" />

      <section className="pt-32 pb-24 px-6 md:pt-48 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          <div className="lg:col-span-8 space-y-8">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-20 w-full max-w-2xl" />
            <Skeleton className="h-6 w-full max-w-xl" />
            <div className="flex gap-4 pt-8">
              <Skeleton className="h-14 w-40 rounded-xl" />
              <Skeleton className="h-14 w-40 rounded-xl" />
            </div>
          </div>
          <div className="lg:col-span-4 hidden lg:block">
            <Skeleton className="h-96 w-full rounded-[3rem]" />
          </div>
        </div>
      </section>

      <section className="py-24 bg-white/[0.02] border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
