import axios from "axios";

const host = 'http://localhost:8000'

export const csrf_cookie = () => {
    const config = {
        withCredentials: true
    }
    return axios.get(host + '/sanctum/csrf-cookie',config)
}
export const login = (data:any) => {
    const config = {
        headers:{
            //"Authorization": "Bearer " + token,
            "Accept":"application/json",

        },
        withCredentials: true
    }

    return csrf_cookie().then((res:any) => {
        return axios.post(host+'/api/auth/login',data, config)
    })
}


export const register = (data:any) => {
    const config = {
        headers:{
            "Accept":"application/json",
        },
        withCredentials: true
    }

    return csrf_cookie().then((res:any) => {
        return axios.post(host+'/api/auth/register',data, config)
    })


}
