import { UserDataContext } from "../contexts";
import { useContext } from "react";

// only access userData when the user is logged it.

export const useUserData = () => {
    const { userData, userDispatch } = useContext(UserDataContext);


    return { userData, userDispatch }
}
