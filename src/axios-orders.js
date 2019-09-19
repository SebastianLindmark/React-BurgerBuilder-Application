import axios from 'axios'


const instance = axios.create({
    baseURL : "https://the-burger-application.firebaseio.com"
})

export default instance;
