const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  usuarioId: {type:mongoose.Schema.Types.ObjectId,ref:'Usuario', required:true},
  habitacionId: {type:mongoose.Schema.Types.ObjectId,ref:'Habitacion', required:true},
  review: {type:String, required:true }
})

const Review = mongoose.model('Review', reviewSchema,'reviews');
module.exports = Review;
