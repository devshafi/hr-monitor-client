import { Pagination as PaginationBs } from "react-bootstrap";


export default function UsersPagination(props) {

    const totalCount = props.totalCount;
    const limit = props.limit;
    const currentPage = props.offset;
    const totalPages = Math.ceil(totalCount / limit);

    return (
        <div className="d-flex align-items-center justify-content-end">
            <p className="me-4 fs-6 text-muted" >Showing {currentPage} of {totalPages}</p>
            <PaginationBs >
                <PaginationBs.Prev
                    disabled={currentPage === 1}
                    onClick={() => props.changePage(currentPage - 1)}
                />

                <PaginationBs.Next
                    disabled={currentPage === totalPages}
                    className="ms-3"
                    onClick={() => props.changePage(currentPage + 1)}
                />
            </PaginationBs>
        </div>

    )
}
