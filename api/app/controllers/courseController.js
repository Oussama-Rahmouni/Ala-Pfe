import courseModel from "../models/courseModel.js";
import trainerModel from "../models/trainerModel.js";

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

    static async getCourse(req,res){
        try {
            
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
}

export default CourseController;