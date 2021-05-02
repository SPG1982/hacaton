import {api} from "./api";

export const userAPI = {
    login (email, password) {
        return api.post(`/users/login`, {email, password})
            .then(response => {
                return response.data;
            });
    },
    loginId (id) {
        return api.post(`/users/loginId`, {id})
            .then(response => {
                return response.data;
            });
    },
    signUp (fio, email, password) {
        return api.post(`/users/signUp`, {fio, email, password})
            .then(response => {
                return response.data;
            });
    },
}