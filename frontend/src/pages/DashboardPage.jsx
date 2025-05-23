import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import JobListPage from '../pages/jobPages/JobListPage';

const DashboardPage = () => {

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <button onClick={logout}>Logout</button>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <button
        onClick={() => navigate("/jobs/new")}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        + Add New Job
      </button>
      <JobListPage />
    </div>
  );
};

export default DashboardPage;
