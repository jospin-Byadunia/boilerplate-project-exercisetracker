const mongoose = require('mongoose');

const userExerciseSchema = new mongoose.schema({
    username:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    duration:{
        type:Number
    },
    date:{
        type:Date
    }
});

const UserExerciseModel = mongoose.Model('UserExerciseModel', userExerciseSchema);

module.exports = UserExerciseModel;