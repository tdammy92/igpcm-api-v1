

async function accessLevel(req, res, next) {
  try {
    const level = await req.heade;

    //check the ID of the user to make sure he is a super admin,


    //if he is grant hin acces




    //if he isnt trow an error


    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized Access",
    });
  }
}

module.exports = accessLevel;