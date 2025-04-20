import User from "../models/user.model.js";
import Claim from "../models/claim.model.js";
import Report from "../models/report.model.js";
// import runMLModel from "../utils/mlModel.js";

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().populate("claimId");
    res.status(200).json({
      success: true,
      message: "Reports fetched successfully",
      data: reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting reports",
      error: error.message,
    });
  }
};

export const getReport = async (req, res) => {
  try {
    const { id } = req.params;

    // this id is claimId based on that search reports and populate claimId
    const report = await Report.findOne({ claimId: id }).populate("claimId");
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Report fetched successfully",
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting report",
      error: error.message,
    });
  }
};

export const createReport = async (req, res) => {
  try {
    const { claimId, claimStatus, remarks } = req.body;
    console.log("Inside createReport Controller ClaimID: ", claimId);
    console.log("Inside createReport Controller claimStatus: ", claimStatus);

    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const claim = await Claim.findById(claimId);
    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    if (claim.fraudPrediction !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Claim is not pending",
      });
    }


    const newReport = await Report.create({
      claimId,
      userId,
      claimStatus,
      remarks
    });

    await User.findByIdAndUpdate(userId, {
      $push: { reports: newReport._id },
    });

    res.status(201).json({
      success: true,
      message: "Report created successfully",
      data: newReport,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating report",
      error: error.message,
    });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    await Report.findByIdAndDelete(id);

    // pull from user reports array
    await User.findByIdAndUpdate(userId, {
      $pull: { reports: id },
    });

    res.status(200).json({
      success: true,
      message: "Report deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting report",
      error: error.message,
    });
  }
};
