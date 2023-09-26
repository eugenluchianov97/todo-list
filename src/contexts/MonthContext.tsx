import React, { createContext } from 'react';

const MonthContext:any = createContext<number|any>(new Date().getMonth());

export default MonthContext;
