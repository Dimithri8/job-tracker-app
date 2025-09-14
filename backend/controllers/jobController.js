import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  try {
    const { company, title, date, time, type, status } = req.body;
    const interviewDate = new Date(`${date}T${time}`);

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
      interviewDate,
      type,
      status,
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
