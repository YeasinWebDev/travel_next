import { Card, CardContent } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto p-5">
      {/* Header Section */}
      <div className="flex items-center justify-center flex-col">
        <div className="flex items-center flex-col mb-4">
          <Skeleton className="h-8 w-56 mb-3" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center p-4 border-0 rounded-lg bg-card mb-5">

          {/* Filter Dropdown and Clear Button */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-10 w-32" />
            </div>
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
      </div>


      {/* Destinations Grid - 3 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Destination Card 1 */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {/* Image/Media Area */}
            <Skeleton className="h-48 w-full" />

            <div className="p-4">
              {/* Price and Status Badge */}
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>

              {/* Description */}
              <div className="space-y-2 mb-4">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {["beach", "relaxation", "seafood", "+2"].map((tag, i) => (
                  <Skeleton key={i} className={`h-6 rounded-full ${i === 3 ? "w-8" : "w-20"}`} />
                ))}
              </div>

              {/* Best Time and Activities */}
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="space-y-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="text-right space-y-1">
                  <Skeleton className="h-3 w-20 ml-auto" />
                  <Skeleton className="h-4 w-16 ml-auto" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Destination Card 2 */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <Skeleton className="h-48 w-full" />

            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-4 w-14" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>

              <div className="space-y-2 mb-4">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {["wildlife", "adventure", "nature", "+1"].map((tag, i) => (
                  <Skeleton key={i} className={`h-6 rounded-full ${i === 3 ? "w-8" : "w-20"}`} />
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="space-y-1">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-4 w-36" />
                </div>
                <div className="text-right space-y-1">
                  <Skeleton className="h-3 w-20 ml-auto" />
                  <Skeleton className="h-4 w-16 ml-auto" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Destination Card 3 */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <Skeleton className="h-48 w-full" />

            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-4 w-14" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>

              <div className="space-y-2 mb-4">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {["tea", "nature", "culture", "+1"].map((tag, i) => (
                  <Skeleton key={i} className={`h-6 rounded-full ${i === 3 ? "w-8" : "w-20"}`} />
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="space-y-1">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <div className="text-right space-y-1">
                  <Skeleton className="h-3 w-20 ml-auto" />
                  <Skeleton className="h-4 w-16 ml-auto" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Loading Cards (shows while loading more) */}
        {[4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <Skeleton className="h-48 w-full" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-40" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-4">
          <Skeleton className="h-9 w-20" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
          <Skeleton className="h-9 w-20" />
        </div>
      </div>
    </div>
  );
}
