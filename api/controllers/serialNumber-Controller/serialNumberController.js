const serialNumberModel = require('../../Database/model/serialnumberModel');
const genrateSerial = require('../../utils/getSerialNumber')






// get all serial number
async function getAllserialNumber(req,res) {
    // console.log("this code ran");
    
    try {
        // const response = await  studentModel.find({}).populate('user');
        const response = await  serialNumberModel.find({}).populate('user');
    
        
    
        // const notes = response.map((note)=>{
        // 	return {...note,user:{password:undefined,token:undefined}}
        // })
        
        return res.send(response.reverse())
        
    } catch (error) {
       return res.status(500).json({
        message:'Somthing went wrong'
       })
    }

    }


    //genrate serial number
    async function generateSerialNumber(req,res) {
        // const payload = await req.body;


        const newSerial = {
            
            serial: genrateSerial(),
            isValid:true,
            // dateGenerated: '',
            dateUsed:'',
            // user:{}
        }
       


        try {
            const serial = new serialNumberModel(newSerial);
    
            serial.save().then((newSerial) => {

            res.json({
                data: newSerial,
            });
        }); 
        } catch (error) {
            return res.status(500).json({
                message:error
               })
        }
    

    
       
    }



    //update serial number
    async function updateSerialNumber(req,res) {
        const Id = req.params.id;
    
        serialNumberModel.findByIdAndDelete(Id, (err, shippment) => {
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
        getAllserialNumber,generateSerialNumber,updateSerialNumber
    }