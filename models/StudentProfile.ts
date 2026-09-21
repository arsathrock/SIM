import mongoose from "mongoose";


const studentProfileSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    becoming:{
        type:String
    },

    fear:{
        type:String
    },

    stoppedBy:{
        type:String
    },

    studentType:{
        type:String
    },

    realizationTrigger:{
        type:String
    },

    dream:{
        type:String
    },

    quote:{
        type:String
    },


    firstVictory:{
        type:String
    },


    coreDrive:{
        type:String
    }

});


const StudentProfile = mongoose.model(
    "StudentProfile",
    studentProfileSchema
);


export default StudentProfile;