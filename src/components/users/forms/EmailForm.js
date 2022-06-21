import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useState } from "react";
import { validateEmailForm } from "../../../utils/formValidation/validator";
import { sendEmail } from "../../../api/employee"; 
import Toaster from "../../shared/Toaster"

export default function EmailForm(props) {

    const initialEmailState = { subject: "", body: "" };
    const [email, setEmail] = useState(initialEmailState);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState({ bg: "", msg: "" });
    const [showToast, setShowToast] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmail(prevEmail => {
            return ({
                ...prevEmail,
                [name]: value
            })
        })

        // remove error for the field from errors object if exists
        if (!!errors[name]) {
            setErrors(pervErrors => {
                return ({
                    ...pervErrors,
                    [name]: null
                })
            })
        }
    }

    // reset states on modal exit
    const handleModalExit = () => {
        setEmail(initialEmailState)
        setErrors({})
    }


    // form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateEmailForm(email);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            try {
                setLoading(true);
                const to = props.selectedEmployees.map(employee => employee.email);
                const data = await sendEmail({ email, to });
                setToastMessage({ msg: data.message, bg: "success" })
                setEmail(initialEmailState)
                props.onSuccess();
                setShowToast(true)

            } catch (error) {
                setToastMessage({ msg: error.message, bg: "warning" })
            }
            finally {
                setShowToast(true)
                setLoading(false)

            }

        }

    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} centered onExit={handleModalExit} backdrop="static">
                <Modal.Header closeButton={!loading}>
                    <Modal.Title>Compose Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="subject">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                name="subject"
                                placeholder="eg: Important meeting"
                                value={email.subject}
                                onChange={(e) => handleChange(e)}
                                isInvalid={!!errors.subject}
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.subject}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="body"
                        >
                            <Form.Label>Body</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="body"
                                value={email.body}
                                onChange={(e) => handleChange(e)}
                                isInvalid={!!errors.body}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.body}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button disabled={loading} variant="primary" onClick={handleSubmit}>
                            Send Email
                            {loading && <Spinner animation="border" role="status" variant="light" size="sm" className="mx-2" />}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {
                showToast &&
                <Toaster
                    hideToast={() => setShowToast(false)}
                    showToast={showToast}
                    bg={toastMessage.bg}
                    message={toastMessage.msg} />
            }

        </>

    )
}
