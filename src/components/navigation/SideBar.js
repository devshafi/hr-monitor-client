import { Nav } from "react-bootstrap"
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../../img/logo.png";
import { sideBarData } from "../../data/sidebarData";
import useWindowSize from "../../hooks/useWindowSize";
const SMALL_SCREEN_WIDTH = 776;
export default function SideBar(props) {

    const { windowDimensions } = useWindowSize();

    // hide sidebar on nav item click on small device
    const handleNavClick = () => {
        if (windowDimensions.width < SMALL_SCREEN_WIDTH) {
            props.toggleActive();
        }
    }

    const navLinkElements = sideBarData.map((data, index) => {
        return (
            <Nav.Item as="li" key={index}>
                <NavLink to={data.path} className="nav-item d-block">
                    <div className="d-flex align-items-center">
                        <span className="ms-3">{data.icon}</span>
                        <span className="mx-3">{data.title}</span>
                    </div>
                </NavLink>
            </Nav.Item>
        )
    })

    return (
        <nav
            className={`sidebar border-end ${props.active ? "active" : ""}`} id="side-nav">
            <div className="d-flex justify-content-between border-bottom mx-4 mt-1 p-3 ">
                <img src={logo} alt="HR Monitor" className="logo" />
                <FaBars onClick={props.toggleActive} className="menu d-md-none" />
            </div>

            <Nav as="ul" className="d-flex flex-column m-4" onClick={handleNavClick} >
                {navLinkElements}
            </Nav>
        </nav>
    )
}
