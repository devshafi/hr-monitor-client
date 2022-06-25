import React from "react"
import { Routes, Route, Navigate } from "react-router-dom";
import AddEmployee from "../../pages/AddEmployee";
import ShowEmployees from "../../pages/ShowEmployees";
import UploadFiles from './../../pages/UploadFiles';

export default function AppRoute() {
    return (
        <Routes>
            <Route index element={ <Navigate to="add-employee" replace={true} />} />
            <Route path="add-employee" element={<AddEmployee />} />
            <Route path="upload-files" element={<UploadFiles />} />
            <Route path="show-employees" element={<ShowEmployees/>} />
        </Routes>
    )
}
