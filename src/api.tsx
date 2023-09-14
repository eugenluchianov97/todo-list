import axios from "axios";

const host = 'http://localhost:8000';

const token = () => {
    return localStorage.getItem("token")
}

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

export const logout = () => {
    const config = {
        headers:{
            "Authorization": "Bearer " + token(),
            "Accept":"application/json",
        },
        withCredentials: true
    }

    return axios.post(host+'/api/auth/logout',{}, config)
}

export const me = () => {
    const config = {
        headers:{
            "Authorization": "Bearer " + token(),
            "Accept":"application/json",

        },
        withCredentials: true
    }

    return axios.get(host+'/api/me', config)
}


export const itemsStore = (data:any) => {
    const config = {
        headers:{
            "Authorization": "Bearer " + token(),
            "Accept":"application/json",

        },
        withCredentials: true
    }

    return axios.post(host+'/api/items',data, config)
}

export const itemsIndex = (date:number, month:number, year:number) => {
    console.log('here')
    const config = {
        headers:{
            "Authorization": "Bearer " + token(),
            "Accept":"application/json",

        },
        withCredentials: true
    }

    return axios.get(host+'/api/items?date='+date + '&month='+month + '&year='+year, config)
}


export const itemsUpdate = async (id:number,data:any) => {
    const config = {
        headers:{
            "Authorization": "Bearer " + token(),
            "Accept":"application/json",

        },
        withCredentials: true
    }

    return axios.post(host+'/api/items/' + id,data, config)
}


export const itemsDelete = async (id:number) => {
    const config = {
        headers:{
            "Authorization": "Bearer " + token(),
            "Accept":"application/json",

        },
        withCredentials: true
    }

    return axios.delete(host+'/api/items/' + id, config)
}

export const itemsComplete = async (id:number) => {
    const config = {
        headers:{
            "Authorization": "Bearer " + token(),
            "Accept":"application/json",

        },
        withCredentials: true
    }

    return axios.post(host+'/api/items/complete/' + id,{}, config)
}
