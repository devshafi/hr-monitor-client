import { Form } from "react-bootstrap"

export default function TableRows(props) {

    const tableRows = props.employees.map(employee => {

        const isSelected = props.selectedEmployees.some(user => user.id === employee.id);

        return (
            <tr key={employee.id} >
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td><Form.Check
                    aria-label="Send email checkbox"
                    type="checkbox"
                    onChange={(e) => props.toggleSendMailCheckbox(e, employee)}
                    checked={isSelected}
                />
                </td>
            </tr>
        )
    })

    return tableRows;
}
