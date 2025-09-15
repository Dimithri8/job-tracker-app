import Interview from "../models/Interview.js";

export const createInterview = async (req, res) => {
  try {
    const { company, title, date, time, type, status } = req.body;
    const interviewDate = new Date(`${date}T${time}`);
    const existingInterview = await Interview.findOne({
      user: req.user.id,
      title,
      company,
    });
    if (existingInterview)
      return res.status(400).json({ message: "Interview already exist" });

    const interview = await Interview.create({
      user: req.user.id,
      company,
      title,
      interviewDate,
      type,
      status,
    });

    res
      .status(201)
      .json({ message: "Interview added successfully", interview: interview });
  } catch (error) {
    res.status(500).json({
      message: "Server error, cannot create interview",
      error: error.message,
    });
  }
};

export const updateInterview = async (req, res) => {
  try {
    const { company, title, date, time, type, status } = req.body;
    const interviewDate = new Date(`${date}T${time}`);
    const updatedInterview = await Interview.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        company,
        title,
        interviewDate: interviewDate,
        type,
        status,
      },
      { new: true }
    );

    if (!updatedInterview)
      return res.status(404).json({ message: "Unable to find interview" });

    res.status(200).json({
      message: "Interview updated successfully",
      interview: updatedInterview,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error, unable to update interview",
      error: error.message,
    });
  }
};

export const deleteInterview = async (req, res) => {
  try {
    const deletedInterview = await Interview.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deletedInterview)
      return res
        .status(404)
        .json({ message: "Cannot find interview to delete" });

    res.status(200).json({
      message: "Interview deleted successfully",
      interview: deletedInterview,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error, unable to delete interview",
      error: error.message,
    });
  }
};

export const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({ user: req.user.id });
    if (!interviews)
      return res.status(404).json({ message: "You don't have any interviews" });
    res.status(200).json({ interviews });
  } catch (error) {
    res.status(500).json({
      message: "Server error, unable to get interviews",
      error: error.message,
    });
  }
};
