const { fetchAllUsers } = require('../models/users.models')

function getAllUsers (req, res, next) {
    fetchAllUsers().then((users) => {
        res.status(200).send({users})
    })
    .catch((err) => {
        next(err);
      });
}


module.exports = { getAllUsers };