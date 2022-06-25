import { useState } from "react";
import { Button, Col, Row, Table, Spinner } from "react-bootstrap";
import Pagination from "./Pagination";
import TableRows from "./TableRows";
import useEmployees from "./../../../hooks/useEmployees";
import EmailForm from "../forms/EmailForm";

export default function EmployeesTable() {

    const [paginationData, setPaginationData] = useState({ offset: 1, limit: 5, totalCount: 0 })
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const { loading, error, employees, totalCount } = useEmployees(paginationData);
    const [showEmailForm, setShowEmailForm] = useState(false);

    const toggleSendMailCheckbox = ((event, employee) => {
        const isChecked = event.target.checked;
        const exists = selectedEmployees.find(selectedEmployee => employee.id === selectedEmployee.id)
        if (isChecked && !exists) {
            setSelectedEmployees(prevEmployees => {
                return ([...prevEmployees, employee])
            })
        } else if (!isChecked && exists) {
            setSelectedEmployees(prevEmployees => prevEmployees.filter(selectedEmployee => selectedEmployee.id !== employee.id))
        }
    })

    const handlePageChange = (pageNo) => {
        setPaginationData(prevData => ({ ...prevData, offset: pageNo }))
    }

    // reset states after sending email
    const handleSuccessCb = () => {
        setShowEmailForm(false);
        setSelectedEmployees([]);
    }

    return (

        <>
            {loading && <div className="text-center " ><Spinner variant="primary" animation="border" /></div>}
            {!loading && error && <p>Something went wrong!</p>}
            {!loading && !error && employees?.length === 0 && <p>No data found!</p>}
            {
                !loading && !error && employees?.length > 0 &&
                (
                    <>
                        <Table responsive striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Send Email </th>
                                </tr>
                            </thead>
                            <tbody>
                                <TableRows
                                    employees={employees}
                                    selectedEmployees={selectedEmployees}
                                    toggleSendMailCheckbox={toggleSendMailCheckbox}
                                />
                            </tbody>
                        </Table>

                        <Pagination {...paginationData} changePage={handlePageChange} totalCount={totalCount} />

                        {selectedEmployees.length > 0 && (
                            <Button onClick={() => setShowEmailForm(true)} >Send Email (selected {selectedEmployees.length})</Button>
                        )}

                    </>
                )

            }

            <EmailForm
                show={showEmailForm}
                selectedEmployees={selectedEmployees}
                handleClose={() => setShowEmailForm(false)}
                onSuccess={handleSuccessCb}
            />


        </>

    )
}