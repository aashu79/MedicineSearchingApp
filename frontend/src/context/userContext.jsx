import { createContext, useContext, useReducer } from "react";


const initialUserState = { id: null, userName: null, isVerified: false };
const userContext = createContext(initialUserState);

const reducer =  (state = initialUserState, action) => {
  switch (action.type) {
    case "login":
      const userData = action.payload;
      
      return {
        ...state,
        id: userData?.id,
        userName: userData?.userName,
        isVerified: userData?.isVerified,
      };
      case 'setUser':
        const fetchedUser = action.payload;
        
        return{
          ...state,
          id: fetchedUser?.id,
          userName: fetchedUser?.userName,
          isVerified: fetchedUser?.isVerified
        }

    default:
      return state;
  }
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialUserState);
 

  return (
    <userContext.Provider value={{ state, dispatch }}>
      {children}
    </userContext.Provider>
  );
};

const useUserContext = () => {
  const { state, dispatch } = useContext(userContext);
  return { state, dispatch };
};



export { userContext, UserContextProvider, useUserContext };
