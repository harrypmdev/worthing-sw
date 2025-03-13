import { Route, Routes } from 'react-router-dom'
import Container from 'react-bootstrap/Container';

import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import styles from './styles/App.module.css'
import './api/axiosDefaults';



function App() {
  return (
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
  );
}

export default App;
