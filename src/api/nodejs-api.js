import {api} from './api'

export const nodejsApi = {
    // getQuest (idQuest) {
    //     return api.get(`/quests/${idQuest}`)
    //         .then(response => {
    //             return response.data;
    //         });
    // },
    // getQuests (activePage, user='', develop='') {
    //     return api.get(`/quests?activePage=${activePage}&user=${user}&develop=${develop}`)
    //         .then(response => {
    //             return response.data;
    //         });
    // },
    sendImage (image) {
        return api.post('/', {image})
            .then(response => {
                return response.data;
            });
    },
    // saveQuest (id, slides, email, email_user, role, titleSlide, status) {
    //     return api.post('/quests/saveQuest', {'slides':slides, 'id':id, 'email': email, 'email_user':email_user, 'role':role, 'title': titleSlide, 'status': status})
    //         .then(response => {
    //             return response.data;
    //         });
    // },
    // deleteQuest (id) {
    //     return api.post('/quests/deleteQuest', {'id':id})
    //         .then(response => {
    //             return response.data;
    //         });
    // },
}