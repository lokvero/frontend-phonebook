import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return (
      request.then(response => {
        // console.log(response.data)
        return response.data
    })
  )
}

const create = newObject => {
  // console.log("New entry sended to DB",newObject)
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  // console.log("Updated entry sended to DB")
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const deletePerson = (id) => {
  // console.log(`Sent delete item with ${baseUrl}/${id}`)
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll , create , update , deletePerson }