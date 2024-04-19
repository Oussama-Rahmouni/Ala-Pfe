import courseModel from "../models/courseModel.js";
import trainerModel from "../models/trainerModel.js";

class CourseController{
    static async createCourse(req,res){
        try {
            const {id} = req.user;
            const newCourse = await courseModel.create(req.body);
            const Trainer = await trainerModel.findById(req.body.trainer);
            Trainer.coursesTeaching.push(newCourse._id);
            res.status(200).json({course: newCourse});
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }
}

export default CourseController;