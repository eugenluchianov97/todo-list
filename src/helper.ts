
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
    let items = getFromJSON('ITEMS');
    items.push(data);
    setToJSON('ITEMS', items)
}

export const getFromJSON = (key:string) :any => {
    let json:string|null = localStorage.getItem(key);
    return json === null ?  [] : JSON.parse(json)
}

export const setToJSON = (key:string,arr:any):void => {
    localStorage.setItem(key, JSON.stringify(arr))
}

