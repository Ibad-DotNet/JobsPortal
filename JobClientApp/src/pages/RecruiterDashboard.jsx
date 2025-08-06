import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { getAllJobs } from '../api/apiEndpoints';
import authApiService from '../api/authApiService';
import { useLoading } from '../contexts/LoadingContext';
import { LoadingButton, LoadingWrapper, LoadingSkeleton } from '../components/common';
import { createLoadingManager } from '../utils/loadingUtils';

const RecruiterDashboard = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { setLoading, isLoading } = useLoading();
  const loadingManager = createLoadingManager(setLoading, isLoading);
  const [jobPosts, setJobPosts] = useState([]);
  const [jobFormOpen, setJobFormOpen] = useState(false);
  const [jobViewOpen, setJobViewOpen] = useState(false);
  const [jobTableOpen, setJobTableOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formMode, setFormMode] = useState('add');

  const activeJobPosts = jobPosts.filter(job => job.isActive).length;
  const totalJobPosts = jobPosts.length;
   const offeredCandidates = 0//jobPosts.reduce((total, job) => 
  //   total + (job.candidates?.filter(c => c.status === 'Offered').length || 0), 0
  // );

  const fetchJobs = async () => {
    await loadingManager.execute(
      'fetchJobs',
      () => authApiService.get(getAllJobs),
      (data) => setJobPosts(data),
      (error) => console.error('Failed to fetch jobs:', error)
    );
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  const recentJobs = jobPosts
    .filter(job => job.isActive)
    .slice(0, 5);

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

  const handleDeleteJob = async (jobId) => {
    await loadingManager.execute(
      'deleteJob',
      async () => {
        setJobPosts(prev => prev.filter(j => j.id !== jobId));
        return true;
      },
      () => showToast('Job post deleted successfully', 'success'),
      (error) => {
        console.error('Failed to delete job:', error);
        showToast('Failed to delete job post', 'error');
      }
    );
  };

  const handleToggleJobStatus = async (jobId) => {
    await loadingManager.execute(
      'toggleJobStatus',
      async () => {
        setJobPosts(prev => prev.map(j => 
          j.id === jobId 
            ? { ...j, status: j.status === 'Active' ? 'Inactive' : 'Active' }
            : j
        ));
        return true;
      },
      () => showToast('Job status updated successfully', 'success'),
      (error) => {
        console.error('Failed to toggle job status:', error);
        showToast('Failed to update job status', 'error');
      }
    );
  };

  const handleJobFormSubmit = async (formData) => {
    await loadingManager.execute(
      'submitJob',
      async () => {
        if (formMode === 'add') {
          const newJob = {
            id: Date.now(),
            ...formData,
            status: 'Active',
            candidates: []
          };
          setJobPosts(prev => [...prev, newJob]);
        } else if (formMode === 'edit') {
          setJobPosts(prev => prev.map(j => 
            j.id === selectedJob.id ? { ...j, ...formData } : j
          ));
        }
        setJobFormOpen(false);
        return true;
      },
      () => showToast(`Job post ${formMode === 'add' ? 'created' : 'updated'} successfully`, 'success'),
      (error) => {
        console.error('Failed to submit job form:', error);
        showToast('Failed to save job post', 'error');
      }
    );
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
        All Jobs
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
        <LoadingButton
          variant="contained"
          startIcon={<Add sx={{ fontSize: 18 }} />}
          onClick={handleAddJobPost}
          loading={isLoading('submitJob')}
          loadingText="Adding..."
        >
          Add New Job Post
        </LoadingButton>
         <Button
          variant="outlined"
          startIcon={<ViewList sx={{ fontSize: 18 }} />}
          onClick={() =>navigate('/all-jobs')}
        >
          View All Jobs
        </Button>
      </Box>
      
      <LoadingWrapper
        loading={isLoading('fetchJobs')}
        message="Loading job posts..."
        skeleton={true}
        skeletonProps={{ variant: 'card', count: 6 }}
      >
        <Grid container spacing={3}>
          {recentJobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={job.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, fontSize: '1.1rem' }}>
                    {job.jobName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: 40, overflow: 'hidden' }}>
                    {job.jobDescription.substring(0, 350)}...
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip 
                      label={job.interviewStage} 
                      color={getStatusColor(job.interviewStage)}
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Candidates: {getTotalCandidates(job)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${job.minimumSalary?.toLocaleString()} - ${job.maximumSalary?.toLocaleString()}
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
                      <IconButton 
                        size="small" 
                        onClick={() => handleDeleteJob(job.id)}
                        disabled={isLoading('deleteJob')}
                      >
                        <Delete sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </LoadingWrapper>

      {recentJobs.length === 0 && !isLoading('fetchJobs') && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No active job posts found
          </Typography>
          <LoadingButton
            variant="contained"
            startIcon={<Add sx={{ fontSize: 18 }} />}
            onClick={handleAddJobPost}
            loading={isLoading('submitJob')}
            loadingText="Creating..."
            sx={{ mt: 2 }}
          >
            Create Your First Job Post
          </LoadingButton>
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
                    <TableCell>{job.jobName}</TableCell>
                    <TableCell>
                      <Switch
                        checked={job.isActive}
                        onChange={() => handleToggleJobStatus(job.id)}
                        color="primary"
                        disabled={isLoading('toggleJobStatus')}
                      />
                      {job.isActive}
                    </TableCell>
                    <TableCell>{job.interviewStage}</TableCell>
                    <TableCell>{getTotalCandidates(job)}</TableCell>
                    <TableCell>${job.minimumSalary?.toLocaleString()} - ${job.maximumSalary?.toLocaleString()}</TableCell>
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
                        <IconButton 
                          onClick={() => handleDeleteJob(job.id)}
                          disabled={isLoading('deleteJob')}
                        >
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