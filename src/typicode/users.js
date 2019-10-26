const request = require('request');
const usersUrl = `https://jsonplaceholder.typicode.com/users`;

const getAllUsers = (callback) => {
    let usersList = [];
    request.get({url : usersUrl, json:true}, (error, response) => {
        if (error) {
            callback('Unable to get the details.Please try after sometime.', undefined);
        } else {
            // console.log(response.body);
            if(!response.body[0]) {
                callback('There is something wrong.Please try after sometime.', undefined);                
            } else {
                response.body.forEach(user => {
                    const userObject = {
                        id : user.id,
                        name : user.name,
                        username : user.username,
                        email : user.email
                    }
                    usersList.push(userObject);
                });
                callback(undefined, usersList);
            }
        }
    })
}

const getSingleUser = (id, callback) => {
    request.get({url : usersUrl + '/' + id, json:true}, (error, response) => {
        if (error) {
            callback(error, undefined);
        } else {
            if(Object.keys(response.body).length === 0) {
                callback('User not found.Please enter correct user ID.', undefined);                
            } else {
                callback(undefined, response.body);
            }
        }
    })    
}

const getUserByPost = (postId, callback) => {
    const postUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    request.get({url : postUrl, json:true}, (err, post) => {
        if (err) {
            return callback('Please try after sometime', undefined);
        }
        console.log(post.body);
        const userId = post.body.userId;
        getSingleUser(userId, (err, user) => {
            if (err) {
                return callback(err, undefined); 
            }
            const result = {
                user : user,
                post : post.body
            }
            return callback(undefined, result);
        })
    })
}

module.exports = {
    getAllUsers : getAllUsers,
    getSingleUser : getSingleUser,
    getUserByPost : getUserByPost
}