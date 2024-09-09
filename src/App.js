import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import Downloads from './components/Others/Downloads';
import ApplyOnline from './components/Form/ApplyOnline';
import About from './components/Others/About';
import LanguageDetails from './components/Slug/LanguageDetails';
import SyllabusDetails from './components/Slug/SyllabusDetails';
import BlogDetails from './components/Slug/BlogDetails';

function Layout({ children }) {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  
  const refreshToken = localStorage.getItem('refreshToken');
  const accessToken = localStorage.getItem('accessToken');
  const isAuthenticated = refreshToken && accessToken;

  const guestRoutes = [
    '/', '/courses', '/courses/:slug', '/languages', '/languages/:slug', '/tuition',
    '/bridge-course', '/events', '/syllabus', '/contact', '/downloads',
    '/online-application', '/about-us'
  ];

  const isGuest = guestRoutes.includes(location.pathname) 
  || location.pathname.startsWith('/languages/') 
  || location.pathname.startsWith('/courses/')
  || location.pathname.startsWith('/syllabus/')|| location.pathname.startsWith('/events/');

  return (
    <>
      {isGuest && (
        <>
          <Navbar />
          <div>{children}</div>
          <Footer />
        </>
      )}

      {isLogin && <Login />}

      {isAuthenticated && !isGuest && (
        <>
          {children}
        </>
      )}

      {!isAuthenticated && !isGuest && <Navigate to="/login" replace />}
    </>
  );
}

function PrivateRoute({ children }) {
  const refreshToken = localStorage.getItem('refreshToken');
  const accessToken = localStorage.getItem('accessToken');

  if (!refreshToken || !accessToken) {
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
          <Route path='/languages/:slug' element={<LanguageDetails />} />
          <Route path='/tuition' element={<Tuition />} />
          <Route path='/bridge-course' element={<BridgeCourse />} />
          <Route path='/events' element={<Events />} />
          <Route path='/events/:slug' element={<BlogDetails />} />
          <Route path='/syllabus' element={<Syllabus />} />
          <Route path='/syllabus/:slug' element={<SyllabusDetails />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/downloads' element={<Downloads />} />
          <Route path='/online-application' element={<ApplyOnline />} />
          <Route path='/about-us' element={<About />} />

          <Route path='/login' element={<Login />} />

          <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='/exam' element={<PrivateRoute><Exam /></PrivateRoute>} />
          <Route path='/exam-history' element={<PrivateRoute><ExamHistory /></PrivateRoute>} />
          <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path='/change-password' element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
