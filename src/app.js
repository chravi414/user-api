// Inbuit node packages
const path = require('path');

// Npm Packages
const express = require('express');
const hbs = require('hbs');

// Custom modules
const users = require('./typicode/users');
const posts = require('./typicode/posts');
const comments = require('./typicode/comments');

// Initializing the express app
const app = express();
const port = process.env.PORT || 5000;

// Setting up the Static Assets folder
const staticAssetDir = path.join(__dirname, '../public');
app.use(express.static(staticAssetDir));

// Setting up HBS templates and partials
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));


app.get('', (req, res) => {
    res.render('index');
})

app.get('/users', (req,res) => {
    users.getAllUsers((err, data) => {
        if(err) {
            return res.render('users',{error : err});
        }
        return res.render('users',{userList : data});
    })
    // res.render('users');
})

app.get('/users/:id', (req,res) => {
    const userId = req.params.id;
    users.getSingleUser(userId, (err, user) => {
        if(err) {
            return res.render('user-detail', {error : err});
        } 
        posts.getPostByUser(userId, (err, posts) => {
            if(err) {
                return res.render('user-detail', {error : err});
            } 
            return res.render('user-detail', {user: user, userPosts : posts});
        })        
    })
})

app.get('/users/posts/:postId', (req, res) => {
    const postId = req.params.postId;
    users.getUserByPost(postId, (err, data) => {
        if (err) {
            return res.render('post-detail', {error : err})
        }
        comments.getCommentsByPost(data.post.id, (err, comments) => {
            if (err) {
                return res.render('post-detail', { error : err});
            }
            console.log(data.user);
            return res.render('post-detail', {
                user : data.user,
                post : data.post,
                comments : comments
            })
        })        
    })

})

app.get('/posts', (req,res) => {
    posts.getAllPosts((err, data) => {
        if(err) {
            return res.render('posts',{error : err});
        }
        return res.render('posts',{postList : data});
    })
})

app.get('/comments', (req,res) => {
    comments.getAllComments((err, data) => {
        if(err) {
            return res.render('comments',{error : err});
        }
        console.log(data);
        return res.render('comments',{commentList : data});
    })
})

app.get('/posts', (req,res) => {
    res.render('posts');
})

app.get('/comments', (req,res) => {
    res.render('comments');
})

// Starting the Server
app.listen(port, () => {
    console.log('Server running on port ...!', port);
})