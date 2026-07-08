import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Navbar />

      <div className="d-flex">

        <Sidebar />

        <div
          className="flex-grow-1 p-4"
          style={{
            minHeight: "90vh",
            background: "#f8f9fa",
          }}
        >
          {children}
        </div>

      </div>

      <Footer />
    </>
  );
};

export default DashboardLayout;