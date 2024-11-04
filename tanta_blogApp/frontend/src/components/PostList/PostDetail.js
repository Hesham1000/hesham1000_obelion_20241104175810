import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostDetail.css';

const PostDetail = ({ posts, onPostClick, onCommentSubmit }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`https://tanta_blogApp-backend.cloud-stacks.com/api/posts/${postId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Failed to retrieve comments', error);
    }
  };

  const handleCommentSubmit = async (postId) => {
    try {
      await axios.post(`https://tanta_blogApp-backend.cloud-stacks.com/api/posts/${postId}/comments`, {
        text: commentText,
        author: commentAuthor,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setCommentText('');
      setCommentAuthor('');
      fetchComments(postId);
    } catch (error) {
      console.error('Failed to add comment', error);
    }
  };

  return (
    <div className="post-detail-container">
      <header className="post-detail-header">
        <div className="branding">Tanta Blog</div>
        <nav className="navigation-tabs">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="post-list">
        {posts.map(post => (
          <div key={post.id} className="post-item" onClick={() => {
            onPostClick(post.id);
            fetchComments(post.id);
          }}>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-excerpt">{post.excerpt}</p>
            <button className="read-more-button">Read More</button>
            <div className="comments-section">
              <h3>Comments</h3>
              {comments.map(comment => (
                <div key={comment.id} className="comment-item">
                  <p><strong>{comment.author}:</strong> {comment.text}</p>
                </div>
              ))}
              <div className="add-comment">
                <input
                  type="text"
                  placeholder="Your name"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                />
                <textarea
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button onClick={() => handleCommentSubmit(post.id)}>Submit</button>
              </div>
            </div>
          </div>
        ))}
      </main>

      <footer className="post-footer">
        <div className="related-links">
          <a href="#related1">Related Article 1</a>
          <a href="#related2">Related Article 2</a>
        </div>
        <div className="footer-links">
          <a href="#terms">Terms</a>
          <a href="#privacy">Privacy</a>
        </div>
      </footer>
    </div>
  );
};

export default PostDetail;
