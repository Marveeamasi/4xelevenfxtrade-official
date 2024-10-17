'use client'
import { useState, useEffect, useMemo } from 'react';

export default function usePagination(data, itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    setTotalPages(totalPages);
  }, [data, itemsPerPage]);

  const slicedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return { currentPage, slicedData, totalPages, handlePageChange };
}
