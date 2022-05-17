import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-full min-h-screen">
      {/* HEADER */}
      <Header />
      {/* CONTENT */}
      <div className="flex h-full w-full justify-center bg-gray-100">
        <div className="h-full max-w-screen-lg px-3 py-8 md:py-10 lg:px-0">
          {children}
        </div>
      </div>
      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Layout;
