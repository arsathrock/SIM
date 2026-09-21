import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({

    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudentProfile",
        required: true
    },

    date: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["present", "absent", "excused"],
        required: true
    },

    subject: {
        type: String,
        required: true
    }

});


const Attendance = mongoose.model(
    "Attendance",
    attendanceSchema
);


export default Attendance;