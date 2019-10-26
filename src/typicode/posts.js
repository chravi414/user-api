const request = require('request');
const postsUrl = `https://jsonplaceholder.typicode.com/posts`;

const getAllPosts = (callback) => {
    request.get({url : postsUrl, json:true}, (error, response) => {
        if (error) {
            callback('Unable to get the details.Please try after sometime.', undefined);
        } else {
            if(!response.body[0]) {
                callback('There is something wrong.Please try after sometime.', undefined);                
            } else {
                callback(undefined, response.body);
            }
        }
    })
}

const getSinglePost = (postId, callback) => {
    request.get({url: postsUrl +'/'+ postId, josn: true}, (err, res) => {
        if (err) {
            return callback('Please try after sometime', undefined);
        }
        if (Object.keys(res.body).length === 0) {
            return callback('No Post found', undefined);
        }
        return callback(undefined, res.body);
    })
}

const getPostByUser = (userId, callback) => {
    request.get({url : postsUrl + '?userId=' + userId, json:true}, (error, response) => {
        if (error) {
            callback(error, undefined);
        } else {
            callback(undefined, response.body);
        }
    })    
}

module.exports = {
    getAllPosts : getAllPosts,
    getSinglePost : getSinglePost,
    getPostByUser : getPostByUser
}