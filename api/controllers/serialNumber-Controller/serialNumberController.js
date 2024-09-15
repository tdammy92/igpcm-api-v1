const serialNumberModel = require("../../Database/model/serialnumberModel");
const { PAGE_LIMIT } = require("../../utils");
const genrateSerial = require("../../utils/getSerialNumber");

// get all serial number
async function getAllserialNumber(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || PAGE_LIMIT;

  try {
    const startIndex = (page - 1) * limit;
    const total = await serialNumberModel.countDocuments();

    const result = await serialNumberModel
      .find({})
      .populate("user")
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    const response = {
      page: result,
      meta: {
        currentPage: page,
        pageLimit: limit,
        total: total,
        totalPages: Math.ceil(total / limit),
      },
    };

    return res.send(response);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

// get total student count
async function getTotalSerialNumberCount(req, res) {
  try {
    const response = await serialNumberModel.estimatedDocumentCount();

    if (response) {
      return res.status(200).json({
        count: response,
      });
    } else {
      return res.status(401).json({
        Count: Nil,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

//genrate serial number
async function generateSerialNumber(req, res) {
  // const payload = await req.body;

  const newSerial = {
    serial: genrateSerial(),
    isValid: true,
    // dateGenerated: '',
    dateUsed: "",
    // user:{}
  };

  try {
    const serial = new serialNumberModel(newSerial);

    serial.save().then((newSerial) => {
      res.status(201).json(newSerial);
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
}

//update serial number
async function updateSerialNumber(req, res) {
  const Id = req.params.id;

  serialNumberModel.findByIdAndDelete(Id, (err, shippment) => {
    if (err) {
      return res.status(404).json({
        message: err,
      });
    }

    return res.json({
      data: shippment,
      message: "shippment deleted successfully",
    });
  });
}
//update serial number
async function validateSerialNumber(req, res) {
  try {
    const querySerial = req.query?.serial;

    const query = serialNumberModel.where({ serial: querySerial });

    const response = await query.findOne();

    if (response?.isValid) {
      res.status(200).json({ isValid: response?.isValid });
    } else {
      res.status(200).json({ isValid: false });
    }
  } catch (error) {
    return res.status(500).json({
      message:"Something went wrong",
      error:error,
    })
  }

}

module.exports = {
  getAllserialNumber,
  generateSerialNumber,
  getTotalSerialNumberCount,
  updateSerialNumber,
  validateSerialNumber,
};
