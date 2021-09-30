import axios from 'axios';

export const requestLogin = (http, params) => {return http.post('Users/login', params).then(res => res); };

export const getReservation = (http, params) => { 
    // var user = JSON.parse(sessionStorage.getItem('user'));
    var url = 'Reservations'
    return http.get(createFilter(url, params)).then(res => res); 
};
export const createReservation = (http, params) => { 
    var url = 'Reservations';
    return http.post(url, params).then(res => res); 
};
export const editReservation = (http, reservationId, params) => { 
    // var user = JSON.parse(sessionStorage.getItem('user'));
    var url = 'Reservations/' + reservationId;
    return http.patch(url, params).then(res => res); 
};

export const getPreExaminations = http => { return http.get('PreExaminations').then(res => res);  };

export const getExaminations = http => { return http.get('Examinations').then(res => res); };

export const getCustomers = (http, params) => {
    var url = 'Customers'
    return http.get(createFilter(url, params)).then(res => res); 
};

export const editCustomers = (http, customerId, params) => {
    var url = 'Customers/' + customerId;
    return http.patch(url, params).then(res => res); 
};

export const getHospitals = (http, params) => {
    var url = 'Hospitals'
    return http.get(createFilter(url, params)).then(res => res); 
};
export const createHospitals = (http, params) => {
    var url = 'Hospitals'
    return http.post(url, params).then(res => res); 
};
export const updateHospitals = (http, hospitalId, params) => {
    var url = 'Hospitals/' + hospitalId
    return http.patch(url, params).then(res => res); 
};
export const getMedicals = (http, params) => {
    var url = 'Medicals'
    return http.get(createFilter(url, params)).then(res => res); 
};
export const updateMedicals = (http, medicalId, params) => {
    var url = 'Medicals/' + medicalId
    return http.patch(url, params).then(res => res); 
};

export const getGroups = (http, params) => {
    var url = 'Groups'
    return http.get(createFilter(url, params)).then(res => res); 
};

export const createGroups = (http, params) => {
    var url = 'Groups'
    return http.post(url, params).then(res => res); 
};
export const updateGroups = (http, groupId ,params) => {
    var url = 'Groups/' + groupId;
    return http.patch(url, params).then(res => res); 
};

export const getInquiries = (http, params) => {
    var url = 'Inquiries'
    return http.get(createFilter(url, params)).then(res => res); 
};

export const editInquiries = (http, inquiryId, params) => {
    var url = 'Inquiries/' + inquiryId;
    return http.patch(url, params).then(res => res); 
};

function createFilter(url, params){
    var paramStr = '';
    if(params != null){
        paramStr = encodeURI(JSON.stringify(params));
    }
    if(paramStr.length > 0){
        return url = url + '?filter=' + paramStr;
    }
    return url;
}