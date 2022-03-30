import Navbar from "../components/Navbar";
import './Layout.css';

const Layout = props => {
    return (
        <>
            <Navbar/>
            <div className={'container layout'}>
                {props.children}
            </div>
        </>
    );
};

export default Layout;
