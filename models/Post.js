const mongoose = require('mongoose')
const User = require('../models/User')

const PostSchema = mongoose.Schema({ // Define post schema
    title:{
        type:String,
        require:true,
        max:100
    },
    description:{
        type:String,
        require:true,
        max:500
    },
    likes:{
        type:Number,
        default:0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('posts',PostSchema)