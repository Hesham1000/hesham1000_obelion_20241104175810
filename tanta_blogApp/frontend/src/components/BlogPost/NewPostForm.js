import React, { useState } from 'react';
import './NewPostForm.css';
import axios from 'axios';

function NewPostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [isDraft, setIsDraft] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append('title', title);
    formData.append('content', content);
    formData.append('isDraft', isDraft);
    if (image) formData.append('image', image);
    if (video) formData.append('video', video);

    try {
      const response = await axios.post('https://tanta_blogApp-backend.cloud-stacks.com/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        window.location.href = '/home';
      }
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };

  return (
    <div className="new-post-form">
      <header className="header">
        <div className="branding">Tanta Blog</div>
        <nav className="navigation">
          <a href="/home">Home</a>
          <a href="/create-post" className="active">Create Post</a>
          <a href="/about">About</a>
        </nav>
      </header>
      <main className="main-content">
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="image">Add Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="form-field">
            <label htmlFor="video">Add Video</label>
            <input
              type="file"
              id="video"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </div>
          <div className="form-actions">
            <button type="button" onClick={() => setIsDraft(true)}>Save as Draft</button>
            <button type="submit">Post</button>
          </div>
        </form>
      </main>
      <footer className="footer">
        <div>&copy; 2023 Tanta Blog</div>
        <nav className="footer-links">
          <a href="/terms">Terms of Use</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/contact">Contact Us</a>
        </nav>
        <div className="social-media">
          <a href="/facebook">Facebook</a>
          <a href="/twitter">Twitter</a>
          <a href="/instagram">Instagram</a>
        </div>
      </footer>
    </div>
  );
}

export default NewPostForm;
