const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Auth
export const login = `${BASE_URL}/api/user/login`;

// Users
export const addRecruiter = `${BASE_URL}/api/user/add-recuriter`;
export const getAllRecruiters = `${BASE_URL}/api/user/get-all`;
export const getRecruitersCount = `${BASE_URL}/api/user/get-user-count`;
export const getUserById = (id) => `${BASE_URL}/api/user/get/${id}`;
export const updateRecruiter = `${BASE_URL}/api/user/update`;
export const patchRecruiter = `${BASE_URL}/api/user/patch`;
export const deleteRecruiter = (id) => `${BASE_URL}/api/user/delete/${id}`;
export const toggleRecruiterStatus = `${BASE_URL}/api/user/update-status`;

// Jobs
export const addJob = `${BASE_URL}/api/job/add`;
export const getAllJobs = `${BASE_URL}/api/job/get-all`;
export const getJobById = (id) => `${BASE_URL}/api/job/get/${id}`;
export const updateJob = `${BASE_URL}/api/job/update`;
export const deleteJob = (id) => `${BASE_URL}/api/job/delete/${id}`;
export const updateJobStatus = `${BASE_URL}/api/job/update-status`;
export const patchJob = `${BASE_URL}/api/job/patch`;

// Candidates
export const addCandidate = `${BASE_URL}/api/candidate/add`;
export const getAllCandidates = (jobId) => `${BASE_URL}/api/candidate/get-all/${jobId}`;
export const getCandidateById = (id) => `${BASE_URL}/api/candidate/get/${id}`;
export const updateCandidate = `${BASE_URL}/api/candidate/update`;
export const deleteCandidate = (id) => `${BASE_URL}/api/candidate/delete/${id}`;
export const patchCandidate = `${BASE_URL}/api/candidate/patch`;
export const promoteCandidate = (id) => `${BASE_URL}/api/candidate/promote/${id}`;
export const rejectCandidate = `${BASE_URL}/api/candidate/reject`;
