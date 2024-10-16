const courseModel = require("../../Database/model/courseModel");

// get all results
async function getAllCourses(req, res) {
  // const type = req.query?.type;

  try {
    const response = await courseModel
      .find({})
      .populate({ path: "createdBy", select: ["email", "username"]  })
      .populate({ path:"exams",select: ["examName", "duration","examCode"] })
      // .populate({ path: "exam", select: ["examName", "duration","examCode"] })
      .sort({ createdAt: -1 });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}
// get result
async function getCourseById(req, res) {
  // const type = req.query?.type;
  const courseId = req.params.id;

  // console.log("result ID", resultId);

  try {
    const response = await courseModel
      .findById(courseId)
      .populate({
        path: "exam",
        select: ["examName", "duration", "totalQuestions"],
      })
    // console.log("List  results", JSON.stringify(response, null, 3));

    if (!response) {
      throw new Error("Somthing went wrong");
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

//upload results
async function createCourse(req, res) {
  const payload = await req.body;

  try {
    const result = new courseModel(payload);
    const response = await result.save();

    if (!response) {
      throw new Error("course could'nt be created");
    }

    return res.status(201).json({
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error,
    });
  }
}
//upload results
async function updateCourseName(req, res) {
  
  try {

    const courseId = await req.body?._id;
    const courseTitle = await req.body?.courseTitle;
    const courseDescription = await req.body?.courseDescription;

    const updatedCourseN = await courseModel.updateOne(
      { _id: courseId },
      {courseTitle:courseTitle,courseDescription:courseDescription }
    );


    if (!updatedCourseN) {
      throw new Error("course title could not be updated");
    }

    return res.status(201).json({
      data: updatedCourseN,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error,
    });
  }
}

//delete a result
async function deleteCourseById(req, res) {

  const courseId = req.params.id;


  try {
    //remove the image from MongoDB
    const deleteResponse = await courseModel.findOneAndDelete({
      _id: courseId,
    });


    if (!deleteResponse) {
      throw new Error("Something went wrong");
    }
    return res.status(201).json({
      data: "course deleted",
    });

  } catch (error) {
    return res.status(500).json({
      message: "course could not be deleted",
      error: error,
    });
  }
}

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    deleteCourseById,
    updateCourseName
};
