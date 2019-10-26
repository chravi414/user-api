const request = require('request');
const commentsUrl = `https://jsonplaceholder.typicode.com/comments`;

const getAllComments = (callback) => {
    request.get({url : commentsUrl, json:true}, (error, response) => {
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

const getCommentsByPost = (postId, callback) => {
    request.get({url : commentsUrl + '?postId=' + postId, json:true}, (error, response) => {
        if (error) {
            return callback(error, undefined);
        }
        if(!response.body[0]) {
            return callback('No Post found.', undefined);
        }
        return callback(undefined, response.body); 
    })    
}

module.exports = {
    getAllComments : getAllComments,
    getCommentsByPost : getCommentsByPost
}