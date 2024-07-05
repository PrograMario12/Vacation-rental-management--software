import {Link, useLocation} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'

import {publicRoutes, privateRoutes} from './navigation.js'
import {Container} from '../ui'

function Navbar() {
    const location = useLocation();
    const {isAuth, signout } = useAuth();

  return (
    <nav className='bg-zinc-950 '>
        <Container className="flex justify-between py-3">

        <Link to='/'>
            <h1>
                Control de vacaciones
            </h1>
        </Link>

        <ul className='flex gap-x-2'>
            {
                isAuth ? (
                    <>
                    {
                        privateRoutes.map(({path, name}) => (
                            <li
                            className={`text-slate-300 ${
                                location.pathname === path && "bg-sky-500 px-3 py-1"
                            }`} 
                            key={path}>
                                <Link to={path}>{name}</Link>
                            </li>
                            
                        ))
                    }
                    <li onClick={signout} className='text-slate-300 cursor-pointer'>Cerrar sesión</li>
                    </>
                ) : (
                    publicRoutes.map(({path, name}) => (
                        <li
                        className={`text-slate-300 ${
                            location.pathname === path && "bg-sky-500 px-3 py-1"
                        }`} 
                        key={path}>
                            <Link to={path}>{name}</Link>
                        </li>
                    ))
                )
            }
            
        </ul>
        </Container>
    </nav>
  )
}

export default Navbar