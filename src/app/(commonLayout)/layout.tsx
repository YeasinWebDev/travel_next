import CommonFooter from "@/src/components/shared/CommonFooter";
import CommonNavbar from "@/src/components/shared/CommonNavbar";


const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <CommonNavbar />
      {children}
      <CommonFooter />
    </>
  );
};

export default CommonLayout;
