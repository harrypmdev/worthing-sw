import { Route, Routes } from 'react-router-dom'
import Container from 'react-bootstrap/Container';

import './App.css';
import './api/axiosDefaults';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Profile from './pages/Profile';
import GeneralFeed from './pages/posts/GeneralFeed';
import PostPage from './pages/posts/PostPage';
import styles from './styles/App.module.css'
import CreateSong from './pages/songs/CreateSong';
import EditSong from './pages/songs/EditSong';


function App() {
  return (
    <div className={`${styles.roboto} min-vh-100 d-flex flex-column`}>
      <NavBar />
      <Container fluid className="d-flex flex-column flex-grow-1">
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/login/" element={<Login />}/>
          <Route exact path="/register/" element={<Register />}/>
          <Route exact path='/profile/' element={<Profile />}/>
          <Route exact path='/profile/:id' element={<Profile />}/>
          <Route exact path='/general-feed/' element={<GeneralFeed />}/>
          <Route exact path="/posts/:id" element ={<PostPage />} />
          <Route exact path='/create-song/' element={<CreateSong />} /> 
          <Route exact path='/edit-song/:id/' element={<EditSong />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
