import { useState, useEffect, useMemo } from 'react';
import {
  Container, Typography, Table, TableHead, TableBody, TableRow, TableCell,
  IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Chip, Box, Grid, Paper, Select, InputLabel, FormControl
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { fetchJobs, createJob, updateJob, deleteJob } from '../services/jobService';
import { useNavigate } from 'react-router-dom';
import { fetchCompanies } from '../services/companyService';

const statusOptions = ['APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED'];

const statusColor = (status) => {
  switch (status) {
    case 'APPLIED': return 'default';
    case 'INTERVIEW': return 'primary';
    case 'OFFER': return 'success';
    case 'REJECTED': return 'error';
    default: return 'default';
  }
};

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [currentJob, setCurrentJob] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [sortField, setSortField] = useState('appliedDate');
  const [sortOrder, setSortOrder] = useState("desc");

  const navigate = useNavigate();

  const initialFormData = {
    companyName: '',
    position: '',
    location: '',
    status: 'APPLIED',
    appliedDate: '',
    followUpDate: '',
    jobLink: '',
    notes: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const res = await fetchJobs();
      setJobs(res.data);
    } catch (error) {
      console.log(error);
      alert('Error loading jobs');
    }
    setLoading(false);
  };

  const loadCompanies = async () => {
    try {
      const res = await fetchCompanies();
      setCompanies(res.data);
    } catch (error) {
      console.log('Failed to load companies', error);
    }
  };

  useEffect(() => {
    loadJobs();
    loadCompanies();
  }, []);

  const handleSort = (field) => {
    const order = (field === sortField && sortOrder === 'asc') ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };


  const filteredJobs = useMemo(() => {
    let result = jobs.filter(job => {
      const matchesStatus = filterStatus ? job.status === filterStatus : true;
      const matchesSearch = searchTerm
        ? job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.position.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      return matchesStatus && matchesSearch;
    });
    if (sortField) {
      result = result.sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;

        // Special case for date fields
        if (sortField.includes('Date')) {
          return sortOrder === 'asc'
            ? new Date(a[sortField]) - new Date(b[sortField])
            : new Date(b[sortField]) - new Date(a[sortField]);
        }

        // Default alphabetical/number sort
        if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [jobs, filterStatus, searchTerm, sortField, sortOrder]);

  const openAddForm = () => {
    setFormMode('add');
    setFormData(initialFormData);
    setFormOpen(true);
  };

  const openEditForm = (job) => {
    setFormMode('edit');
    setCurrentJob(job);
    setFormData({
      companyName: job.companyName || '',
      position: job.position || '',
      location: job.location || '',
      status: job.status || 'APPLIED',
      appliedDate: job.appliedDate || '',
      followUpDate: job.followUpDate || '',
      jobLink: job.jobLink || '',
      notes: job.notes || '',
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setCurrentJob(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async () => {
    if (!formData.companyName || !formData.position) {
      alert('Company name and position are required');
      return;
    }

    try {
      if (formMode === 'add') {
        await createJob(formData);
      } else if (formMode === 'edit' && currentJob) {
        await updateJob(currentJob.id, formData);
      }
      closeForm();
      loadCompanies();
      loadJobs();
    } catch (error) {
      console.log(error);
      alert('Error saving job');
    }
  };

  const openDeleteConfirm = (job) => {
    setJobToDelete(job);
    setDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setJobToDelete(null);
    setDeleteConfirmOpen(false);
  };

  const handleDelete = async () => {
    try {
      if (jobToDelete) {
        await deleteJob(jobToDelete.id);
        closeDeleteConfirm();
        loadJobs();
      }
    } catch (error) {
      console.log(error);
      alert('Error deleting job');
    }
  };

  const totalJobs = jobs.length;
  const countByStatus = statusOptions.reduce((acc, status) => {
    acc[status] = jobs.filter(j => j.status === status).length;
    return acc;
  }, {});

  const upcomingFollowUps = jobs.filter(j => {
    if (!j.followUpDate) return false;
    const followUp = new Date(j.followUpDate);
    const now = new Date();
    const diffDays = (followUp - now) / (1000 * 3600 * 24);
    return diffDays >= 0 && diffDays <= 7;
  }).length;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Button onClick={() => navigate('/insights')}>
        📊 View Insights
      </Button>
      <Typography variant="h4" gutterBottom>Job Applications Dashboard</Typography>

      {/* Filters */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Search company or position"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <TextField
          label="Filter by status"
          select
          size="small"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          sx={{ width: 180 }}
        >
          <MenuItem value="">All</MenuItem>
          {statusOptions.map(status => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </TextField>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openAddForm}>
          Add Application
        </Button>
      </Box>

      {/* Insights */}
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Applications</Typography>
            <Typography variant="h4">{totalJobs}</Typography>
          </Paper>
        </Grid>
        {statusOptions.map(status => (
          <Grid item xs={12} sm={2} key={status}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle1">{status}</Typography>
              <Chip label={countByStatus[status]} color={statusColor(status)} />
            </Paper>
          </Grid>
        ))}
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Upcoming Follow-ups (7 days)</Typography>
            <Typography variant="h4">{upcomingFollowUps}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Job applications table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell onClick={() => handleSort('companyName')} style={{ cursor: 'pointer' }}>
              Company {sortField === 'companyName' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </TableCell>
            <TableCell onClick={() => handleSort('position')} style={{ cursor: 'pointer' }}>
              Position {sortField === 'position' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </TableCell>
            <TableCell onClick={() => handleSort('location')} style={{ cursor: 'pointer' }}>
              Location {sortField === 'location' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </TableCell>
            <TableCell onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
              Status {sortField === 'status' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </TableCell>
            <TableCell onClick={() => handleSort('appliedDate')} style={{ cursor: 'pointer' }}>
              Applied Date {sortField === 'appliedDate' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </TableCell>
            <TableCell onClick={() => handleSort('followUpDate')} style={{ cursor: 'pointer' }}>
              Follow-up Date {sortField === 'followUpDate' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <TableRow><TableCell colSpan={7}>Loading...</TableCell></TableRow>
          ) : filteredJobs.length === 0 ? (
            <TableRow><TableCell colSpan={7}>No applications found.</TableCell></TableRow>
          ) : (
            filteredJobs.map(job => (
              <TableRow key={job.id} hover>
                <TableCell>{job.companyName}</TableCell>
                <TableCell>{job.position}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>
                  <Chip label={job.status} color={statusColor(job.status)} />
                </TableCell>
                <TableCell>{job.appliedDate}</TableCell>
                <TableCell>{job.followUpDate}</TableCell>
                <TableCell>
                  <IconButton onClick={() => navigate(`/jobs/${job.id}`)}><VisibilityIcon /></IconButton>
                  <IconButton onClick={() => openEditForm(job)}><EditIcon /></IconButton>
                  <IconButton onClick={() => openDeleteConfirm(job)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Add/Edit Form Dialog */}
      <Dialog open={formOpen} onClose={closeForm} maxWidth="sm" fullWidth>
        <DialogTitle>{formMode === 'add' ? 'Add New Application' : 'Edit Application'}</DialogTitle>
        <DialogContent dividers>
          <Autocomplete
            freeSolo
            options={companies.map(c => c.name)}
            value={formData.companyName}
            onInputChange={(event, newInputValue) => {
              setFormData(prev => ({ ...prev, companyName: newInputValue }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Company Name"
                required
                helperText={companies.length === 0 ? "No companies found. Type to add new." : ""}
              />
            )}
          />



          <TextField label="Position" name="position" value={formData.position} onChange={handleFormChange} fullWidth margin="normal" required />
          <TextField label="Location" name="location" value={formData.location} onChange={handleFormChange} fullWidth margin="normal" />
          <TextField label="Status" name="status" select value={formData.status} onChange={handleFormChange} fullWidth margin="normal">
            {statusOptions.map(status => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </TextField>
          <TextField label="Applied Date" name="appliedDate" type="date" value={formData.appliedDate} onChange={handleFormChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
          <TextField label="Follow-up Date" name="followUpDate" type="date" value={formData.followUpDate} onChange={handleFormChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
          <TextField label="Job Link" name="jobLink" value={formData.jobLink} onChange={handleFormChange} fullWidth margin="normal" />
          <TextField label="Notes" name="notes" value={formData.notes} onChange={handleFormChange} fullWidth margin="normal" multiline rows={4} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeForm}>Cancel</Button>
          <Button variant="contained" onClick={handleFormSubmit}>
            {formMode === 'add' ? 'Add' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={closeDeleteConfirm}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the application for <b>{jobToDelete?.companyName}</b> - <i>{jobToDelete?.position}</i>?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirm}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
