import DashboardLayout from "../../Layouts/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>

      <h2>Client Dashboard</h2>

      <div className="row mt-4">

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h5>Total Jobs</h5>
              <h2>10</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h5>Applications</h5>
              <h2>20</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h5>Selected</h5>
              <h2>5</h2>
            </div>
          </div>
        </div>

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;