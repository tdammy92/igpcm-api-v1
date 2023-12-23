const resultModel = require("../../Database/model/resultModel");

// get all results
async function getResults(req, res) {
  const type = req.query?.type;

  try {
    const response = await resultModel
      .find({})
      .populate({ path: "uploadedBy", select: ["email", "username"] })
      .sort({ createdAt: -1 });

    console.log("List of all results", JSON.stringify(response, null, 3));

    return res.status(200).json(exams);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}
// get result
async function getResult(req, res) {
  const type = req.query?.type;

  try {
    const response = await resultModel
      .find({ _id: "" })
      .populate({ path: "uploadedBy", select: ["email", "username"] })
      .sort({ createdAt: -1 });

    console.log("List of all results", JSON.stringify(response, null, 3));

    return res.status(200).json(exams);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

//upload results
async function UploadResult(req, res) {
  const payload = await req.body;

  try {
    const result = new resultModel(payload);
    const response = await result.save();

    if (!response) {
      throw new Error("result could'nt be uploaded");
    }

    return res.status(201).json({
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong from upload results",
      error: error,
    });
  }
}

//delete a result
async function deleteResult(req, res) {
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

module.exports = { getResults, getResult, UploadResult, deleteResult };
