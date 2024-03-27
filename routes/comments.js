const express = require('express');
const router = express.Router();
const Comment = require('../models/comment'); 

router.get('/edit', async (req, res, next) => {
  let commentId = req.query.id;  
  let comment = Comment.get(commentId);
  if (comment.userEmail !== req.session.currentUser.email) {
        return res.status(404)
  }
  res.render('comments/form', { title: 'BookedIn || Edit Comment', comment: comment });
})

router.post('/upsert', async (req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body));
    Comment.upsert(req.body);
    let bookId = req.body.bookId
    let createdOrupdated = req.body.id ? 'updated' : 'created';
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: `the comment has been ${createdOrupdated}!`,
    };
    res.redirect(303, `/books/show/${bookId}`);
    });

module.exports = router;