const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Comment Routes
router.get('/posts/:postId/comments', async (req, res) => {
  try {
    await commentController.getCommentsByPostId(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve comments' });
  }
});

router.post('/posts/:postId/comments', async (req, res) => {
  try {
    await commentController.addCommentToPost(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

router.put('/comments/:commentId', async (req, res) => {
  try {
    await commentController.updateComment(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update comment' });
  }
});

router.delete('/comments/:commentId', async (req, res) => {
  try {
    await commentController.deleteComment(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

module.exports = router;