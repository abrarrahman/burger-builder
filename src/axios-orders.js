import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-89672.firebaseio.com/'
});
export default instance;