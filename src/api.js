import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/';

axios.interceptors.request.use(config => {
    console.log('REQUEST', config);

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})

export default {
    getDoers: () => axios.get('doer/'),
    getDoer: id => axios.get(`doer/${id}`),
    getJobs: () => axios.get('request/'),
    getProfessions: () => axios.get('profession/'),
    getFilteredJobs: (professions) => axios.get('request-search/', { params: {professions: 'tesar'} }),
};