import axios from "axios";

const host = 'http://localhost:8000';

const token = () => {
    return localStorage.getItem("token")
}

export const csrf_cookie = async () => {
    const config = {
        withCredentials: true
    }
    return await  axios.get(host + '/sanctum/csrf-cookie',config).then(res => {
        return res;
    }).catch(err => { return err})
}
export const login = async (data:any) => {
    const config = {
        headers:{
            //"Authorization": "Bearer " + token,
            "Accept":"application/json",

        },
        withCredentials: true
    }

    let result = await csrf_cookie()

    if(result.status === 204){
        return await axios.post(host+'/api/auth/login',data, config).then((res:any) => {
            return res;
        }).catch(err => {
            return err
        })
    }

    return result


}


export const register = async (data:any) => {
    const config = {
        headers:{
            "Accept":"application/json",
        },
        withCredentials: true
    }

    let result = await csrf_cookie()

    if(result.status === 204){
        return await axios.post(host+'/api/auth/register',data, config).then((res:any) => {
            return res;
        }).catch(err => {
            return err
        })
    }

    return result
}

export const logout = async () => {
    const config = {
        headers:{
            "Authorization": "Bearer " + token(),
            "Accept":"application/json",
        },
        withCredentials: true
    }

    return await axios.post(host+'/api/auth/logout',{}, config).then((res:any) => {
        return res;
    }).catch(err => {
        return err
    })
}

export const me = async () => {
    const config = {
        headers:{
            "Authorization": "Bearer " + token(),
            "Accept":"application/json",

        },
        withCredentials: true
    }

    return await axios.get(host+'/api/me', config).then((res:any) => {
        return res;
    }).catch(err => {
        return err
    })
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

export const itemsIndex = async (date:any, month:any, year:any) => {
    month = parseInt(month +1);
    if (month < 10) month = '0' + month;
    if (date < 10) date = '0' + date;
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


export const itemsTasks = async (month:any, year:number) => {
    month = parseInt(month +1);
    if (month < 10) month = '0' + month;

    const config = {
        headers:{
            "Authorization": "Bearer " + token(),
            "Accept":"application/json",

        },
        withCredentials: true
    }

    return await axios.get(host+'/api/items/tasks?month='+month + '&year='+year, config).then((res:any) => {
        return res;
    }).catch(err => {return err})
}


export const confirmCode = async (data:any) => {
    const config = {
        headers:{
            "Authorization": "Bearer " + token(),
            "Accept":"application/json",

        },
        withCredentials: true
    }

    return await  axios.post(host+'/api/auth/confirm',data, config).then((res:any) => {
        return res;
    }).catch(err => {return err})
}



export const accountDelete = async () => {
    const config = {
        headers:{
            "Authorization": "Bearer " + token(),
            "Accept":"application/json",

        },
        withCredentials: true
    }

    return await axios.delete(host+'/api/account/', config).then((res:any) => {
        return res;
    }).catch(err => {
        return err
    })
}

export const passwordReset = async (data:any) => {
    const config = {
        headers:{
            "Authorization": "Bearer " + token(),
            "Accept":"application/json",

        },
        withCredentials: true
    }

    return await  axios.post(host+'/api/password/reset',data, config).then((res:any) => {
        return res;
    }).catch(err => {return err})
}

export const passwordChange = async (data:any) => {
    const config = {
        headers:{
            "Authorization": "Bearer " + token(),
            "Accept":"application/json",

        },
        withCredentials: true
    }

    return await  axios.post(host+'/api/password/new',data, config).then((res:any) => {
        return res;
    }).catch(err => {return err})
}


