import { useState } from "react";
import { Container } from "react-bootstrap";
import AppRoutes from "../routes/AppRoutes";
import Navbar from "./Navbar";
import SideBar from "./SideBar";


export default function Dashboard() {

    const [active, setActive] = useState(false);
    
    const toggleActive = () => {
        setActive(prevActive => !prevActive)
    }
    

    return (
        <Container fluid className="px-0">
            
            <SideBar active={active} toggleActive={toggleActive} />
            <div className={`content ${active ? "active-content" : ""}`}>
                <Navbar toggleActive={toggleActive} />
                <div className="p-3">
                    <AppRoutes />
                </div>
            </div>

             {/* sidebar overlay for mobile site */}
             <div onClick={toggleActive} className={`${active ? "side-nav-wrapper" : ""}`}></div>
        </Container>
    )

}