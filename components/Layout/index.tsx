import { FunctionComponent } from "react";

import Header from "./Header";
import Footer from "./Footer";
import ChoroplethSection from "../Charts/Choropleth/Section";
import ChoroplethPrice from "../Charts/Choropleth/SectionPrice";
import ChoroplethSDG from "../Charts/Choropleth/SectionSDG";

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
      {/* CHOROPLETH */}
      <ChoroplethSection />
      <ChoroplethPrice />
      <ChoroplethSDG />
      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Layout;
