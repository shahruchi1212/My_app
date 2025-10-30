import axios from "axios";
import CODES from "../constants/StatusCodes";
import { BASE_URL } from "../constants/apiConstants";
import { store } from "../redux/store";
import { logoutUser } from "../redux/features/auth-slice";

const METHOD = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",
    PATCH: "patch",
};

class Api {
    constructor() {
        this.baseURL = BASE_URL;
    }

    get(url, data) {
        return new Promise((resolve, reject) => {
            this.api(METHOD.GET, url, data).then(resolve).catch(reject);
        });
    }

    post(url, data) {
        return new Promise((resolve, reject) => {
            this.api(METHOD.POST, url, data).then(resolve).catch(reject);
        });
    }

    put(url, data) {
        return new Promise((resolve, reject) => {
            this.api(METHOD.PUT, url, data).then(resolve).catch(reject);
        });
    }

    delete(url, data) {
        return new Promise((resolve, reject) => {
            this.api(METHOD.DELETE, url, data).then(resolve).catch(reject);
        });
    }

    patch(url, data) {
        return new Promise((resolve, reject) => {
            this.api(METHOD.PATCH, url, data).then(resolve).catch(reject);
        });
    }

    api(method, url, data) {
        const headers = this.setHeaders(data);

        return new Promise((resolve, reject) => {
            const axiosConfig = {};


            axiosConfig.method = method;
            axiosConfig.headers = headers;
            axiosConfig.url = this.baseURL + url;

            if (data) {
                if (data.params) axiosConfig.params = data.params;

                if (data.data) axiosConfig.data = data.data;
            }



            axios(axiosConfig)
                .then((response) => {
                    if (response?.status === CODES.UNAUTHORIZED) {
                        store.dispatch(logoutUser());
                    } else if (response?.status === CODES.SERVER_ERROR) {
                        if (data && data.skipErrorHandling) reject(response.data);
                    } else {
                        resolve(response?.data);
                    }
                })
                .catch((error) => {
                    if (error?.response?.status === CODES.UNAUTHORIZED) {
                        store.dispatch(logoutUser());
                    }
                    // Alert.alert(error?.response?.data?.message);

                    // Toast.show({
                    //   // text1: 'Error',
                    //   text1: error?.response?.data?.message,
                    //   type: "error",
                    // });
                    reject({ ...error?.response?.data });
                    // reject({ ...error?.response?.data, status: error?.response?.status });
                });
        });
    }

    setHeaders(data) {
        const headers = {};

        headers["accept-language"] = "en";
        headers["Content-Type"] = "application/json";

        if (data) {
            if (data.isMultipart) headers["Content-Type"] = "multipart/form-data";

            if (data.headers) {
                for (var key in data.headers) {
                    if (data.headers.hasOwnProperty(key)) {
                        headers[key] = data.headers[key];
                    }
                }
            }
        }

        const { isLoggedIn, token, businessConfirm } = store.getState().auth;


        if ((isLoggedIn === true || businessConfirm === true) && !(data && data.skipAuth))
            headers.Authorization = `Bearer ${token}`

        return headers;
    }
}

export default Api;
