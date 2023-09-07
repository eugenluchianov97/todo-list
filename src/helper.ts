
interface dataObj {
    id:number;
    subject: string;
    text: string;
    day: number;
    month: number;
    year: number;
    done:boolean;
}
export const setItem = (data:dataObj) => {
    let arr = getFromJSON('ITEMS');
    arr.push(data)
    setToJSON('ITEMS', JSON.stringify(arr))
}

export const getFromJSON = (key:string) :any[] => {
    let json:string|null = localStorage.getItem(key);
    return json === null ?  [] : JSON.parse(JSON.parse(json))
}

export const setToJSON = (key:string,arr:any):void => {
    localStorage.setItem(key, JSON.stringify(arr))
}

