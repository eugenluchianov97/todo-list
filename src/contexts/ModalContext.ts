import React, { createContext } from 'react';

const ModalContext:any = createContext<React.ReactNode|boolean>(false);

export default ModalContext;
