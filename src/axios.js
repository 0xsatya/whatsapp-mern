import axios from 'axios'

const instance = axios.create({
    // baseURL: 'https://jabbers.herokuapp.com/'
    // baseURL: 'http://localhost:9000'
    baseURL: ''
})

export default instance;