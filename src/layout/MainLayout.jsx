import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="pt-20">{children}</div>
      <Footer />
    </>
  );
}

export default MainLayout;
