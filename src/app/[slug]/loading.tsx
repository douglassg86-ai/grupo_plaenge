import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Loading() {
  return (
    <div className="flex-1">
      <Skeleton className="h-[60vh] w-full rounded-none" />

      <section className="container -mt-20 md:-mt-32 relative z-20 pb-16">
        <Card className="overflow-hidden shadow-2xl">
          <CardContent className="p-4 md:p-8 space-y-12">
            <div>
              <Skeleton className="h-9 w-3/4 mb-4" />
              <Skeleton className="h-5 w-full mt-4" />
              <Skeleton className="h-5 w-full mt-2" />
              <Skeleton className="h-5 w-2/3 mt-2" />
            </div>

            <Separator />

            <div>
              <Skeleton className="h-9 w-1/2 mx-auto mb-6" />
              <div className="flex justify-center gap-2">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
              <div className="mt-6 flex gap-4 overflow-hidden">
                <Skeleton className="h-96 w-full md:w-1/2 lg:w-1/3 shrink-0" />
                <Skeleton className="h-96 w-full md:w-1/2 lg:w-1/3 shrink-0 hidden md:block" />
                <Skeleton className="h-96 w-full md:w-1/2 lg:w-1/3 shrink-0 hidden lg:block" />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <Skeleton className="h-9 w-1/2 mb-4" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="mt-4 aspect-video w-full rounded-lg" />
              </div>
              <div>
                <Skeleton className="h-9 w-1/2 mb-4" />
                <Skeleton className="mt-4 aspect-video w-full rounded-lg" />
              </div>
            </div>

            <Separator />

            <div>
              <Skeleton className="h-9 w-1/3 mb-6" />
              <div className="rounded-xl border">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
