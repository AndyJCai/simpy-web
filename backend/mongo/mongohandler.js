const mongoose = require('mongoose');
const User = require('../schemas/user');
const Friend = require('../schemas/friends');

class MongoHandler {
    constructor() {
        this.RECEIPT_DB_URL = "mongodb://localhost:27017/simpy_db";
        this.client = mongoose.createConnection(this.RECEIPT_DB_URL, { useNewUrlParser: true });
        this.UserMapping = this.client.model('Users', User);
        this.FriendRequestMapping = this.client.model("Friends", Friend);
    }

    close() {
        this.client.close();
        return;
    }

    async addNewUser(newUser) {
        this.UserMapping.create({ spotify_id: newUser.id, email: newUser.email, display_name: newUser.display_name }, function (err, small) {
            if (err){
                console.log(err);
            } 
          });
    }

    async makeFriendRequest(userA, userB) {
        // Let's say we have two users UserA and UserB... So when UserA requestes UserB to be a friends at that time we make two documents so that UserA can see requested and UserB can see pending and at the same time we push the _id of these documents in user's friends
        const docA = await this.FriendRequestMapping.findOneAndUpdate(
            { requester: userA, recipient: userB },
            { $set: { status: 1 }},
            { upsert: true, new: true }
        );
        const docB = await this.FriendRequestMapping.findOneAndUpdate(
            { recipient: userA, requester: userB },
            { $set: { status: 2 }},
            { upsert: true, new: true }
        );
        const updateUserA = await this.UserMapping.findOneAndUpdate(
            { _id: userA },
            { $push: { friends: docA._id }}
        );
        const updateUserB = await this.UserMapping.findOneAndUpdate(
            { _id: userB },
            { $push: { friends: docB._id }}
        );
    }

    async acceptFriendRequest(userA, userB) {
        // If recipient accepts the friend request
        this.FriendRequestMapping.findOneAndUpdate(
            { requester: userA, recipient: userB },
            { $set: { status: 3 }}
        );
        this.FriendRequestMapping.findOneAndUpdate(
            { recipient: userA,  requester: userB },
            { $set: { status: 3 }}
        );
    }

    async rejectFriendRequest(userA, userB) {
        const docA = await this.FriendRequestMapping.findOneAndRemove(
            { requester: userA, recipient: userB }
        );
        const docB = await this.FriendRequestMapping.findOneAndRemove(
            { recipient: userA, requester: userB }
        );
        const updateUserA = await this.UserMapping.findOneAndUpdate(
            { _id: userA },
            { $pull: { friends: docA._id }}
        );
        const updateUserB = await this.UserMapping.findOneAndUpdate(
            { _id: userB },
            { $pull: { friends: docB._id }}
        );
    }

    async getUserFriends(user) {
        User.aggregate([
            { "$lookup": {
              "from": this.FriendRequestMapping.collection.name,
              "let": { "friends": "$friends" },
              "pipeline": [
                { "$match": {
                  "recipient": ObjectId(user),
                  "$expr": { "$in": [ "$_id", "$$friends" ] }
                }},
                { "$project": { "status": 1 } }
              ],
              "as": "friends"
            }},
            { "$addFields": {
              "friendsStatus": {
                "$ifNull": [ { "$min": "$friends.status" }, 0 ]
              }
            }}
          ]);
    }

    async queryByIDPromise(id, id_owner) {
        const simpy_users = this.client.collection('simpy_users');
        var asyncUsers = new Promise(function (resolve, reject) {
            simpy_users.find({ id_owner: id }, { _id: 0 }).toArray((err, users_with_matching_ids) => {
                if (err) throw err;
                users = [];
                users_with_matching_ids.forEach((user) => {
                    users.push(user);
                });
                resolve(users);
            });
        });
        return asyncUsers;
    }

}

module.exports = {
    MongoHandler
};