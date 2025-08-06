// AllJobs.jsx

import { useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, Switch, FormControlLabel } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import JobCard from "../components/recruiter/JobCard.jsx";
import JobTable from "../components/recruiter/JobTable.jsx";
import JobForm from "../components/recruiter/JobPostForm.jsx";
import { getAllJobs, deleteJob } from "../api/apiEndpoints";
import { createLoadingManager } from '../utils/loadingUtils';
import authApiService from '../api/authApiService';
import { useLoading } from '../contexts/LoadingContext';


const AllJobs = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isCardView, setIsCardView] = useState(true);
  const { setLoading, isLoading } = useLoading();
  const loadingManager = createLoadingManager(setLoading, isLoading);




  const fetchJobs = async () => {
    await loadingManager.execute(
      'fetchJobs',
      () => authApiService.get(getAllJobs),
      (data) => setJobPosts(data),
      (error) => console.error('Failed to fetch jobs:', error)
    );
  };

  useEffect(() => {
    fetchJobs();
  }, []);



  const handleAdd = () => {
    setSelectedJob(null);
    setOpenDialog(true);
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleView = (job) => {
    alert(`Viewing job: ${job.title}`); // Placeholder
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedJob(null);
    fetchJobs();
  };

  return (
    <>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Work sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 600, color: 'success.main' }}>
                    {activeJobPosts}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    Active Job Posts
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Work sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    {totalJobPosts}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    All Job Posts
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonAdd sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 600, color: 'warning.main' }}>
                    {offeredCandidates}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    Offered Candidates
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
            Add New Job
          </Button>
          <FormControlLabel
            control={<Switch checked={isCardView} onChange={() => setIsCardView(!isCardView)} />}
            label={isCardView ? "Card View" : "Table View"}
          />
        </div>

        {isCardView ? (
          <JobCard jobPosts={jobPosts} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Job Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Stage</TableCell>
                <TableCell>Total Candidates</TableCell>
                <TableCell>Salary Range</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobPosts.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{job.jobName}</TableCell>
                  <TableCell>
                    <Switch
                      checked={job.isActive}
                     // onChange={() => handleToggleJobStatus(job.id)}
                      color="primary"
                      disabled={isLoading('toggleJobStatus')}
                    />
                    {job.isActive}
                  </TableCell>
                  <TableCell>{job.interviewStage}</TableCell>
                  <TableCell>{getTotalCandidates(job)}</TableCell>
                  <TableCell>${job.minimumSalary?.toLocaleString()} - ${job.maximumSalary?.toLocaleString()}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View">
                      <IconButton onClick={() => handleViewJob(job)}>
                        <Visibility sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEditJob(job)}>
                        <Edit sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => handleDeleteJob(job.id)}
                        disabled={isLoading('deleteJob')}
                      >
                        <Delete sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
          <DialogTitle>{selectedJob ? "Edit Job" : "Add Job"}</DialogTitle>
          <DialogContent>
            <JobForm job={selectedJob} onClose={handleCloseDialog} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AllJobs;
