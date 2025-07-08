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

const RecruiterForm = ({ recruiter, mode, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (recruiter) {
      setFormData({
        name: recruiter.name || '',
        email: recruiter.email || '',
        gender: recruiter.gender || '',
        password: ''
      });
    }
  }, [recruiter]);

  const validateForm = () => {
    const newErrors = {};

    // Name validation (no special characters)
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name should not contain special characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    // Password validation (only for add mode or if password is provided)
    if (mode === 'add' || formData.password) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
          newErrors.password = 'Password must be at least 8 characters with 1 uppercase, 1 number, and 1 special character';
        }
        if (/\s/.test(formData.password)) {
          newErrors.password = 'Password should not contain spaces';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
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

  const isReadOnly = mode === 'view';

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
            disabled={isReadOnly}
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
            disabled={isReadOnly}
            required
          />
        </Grid>
        
        <Grid item xs={12}>
          <FormControl fullWidth error={!!errors.gender} disabled={isReadOnly}>
            <InputLabel>Gender</InputLabel>
            <Select
              value={formData.gender}
              label="Gender"
              onChange={handleChange('gender')}
              required
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            {errors.gender && (
              <Typography variant="caption" color="error" sx={{ ml: 2 }}>
                {errors.gender}
              </Typography>
            )}
          </FormControl>
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            type={isReadOnly ? "text" : "password"}
            value={isReadOnly ? "********" : formData.password}
            onChange={handleChange('password')}
            error={!!errors.password}
            helperText={errors.password || (mode === 'edit' ? 'Leave blank to keep current password' : '')}
            disabled={isReadOnly}
            required={mode === 'add'}
          />
        </Grid>
        
        {!isReadOnly && (
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
            >
              {mode === 'add' ? 'Add Recruiter' : 'Update Recruiter'}
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default RecruiterForm;