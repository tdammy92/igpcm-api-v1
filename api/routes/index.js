const adminRouter = require("./Admin-route/adminRoute");
const studentRouter = require("./Student-route/studentRoute");
const serialNumberRoute = require("./SerialNumber-route/serialNumberRoute");
const galleryRouter = require("./gallery-route/galleryRoute");
const examRouter = require("./exam-route/examRoute");
const resultRouter = require("./result-route/resultRoute");
const authRouter = require("./auth-route/authRoute");
const courseRouter = require('./course-route')
const certificateRouter = require('./ceritificate-route')

module.exports = {
  authRouter,
  adminRouter,
  studentRouter,
  serialNumberRoute,
  galleryRouter,
  examRouter,
  resultRouter,
  courseRouter,
  certificateRouter
};
