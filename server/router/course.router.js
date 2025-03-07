const express = require("express")
const multiparty = require("connect-multiparty")
const CourseController = require("../controllers/course.controller")
const md_auth = require("../middlewares/authenticated")
const md_upload = multiparty({ uploadDir: "./uploads/course"})


const api = express.Router()

api.post("/course", [md_auth.asureAuth, md_upload], CourseController.createCourse)
api.get("/course",  CourseController.getCourse)
api.patch("/course/:id",[md_auth.asureAuth, md_upload],  CourseController.updateCourse)
api.delete("/course/:id",[md_auth.asureAuth],  CourseController.deleteCourse)


module.exports = api