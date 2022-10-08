import React from 'react'
import styled from 'styled-components'

interface Props {
    page: number
    totalPages: number
    setPage: (value: number) => void
}

const Pagination: React.FC<Props> = ({page, totalPages, setPage }) => {
    return (
        <PaginationStyled>
            <div 
                className='pagination__page'
                style={{ cursor: page === 1 ? 'not-allowed' : undefined }}
                onClick={page === 1 ? undefined : () => setPage(page-1)}
            >
                <p className="paragraph--center paragraph--hover">Prev</p>
            </div>

            <div className='page-total'>
                <p className="paragraph--center">
                    {page} of {totalPages}
                </p>
            </div>

            <div 
                className='pagination__page' 
                style={{ cursor: page === totalPages ? 'not-allowed' : undefined }}
                onClick={page === totalPages ? undefined :() => setPage(page+1)}>
                <p className="paragraph--center paragraph--hover">Next</p>
            </div>
        </PaginationStyled>
    )
}

const PaginationStyled = styled.div`
    width: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .paragraph--center {
        padding: 5px 0;
        text-align: center;
        transition: ease-out 0.3s;
        color: var(--font-light-color);
    }

    .paragraph--hover {
        :hover {
            background-color: var(--background-hover-color);
        }
    }
    
    .page-total {
        width: 40%;
        border-top: 0.5px solid rgb(40, 44, 52, 0.3);
        border-bottom: 0.5px solid rgb(40, 44, 52, 0.3);
    }

    .pagination__page {
        width: 30%;
        border: 0.5px solid rgb(40, 44, 52, 0.3);
        cursor: pointer;
    }
`
export default Pagination