import axios from 'axios';
import {message} from "antd";
import {Roles} from "./constants";

axios.defaults.baseURL = 'http://127.0.0.1:8000/';

// axios.interceptors.request.use(config => {
//     console.log('REQUEST', config);
//
//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error)
// })

const setToken = (access, refresh) => {
    axios.defaults.headers['Authorization'] = 'Bearer ' + access;
    localStorage.accessToken = access;
    localStorage.refreshToken = refresh;
};

const removeToken = () => {
    localStorage.clear();
};

if (localStorage.accessToken) {
    axios.defaults.headers['Authorization'] = 'Bearer ' + localStorage.accessToken;
}

export default {
    getDoers: () => axios.get('doer/'),
    getDoer: id => axios.get(`doer/${id}`),
    getJobs: () => axios.get('request/'),
    getJob: id => axios.get(`request/${id}/`),
    getPersonalJobs: () => axios.get('personal-requests/'),
    getMyJobs: () => axios.get('my-requests-list/'),
    getProfessions: () => axios.get('profession/'),
    getFilteredJobs: (professions, min, max, status, query) => axios.get('request-search/', { params: { professions: professions.join(), min, max, status, query } }),
    postJob: job => axios.post('request/', { ...job }),
    rateDoer: (value, id) => axios.post('rate-doer/', null, { params: { rate: value, ratee: +id } }),
    getEmployers: () => axios.get('employer/'),
    getEmployer: id => axios.get(`employer/${id}/`),
    getUserInfo: userId => axios.get('user-info/', { params: { userId } }),
    reportJob: data => axios.post('report-request/', data),
    reportProfile: data => axios.post('report-profile/', data),
    submitJobRequest: data => axios.post('request-submission/', data),
    getMessages: () => axios.get('message/'),
    sendMessage: (receiver, message) => axios.post('message/', { receiver, message }),
    addFavourite: doerId => axios.post('add-favorite-doer/', null, { params: { doerId } }),
    removeFavourite: doerId => axios.post('remove-favorite-doer/', null, { params: { doerId } }),
    jobSubmissions: jobId => axios.get('submissions-by-request/', { params: { requestId: jobId } }),
    setProfileSettings: async (isDoer, id, data) => {
        try {
            const prefix = isDoer ? 'doer/' : 'employer/';
            let response = await axios.put(`${prefix}${id}/`, data);
            message.info('Uspesno izmenjene informacije o profilu!');
            return response
        } catch (error) {
            message.error(JSON.stringify(error.response.data).replaceAll(/[^\w]/g, " "));
        }
    },
    changePassword: async (passwordData) => {
        try {
            const resp = await axios.post('/dj-rest-auth/password/change/', passwordData);
            console.debug(resp);
            message.info('Uspesno izmenjena loznka!');
        } catch (error) {
            message.error(JSON.stringify(error.response.data));
        }
    },
    register: async (userData, role) => {
        try {
            const response = await axios.post('dj-rest-auth/registration/', userData.user_profile);
            const accessToken = response.data.access_token;
            const refreshToken = response.data.refresh_token;
            const user = response.data.user;
            setToken(accessToken, refreshToken);

            const path = role === Roles.DOER ? 'doer/' : 'employer/';
            await axios.post(path, {
                user_id: user.pk,
                phone_no: userData.phone_no,
                birth_date: userData.birth_date,
                user_profile: userData.user_profile,
            });

            removeToken();
            message.info('Uspesno ste se registrovali');
        } catch (error) {
            message.error(JSON.stringify(error.response.data).replaceAll(/[^\w]/g, " "));
            message.error('Nije moguca registracija, molimo pokušajte ponovo.');
        }
    },
    login: async (loginData) => {
        try {
            const response = await axios.post('dj-rest-auth/login/', loginData)
            const accessToken = response.data.access_token;
            const refreshToken = response.data.refresh_token;
            setToken(accessToken, refreshToken);
            message.info('Dobrodošli!')
            return response.data.user;
        } catch (_) {
            message.error('Pogrešno uneti podaci, molimo pokušajte ponovo.');
        }
    },
    logout: async () => {
        try {
            await axios.post('dj-rest-auth/logout/');
        } finally {
            removeToken();
        }
    },
    deactivateProfile: async () => {
        try {
            await axios.post('deactivate-profile/');
            message.info('Uspesno deaktiviran profil.');
        } catch (e) {
            message.error(e.response.data);
        }
    }
};
