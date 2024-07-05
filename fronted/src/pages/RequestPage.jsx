import { useEffect } from 'react'
import RequestCard from '../components/requests/RequestCard.jsx'
import { useRequests } from '../context/RequestContext.jsx'

/**
 * Renders the RequestPage component.
 * 
 * @returns {JSX.Element} The rendered RequestPage component.
 */
function RequestPage() {
  console.log('Estoy en el RequestPage')
  const { requests, loadRequests } = useRequests();
  console.log(requests)

  useEffect(() => {
    loadRequests();
  }, []);

  // if (requests.length === 0) return (
  //   <div className='flex justify-center items-center h-[calc(100vh-10rem)]'>
  //     <h1 className='text-3xl font-bold'>No hay solicitudes</h1>
  //     <p className='text-lg'>Puedes crear una nueva solicitud presionando el botón de abajo</p>
  //   </div>
  // )

  return (
    <div className='grid grid-cols-3 gap-2'>
      {
        requests.map((request) => (
          <RequestCard request={request} key={request.ausencia_id} />
        ))
      }
    </div>
  );
}

export default RequestPage