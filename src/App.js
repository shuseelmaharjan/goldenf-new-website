import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Courses from './components/Courses/Courses';
import Languages from './components/Languages/Languages';
import Tuition from './components/Tuition/Tuition';
import BridgeCourse from './components/BridgeCourse/BridgeCourse';
import Events from './components/Events/Events';
import Syllabus from './components/Syllabus/Syllabus';
import Contact from './components/Contact/Contact';
import CoursesDetails from './components/Slug/CoursesDetails';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Exam from './components/Exams/Exam';
<<<<<<< HEAD

function Layout({ children }) {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const isUser = location.pathname === '/dashboard' || location.pathname === '/exam';
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
  
  const token = localStorage.getItem('token');

  const isAuthenticated = token;

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
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}
=======
import Layout from './Layout';
>>>>>>> 12cc450ee4f6a4167033a24919758a8fa2ead19c

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
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/exam' element={<Exam />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
