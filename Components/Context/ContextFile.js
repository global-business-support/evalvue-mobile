import React, { createContext, useEffect } from "react";
import { getStringData, removeData, storeData } from "../../API-Management/mmkv-Storage";

const UserContext = createContext();
const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(() => {
      return getStringData('userId') || null;
    });
    useEffect(() => {
        if (userId !== null) {
          storeData('userId', userId);
        } else {
          removeData('userId');
        }
      }, [userId]);
    return (
        <UserContext.Provider value={{ userId, setUserId }}>
          {children}
        </UserContext.Provider>
      );
    };

    export { UserContext, UserProvider};