import axios from 'axios'

const baseUrl = '/api/persons'

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((res) => res.data)
}

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { create, getAll, deletePerson }
