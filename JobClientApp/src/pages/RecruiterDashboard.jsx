import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Switch,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CardActions,
  Chip,
} from '@mui/material';
import {
  Add,
  Visibility,
  Edit,
  Delete,
  Work,
  People,
  PersonAdd,
  ViewList,
} from '@mui/icons-material';
import { useToast } from '../contexts/ToastContext';
import JobPostForm from '../components/recruiter/JobPostForm';
import JobViewDialog from '../components/recruiter/JobViewDialog';
import { jobPostsData } from '../data/mockData';

const RecruiterDashboard = () => {
  const { showToast } = useToast();
  const [jobPosts, setJobPosts] = useState(jobPostsData);
  const [jobFormOpen, setJobFormOpen] = useState(false);
  const [jobViewOpen, setJobViewOpen] = useState(false);
  const [jobTableOpen, setJobTableOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formMode, setFormMode] = useState('add');

  const activeJobPosts = jobPosts.filter(job => job.status === 'Active').length;
  const totalJobPosts = jobPosts.length;
  const offeredCandidates = jobPosts.reduce((total, job) => 
    total + (job.candidates?.filter(c => c.status === 'Offered').length || 0), 0
  );
 useEffect(() => {
   console.log("I ma here")
 })
  // Get most recent 6 active jobs for cards
  const recentJobs = jobPosts
    .filter(job => job.status === 'Active')
    .slice(0, 6);

  const handleAddJobPost = () => {
    setSelectedJob(null);
    setFormMode('add');
    setJobFormOpen(true);
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setJobViewOpen(true);
  };

  const handleEditJob = (job) => {
    setSelectedJob(job);
    setFormMode('edit');
    setJobFormOpen(true);
  };

  const handleDeleteJob = (jobId) => {
    setJobPosts(prev => prev.filter(j => j.id !== jobId));
    showToast('Job post deleted successfully', 'success');
  };

  const handleToggleJobStatus = (jobId) => {
    setJobPosts(prev => prev.map(j => 
      j.id === jobId 
        ? { ...j, status: j.status === 'Active' ? 'Inactive' : 'Active' }
        : j
    ));
    showToast('Job status updated successfully', 'success');
  };

  const handleJobFormSubmit = (formData) => {
    if (formMode === 'add') {
      const newJob = {
        id: Date.now(),
        ...formData,
        status: 'Active',
        candidates: []
      };
      setJobPosts(prev => [...prev, newJob]);
      showToast('Job post created successfully', 'success');
    } else if (formMode === 'edit') {
      setJobPosts(prev => prev.map(j => 
        j.id === selectedJob.id ? { ...j, ...formData } : j
      ));
      showToast('Job post updated successfully', 'success');
    }
    setJobFormOpen(false);
  };

  const handleAddCandidate = (jobId, candidateData) => {
    setJobPosts(prev => prev.map(job => 
      job.id === jobId 
        ? { 
            ...job, 
            candidates: [...(job.candidates || []), { 
              id: Date.now(), 
              ...candidateData 
            }] 
          }
        : job
    ));
    showToast('Candidate added successfully', 'success');
  };

  const getTotalCandidates = (job) => {
    return job.candidates ? job.candidates.length : 0;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Screening': return 'info';
      case 'Technical Interview': return 'warning';
      case 'Final Call': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Recruiter Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Work sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 600, color: 'success.main' }}>
                    {activeJobPosts}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    Active Job Posts
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Work sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    {totalJobPosts}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    All Job Posts
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonAdd sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 600, color: 'warning.main' }}>
                    {offeredCandidates}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    Offered Candidates
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          startIcon={<Add sx={{ fontSize: 18 }} />}
          onClick={handleAddJobPost}
        >
          Add New Job Post
        </Button>
        <Button
          variant="outlined"
          startIcon={<ViewList sx={{ fontSize: 18 }} />}
          onClick={() => setJobTableOpen(true)}
        >
          View All Jobs
        </Button>
      </Box>

      {/* Recent Job Posts Cards */}
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Recent Job Posts
      </Typography>
      
      <Grid container spacing={3}>
        {recentJobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={job.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, fontSize: '1.1rem' }}>
                  {job.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: 40, overflow: 'hidden' }}>
                  {job.description.substring(0, 80)}...
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip 
                    label={job.stage} 
                    color={getStatusColor(job.stage)}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Candidates: {getTotalCandidates(job)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${job.salaryMin?.toLocaleString()} - ${job.salaryMax?.toLocaleString()}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Button 
                  size="small" 
                  startIcon={<Visibility sx={{ fontSize: 16 }} />}
                  onClick={() => handleViewJob(job)}
                >
                  View
                </Button>
                <Box>
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={() => handleEditJob(job)}>
                      <Edit sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" onClick={() => handleDeleteJob(job.id)}>
                      <Delete sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {recentJobs.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No active job posts found
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add sx={{ fontSize: 18 }} />}
            onClick={handleAddJobPost}
            sx={{ mt: 2 }}
          >
            Create Your First Job Post
          </Button>
        </Box>
      )}

      {/* Job Table Dialog */}
      <Dialog open={jobTableOpen} onClose={() => setJobTableOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>All Job Posts</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Stage</TableCell>
                  <TableCell>Total Candidates</TableCell>
                  <TableCell>Salary Range</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobPosts.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>
                      <Switch
                        checked={job.status === 'Active'}
                        onChange={() => handleToggleJobStatus(job.id)}
                        color="primary"
                      />
                      {job.status}
                    </TableCell>
                    <TableCell>{job.stage}</TableCell>
                    <TableCell>{getTotalCandidates(job)}</TableCell>
                    <TableCell>${job.salaryMin?.toLocaleString()} - ${job.salaryMax?.toLocaleString()}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="View">
                        <IconButton onClick={() => handleViewJob(job)}>
                          <Visibility sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleEditJob(job)}>
                          <Edit sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDeleteJob(job.id)}>
                          <Delete sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setJobTableOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Job Form Dialog */}
      <Dialog open={jobFormOpen} onClose={() => setJobFormOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {formMode === 'add' ? 'Add New Job Post' : 'Edit Job Post'}
        </DialogTitle>
        <DialogContent>
          <JobPostForm
            job={selectedJob}
            mode={formMode}
            onSubmit={handleJobFormSubmit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setJobFormOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Job View Dialog */}
      <JobViewDialog
        open={jobViewOpen}
        onClose={() => setJobViewOpen(false)}
        job={selectedJob}
        onAddCandidate={handleAddCandidate}
        onUpdateJob={(updatedJob) => {
          setJobPosts(prev => prev.map(j => j.id === updatedJob.id ? updatedJob : j));
        }}
      />
    </Box>
  );
};

export default RecruiterDashboard;