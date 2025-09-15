import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  try {
    const { company, title, date, type, status, location, notes } = req.body;

    const existingJob = await Job.findOne({
      user: req.user.id,
      title,
      company,
    });
    if (existingJob)
      return res.status(400).json({ message: "Job application already exist" });

    const job = await Job.create({
      user: req.user.id,
      title,
      company,
      appliedDate: date,
      type,
      status,
      location,
      notes,
    });
    res.status(201).json({
      message: "Job application created successfully",
      job: job,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error, couldn't creat job application",
      error: error.message,
    });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id });
    res.send(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Server error, couldn't get jobs",
      error: error.message,
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { company, title, date, type, status, location, notes } = req.body;

    const updatedJob = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { company, title, appliedDate: date, type, status, location, notes },
      { new: true }
    );
    if (!updatedJob) return res.status(404).json({ message: "No job found" });
    res
      .status(200)
      .json({ message: "Job application updated", job: updatedJob });
  } catch (error) {
    res.status(500).json({
      message: "Server error, cannot update job application",
      error: error.message,
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deletedJob)
      return res.status(404).json({ message: "Job cannot be found" });
    res.status(200).json({ message: "Job deleted", job: deletedJob });
  } catch (error) {
    res.status(500).json({
      message: "Server error, cannot delete job",
      error: error.message,
    });
  }
};
