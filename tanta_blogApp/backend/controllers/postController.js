const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('tanta_blogApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

// Define Post model
const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  video: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isDraft: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'Posts',
  timestamps: false,
});

const createPost = async (req, res) => {
  try {
    const { title, content, isDraft } = req.body;
    const image = req.file ? req.file.filename : null;
    const video = req.file ? req.file.filename : null;

    const newPost = await Post.create({
      title,
      content,
      image,
      video,
      isDraft
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ where: { id } });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, isDraft } = req.body;
    const image = req.file ? req.file.filename : null;
    const video = req.file ? req.file.filename : null;

    const post = await Post.findOne({ where: { id } });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.title = title;
    post.content = content;
    post.image = image;
    post.video = video;
    post.isDraft = isDraft;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({ where: { id } });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await post.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};