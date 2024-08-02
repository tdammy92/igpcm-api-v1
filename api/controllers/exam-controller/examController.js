const examModel = require("../../Database/model/examsModel");

// get all exams
async function getAllExams(req, res) {
  const type = req.query?.type;
  try {
    // console.log("Exam is populated", examModel.populated("Admin"));
    const response = await examModel
      .find({})
      .populate({ path: "uploadedBy", select: ["email", "username"] })
      .sort({ createdAt: -1 });


    //filter out answers, send only question to front end
    const exams = response?.map((exam) => ({
      exam_uuid: exam._id,
      name: exam.examName,
      duration: exam.duration,
      createdAt: exam.updatedAt,
      updatedAt: exam.updatedAt,
      ...(type === "full" && { uploadedBy: exam.uploadedBy }),
      questions: exam?.questions?.map((qty) => {
        return {
          question: qty.question,
          options: qty.options,
          question_id: qty._id,
        };
      }),
    }));



    // console.log("List of all exams", JSON.stringify(exams, null, 3));

    return res.status(200).json(exams);
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

module.exports = { getAllExams, uploadExams, deleteExams };
