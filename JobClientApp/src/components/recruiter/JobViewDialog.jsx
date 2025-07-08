import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  Close,
  Add,
  GetApp,
  Cancel,
  ArrowForward,
} from '@mui/icons-material';
import CandidateForm from './CandidateForm';
import { useToast } from '../../contexts/ToastContext';

const JobViewDialog = ({ open, onClose, job, onAddCandidate, onUpdateJob }) => {
  const { showToast } = useToast();
  const [candidateFormOpen, setCandidateFormOpen] = useState(false);

  if (!job) return null;

  const handleAddCandidate = (candidateData) => {
    onAddCandidate(job.id, candidateData);
    setCandidateFormOpen(false);
  };

  const handleRejectCandidate = (candidateId) => {
    const updatedCandidates = job.candidates.filter(c => c.id !== candidateId);
    onUpdateJob({ ...job, candidates: updatedCandidates });
    showToast('Candidate rejected', 'success');
  };

  const handleMoveToNextStage = (candidateId) => {
    const stageOrder = ['Screening', 'Technical Interview', 'Final Call', 'Offered'];
    const updatedCandidates = job.candidates.map(candidate => {
      if (candidate.id === candidateId) {
        const currentIndex = stageOrder.indexOf(candidate.status);
        const nextStage = currentIndex < stageOrder.length - 1 ? stageOrder[currentIndex + 1] : candidate.status;
        return { ...candidate, status: nextStage };
      }
      return candidate;
    });
    onUpdateJob({ ...job, candidates: updatedCandidates });
    showToast('Candidate moved to next stage', 'success');
  };

  const handleDownloadCV = (candidateName) => {
    // Simulate CV download
    showToast(`Downloaded CV for ${candidateName}`, 'success');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Screening': return 'info';
      case 'Technical Interview': return 'warning';
      case 'Final Call': return 'secondary';
      case 'Offered': return 'success';
      default: return 'default';
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {job.title}
            <IconButton onClick={onClose}>
              <Close sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {/* Job Details */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Job Details</Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Description:</strong> {job.description}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Responsibilities:</strong> {job.responsibilities}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Qualifications:</strong> {job.qualifications}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Salary Range:</strong> ${job.salaryMin?.toLocaleString()} - ${job.salaryMax?.toLocaleString()}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Stage:</strong> {job.stage}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Add Candidate Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                startIcon={<Add sx={{ fontSize: 18 }} />}
                onClick={() => setCandidateFormOpen(true)}
              >
                Add Candidate
              </Button>
            </Grid>

            {/* Candidates Table */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Candidates</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>CV</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {job.candidates && job.candidates.length > 0 ? (
                      job.candidates.map((candidate) => (
                        <TableRow key={candidate.id}>
                          <TableCell>{candidate.name}</TableCell>
                          <TableCell>{candidate.email}</TableCell>
                          <TableCell>
                            <Chip 
                              label={candidate.status} 
                              color={getStatusColor(candidate.status)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{candidate.cvFile}</TableCell>
                          <TableCell align="center">
                            <Tooltip title="Reject Candidate">
                              <IconButton 
                                onClick={() => handleRejectCandidate(candidate.id)}
                                color="error"
                              >
                                <Cancel sx={{ fontSize: 18 }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Move to Next Stage">
                              <IconButton 
                                onClick={() => handleMoveToNextStage(candidate.id)}
                                color="primary"
                                disabled={candidate.status === 'Offered'}
                              >
                                <ArrowForward sx={{ fontSize: 18 }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Download CV">
                              <IconButton 
                                onClick={() => handleDownloadCV(candidate.name)}
                                color="success"
                              >
                                <GetApp sx={{ fontSize: 18 }} />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          No candidates added yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Candidate Form Dialog */}
      <Dialog open={candidateFormOpen} onClose={() => setCandidateFormOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Candidate</DialogTitle>
        <DialogContent>
          <CandidateForm onSubmit={handleAddCandidate} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCandidateFormOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default JobViewDialog;