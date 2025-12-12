import React, { useState } from "react";

// Dummy job data with images
const dummyJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "New York",
    type: "Full-Time",
    jobImage: "https://via.placeholder.com/150x80?text=Frontend",
    companyLogo: "https://via.placeholder.com/40?text=TC",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Innovatech",
    location: "San Francisco",
    type: "Part-Time",
    jobImage: "https://via.placeholder.com/150x80?text=Backend",
    companyLogo: "https://via.placeholder.com/40?text=IT",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "DesignPro",
    location: "Remote",
    type: "Contract",
    jobImage: "https://via.placeholder.com/150x80?text=UI/UX",
    companyLogo: "https://via.placeholder.com/40?text=DP",
  },
  {
    id: 4,
    title: "Project Manager",
    company: "BuildIt",
    location: "Chicago",
    type: "Full-Time",
    jobImage: "https://via.placeholder.com/150x80?text=PM",
    companyLogo: "https://via.placeholder.com/40?text=BI",
  },
  {
    id: 5,
    title: "QA Engineer",
    company: "TestLabs",
    location: "Boston",
    type: "Full-Time",
    jobImage: "https://via.placeholder.com/150x80?text=QA",
    companyLogo: "https://via.placeholder.com/40?text=TL",
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "CloudWorks",
    location: "Seattle",
    type: "Full-Time",
    jobImage: "https://via.placeholder.com/150x80?text=DevOps",
    companyLogo: "https://via.placeholder.com/40?text=CW",
  },
  {
    id: 7,
    title: "Data Scientist",
    company: "AI Solutions",
    location: "Austin",
    type: "Remote",
    jobImage: "https://via.placeholder.com/150x80?text=DS",
    companyLogo: "https://via.placeholder.com/40?text=AI",
  },
  {
    id: 8,
    title: "Mobile Developer",
    company: "AppMakers",
    location: "Miami",
    type: "Full-Time",
    jobImage: "https://via.placeholder.com/150x80?text=Mobile",
    companyLogo: "https://via.placeholder.com/40?text=AM",
  },
];

const JobsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;

  const totalPages = Math.ceil(dummyJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = dummyJobs.slice(startIndex, startIndex + jobsPerPage);

  return (
    <div style={{ maxWidth: 900, margin: "20px auto", padding: "0 20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>Job Listings</h1>
      <div>
        {currentJobs.map((job) => (
          <div
            key={job.id}
            style={{
              display: "flex",
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 16,
              marginBottom: 12,
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              alignItems: "center",
              gap: 16,
            }}
          >
            {/* Job Image */}
            <img
              src={job.jobImage}
              alt={job.title}
              style={{ width: 150, height: 80, borderRadius: 8, objectFit: "cover" }}
            />

            {/* Job Details */}
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: 0 }}>{job.title}</h2>
              <p style={{ margin: "4px 0" }}>
                <img
                  src={job.companyLogo}
                  alt={job.company}
                  style={{ width: 24, height: 24, borderRadius: "50%", marginRight: 6 }}
                />
                <strong>{job.company}</strong>
              </p>
              <p style={{ margin: "4px 0" }}>
                <strong>Location:</strong> {job.location}
              </p>
              <p style={{ margin: "4px 0" }}>
                <strong>Type:</strong> {job.type}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{ marginRight: 10 }}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{ marginLeft: 10 }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JobsPage;
