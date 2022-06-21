import React from "react"
import { Toast, ToastContainer } from "react-bootstrap";

const TOAST_DELAY = 3000;

export default function AppToast(props) {
    return (
        <ToastContainer className="p-3" position="bottom-center" >
            <Toast
                onClose={props.hideToast}
                show={props.showToast}
                delay={TOAST_DELAY}
                autohide
                bg={props.bg}
                className={props.bg === "success" ? "text-white" : "text-dark"}
            >
                <Toast.Body>{props.message}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}
