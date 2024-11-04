const { Sequelize, DataTypes } = require('sequelize');
const Comment = require('../models/Comment');

const sequelize = new Sequelize('tanta_blogApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING(255),
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Comment',
  tableName: 'Comments',
  timestamps: false
});

const getCommentsByPostId = async (req, res) => {
  try {
    const comments = await Comment.findAll({ where: { postId: req.params.postId } });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve comments' });
  }
};

const addCommentToPost = async (req, res) => {
  try {
    const { text, author } = req.body;
    const comment = await Comment.create({ postId: req.params.postId, text, author });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

const updateComment = async (req, res) => {
  try {
    const { text, author } = req.body;
    const comment = await Comment.findByPk(req.params.commentId);
    if (comment) {
      comment.text = text;
      comment.author = author;
      await comment.save();
      res.json(comment);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update comment' });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.commentId);
    if (comment) {
      await comment.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};

module.exports = {
  getCommentsByPostId,
  addCommentToPost,
  updateComment,
  deleteComment
};