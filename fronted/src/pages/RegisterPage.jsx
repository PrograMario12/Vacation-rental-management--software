import {Button, Card, Input, Label, Container} from '../components/ui'
import {useForm} from 'react-hook-form'
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'

function RegisterPage() {
const {
  register, 
  handleSubmit, 
  formState: {errors}
} = useForm();

const {signup, errors : signupErrors} = useAuth()
const navigate = useNavigate()

const onSubmit = handleSubmit(async (data) => {
  const user = await signup(data)

  if(user) {
    navigate('/profile')
  }
})

  return (
    <Container className='h-[calc(100vh-64px)] flex items-center justify-center'>
      <Card>
      {
      signupErrors && signupErrors.map((error, index) => (
        <div key={index} className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      ))
    }
        <h3 className="text-2xl font-bold ">Registro de usuario</h3>
        <form onSubmit={onSubmit} > 
          <Label htmlFor="empleado_id">Número de empleado</Label>
          <Input placeholder="Ingresa tu número de empleado" 
            {...register('empleado_id', {required: true
          })} />

          {
            errors.empleado_id && <p className="text-red-500">El número de empleado es requerido</p>
          }

          <Label htmlFor="nombre">Correo</Label>
          <Input type="email" placeholder="Ingresa tu correo" 
            {...register('email',
              {required: true, pattern: /^\S+@\S+$/i}
            )}
          />

            {
              errors.email && <p className="text-red-500">El correo es requerido</p>
            }

          <Label htmlFor="contrasena_hash">Contraseña</Label>
          <Input type="password" placeholder="Ingresa tu contraseña" 
            {...register('contrasena_hash', {required: true}
            )}
          />

            {
              errors.contrasena_hash && <p className="text-red-500">La contraseña es requerida</p>
            }

          <Button>Registrarse</Button>

          <div className="flex justify-between my-4">
              <p>¿Ya tienes una cuenta? 
                <Link to="/login" className="font-bold">Iniciar sesión</Link>
              </p>
          </div>
        </form>
      </Card>
    </Container>
  )
}

export default RegisterPage;