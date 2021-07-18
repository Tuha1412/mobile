import React from 'react'

export const Pagination = ({productsPerPage, totalProducts, paginate}) => {

    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumber.push(i); 
    }


    return (
        <ul className="pagination">
            {
                pageNumber.map(number => (
                    <li key={number} onClick={() => paginate(number)} className="page-item"><a className="page-link" href="#">{number}</a></li>
                ))
            }
        </ul>
    )
}

export default Pagination;
