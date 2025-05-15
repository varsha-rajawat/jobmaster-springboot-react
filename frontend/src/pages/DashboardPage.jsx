import { useEffect, useState } from 'react';
import { fetchJobs } from '../services/jobService';

const DashboardPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs().then((res) => setJobs(res.data)).catch(console.error);
  }, []);

  return (
    <div>
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
