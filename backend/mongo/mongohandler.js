const mongoose = require('mongoose');
const User = require('../schemas/user');

class MongoHandler {
    constructor() {
        this.RECEIPT_DB_URL = "mongodb://localhost:27017/simpy_db";
        this.client = mongoose.createConnection(this.RECEIPT_DB_URL, { useNewUrlParser: true });
        this.UserMapping = this.client.model('simpy-users', User);
    }

    close() {
        this.client.close();
        return;
    }

    async addNewUser(newUser) {
        const { UserSchema } = require('../schemas/user');
        const userSchema = mongoose.model('simpy-users', UserSchema);
        var _newUser = new userSchema({ spotify_id: newUser.id, email: newUser.email, fullName: newUser.display_name });
        _newUser.save(function (err) {
            if (err) return handleError(err); // saved!
          });
    }

    async queryByIDPromise(id, id_owner) {
        const simpy_users = this.client.collection('simpy-users');
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