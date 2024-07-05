import {Routes, Route, Outlet} from 'react-router-dom'

import {useAuth} from './context/AuthContext'
import { RequestProvider } from './context/RequestContext.jsx'

import Navbar from './components/navbar/Navbar.jsx'
import {Container} from './components/ui'
import {ProtectedRoute} from './components/ProtectedRoute.jsx'

import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import RequestPage from './pages/RequestPage.jsx'
import RequestFormPage from './pages/RequestFormPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import NotFound from './pages/NotFound.jsx'

/**
 * The main component of the application.
 *
 * @returns {JSX.Element} The rendered App component.
 */
function App() {

  const {isAuth} = useAuth();

  return (
    <>
      <Navbar />

      <Container className="py-5">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isAllowed={!isAuth} redirectTo="/requests" />
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route
            path="/"
            element={
              <ProtectedRoute isAllowed={isAuth} redirectTo="/login" />
            }
          >
            <Route
              element={
                <RequestProvider>
                  <Outlet />
                </RequestProvider>
              }
            >
              <Route path="/requests" element={<RequestPage />} />
              <Route path="/request/new" element={<RequestFormPage />} />
              <Route path="/request/1/edit" element={<RequestFormPage />} />
            </Route>

            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;