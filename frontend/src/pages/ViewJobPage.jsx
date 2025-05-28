import { useEffect, useState } from 'react';
import {
  Container, Typography, Paper, Box, Chip, Button
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById } from '../services/jobService';

const statusColor = (status) => {
  switch(status) {
    case 'APPLIED': return 'default';
    case 'INTERVIEW': return 'primary';
    case 'OFFER': return 'success';
    case 'REJECTED': return 'error';
    default: return 'default';
  }
}

const ViewJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await getJobById(id);
        setJob(res.data);
      } catch  {
        alert('Failed to load job application');
      }
    };
    fetchJob();
  }, [id]);

  if (!job) return <Container><Typography>Loading...</Typography></Container>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {job.position} at {job.companyName}
        </Typography>

        <Box mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">Location:</Typography>
          <Typography>{job.location || 'N/A'}</Typography>
        </Box>

        <Box mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">Status:</Typography>
          <Chip label={job.status} color={statusColor(job.status)} />
        </Box>

        <Box mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">Applied Date:</Typography>
          <Typography>{job.appliedDate || 'N/A'}</Typography>
        </Box>

        <Box mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">Follow-up Date:</Typography>
          <Typography>{job.followUpDate || 'N/A'}</Typography>
        </Box>

        <Box mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">Job Link:</Typography>
          {job.jobLink ? (
            <a href={job.jobLink} target="_blank" rel="noopener noreferrer">{job.jobLink}</a>
          ) : 'N/A'}
        </Box>

        <Box mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">Notes:</Typography>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {job.notes || 'N/A'}
          </Typography>
        </Box>

        <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
      </Paper>
    </Container>
  );
};

export default ViewJobPage;
