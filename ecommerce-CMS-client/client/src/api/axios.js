import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://sul-ecommerce-server.herokuapp.com'
})

export default instance
