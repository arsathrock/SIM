import mongoose from "mongoose";


const StudentProfileSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    becoming:{
        type:String,
        required:true
    },

    fear:{
        type:String,
    },

    stoppedBy:{
        type:String,
    },

    studentType:{
        type:String,
    },

    realizationTrigger:{
        type:String,
    },

    dream:{
        type:String,
    },

    quote:{
        type:String,
    },

    firstVictory:{
        type:String,
    },

    coreDrive:{
        type:String,
    }

});


export default mongoose.model(
    "StudentProfile",
    StudentProfileSchema
);