import UserBookingHeader from "@/src/app/components/dashboard/user/bookings/UserBookingHeader";
import UserBookingTable from "@/src/app/components/dashboard/user/bookings/UserBookingTable";
import ClearFilters from "@/src/app/components/shared/ClearFilters";
import Pagination from "@/src/app/components/shared/Pagination";
import SelectFilter from "@/src/app/components/shared/SelectFilter";
import { queryStringFormatter } from "@/src/app/lib/formater";
import { myBookings } from "@/src/app/services/auth/user";

async function UserDashboardBookingsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParamsObj = await searchParams;
  const querystring = queryStringFormatter(searchParamsObj);

  const myBooking = await myBookings(querystring);

  return (
    <>
      <UserBookingHeader />
      <div className="flex items-center gap-2 mt-5">
        <SelectFilter
          defaultValue="Payment Status"
          paramName="status"
          options={[
            { label: "Pending", value: "PENDING" },
            { label: "Success", value: "SUCCESS" },
            { label: "Failed", value: "FAILED" },
          ]}
        />

        <ClearFilters route="/user/bookings" />
      </div>
      <UserBookingTable myBookings={myBooking?.data?.data} />
      <div className="mt-10">
        <Pagination currentPage={myBooking?.data?.meta.page} totalPages={myBooking?.data?.meta.totalPages} />
      </div>
    </>
  );
}

export default UserDashboardBookingsPage;
