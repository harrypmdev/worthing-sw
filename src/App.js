import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom'
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<p>Home Page</p>}/>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
