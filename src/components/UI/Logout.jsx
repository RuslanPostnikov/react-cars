import { getAuth, signOut } from "firebase/auth";
import app from "../../firebase/config";
import {Navigate} from "react-router-dom";
import {useAuth} from "../../shared/AuthContext";


const Logout = () => {
    const fireAuth = getAuth(app);
    const {setAuth} = useAuth();

    signOut(fireAuth)
        .then(() => {
            setAuth(false);
            console.log('logout successful');
        })
        .catch((error) => console.log(error));

    return (
        <Navigate to="/" replace />
    )
};

export default Logout;

