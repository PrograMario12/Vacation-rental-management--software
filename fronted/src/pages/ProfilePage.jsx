import {useAuth} from '../context/AuthContext'

function ProfilePage() {

  const {user} = useAuth()

  return (
    <div>
      Bienvenido {JSON.stringify(user.empleado_id)}
    </div>
  )
}

export default ProfilePage