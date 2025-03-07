import './App.css';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Home from './components/Home';
import styles from './styles/App.module.css'

function App() {
  return (
    <div className={`${styles.roboto} min-vh-100 d-flex flex-column`}>
      <NavBar />
      <Container className="d-flex flex-column flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/second/" element={<p>Second Page</p>}/>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
