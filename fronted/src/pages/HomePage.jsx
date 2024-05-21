import { useAuth } from '../context/AuthContext.jsx'

function HomePage() {
  const data = useAuth()
  console.log(data)

  return (
    <div className='h-[calc(100vh-64px)] items-center justify-center'>
      <header className="bg-red-500 py-4">
        <h1 className="text-white text-4xl text-center">Bienvenido</h1>
      </header>
      <main className="container mx-auto py-8">
        <article className="bg-white rounded-lg shadow-lg p-6 mb-4">
          <h2 className="text-2xl font-bold mb-2 text-black ">Solicitud</h2>
          <p className="text-black" >Aquí debe ir la solicitud</p>
        </article>
      </main>
      <footer className="bg-red-500 py-4">
        <p className="text-center">© 2024 Contro de vacaciones,permisos y salidas. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default HomePage