import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Exam from './components/Exams/Exam';
import ExamHistory from './components/ExamHistroy/ExamHistory';
import Profile from './components/Profile.jsx/Profile';
import ChangePassword from './components/ChangePassword/ChangePassword';

function Layout({ children }) {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const isUser =  location.pathname === '/dashboard' || 
                  location.pathname === '/profile' ||
                  location.pathname === '/change-password' ||
                  location.pathname === '/exam-history' ||
                  location.pathname === '/exam';
  const isGuest = location.pathname === '/' ||
                  location.pathname === '/courses'||
                  location.pathname === '/courses/:slug'||
                  location.pathname === '/languages'||
                  location.pathname === '/tuition'||
                  location.pathname === '/bridge-course'||
                  location.pathname === '/events'||
                  location.pathname === '/syllabus'||
                  location.pathname === '/contact'
                  ;
  
  const refreshToken = localStorage.getItem('refreshToken');
  const accessToken = localStorage.getItem('accessToken');

  const isAuthenticated = refreshToken && accessToken;

  return (
    <>
      {isGuest &&(
        <>
          <Navbar />
          <div>{children}</div>
          <Footer />
        </>
      )}

      {isAuthenticated && isUser && (
        <>
          {children}
        </>
      )}

      {isLogin &&(
        <>
        <Login/>
        </>
      )}

      {!isAuthenticated && isUser && <Navigate to="/login" replace />}
    </>
  );
}

function PrivateRoute({ children }) {
  const refreshToken = localStorage.getItem('refreshToken');
  const accessToken = localStorage.getItem('accessToken');

  if (!refreshToken && !accessToken) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/courses/:slug' element={<CoursesDetails />} />
          <Route path='/languages' element={<Languages />} />
          <Route path='/tuiton' element={<Tuition />} />
          <Route path='/bridge-course' element={<BridgeCourse />} />
          <Route path='/events' element={<Events />} />
          <Route path='/syllabus' element={<Syllabus />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='/exam' element={<PrivateRoute><Exam /></PrivateRoute>} />
          <Route path='/exam-history' element={<PrivateRoute><ExamHistory /></PrivateRoute>} />
          <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>} />
          <Route path='/change-password' element={<PrivateRoute><ChangePassword/></PrivateRoute>} />


        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
