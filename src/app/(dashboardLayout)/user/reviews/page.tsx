import ReviewHeader from "@/src/app/components/dashboard/user/reviews/ReviewHeader";
import ReviewTable from "@/src/app/components/dashboard/user/reviews/ReviewTable";
import ClearFilters from "@/src/app/components/shared/ClearFilters";
import Pagination from "@/src/app/components/shared/Pagination";
import SearchFilter from "@/src/app/components/shared/SearchFilter";
import SelectFilter from "@/src/app/components/shared/SelectFilter";
import { queryStringFormatter } from "@/src/app/lib/formater";
import { getAllDestinations } from "@/src/app/services/destination/destination";
import { getMyReviews } from "@/src/app/services/review/review";

async function UserDashboardReviewsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParamsObj = await searchParams;
  const querystring = queryStringFormatter(searchParamsObj);

  const allReview = await getMyReviews(querystring);
  const allDestinations = await getAllDestinations();

  const destinationFilterData = allDestinations?.data?.data.map((i: any) => {
    return {
      label: i.name,
      value: i._id,
    }
  });

  return (
    <>
      <ReviewHeader />

      <div className="flex items-center gap-3 mt-3">
        <SelectFilter options={destinationFilterData} paramName="destinationId" />
        <ClearFilters route="/user/reviews"/>
      </div>
      <ReviewTable reviews={allReview?.data?.data}/>
      <div className="mt-5">
        <Pagination currentPage={allReview?.data?.meta?.page} totalPages={allReview?.data?.meta?.totalPages} />
      </div>
    </>
  );
}

export default UserDashboardReviewsPage;
