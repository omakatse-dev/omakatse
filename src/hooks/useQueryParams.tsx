import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useQueryParams() {

    const searchParams = useSearchParams();
    const router = useRouter();
    // Get a single query param by key
    const getQueryParam = useCallback((key: string) => {
        return searchParams.get(key);
    }, [searchParams]);

    // Set a single query param
    const setQueryParam = useCallback((key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set(key, value);
        router.push(`?${params.toString()}`);
    }, [searchParams, router]);

    return { getQueryParam, setQueryParam };
}