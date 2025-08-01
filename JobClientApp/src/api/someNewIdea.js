const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiEndpoints = [
  // 🔐 Auth
  {
    id: "login",
    url: `${BASE_URL}/api/user/login`,
    payload: {
      userName: "string",
      password: "string"
    }
  },

  // 👥 Users
  {
    id: "addRecruiter",
    url: `${BASE_URL}/api/user/add-recuriter`,
    payload: {
      name: "string",
      email: "string",
      gender: "string",
      password: "string"
    }
  },
  {
    id: "getAllRecruiters",
    url: `${BASE_URL}/api/user/get-all`,
    payload: {}
  },
  {
    id: "getUserById",
    url: (id) => `${BASE_URL}/api/user/get/${id}`,
    payload: {
      id: "number"
    }
  },
  {
    id: "updateRecruiter",
    url: `${BASE_URL}/api/user/update`,
    payload: {
      id: "number",
      name: "string",
      gender: "string",
      password: "string"
    }
  },
  {
    id: "patchRecruiter",
    url: `${BASE_URL}/api/user/patch`,
    payload: {
      id: "number",
      name: "string",
      gender: "string",
      password: "string",
      role: "string"
    }
  },
  {
    id: "deleteRecruiter",
    url: (id) => `${BASE_URL}/api/user/delete/${id}`,
    payload: {
      id: "number"
    }
  },
  {
    id: "toggleRecruiterStatus",
    url: `${BASE_URL}/api/user/update-status`,
    payload: {
      id: "number",
      isActive: "boolean"
    }
  },

  // 💼 Jobs
  {
    id: "addJob",
    url: `${BASE_URL}/api/job/add`,
    payload: {
      jobName: "string",
      jobDescription: "string",
      jobResponsibilities: "string",
      jobQualifications: "string",
      minimumSalary: "number",
      maximumSalary: "number",
      interviewStages: "number",
      startDate: "datetime",
      lastDate: "datetime"
    }
  },
  {
    id: "getAllJobs",
    url: `${BASE_URL}/api/job/get-all`,
    payload: {}
  },
  {
    id: "getJobById",
    url: (id) => `${BASE_URL}/api/job/get/${id}`,
    payload: {
      id: "number"
    }
  },
  {
    id: "updateJob",
    url: `${BASE_URL}/api/job/update`,
    payload: {
      id: "number",
      jobName: "string",
      jobDescription: "string",
      jobResponsibilities: "string",
      jobQualifications: "string",
      minimumSalary: "number",
      maximumSalary: "number",
      interviewStages: "number",
      startDate: "datetime",
      lastDate: "datetime"
    }
  },
  {
    id: "patchJob",
    url: `${BASE_URL}/api/job/patch`,
    payload: {
      id: "number",
      jobName: "string",
      jobDescription: "string",
      jobResponsibilities: "string",
      jobQualifications: "string",
      minimumSalary: "number",
      maximumSalary: "number",
      interviewStages: "number",
      startDate: "datetime",
      lastDate: "datetime"
    }
  },
  {
    id: "updateJobStatus",
    url: `${BASE_URL}/api/job/update-status`,
    payload: {
      id: "number",
      isActive: "boolean"
    }
  },
  {
    id: "deleteJob",
    url: (id) => `${BASE_URL}/api/job/delete/${id}`,
    payload: {
      id: "number"
    }
  },

  // 👤 Candidates
  {
    id: "addCandidate",
    url: `${BASE_URL}/api/candidate/add`,
    payload: {
      jobId: "number",
      name: "string",
      email: "string",
      resumeBase64: "string"
    }
  },
  {
    id: "getAllCandidates",
    url: (jobId) => `${BASE_URL}/api/candidate/get-all/${jobId}`,
    payload: {
      jobId: "number"
    }
  },
  {
    id: "getCandidateById",
    url: (id) => `${BASE_URL}/api/candidate/get/${id}`,
    payload: {
      id: "number"
    }
  },
  {
    id: "updateCandidate",
    url: `${BASE_URL}/api/candidate/update`,
    payload: {
      id: "number",
      name: "string",
      email: "string",
      resumeBase64: "string"
    }
  },
  {
    id: "patchCandidate",
    url: `${BASE_URL}/api/candidate/patch`,
    payload: {
      id: "number",
      name: "string",
      email: "string",
      resumeBase64: "string",
      interviewStage: "number"
    }
  },
  {
    id: "promoteCandidate",
    url: (id) => `${BASE_URL}/api/candidate/promote/${id}`,
    payload: {
      candidateId: "number"
    }
  },
  {
    id: "rejectCandidate",
    url: `${BASE_URL}/api/candidate/reject`,
    payload: {
      id: "number",
      reasonForRejection: "string"
    }
  },
  {
    id: "deleteCandidate",
    url: (id) => `${BASE_URL}/api/candidate/delete/${id}`,
    payload: {
      id: "number"
    }
  }
];
