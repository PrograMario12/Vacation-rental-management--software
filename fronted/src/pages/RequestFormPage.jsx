import { Card, Input, Label, Button, SelectOption } from '../components/ui'
import { useForm } from 'react-hook-form'
import { createRequestRequest } from '../api/requests.api.js';
import {useAuth} from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import {useState} from 'react'

function RequestFormPage() {

  const {user} = useAuth()

  const { register, handleSubmit, formState:{
    errors
  } } = useForm();
  const [postErrors, setPostErrors]= useState([]);
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await createRequestRequest(data)
      navigate('/requests')
    } catch (error) { 
      setPostErrors([error.response.data.message])
    }
  });

  return (
    <div className='flex h-[80vh] justify-center items-center'>
      <Card>
        {
          postErrors.map((errorr, i) => (
            <p key={i} className="text-red-500">{errorr}</p>
          ))
        }
        <h2 className="text-3xl font-bold my-4">Formulario de vacaciones</h2>
        <form onSubmit={onSubmit}>  
          <Label htmlFor="empleado_id">ID</Label>
          <Input type="number" placeholder="ID del empleado"
          autoFocus defaultValue= {JSON.stringify(user.empleado_id)}
          {
            ...register("empleado_id", {
              required: true,
            })
          }
          />
          {
            errors.empleado_id && <span className="text-red-500">Este campo es requerido</span>
          }

          <Label htmlFor="fecha_incio">Fecha de inicio</Label>
          <Input type="date" 
          {
            ...register("fecha_inicio", {
              required: true,
            })
          }
          />
          {
            errors.fecha_inicio && <span className="text-red-500">Este campo es requerido</span>
          }

          <Label htmlFor="fecha_fin">Fecha de fin</Label>
          <Input type="date" 
          {
            ...register("fecha_fin", {
              required: true,
            })
          }
          />
          {
            errors.fecha_fin && <span className="text-red-500">Este campo es requerido</span>
          }

          <Label htmlFor="horas">Horas</Label>
          <Input type="number" placeholder="Horas"
          autoFocus
          {
            ...register("horas", {
              required: true,
            })
          }
          />
          {
            errors.horas && <span className="text-red-500">Este campo es requerido</span>
          }

          <Label htmlFor="tipo">Tipo</Label>
          <SelectOption 
          {
            ...register("tipo", {
              required: true,
            })
          }
          >
            <option value="vacaciones">Vacaciones</option>
            <option value="permiso">Permiso</option>
            <option value="incapacidad">Incapacidad</option>  
          </SelectOption>

          <Button>Solicitar vacaciones</Button>
        </form>
      </Card>

    </div>
  )
}

export default RequestFormPage;