import { useState, useEffect, createContext } from 'react';
import { Route, Routes } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import axios from 'axios';

import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import styles from './styles/App.module.css'
import './api/axiosDefaults';

export const CurrentUserContext = createContext();
export const setCurrentUserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleMount = async() => {
    try {
      const {data} = await axios.get('dj-rest-auth/user/');
      setCurrentUser(data);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleMount();
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <setCurrentUserContext.Provider value={setCurrentUser}>
        <div className={`${styles.roboto} min-vh-100 d-flex flex-column`}>
          <NavBar />
          <Container className="d-flex flex-column flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/login/" element={<Login />}/>
              <Route path="/register/" element={<Register />}/>
            </Routes>
          </Container>
        </div>
      </setCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
