import axios from "axios";

import Endpoints from './endpoints'
import { store } from "../store";
import { getAccessToken } from "../store/auth/actionCreators";

export const axiosInstance = axios.create()

const urlsSkipAuth = [Endpoints.AUTH.LOGIN, Endpoints.AUTH.REFRESH, Endpoints.AUTH.LOGOUT]



// if (import.meta.env.DEV) {
//   axios.defaults.baseURL = '/api'
// }

axiosInstance.interceptors.request.use(async (config) => {
    if (config.url && urlsSkipAuth.includes(config.url)) {
        return config
    }

    const accessToken = await store.dispatch(getAccessToken())

    if (accessToken) {
        const authorization = `Bearer ${accessToken}`

        config.headers['Authorization'] = authorization;
    }

    return config
})