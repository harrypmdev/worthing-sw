import axios from 'axios';

axios.defauts.baseURL = 'https://worthing-sw-api-fc5a7cd44915.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;