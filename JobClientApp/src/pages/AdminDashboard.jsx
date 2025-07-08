import React, { useState } from 'react';
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
import { useToast } from '../contexts/ToastContext';
import RecruiterForm from '../components/admin/RecruiterForm';
import { recruitersData } from '../data/mockData';

const AdminDashboard = () => {
  const { showToast } = useToast();
  const [recruiters, setRecruiters] = useState(recruitersData);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [formMode, setFormMode] = useState('add'); // 'add', 'view', 'edit'

  const totalRecruiters = recruiters.length;
  const activeRecruiters = recruiters.filter(r => r.status === 'Active').length;

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

  const handleDeleteRecruiter = (recruiterId) => {
    setRecruiters(prev => prev.filter(r => r.id !== recruiterId));
    showToast('Recruiter deleted successfully', 'success');
  };

  const handleToggleStatus = (recruiterId) => {
    setRecruiters(prev => prev.map(r => 
      r.id === recruiterId 
        ? { ...r, status: r.status === 'Active' ? 'Inactive' : 'Active' }
        : r
    ));
    showToast('Recruiter status updated successfully', 'success');
  };

  const handleFormSubmit = (formData) => {
    if (formMode === 'add') {
      const newRecruiter = {
        id: Date.now(),
        ...formData,
        status: 'Active'
      };
      setRecruiters(prev => [...prev, newRecruiter]);
      showToast('Recruiter added successfully', 'success');
    } else if (formMode === 'edit') {
      setRecruiters(prev => prev.map(r => 
        r.id === selectedRecruiter.id ? { ...r, ...formData } : r
      ));
      showToast('Recruiter updated successfully', 'success');
    }
    setFormOpen(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        System Administrator Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Person sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    {totalRecruiters}
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
                    {activeRecruiters}
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

      {/* Action Buttons */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          startIcon={<Add sx={{ fontSize: 18 }} />}
          onClick={handleAddRecruiter}
        >
          Add Recruiter
        </Button>
        <Button
          variant="outlined"
          startIcon={<Visibility sx={{ fontSize: 18 }} />}
          onClick={() => {/* View All functionality already shown in table */}}
        >
          View All Recruiters
        </Button>
      </Box>

      {/* Recruiters Table */}
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
            {recruiters.map((recruiter) => (
              <TableRow key={recruiter.id}>
                <TableCell>{recruiter.name}</TableCell>
                <TableCell>{recruiter.email}</TableCell>
                <TableCell>{recruiter.gender}</TableCell>
                <TableCell>
                  <Switch
                    checked={recruiter.status === 'Active'}
                    onChange={() => handleToggleStatus(recruiter.id)}
                    color="primary"
                  />
                  {recruiter.status}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="View">
                    <IconButton onClick={() => handleViewRecruiter(recruiter)}>
                      <Visibility sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleEditRecruiter(recruiter)}>
                      <Edit sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDeleteRecruiter(recruiter.id)}>
                      <Delete sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Recruiter Form Dialog */}
      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {formMode === 'add' ? 'Add New Recruiter' : 
           formMode === 'edit' ? 'Edit Recruiter' : 'View Recruiter'}
        </DialogTitle>
        <DialogContent>
          <RecruiterForm
            recruiter={selectedRecruiter}
            mode={formMode}
            onSubmit={handleFormSubmit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;