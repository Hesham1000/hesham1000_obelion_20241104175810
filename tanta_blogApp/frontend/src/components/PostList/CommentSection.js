import React, { useState, useEffect } from 'react';
import './CommentSection.css';
import axios from 'axios';

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://tanta_blogApp-backend.cloud-stacks.com/api/posts/${post.id}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Failed to fetch comments');
      }
    };

    fetchComments();
  }, [post.id]);

  const handleAddComment = async () => {
    if (newComment.trim() && author.trim()) {
      try {
        const response = await axios.post(
          `https://tanta_blogApp-backend.cloud-stacks.com/api/posts/${post.id}/comments`,
          { text: newComment, author },
          { headers: { 'Content-Type': 'application/json' } }
        );
        setComments([...comments, response.data]);
        setNewComment('');
        setAuthor('');
      } catch (error) {
        console.error('Failed to add comment');
      }
    }
  };

  return (
    <div className="comment-section">
      <div className="post-content">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-body">{post.body}</p>
        <button className="read-more-btn">Read More</button>
      </div>
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-item">
            <strong>{comment.author}:</strong> {comment.text}
          </div>
        ))}
      </div>
      <div className="comment-form">
        <input
          type="text"
          className="comment-input"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name"
        />
        <input
          type="text"
          className="comment-input"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave a comment..."
        />
        <button className="comment-btn" onClick={handleAddComment}>Comment</button>
      </div>
    </div>
  );
};

export default CommentSection;
