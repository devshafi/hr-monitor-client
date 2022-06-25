import { useState, useRef } from "react"
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { uploadCSV } from "../../../api/employee"
import Toaster from "../../shared/Toaster";

const KILO_BYTES_PER_BYTE = 1000;
const CSV_TYPE = /csv.*/;

const convertBytesToKB = (bytes) => Math.ceil(bytes / KILO_BYTES_PER_BYTE);

export default function FileUpload({
    label,
}) {

    const fileInputField = useRef(null);
    const [file, setFile] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({ bg: "", msg: "" });
    const [loading, setLoading] = useState(false);

    const handleInputBtnClick = () => {
        fileInputField.current.click();
    };


    const removeFile = (fileName) => {
        delete file[fileName];
        setFile({ ...file });
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (!file.type.match(CSV_TYPE)) {  // only allow csv
            return
        }
        setFile(file);
    };

    const handleFileUpload = async () => {
        try {
            setLoading(true);
            const data = await uploadCSV(file);
            setToastMessage({ msg: data.message, bg: "success" })
            setFile({});
        } catch (error) {
            setToastMessage({ msg: error.message, bg: "warning" })
        }
        finally {
            setShowToast(true)
            setLoading(false);
        }
    }

    return (
        <>
            <Row>
                <Col md={6}>
                    <Card className="p-3">
                        {<Card.Body>
                            <Card.Title>{label}</Card.Title>
                            <Card.Subtitle className="mt-0 text-muted">
                                Drag and drop your CSV file here or
                            </Card.Subtitle>
                            <Button
                                className="mt-4"
                                variant="primary"
                                onClick={handleInputBtnClick}
                            >
                                {file?.size ? "Inserted" : "Insert CSV"}
                            </Button>
                            <input
                                disabled={file.size}
                                className="file-input"
                                type="file"
                                accept=".csv"
                                ref={fileInputField}
                                onChange={handleFileInput}
                                title=""
                                value=""
                            />

                        </Card.Body>
                        }
                    </Card>

                    {file?.name && <Card className="mt-4">
                        <Card.Body>
                            <p>File Name: {file.name}</p>
                            <p>File Size: <span>{convertBytesToKB(file.size)} kb</span></p>
                            <div className="mt-4">
                                <Button onClick={() => removeFile(file.name)} variant="danger" disabled={loading}>
                                    Remove
                                </Button>
                                <Button className="mx-2" disabled={loading} onClick={handleFileUpload} >
                                    Upload {loading && <Spinner animation="border" role="status" variant="light" size="sm" className="mx-2" />}
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                    }

                </Col >
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
