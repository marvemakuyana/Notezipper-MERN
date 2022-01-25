import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './screens/LandingPage/LandingPage';
import MyNotes from './screens/MyNotes/MyNotes';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';

const App = () => (
  <Router>

    <Header />
    <main>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/mynotes" element={<MyNotes />} />
       
      </Routes>
    </main>
    <Footer />


  </Router>

);

export default App;
