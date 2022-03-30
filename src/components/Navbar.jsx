import {NavLink} from "react-router-dom";
import logo from '../assets/favicon.png'
import './Navbar.scss'
import {useAuth} from "../shared/AuthContext";

const Navbar = () => {
    const {auth} = useAuth();

    const links = [{to: '/', name: 'Cars'}];
    const signedOutLinks = [{to: 'auth', name: 'Auth'}]
    const signedInLinks = [
        {to: 'garage', name: 'Garage'},
        {to: 'friends', name: 'Friends'},
        {to: 'logout', name: 'Logout'},
    ]

    auth ? links.push(...signedInLinks) : links.push(...signedOutLinks);

    return (
            <nav>
                <ul>
                    <li>
                        <NavLink to={'/'}>
                            <img src={logo} style={{borderRadius: '50%', height: 30}} alt="icon" />
                        </NavLink>
                    </li>
                    {links.map((link, index) => {
                        return <li key={index}>
                            <NavLink to={link.to}>{link.name}</NavLink>
                        </li>
                    })}
                    {/*<li>*/}
                    {/*    <NavLink to={'/'}>Cars</NavLink>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <NavLink to={'garage'}>Garage</NavLink>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <NavLink to={'friends'}>Friends</NavLink>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <NavLink to={'auth'}>Auth</NavLink>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <NavLink to={'logout'}>Logout</NavLink>*/}
                    {/*</li>*/}
                </ul>
            </nav>
    );
};

export default Navbar;
