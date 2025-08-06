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
} from '@mui/material';
import {
  Add,
  Visibility,
  Edit,
  Delete,
  Person,
  PersonAdd,
} from '@mui/icons-material';
import RecruiterForm from '../components/admin/RecruiterForm';
import authApiService from '../api/authApiService';
import {
  addRecruiter,
  getAllRecruiters,
  getRecruitersCount,
  updateRecruiter,
  deleteRecruiter,
  toggleRecruiterStatus,
} from '../api/apiEndpoints';
import { useLoading } from '../contexts/LoadingContext';
import { LoadingButton, LoadingWrapper, LoadingSkeleton } from '../components/common';
import { createLoadingManager } from '../utils/loadingUtils';

const AdminDashboard = () => {
  const { setLoading, isLoading } = useLoading();
  const loadingManager = createLoadingManager(setLoading, isLoading);
  const [recruiters, setRecruiters] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [formMode, setFormMode] = useState('add'); // 'add', 'view', 'edit'
  const [recruiterCounts, setRecruiterCounts] = useState({
    total: 0,
    active: 0,
  });

  const fetchRecruiterCounts = async () => {
    await loadingManager.execute(
      'fetchCounts',
      () => authApiService.get(getRecruitersCount),
      (data) => setRecruiterCounts(data),
      (error) => console.error('Failed to fetch recruiter counts:', error)
    );
  };

  const fetchRecruiters = async () => {
    await loadingManager.execute(
      'fetchRecruiters',
      () => authApiService.get(getAllRecruiters),
      (data) => setRecruiters(data),
      (error) => console.error('Failed to fetch recruiters:', error)
    );
  };

  useEffect(() => {
    fetchRecruiterCounts();
    fetchRecruiters();
  }, []);

  const handleAddRecruiter = () => {
    setSelectedRecruiter(null);
    setFormMode('add');
    setFormOpen(true);
  };

  const handleViewRecruiter = (recruiter) => {
    setSelectedRecruiter(recruiter);
    setFormMode('view');
    setFormOpen(true);
  };

  const handleEditRecruiter = (recruiter) => {
    setSelectedRecruiter(recruiter);
    setFormMode('edit');
    setFormOpen(true);
  };

  const handleDeleteRecruiter = async (id) => {
    await loadingManager.execute(
      'deleteRecruiter',
      async () => {
        const endpoint = deleteRecruiter(id);
        return await authApiService.delete(endpoint);
      },
      async (success) => {
        if (success) {
          await fetchRecruiters();
          await fetchRecruiterCounts();
        }
      },
      (error) => console.error('Failed to delete recruiter:', error)
    );
  };

  const handleToggleStatus = async (recruiter) => {
    await loadingManager.execute(
      'toggleStatus',
      async () => {
        const updatedRecruiter = {
          id: recruiter.id,
          isActive: !recruiter.isActive 
        };
        return await authApiService.patch(toggleRecruiterStatus, updatedRecruiter);
      },
      async (success) => {
        if (success) {
          await fetchRecruiters();
          await fetchRecruiterCounts();
        }
      },
      (error) => console.error('Failed to toggle status:', error)
    );
  };

  const handleFormSubmit = async (formData) => {
    if (formMode === 'add') {
      await loadingManager.execute(
        'addRecruiter',
        () => authApiService.post(addRecruiter, formData),
        async (success) => {
          if (success) {
            await fetchRecruiters();
            setFormOpen(false);
          }
        },
        (error) => console.error('Failed to add recruiter:', error)
      );
    } else if (formMode === 'edit') {
      await loadingManager.execute(
        'updateRecruiter',
        async () => {
          const payload = {
            id: selectedRecruiter.id,
            ...formData
          };
          return await authApiService.put(updateRecruiter, payload);
        },
        async (success) => {
          if (success) {
            await fetchRecruiters();
            await fetchRecruiterCounts();
            setFormOpen(false);
          }
        },
        (error) => console.error('Failed to update recruiter:', error)
      );
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        System Administrator Dashboard
      </Typography>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Person sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    {recruiterCounts.total}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    Total Recruiters
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonAdd sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 600, color: 'success.main' }}>
                    {recruiterCounts.active}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    Active Recruiters
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Buttons */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <LoadingButton 
          variant="contained" 
          startIcon={<Add />} 
          onClick={handleAddRecruiter}
          loading={isLoading('addRecruiter')}
          loadingText="Adding..."
        >
          Add Recruiter
        </LoadingButton>
      </Box>

      {/* Table */}
      <LoadingWrapper
        loading={isLoading('fetchRecruiters')}
        message="Loading recruiters..."
        skeleton={true}
        skeletonProps={{ variant: 'table', count: 5 }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recruiters.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.email}</TableCell>
                  <TableCell>{r.gender}</TableCell>
                  <TableCell>
                    <Switch
                      checked={r.isActive}
                      onChange={() => handleToggleStatus(r)}
                      color="primary"
                      disabled={isLoading('toggleStatus')}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View">
                      <IconButton onClick={() => handleViewRecruiter(r)}>
                        <Visibility sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEditRecruiter(r)}>
                        <Edit sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton 
                        onClick={() => handleDeleteRecruiter(r.id)}
                        disabled={isLoading('deleteRecruiter')}
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
      </LoadingWrapper>

      {/* Form Dialog */}
      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {formMode === 'add' ? 'Add Recruiter' : formMode === 'edit' ? 'Edit Recruiter' : 'View Recruiter'}
        </DialogTitle>
        <DialogContent>
          <RecruiterForm recruiter={selectedRecruiter} mode={formMode} onSubmit={handleFormSubmit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
