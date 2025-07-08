// API Service for handling all API calls
// All endpoints are mocked with hardcoded data

const API_BASE_URL = 'https://api.volmatica.com'; // Mock base URL

// Authentication endpoints
export const authAPI = {
  login: async (email, password) => {
    // Mock API call - commented out actual implementation
    // const response = await fetch(`${API_BASE_URL}/auth/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password })
    // });
    // return response.json();
    
    // Hardcoded response for demo
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@volmatica.com' && password === 'Admin@111') {
          resolve({
            username: 'System Administrator',
            token: 'admin_jwt_token_123',
            role: 'SystemAdmin'
          });
        } else if (email === 'Ibad@Volmatica.com' && password === 'Ibad@111') {
          resolve({
            username: 'Ibad Ahmed',
            token: 'recruiter_jwt_token_456',
            role: 'Recruiter'
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  changePassword: async (currentPassword, newPassword, token) => {
    // Mock API call
    // const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
    //   method: 'POST',
    //   headers: { 
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify({ currentPassword, newPassword })
    // });
    // return response.json();

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Password changed successfully' });
      }, 1000);
    });
  }
};

// Recruiter management endpoints
export const recruiterAPI = {
  getAllRecruiters: async (token) => {
    // Mock API call
    // const response = await fetch(`${API_BASE_URL}/recruiters`, {
    //   headers: { 'Authorization': `Bearer ${token}` }
    // });
    // return response.json();

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { id: 1, name: 'John Smith', email: 'john@volmatica.com', status: 'Active' },
            { id: 2, name: 'Sarah Johnson', email: 'sarah@volmatica.com', status: 'Active' }
          ]
        });
      }, 1000);
    });
  },

  createRecruiter: async (recruiterData, token) => {
    // Mock API call
    // const response = await fetch(`${API_BASE_URL}/recruiters`, {
    //   method: 'POST',
    //   headers: { 
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify(recruiterData)
    // });
    // return response.json();

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Recruiter created successfully',
          data: { id: Date.now(), ...recruiterData }
        });
      }, 1000);
    });
  },

  updateRecruiter: async (recruiterId, recruiterData, token) => {
    // Mock API call
    // const response = await fetch(`${API_BASE_URL}/recruiters/${recruiterId}`, {
    //   method: 'PUT',
    //   headers: { 
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify(recruiterData)
    // });
    // return response.json();

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Recruiter updated successfully',
          data: { id: recruiterId, ...recruiterData }
        });
      }, 1000);
    });
  },

  deleteRecruiter: async (recruiterId, token) => {
    // Mock API call
    // const response = await fetch(`${API_BASE_URL}/recruiters/${recruiterId}`, {
    //   method: 'DELETE',
    //   headers: { 'Authorization': `Bearer ${token}` }
    // });
    // return response.json();

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Recruiter deleted successfully'
        });
      }, 1000);
    });
  }
};

// Job posts management endpoints
export const jobAPI = {
  getAllJobPosts: async (token) => {
    // Mock API call
    // const response = await fetch(`${API_BASE_URL}/job-posts`, {
    //   headers: { 'Authorization': `Bearer ${token}` }
    // });
    // return response.json();

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            { 
              id: 1, 
              title: 'Senior Developer', 
              status: 'Active', 
              totalCandidates: 5,
              salaryMin: 80000,
              salaryMax: 120000
            }
          ]
        });
      }, 1000);
    });
  },

  createJobPost: async (jobData, token) => {
    // Mock API call
    // const response = await fetch(`${API_BASE_URL}/job-posts`, {
    //   method: 'POST',
    //   headers: { 
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify(jobData)
    // });
    // return response.json();

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Job post created successfully',
          data: { id: Date.now(), ...jobData }
        });
      }, 1000);
    });
  },

  updateJobPost: async (jobId, jobData, token) => {
    // Mock API call similar to create
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Job post updated successfully',
          data: { id: jobId, ...jobData }
        });
      }, 1000);
    });
  },

  deleteJobPost: async (jobId, token) => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Job post deleted successfully'
        });
      }, 1000);
    });
  }
};

// Candidate management endpoints
export const candidateAPI = {
  addCandidate: async (jobId, candidateData, token) => {
    // Mock API call
    // const response = await fetch(`${API_BASE_URL}/job-posts/${jobId}/candidates`, {
    //   method: 'POST',
    //   headers: { 
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify(candidateData)
    // });
    // return response.json();

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Candidate added successfully',
          data: { id: Date.now(), ...candidateData }
        });
      }, 1000);
    });
  },

  updateCandidateStatus: async (candidateId, status, token) => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Candidate status updated successfully'
        });
      }, 1000);
    });
  },

  removeCandidate: async (candidateId, token) => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Candidate removed successfully'
        });
      }, 1000);
    });
  }
};

export default {
  authAPI,
  recruiterAPI,
  jobAPI,
  candidateAPI
};