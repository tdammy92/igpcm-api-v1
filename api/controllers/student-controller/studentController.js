const studentModel = require('../../Database/model/studentModel');






// get all student route
async function getAllStudent(req,res) {
    // console.log("this code ran");
    
    try {
        // const response = await  studentModel.find({}).populate('user');
        const response = await  studentModel.find({});
    
        
    
        // const notes = response.map((note)=>{
        // 	return {...note,user:{password:undefined,token:undefined}}
        // })
        
        return res.send(response)
        
    } catch (error) {
       return res.status(500).json({
        message:'Somthing went wrong'
       })
    }

    }


    //student registration controller
    async function studentRegistration(req,res) {
        const payload = await req.body;
    
        // console.log(payload);
    
        const newStudent = new studentModel(payload);
    
        newStudent.save().then((createdStudent) => {
    
            // console.log(createdShippment);
            res.json({
                data: createdStudent,
            });
        });
    }



    //delete student controller
    async function deleteStudent(req,res) {
        const Id = req.params.id;
    
        studentModel.findByIdAndDelete(Id, (err, shippment) => {
            if (err) {
                return res.status(404).json({
                    message: err,
                });
            }
    
            return res.json({
                data: shippment,
                message:'shippment deleted successfully'
            });
        });
    }




    module.exports = {
        getAllStudent,studentRegistration,deleteStudent
    }