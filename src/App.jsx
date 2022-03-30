import {Navigate, Route, Routes} from "react-router-dom";
import {useAuth} from "./shared/AuthContext";
import './App.css';
import Layout from "./layout/Layout";
import Cars from "./components/Cars";
import Garage from "./components/Garage";
import Friends from "./components/Friends";
import Auth from "./components/Auth";
import Logout from "./components/UI/Logout";


function App() {
    const {auth} = useAuth();

    const renderRoutes = () => {
        if(auth) {
            return <>
                <Route path={'garage'} element={<Garage />}/>
                <Route path={'friends'} element={<Friends />}/>
                <Route path={'logout'} element={<Logout />}/>
            </>
        } else {
            return <Route path={'auth'} element={<Auth />}/>
        }
    }

    return (
    <Layout>
        <Routes>
            <Route index element={<Cars />}/>
            {renderRoutes()}
            <Route path='*' element={<Navigate to='/' />}/>
        </Routes>
    </Layout>
  );
}

export default App;
