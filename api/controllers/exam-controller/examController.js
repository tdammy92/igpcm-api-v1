const examModel = require("../../Database/model/examsModel");

// get all exams
async function getExamById(req, res) {
  const id = req?.params?.id;
  try {
    const response = await examModel
      .findById(id)
      .populate({ path: "uploadedBy", select: ["email", "username"] });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

async function getAllExams(req, res) {
  const type = req.query?.type;
  try {
    const response = await examModel
      .find({})
      .populate(type === "full" ? { path: "uploadedBy", select: ["email", "username"] }:null)
      .select("-questions")
      .sort({ createdAt: -1 });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

//upload exams
async function uploadExams(req, res) {
  const payload = await req.body;

  try {
    const exam = new examModel(payload);
    const response = await exam.save();

    if (!response) {
      throw new Error("exam could'nt be uploaded");
    }

    return res.status(201).json({
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong from upload exams",
      error: error,
    });
  }
}

//delete an exam
async function deleteExams(req, res) {
  console.log("deleting exams");

  const ExamId = req.body.examId;
  try {
    //remove the image from MongoDB
    const deleteResponse = await examModel.findOneAndDelete({
      _id: ExamId,
    });
    return res.status(201).json({
      data: "Exam deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Image could not be deleted from catch",
      error: error,
    });
  }
}

module.exports = {getExamById, getAllExams, uploadExams, deleteExams };
