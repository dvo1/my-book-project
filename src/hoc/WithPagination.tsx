import { getSearchResults } from '../API/search';
import React, { useState, useEffect, useCallback } from 'react';

interface PaginationProps<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  page: number;
  totalItems: number;
  nextPage: () => void;
  prevPage: () => void;
  fetchData: (query: string, page: number) => void;
}

export function WithPagination<T>(WrappedComponent: React.ComponentType<PaginationProps<T>>) {
  return function PaginatedComponent({ query }: { query: string }) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number>(0);
    const resultsPerPage = 10;

    const fetchData = useCallback(
      async (searchQuery: string, pageNumber: number) => {
        console.log("Fetching data with:", { searchQuery, pageNumber });
        setLoading(true);
        setError(null);

        try {
          const startIndex = pageNumber * resultsPerPage;
          const response = await getSearchResults({
            searchQuery,
            startIndex,
            resultsPerPage,
          });
          setData((response?.items as T[]) || []); 
          setTotalItems(response.totalItems || 0);
        } catch (err) {
          setError("Something went wrong. Please try again.");
        } finally {
          setLoading(false);
        }
      },
      [resultsPerPage]
    );

    useEffect(() => {
      fetchData(query, page);
    }, [fetchData, query, page]);

    const nextPage = () => {
      if (page < Math.floor(totalItems / resultsPerPage)) {
        setPage((prev) => prev + 1);
      }
    };

    const prevPage = () => {
      setPage((prev) => Math.max(prev - 1, 0));
    };

    return (
      <WrappedComponent
        data={data}
        loading={loading}
        error={error}
        page={page}
        totalItems={totalItems}
        nextPage={nextPage}
        prevPage={prevPage}
        fetchData={fetchData}
      />
    );
  };
}
