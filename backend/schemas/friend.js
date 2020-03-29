const 
    Mongoose = require('mongoose'),
    Schema = Mongoose.Schema;

const FriendSchema = new Schema({
    requester: { type: Schema.Types.ObjectId, ref: 'User',required: true },
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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