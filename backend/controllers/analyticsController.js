import Job from "../models/Job.js";
import Interview from "../models/Interview.js";
import mongoose from "mongoose";

export const getAnalytics = async (req, res) => {
  try {
    const rejectedJobCount = await Job.countDocuments({
      user: req.user.id,
      status: "Reject",
    });
    const offersJobCount = await Job.countDocuments({
      user: req.user.id,
      status: "Offer",
    });
    const interviewJobCount = await Job.countDocuments({
      user: req.user.id,
      status: "Interview",
    });
    const appliedJobCount = await Job.countDocuments({
      user: req.user.id,
      status: "Applied",
    });
    const totalJobsApplied = await Job.countDocuments({ user: req.user.id });
    const totalInterviews = await Interview.countDocuments({
      user: req.user.id,
    });

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const jobsAppliedPerMonth = await Job.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
          status: "Applied",
        },
      },
      {
        $group: {
          _id: { $month: "$appliedDate" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const applicationsByMonth = monthNames.map((month, index) => {
      const found = jobsAppliedPerMonth.find((item) => item._id === index + 1);
      return {
        month,
        count: found ? found.count : 0,
      };
    });
    res.status(200).json({
      rejectedJobCount,
      offersJobCount,
      interviewJobCount,
      appliedJobCount,
      totalJobsApplied,
      totalInterviews,
      applicationsByMonth,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error, cannot get analytics",
      error: error.message,
    });
  }
};
