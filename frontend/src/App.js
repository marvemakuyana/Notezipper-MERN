import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './screens/LandingPage/LandingPage';
import MyNotes from './screens/MyNotes/MyNotes';

const App = () => (
  <Router>

    <Header />
    <main>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path="/mynotes" element={<MyNotes />} />
       
      </Routes>
    </main>
    <Footer />


  </Router>

);

export default App;
