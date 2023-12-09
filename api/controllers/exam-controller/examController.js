const examModel = require("../../Database/model/examsModel");

// get all exams
async function getAllExams(req, res) {
  console.log("exam got called");
  try {
    const response = await examModel.find();
    //filter out answers, send only question to front end
    const exams = response?.map((exam) => ({
      exam_uuid: exam._id,
      name: exam.examName,
      duration: exam.duration,
      createdAt: exam.updatedAt,
      updatedAt: exam.updatedAt,
      questions: exam?.questions?.map((qty) => {
        return {
          question: qty.question,
          options: qty.options,
          question_id: qty._id,
        };
      }),
    }));

    console.log("List of all exams", JSON.stringify(exams, null, 3));

    return res.status(200).json({
      exams,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

//upload exams
async function uploadExams(req, res) {
  //   console.log("uploading exams");

  //   const newExam = {
  //     examName: "WASH QUESTION_103335",
  //     duration: 50,
  //     questions: [
  //       {
  //         question:
  //           "What are the four most important human needs in an emergency?",
  //         options: [
  //           "Money, electricity, freedom and health",
  //           "Water, sanitation, food and shelter",
  //           "Air, sleep, water and nutrition",
  //           "Transportation, communication, clothing and food",
  //         ],
  //         answer: "Water, sanitation, food and shelter",
  //       },
  //       {
  //         question:
  //           "What is a potential outcome of a lack of access to basic water and sanitation services?",
  //         options: [
  //           "Increase in food production",
  //           "Water, sanitation, food and shelter",
  //           "Increase in economic growth",
  //           "Reduction in poverty",
  //           "Children are more susceptible to illness and death from diseases",
  //         ],
  //         answer:
  //           "Children are more susceptible to illness and death from diseases",
  //       },
  //     ],
  //   };

  try {
    // const exam = new examModel(newExam);

    // const result = await exam.save();
    return res.status(201).json({
      data: [],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong from catch",
      error: error,
    });
  }
}

//delete an exam
async function deleteExams(req, res) {
  console.log("deleting exams");
  try {
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
