import React from "react"
import { Routes, Route, Navigate } from "react-router-dom";
import FileUpload from "../users/forms/FileUpload";
import EmployeeForm from "../users/forms/EmployeeForm";
import EmployeesTable from "../users/table/EmployeesTable";

export default function AppRoute() {
    return (
        <Routes>
            <Route index element={ <Navigate to="add-employee" replace={true} />} />
            <Route path="add-employee" element={<EmployeeForm />} />
            <Route path="upload-files" element={<FileUpload />} />
            <Route path="show-employees" element={<EmployeesTable />} />
        </Routes>
    )
}
