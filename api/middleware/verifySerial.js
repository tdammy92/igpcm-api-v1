const serialNumberModel = require("../Database/model/serialnumberModel");

async function verifySerial(req, res, next) {
  const serial = await req.body.serialNumber;

  try {
    // const response = await  studentModel.find({}).populate('user');
    // const response = await  serialNumberModel.find({});

    const response = await serialNumberModel.findOne({ serial: serial });

    if (!response) {
      throw new Error("Invalid Serial Number");
    }

    const serialId = response?._id;

    if (response.isValid) {
      req.body = { ...req.body, serialNumber: serialId };

      return next();
    }
  } catch (error) {
    return res.status(406).json({
      status: "failed",
      message: typeof error === "string" ? error : error?.message,
    });
  }
}

module.exports = verifySerial;
