import { useState } from "react";
import { useEffect } from "react";
import { getEmployees } from "../api/employee";

export default function  useEmployees(paginationData) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    
    // fetching employees
    useEffect(() => {
        async function fetchEmployees() {
            try {

                setLoading(true)
                const query = { offset: paginationData.offset, limit: paginationData.limit };
                const { employees, totalCount } = await getEmployees(query);
                setEmployees(employees);
                setTotalCount(totalCount);
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false);
            }
        }
        fetchEmployees()
       
    }, [paginationData]);


    return {
        loading,
        error,
        employees,
        totalCount
    }

}