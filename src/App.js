import { Route, Routes } from 'react-router-dom'
import Container from 'react-bootstrap/Container';

import './App.css';
import './api/axiosDefaults';
import styles from './styles/App.module.css'
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Register from './pages/authPages/Register';
import Login from './pages/authPages/Login';
import Profile from './pages/profilePages/Profile';
import PostPage from './pages/postPages/PostPage';
import CreateSong from './pages/songPages/CreateSong';
import EditSong from './pages/songPages/EditSong';
import CreatePost from './pages/postPages/CreatePost';
import EditPost from './pages/postPages/EditPost';
import EditProfile from './pages/profilePages/EditProfile';
import MyFeed from './pages/postPages/MyFeed';
import GeneralFeed from './pages/postPages/GeneralFeed';
import PageNotFound from './pages/PageNotFound';

/**
 * The root component of the application.
 * Includes the the NavBar and the current page as determined by
 * the path.
 * 
 * @returns {JSX.Element} The rendered application.
 */

function App() {
  return (
    <div className={`${styles.roboto} min-vh-100 d-flex flex-column`}>
      <NavBar />
      <Container fluid className="d-flex flex-column flex-grow-1">
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/login/" element={<Login />}/>
          <Route exact path="/register/" element={<Register />}/>
          <Route exact path='/profile/:id' element={<Profile />}/>
          <Route exact path='/edit-profile/' element={<EditProfile />}/>
          <Route exact path='/general-feed/' element={<GeneralFeed />}/>
          <Route exact path='/my-feed/' element={<MyFeed />}/>
          <Route exact path="/posts/:id" element ={<PostPage />} />
          <Route exact path='/create-song/' element={<CreateSong />} /> 
          <Route exact path='/edit-song/:id/' element={<EditSong />} />
          <Route exact path='/create-post/' element={<CreatePost />} />
          <Route exact path='/edit-post/:id/' element={<EditPost />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
