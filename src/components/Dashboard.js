import { useState } from "react";
import { Container } from "react-bootstrap";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./navigation/Navbar";
import SideBar from "./navigation/SideBar";


export default function Dashboard() {

    const [active, setActive] = useState(false);

    const toggleActive = () => {
        setActive(prevActive => !prevActive)
    }


    return (
        <>
            <SideBar active={active} toggleActive={toggleActive} />
            <Container fluid className="px-0">
                <div className={`content ${active ? "active-content" : ""}`}>
                    <Navbar toggleActive={toggleActive} />
                    <div className="p-3">
                        <AppRoutes />
                    </div>
                </div>

                {/* sidebar overlay for mobile site */}
                <div className={`${active ? "side-nav-wrapper" : ""}`} onClick={toggleActive}></div>
            </Container>
        </>

    )

}