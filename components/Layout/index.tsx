import { FunctionComponent } from "react";

import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
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
