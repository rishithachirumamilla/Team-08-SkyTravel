const mongoose = require('mongoose');

const cstmodel = mongoose.Schema({

    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      pnr: {
        type: String,
        required: true,
      },
      ticket_ref:{
        type:String,
        required:true,
      },
      reply: {
        type: String,
        required: false,
      },
      created_date: {
        type: Date,
        required: false,
      },
      updated_date: {
        type: Date,
        required: false,
      },
      status: {
        type: String,
        required: false,
      },
});



module.exports = CST = mongoose.model('CustomerSupportTickets',cstmodel);