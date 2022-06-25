import { Pagination } from "react-bootstrap";


export default function UsersPagination(props) {

    const totalCount = props.totalCount;
    const limit = props.limit;
    const currentPage = props.offset;
    const totalPages = Math.ceil(totalCount / limit);

    return (
        <div className="d-flex align-items-center justify-content-end">
            <p className="me-4 text-muted" >Showing {currentPage} of {totalPages}</p>
            <Pagination >
                <Pagination.Prev
                    disabled={currentPage === 1}
                    onClick={() => props.changePage(currentPage - 1)}
                />

                <Pagination.Next
                    disabled={currentPage === totalPages}
                    className="ms-3"
                    onClick={() => props.changePage(currentPage + 1)}
                />
            </Pagination>
        </div>

    )
}
