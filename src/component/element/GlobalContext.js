import React, { createContext, useState } from 'react';
import { calculateAmount } from '../tool/toolAll';
import { cartTitle } from '../../services/apiService';

// Tạo Context
export const GlobalContext = createContext();

// Tạo Provider để bao bọc ứng dụng và cung cấp giá trị cho các component con
export const GlobalProvider = ({ children }) => {


    const cartData = JSON.parse(localStorage.getItem(cartTitle));
    let init = calculateAmount(cartData);

    const [globalVariable, setGlobalVariable] = useState(init);
    return (
        <GlobalContext.Provider value={{ globalVariable, setGlobalVariable }}>
            {children}
        </GlobalContext.Provider>
    );
};
