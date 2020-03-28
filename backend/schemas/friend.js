const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
    requester: { type: String, required: true },
    recipient: { type: String, required: true },
    status: {
      type: Number,
      enums: [
          0,    //'add friend',
          1,    //'requested',
          2,    //'pending',
          3,    //'friends'
      ]
    }
  }, {collection: 'Friend', timestamps: true})
module.exports = FriendSchema;