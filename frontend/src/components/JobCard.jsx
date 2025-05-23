const JobCard = ({ job, onDelete }) => (
  <div className="border rounded p-4 mb-3 shadow-sm">
    <h3 className="text-xl font-semibold">{job.position}</h3>
    <p className="text-sm text-gray-600">{job.company}</p>
    <p>Status: {job.status}</p>
    <div className="mt-2">
      <button className="text-blue-600 mr-2">Edit</button>
      <button onClick={onDelete} className="text-red-500">Delete</button>
    </div>
  </div>
);

export default JobCard;
