import axios from 'axios';
import {Roles} from "./constants";

axios.defaults.baseURL = 'http://127.0.0.1:8000/';

axios.interceptors.request.use(config => {
    console.log('REQUEST', config);

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})

const setToken = (access, refresh) => {
    axios.defaults.headers['Authorization'] = 'Bearer ' + access;
    localStorage.accessToken = access;
    localStorage.refreshToken = refresh;
};

if (localStorage.accessToken) {
    axios.defaults.headers['Authorization'] = 'Bearer ' + localStorage.accessToken;
}

export default {
    getDoers: () => axios.get('doer/'),
    getDoer: id => axios.get(`doer/${id}`),
    getJobs: () => axios.get('request/'),
    getJob: id => axios.get(`request/${id}/`),
    getProfessions: () => axios.get('profession/'),
    getFilteredJobs: professions => axios.get('request-search/', { params: { professions: professions.join() } }),
    postJob: job => axios.post('request/', { ...job }),
    register: async (userData, role) => {
        const response = await axios.post('dj-rest-auth/registration/', userData.userProfile);
        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;
        const user = response.data.user;
        setToken(accessToken, refreshToken);

        // const path = role === Roles.DOER ? 'doer/' : 'employer/';
        // await axios.post(path, {
        //     user: response.data.user.pk,
        //     phone_no: userData.phone_no,
        //     birth_date: userData.birth_date
        // });
    }
};