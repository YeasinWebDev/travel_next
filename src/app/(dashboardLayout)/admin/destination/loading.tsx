import { Skeleton } from "../../../components/ui/skeleton";


export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <Skeleton className="h-8 w-56 mb-2" />
        <Skeleton className="h-4 w-72" />
      </div>

      {/* Filter Bar - Match the exact layout */}
      <div className="flex flex-col md:flex-row items-start gap-4 p-4 border rounded-lg bg-card">
        <div className="w-40">
          <Skeleton className="h-10 w-full max-w-md" />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-10 w-20" />
        </div>
      </div>

      {/* Table Container */}
      <div className="border rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-8 gap-4 p-3 bg-muted/30 border-b">
          {['Image', 'Title', 'Destination', 'Dates', 'Capacity', 'Availability', 'Status', 'Actions'].map((header) => (
            <Skeleton key={header} className="h-4 w-full" />
          ))}
        </div>

        {/* Table Rows - 4 rows like in the image */}
        {[1, 2, 3, 4].map((row) => (
          <div key={row} className="grid grid-cols-8 gap-4 p-3 border-b items-center">
            {/* Image Column */}
            <div className="flex items-center">
              <Skeleton className="h-14 w-14 rounded-lg" />
            </div>

            {/* Title Column with ID */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <div className="flex items-center gap-1">
                <Skeleton className="h-3 w-6" />
                <Skeleton className="h-3 w-28" />
              </div>
            </div>

            {/* Destination Column */}
            <div>
              <Skeleton className="h-5 w-32" />
            </div>

            {/* Dates Column with icon and duration */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-28" />
              </div>
              <Skeleton className="h-3 w-20 ml-6" />
            </div>

            {/* Capacity Column with percentage circle */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-5 w-10" />
            </div>

            {/* Availability Column with icon */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            {/* Status Column with icon */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            {/* Actions Column */}
            <div className="flex justify-end">
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination - Match exact layout */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-9 w-20" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9 rounded" />
            <Skeleton className="h-9 w-9 rounded" />
          </div>
          <Skeleton className="h-9 w-20" />
        </div>
      </div>
    </div>
  )
}