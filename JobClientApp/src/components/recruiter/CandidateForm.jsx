import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

const CandidateForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: '',
    cvFile: null
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    if (!formData.cvFile) {
      newErrors.cvFile = 'CV file is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        cvFile: formData.cvFile ? formData.cvFile.name : 'No file selected'
      });
      // Reset form
      setFormData({
        name: '',
        email: '',
        status: '',
        cvFile: null
      });
    }
  };

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData(prev => ({
      ...prev,
      cvFile: file
    }));
    if (errors.cvFile) {
      setErrors(prev => ({
        ...prev,
        cvFile: ''
      }));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={handleChange('name')}
            error={!!errors.name}
            helperText={errors.name}
            required
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            error={!!errors.email}
            helperText={errors.email}
            required
          />
        </Grid>
        
        <Grid item xs={12}>
          <FormControl fullWidth error={!!errors.status}>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              label="Status"
              onChange={handleChange('status')}
              required
            >
              <MenuItem value="Screening">Screening</MenuItem>
              <MenuItem value="Technical Interview">Technical Interview</MenuItem>
              <MenuItem value="Final Call">Final Call</MenuItem>
              <MenuItem value="Offered">Offered</MenuItem>
            </Select>
            {errors.status && (
              <Typography variant="caption" color="error" sx={{ ml: 2 }}>
                {errors.status}
              </Typography>
            )}
          </FormControl>
        </Grid>
        
        <Grid item xs={12}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUpload sx={{ fontSize: 18 }} />}
            fullWidth
            sx={{ 
              height: 56, 
              borderStyle: errors.cvFile ? 'solid' : 'dashed',
              borderColor: errors.cvFile ? 'error.main' : 'primary.main'
            }}
          >
            {formData.cvFile ? formData.cvFile.name : 'Upload CV'}
            <input
              type="file"
              hidden
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
          </Button>
          {errors.cvFile && (
            <Typography variant="caption" color="error" sx={{ ml: 2 }}>
              {errors.cvFile}
            </Typography>
          )}
        </Grid>
        
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
          >
            Add Candidate
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CandidateForm;