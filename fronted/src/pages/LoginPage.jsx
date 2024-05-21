import { Card, Input, Button, Label } from "../components/ui"
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";  
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {

  const { register, handleSubmit } = useForm();

  const {signin, errors} = useAuth()
  const navigate = useNavigate()

  const onSubmit =  handleSubmit(async(data) => {
      const user = await signin(data);

      if(user) {
        navigate('/profile')
      }
    })

  return (
    <div>
      <div className="h-[calc(100vh-64px)] flex justify-center items-center">
        <Card>

          {
            errors && errors.map((error, index) => (
              <div key={index} className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                <p>{error}</p>
              </div>
            ))
          }

          <h1 className="text-4xl font-bold my-2 text-center">Iniciar sesión</h1>

          <form onSubmit={ onSubmit }>
            <Label htmlFor="email">Número de emepleado</Label>
            <Input type='text' placeholder='Ingresa tu # de empleado' 
              {... register('empleado_id', {required: true})}
            />

            <Label htmlFor="password">Contraseña</Label>
            <Input type='password' placeholder='Contraseña' 
              {... register('contrasena_hash', {required: true})}
            />
            <Button>Iniciar sesión</Button>

            <div className="flex justify-between my-4">
              <p>¿No tienes una cuenta? 
                <Link to="/register" className="font-bold">Regístrate</Link>
              </p>
            </div>
          </form>
        </Card>

      </div>
    </div>
  )
}

export default LoginPage;