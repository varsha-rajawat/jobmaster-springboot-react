import { useEffect, useState } from "react";
import { fetchJobs, deleteJob } from "../../services/jobService";
import JobCard from "../../components/JobCard";

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);

  const loadJobs = async () => {
    try {
      const res = await fetchJobs();
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs", err);
    }
  };

  const handleDelete = async (id) => {
    await deleteJob(id);
    loadJobs();
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Job Applications</h2>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} onDelete={() => handleDelete(job.id)} />
      ))}
    </div>
  );
};

export default JobListPage;
