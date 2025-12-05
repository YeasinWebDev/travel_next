import CommonFooter from "@/src/components/shared/CommonFooter";
import CommonNavbar from "@/src/components/shared/CommonNavbar";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="border-b">
        <CommonNavbar />
      </div>
      <div className="min-h-[80vh]">{children}</div>
      <CommonFooter />
    </>
  );
};

export default CommonLayout;
