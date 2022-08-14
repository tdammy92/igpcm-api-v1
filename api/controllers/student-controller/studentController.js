const studentModel = require("../../Database/model/studentModel");

const serialNumberModel = require("../../Database/model/serialnumberModel");

// get all student route
async function getAllStudent(req, res) {
	// console.log("this code ran");

	try {
		// const response = await  studentModel.find({}).populate('user');
		const response = await studentModel.find({});

		// const notes = response.map((note)=>{
		// 	return {...note,user:{password:undefined,token:undefined}}
		// })

		return res.send(response?.reverse());
	} catch (error) {
		return res.status(500).json({
			message: "Somthing went wrong",
		});
	}
}



// get all student route
async function getRecentStudent(req, res) {

	try {
		// const response = await  studentModel.find({}).populate('user');
		const response = await studentModel.find({});

		const recent = response?.reverse().slice(0,5)

		return res.send(recent);
	} catch (error) {
		return res.status(500).json({
			message: "Somthing went wrong",
		});
	}
}

//get student by Id


async function getStudentById(req,res) {
	const id = req.params.id;

	try {
		studentModel.findById(id, function (err, student) {

			if (err) {
				return res.status(400).json({
					status: "failure",
					message: "Somthing went wrong",
				});
			}else{
				return res.send(student);
			}
		})
	} catch (error) {
		console.log({ error });
		return res.status(400).json({
			status: "failure",
			message: "Somthing went wrong",
		});
	}
	
}



async function studentRegistration(req, res) {
	const payload = req.body;

	try {
		const newStudent = new studentModel(payload);

		newStudent.save((err, result) => {
			if (err) {
				console.log(err);
				return res.status(400).json({
					status: "failed",
					message: err,
					// message:"User already exist"
				});
			}

			if (result) {
				serialNumberModel.updateOne(
					{ _id: result?.serialNumber },
					{ isValid: false, user: result?._id ,dateUsed:Date.now()},
					(err, temp) => {
						if (err) {
							return res.status(404).json(err);
						}else{
                            return res.status(201).json(result);
                        }

                    
					}
				);
				// return res.status(201).json(result);
			}
		});

		// .then((createdStudent) => {

		//         res.json({
		//             data: createdStudent,
		//         });
		//     })
		//     .catch((err=>{

		//         if (err.code===11000) {
		//             return res.status(400).json({
		//                 status:'failed',
		//                 message:"User already exist"
		//                })

		//         }
		//     }));
	} catch (error) {
		console.log({ error });
		return res.status(400).json({
			status: "failure",
			message: "user registration failed",
		});
	}
}



//delete student controller
async function deleteStudent(req, res) {
	const Id = req.params.id;

	studentModel.findByIdAndDelete(Id, (err, newStudent) => {
		if (err) {
			return res.status(404).json({
				message: err,
			});
		}

		return res.json({
			data: newStudent,
			message: "student deleted successfully",
		});
	});
}

module.exports = {
	getAllStudent,
	getRecentStudent,
	getStudentById,
	studentRegistration,
	deleteStudent,
};
