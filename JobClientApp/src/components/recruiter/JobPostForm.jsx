import React, { useState, useEffect } from 'react';
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

const JobPostForm = ({ job, mode, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    responsibilities: '',
    qualifications: '',
    salaryMin: '',
    salaryMax: '',
    stage: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || '',
        description: job.description || '',
        responsibilities: job.responsibilities || '',
        qualifications: job.qualifications || '',
        salaryMin: job.salaryMin || '',
        salaryMax: job.salaryMax || '',
        stage: job.stage || ''
      });
    }
  }, [job]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required';
    }

    if (!formData.responsibilities.trim()) {
      newErrors.responsibilities = 'Responsibilities are required';
    }

    if (!formData.qualifications.trim()) {
      newErrors.qualifications = 'Qualifications are required';
    }

    if (!formData.salaryMin) {
      newErrors.salaryMin = 'Minimum salary is required';
    } else if (isNaN(Number(formData.salaryMin)) || Number(formData.salaryMin) <= 0) {
      newErrors.salaryMin = 'Please enter a valid minimum salary';
    }

    if (!formData.salaryMax) {
      newErrors.salaryMax = 'Maximum salary is required';
    } else if (isNaN(Number(formData.salaryMax)) || Number(formData.salaryMax) <= 0) {
      newErrors.salaryMax = 'Please enter a valid maximum salary';
    } else if (Number(formData.salaryMax) < Number(formData.salaryMin)) {
      newErrors.salaryMax = 'Maximum salary should be greater than minimum salary';
    }

    if (!formData.stage) {
      newErrors.stage = 'Stage is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const submitData = {
        ...formData,
        salaryMin: Number(formData.salaryMin),
        salaryMax: Number(formData.salaryMax)
      };
      onSubmit(submitData);
      if (mode === 'add') {
        // Reset form after successful add
        setFormData({
          title: '',
          description: '',
          responsibilities: '',
          qualifications: '',
          salaryMin: '',
          salaryMax: '',
          stage: ''
        });
      }
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

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Job Title"
            value={formData.title}
            onChange={handleChange('title')}
            error={!!errors.title}
            helperText={errors.title}
            required
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Job Description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange('description')}
            error={!!errors.description}
            helperText={errors.description}
            required
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Responsibilities"
            multiline
            rows={3}
            value={formData.responsibilities}
            onChange={handleChange('responsibilities')}
            error={!!errors.responsibilities}
            helperText={errors.responsibilities}
            required
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Qualifications"
            multiline
            rows={3}
            value={formData.qualifications}
            onChange={handleChange('qualifications')}
            error={!!errors.qualifications}
            helperText={errors.qualifications}
            required
          />
        </Grid>
        
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Minimum Salary"
            type="number"
            value={formData.salaryMin}
            onChange={handleChange('salaryMin')}
            error={!!errors.salaryMin}
            helperText={errors.salaryMin}
            required
          />
        </Grid>
        
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Maximum Salary"
            type="number"
            value={formData.salaryMax}
            onChange={handleChange('salaryMax')}
            error={!!errors.salaryMax}
            helperText={errors.salaryMax}
            required
          />
        </Grid>
        
        <Grid item xs={12}>
          <FormControl fullWidth error={!!errors.stage}>
            <InputLabel>Stage</InputLabel>
            <Select
              value={formData.stage}
              label="Stage"
              onChange={handleChange('stage')}
              required
            >
              <MenuItem value="Screening">Screening</MenuItem>
              <MenuItem value="Technical Interview">Technical Interview</MenuItem>
              <MenuItem value="Final Call">Final Call</MenuItem>
            </Select>
            {errors.stage && (
              <Typography variant="caption" color="error" sx={{ ml: 2 }}>
                {errors.stage}
              </Typography>
            )}
          </FormControl>
        </Grid>
        
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
          >
            {mode === 'add' ? 'Create Job Post' : 'Update Job Post'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobPostForm;