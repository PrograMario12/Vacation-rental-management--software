import axios from './axios'

export const createRequestRequest = (request) => axios.post('/task', request)

export const getAllRequestsRequest = () => axios.get('/task')

export const deleteRequestRequest = (id) => axios.delete(`/task/${id}`)