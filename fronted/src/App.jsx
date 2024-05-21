import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import RequestPage from './pages/RequestPage.jsx'
import RequestFormPage from './pages/RequestFormPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    
    <Routes>
      <Route path="/" element= {<HomePage/>}  />
      <Route path="/about" element= {<AboutPage/>}  />
      <Route path="/login" element= {<LoginPage/>}  />
      <Route path="/register" element= {<RegisterPage/>}  />
      <Route path="/requests" element= {<RequestPage/>}  />
      <Route path="/request/new" element= {<RequestFormPage/>}  />
      <Route path="/request/1/edit" element= {<RequestFormPage/>}  />
      <Route path="/profile" element= {<ProfilePage/>}  />
      <Route path="*" element= {<NotFound/>}  />

    </Routes>
  )
}

export default App