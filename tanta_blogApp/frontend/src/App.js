import React from 'react';
import BlogPost from './components/BlogPost/BlogPost.js';
import PostList from './components/PostList/PostList.js';
import SearchBar from './components/SearchBar/SearchBar.js';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My Blog</h1>
      </header>
      <main>
        <SearchBar />
        <PostList />
        <BlogPost />
      </main>
    </div>
  );
};

export default App;
