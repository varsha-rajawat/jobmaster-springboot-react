import { useEffect, useState, useContext} from 'react';
import { fetchJobs } from '../services/jobService';
import { AuthContext } from '../context/AuthContext';

const DashboardPage = () => {
  const [jobs, setJobs] = useState([]);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    fetchJobs().then((res) => setJobs(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
      <h2>My Job Applications</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            {job.position} at {job.companyName} - {job.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
