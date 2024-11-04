import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import axios from 'axios';

const SearchBar = () => {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://tanta_blogApp-backend.cloud-stacks.com/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleCommentSubmit = async (postId) => {
    if (comment.trim() === '') return;

    try {
      await axios.post(`https://tanta_blogApp-backend.cloud-stacks.com/api/posts/${postId}/comments`, {
        text: comment,
        author: 'Anonymous' // Replace with actual author if necessary
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="search-bar-container">
      <header className="header">
        <div className="branding">Tanta Blog</div>
        <nav className="navigation">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </header>
      <main className="main-content">
        <section className="blog-posts">
          {posts.map((post) => (
            <article key={post.id} className="blog-post">
              <h2 className="post-title">
                <a href={`/posts/${post.id}`}>{post.title}</a>
              </h2>
              <p className="post-excerpt">{post.excerpt}</p>
              <button className="read-more" onClick={() => window.location.href = `/posts/${post.id}`}>
                Read More
              </button>
              <div className="comment-section">
                <form
                  className="comment-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCommentSubmit(post.id);
                  }}
                >
                  <textarea
                    className="comment-input"
                    placeholder="Leave a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <button type="submit" className="submit-comment">
                    Submit
                  </button>
                </form>
              </div>
            </article>
          ))}
        </section>
      </main>
      <footer className="footer">
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </div>
        <div className="social-media">
          <a href="#">Twitter</a>
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
        </div>
      </footer>
    </div>
  );
};

export default SearchBar;
