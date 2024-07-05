import {Card, Button} from '../ui'
import {deleteRequestRequest} from '../../api/requests.api.js'
import {useRequests} from '../../context/RequestContext.jsx'
import {useNavigate} from 'react-router-dom'

function RequestCard({ request }) {
  const { deleteTask } = useRequests();
  const navigate = useNavigate();


  return (
    <Card key={request.ausencia_id} className="px-7 py-2">
        <div>
          <h1 className='text-2xl font-bold'>{request.tipo}</h1>
          <p>Fecha de inicio: {request.fecha_inicio}</p>
          <p>Fecha de fin: {request.fecha_fin}</p>
        </div>

        <div className='my-2 flex justify-end gap-x-2'>
          <Button>Editar</Button>
          <Button
          className='bg-red-500 hover:bg-red-400'
          onClick={ async () => {
            if(window.confirm('¿Estás seguro de que quieres eliminar esta solicitud?')){
              const res = await deleteRequestRequest(request.ausencia_id)
              console.log(res)
            }
          }}
          >Eliminar</Button>
        </div>
        
    </Card>
  )
}

export default RequestCard