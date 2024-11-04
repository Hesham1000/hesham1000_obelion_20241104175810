import React, { useState } from 'react';
import './PostList.css';
import axios from 'axios';

const PostList = ({ posts }) => {
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  const handleCommentSubmit = async (postId) => {
    try {
      const response = await axios.post(`https://tanta_blogApp-backend.cloud-stacks.com/api/posts/${postId}/comments`, {
        text: commentText,
        author: commentAuthor
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Comment submitted successfully:', response.data);
      setCommentText('');
      setCommentAuthor('');
    } catch (error) {
      console.error('Failed to submit comment:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="post-list">
      <header className="post-list-header">
        <h1>Blog</h1>
        <nav className="post-list-nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="post-list-main">
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            <h2 className="post-title">{post.title}</h2>
            <button className="read-more-button" onClick={() => window.location.href = `/post/${post.id}`}>Read More</button>
            <div className="comment-section">
              <textarea 
                placeholder="Leave a comment" 
                className="comment-textarea" 
                value={commentText} 
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
              <input
                type="text"
                placeholder="Your name"
                className="comment-author-input"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
              />
              <button 
                className="submit-comment-button" 
                onClick={() => handleCommentSubmit(post.id)}
              >
                Submit
              </button>
            </div>
          </div>
        ))}
      </main>

      <footer className="post-list-footer">
        <p>Contact us at: contact@example.com</p>
        <div className="social-links">
          <a href="#facebook">Facebook</a>
          <a href="#twitter">Twitter</a>
          <a href="#instagram">Instagram</a>
        </div>
      </footer>
    </div>
  );
}

export default PostList;
