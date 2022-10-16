import { useCallback, useEffect, useState } from "react";

interface PaginationCounts {
    totalCount: number;
    fetchedCount: number;
}

export interface PaginationData {
    skip: number;
    take: number;
}

function usePagination<R>(
    callable: (pagination: PaginationData) => Promise<R | undefined>,
    deserializePaginationCounts: (result: R) => PaginationCounts,
    initialSkip: number = 0,
    take: number = 10
) {
    const [skip, setSkip] = useState(initialSkip);

    const handleCallable = useCallback(async () => {
        const _result = await callable({ skip, take });
        if (_result) {
            const counts = deserializePaginationCounts(_result);
            setSkip(s => s + counts.fetchedCount);
        }
    }, [callable])

    return handleCallable;

}

export default usePagination;
