import courseModel from "../models/courseModel.js";
import trainerModel from "../models/trainerModel.js";
import learnerModel from "../models/learnerModel.js";

class CourseController{
    static async createCourse(req,res){
        try {
            const newCourse = await courseModel.create(req.body);
            const Trainer = await trainerModel.findById(req.body.trainer);
            Trainer.coursesTeaching.push(newCourse._id);
            res.status(200).json({course: newCourse});
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }

    static async updateCourse(req,res){
        try {
          const  {id}  = req.params;
          console.log(id)
          const {title, description, startDate, endDate, trainer, category} = req.body;
          let updateData = {};
          if (title) updateData.title = title;
          if (description) updateData.description = description;
          if (startDate) updateData.startDate = startDate;
          if (endDate) updateData.endDate = endDate;
          if (trainer) updateData.trainer = trainer;
          if (category) updateData.category = category;
          console.log(updateData)
          const course = await courseModel.findByIdAndUpdate(id, updateData, { new: true } )
        
          res.status(200).json(course);

        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }

    static async listAllCourses(req,res){
        try {
            const course = await courseModel.find();
            res.status(200).json(course) ;
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }

    static async deleteCourse(req,res){
        try {
            const { id} = req.params;
            await courseModel.findByIdAndDelete(id)
            res.status(200).json({message:"deleted course done"})
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }

    static async getTraining(req,res,next){
        try {
            const id = req.params.id;
            const course = await courseModel.findById(id);
            res.status(200).json({course:course})
        } catch (error) {
            next(error)
        }
    }

    static async enrolleCourse(req, res, next){
        const { courseId } = req.params;
        const learnerId = req.user.id;
           
        try {
            const course = await courseModel.findById(courseId);
            if (!course) {
                return res.status(404).json({ message: "Course not found" });
            }
            
            if (course.learners.includes(learnerId)) {
                return res.status(400).json({ message: "Learner is already enrolled in this course" });
            }
              
            course.learners.push(learnerId);
            await course.save();

            const learner = await learnerModel.findById(learnerId);
            learner.enrolledCourses.push(course._id);
            await learner.save();

            res.status(200).json({ message: "Enrolled successfully", course });
        } catch (error) {
            next(error)
        }
    }
}

export default CourseController;