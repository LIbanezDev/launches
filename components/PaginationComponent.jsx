import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React, {forwardRef} from 'react';

export default function itemsPagination({ totalPages }) {
    const { query } = useRouter();

    return (
        <Pagination
            page={query.page || '1'}
            count={totalPages}
            color="primary"
            renderItem={(item) => (
                <PaginationItem
                    component={PaginationLink}
                    query={query}
                    item={item}
                    {...item}
                />
            )}
        />
    );
}

const PaginationLink = forwardRef(
    ({item , query, ...props
     }, ref) => (
        <Link
            href={{
                pathname: '/products',
                // query: { ...query, page: item.page },
            }}
            shallow
        >
            <a {...props} ref={ref}/>
        </Link>
    )
);