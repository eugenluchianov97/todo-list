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


export const itemsStore = async (data:any) => {
    const config = {
        headers:{
            "Authorization": "Bearer " + token(),
            "Accept":"application/json",

        },
        withCredentials: true
    }

    return await axios.post(host+'/api/items',data, config).then((res:any) => {
        return res;
    }).catch(err => {
        return err
    })
}

export const itemsIndex = async (date:number, month:number, year:number) => {
    const config = {
        headers:{
            "Authorization": "Bearer " + token(),
            "Accept":"application/json",

        },
        withCredentials: true
    }

    return await axios.get(host+'/api/items?date='+date + '&month='+month + '&year='+year, config).then((res:any) => {
        return res;
    })
}


export const itemsUpdate = async (id:number,data:any) => {
    const config = {
        headers:{
            "Authorization": "Bearer " + token(),
            "Accept":"application/json",

        },
        withCredentials: true
    }

    return await axios.post(host+'/api/items/' + id,data, config).then((res:any) => {
        return res;
    }).catch(err => {
        return err
    })
}


export const itemsDelete = async (id:number) => {
    const config = {
        headers:{
            "Authorization": "Bearer " + token(),
            "Accept":"application/json",

        },
        withCredentials: true
    }

    return await axios.delete(host+'/api/items/' + id, config).then((res:any) => {
        return res;
    }).catch(err => {
        return err
    })
}

export const itemsComplete = async (id:number) => {
    const config = {
        headers:{
            "Authorization": "Bearer " + token(),
            "Accept":"application/json",

        },
        withCredentials: true
    }

    return await  axios.post(host+'/api/items/complete/' + id,{}, config).then((res:any) => {
        return res;
    }).catch(err => {return err})
}


export const itemsTasks = async (month:number, year:number) => {

    const config = {
        headers:{
            "Authorization": "Bearer " + token(),
            "Accept":"application/json",

        },
        withCredentials: true
    }

    return await axios.get(host+'/api/items/tasks?month='+month + '&year='+year, config).then((res:any) => {
        return res;
    })
}
