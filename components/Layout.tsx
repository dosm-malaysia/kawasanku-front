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
      {children}
      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Layout;
