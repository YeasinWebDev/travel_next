import CommonFooter from "@/src/components/shared/CommonFooter";
import CommonNavbar from "@/src/components/shared/CommonNavbar";

const CommonLayout = async({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <CommonNavbar />
      {children}
      <CommonFooter />
    </>
  );
};

export default CommonLayout;
