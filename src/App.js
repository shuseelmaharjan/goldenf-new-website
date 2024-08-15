import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Courses from './components/Courses/Courses';
import Languages from './components/Languages/Languages';
import Tuition from './components/Tuition/Tuition';
import BridgeCourse from './components/BridgeCourse/BridgeCourse';
import Events from './components/Events/Events';
import Syllabus from './components/Syllabus/Syllabus';
import Contact from './components/Contact/Contact';
import CoursesDetails from './components/Slug/CoursesDetails';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/courses' element={<Courses/>}/>
        <Route path="/courses/:slug" element={<CoursesDetails/>} />
        <Route path='/languages' element={<Languages/>}/>
        <Route path='/tuiton' element={<Tuition/>}/>
        <Route path='/bridge-course' element={<BridgeCourse/>}/>
        <Route path='/events' element={<Events/>}/>
        <Route path='/syllabus' element={<Syllabus/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
      <Footer/>
    </Router>
    </>
  );
}

export default App;
