import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createJob, updateJob, getJobById } from "../../services/jobService";

const JobFormPage = () => {
  const { id } = useParams(); // If editing, this will be job ID
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    status: "Pending",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getJobById(id).then(res => setFormData(res.data));
    }
  }, [id]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (id) {
        await updateJob(id, formData);
      } else {
        await createJob(formData);
      }
      navigate("/dashboard");
    } catch (err) {
      console.error("Error saving job:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">{id ? "Edit" : "Add"} Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="position"
          placeholder="Position"
          value={formData.position}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Pending">Pending</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Hired">Hired</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {id ? "Update" : "Add"} Job
        </button>
      </form>
    </div>
  );
};

export default JobFormPage;
