import { useState } from "react";
import { Button, Col, Form, Row, Card, Spinner } from "react-bootstrap";
import { validateUserForm } from "../../../utils/formValidation/validator";
import Toaster from "../../shared/Toaster";
import { addEmployee } from "../../../api/employee";

export default function UserForm() {

    const initialState = { firstName: "", lastName: "", email: "" };
    const [user, setUser] = useState(initialState);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({ bg: "", msg: "" });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});


    const handleOnChange = (e => {
        const { name, value } = e.target;
        setUser(prevUser => {
            return ({
                ...prevUser,
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
    })

    // form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateUserForm(user);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        }
        else {
            try {
                setLoading(true);
                const data = await addEmployee(user);
                setToastMessage({ msg: data.message, bg: "success" })
                setShowToast(true)
                setUser(initialState);
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
            <Row >
                <Col sm={true} md={5} xxl={4} >
                    <Card className="p-4">
                        <Form >
                            <Form.Group className="mb-3" controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    placeholder="Ex-John"
                                    value={user.firstName}
                                    onChange={handleOnChange}
                                    isInvalid={!!errors.firstName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.firstName}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    placeholder="Ex-Doe"
                                    value={user.lastName}
                                    onChange={handleOnChange}
                                    isInvalid={!!errors.lastName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.lastName}
                                </Form.Control.Feedback>

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="johndoe@example.com"
                                    value={user.email}
                                    onChange={handleOnChange}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>

                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={loading}  onClick={handleSubmit}>
                                Submit
                                {loading && <Spinner animation="border" role="status" variant="light" size="sm" className="mx-2" />}
                            </Button>
                        </Form>
                    </Card>

                </Col>

            </Row>

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