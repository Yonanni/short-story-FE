import {createContext, ReactChild, useContext} from "react"



type childProps = {
    children: ReactChild
  }
const userContext = createContext<string>("")
export const useUser = () => useContext(userContext)

const CurrentUser = ({children}: childProps) => {
    
    

    return (
        <userContext.Provider value={"Breeze Stories"}>
            {children}
        </userContext.Provider>
    )
}
export default CurrentUser