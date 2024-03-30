import React, { createContext, useState } from 'react';

export const DataContext = createContext(null);

const Dataprovider = ({ children }) => {
    const [account, setAccount] = useState({id:"", username: "", email: "",phonenumber:"",institution:"",standard:"" });

    return (
        <DataContext.Provider value={{
            account,
            setAccount
        }}>
            {children}
        </DataContext.Provider>

    )
}

export default Dataprovider;