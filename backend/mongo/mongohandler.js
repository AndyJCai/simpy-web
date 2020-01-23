const mongoose = require('mongoose');
const User = require('../schemas/user');

class MongoHandler {
    constructor(){
        this.RECEIPT_DB_URL = "mongodb://localhost:27017/simpy_db";
        this.client = mongoose.createConnection(this.RECEIPT_DB_URL, { useNewUrlParser: true });
        this.UserMapping = this.client.model('simpy-users', User);
    }

    close(){
        this.client.close();
        return;
    }

    async addNewUser(newUser){
        try {
            await this.UserMapping.insertMany(newUser);
            return newUser;
        } catch(error) {
            throw error
        }
    }

    async queryByID(id, id_owner) {
        recipes = {};
        await this.queryByIDPromise(id, id_owner)
        .then(rec => {
            recipes = rec.recipes;
        })
        .catch(error => {
            throw error;
        })
        return recipes;
    }

    async queryByIDPromise(id, id_owner) {
        const simpy_users = this.client.collection('simpy-users');
         var asyncUsers = new Promise( function(resolve, reject) {
            simpy_users.find({id_owner: id},{_id: 0}).toArray((err,users_with_matching_ids) => {
                if(err) throw err;
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

mongohandler = new MongoHandler();

module.exports = {
    MongoHandler
};