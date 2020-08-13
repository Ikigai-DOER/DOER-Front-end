import {useEffect, useState} from "react";

export const useApi = (apiFn, initialData) => {
    const [data, setData] = useState(initialData);
    const [fn, setFn] = useState(apiFn);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const result = await fn;
                setData(result.data);
            } catch (error) {
                setIsError(true);
            }

            setIsLoading(false);
        };

        fetchData();
    }, [fn]);

    return [{ data, isLoading, isError }, setFn];
};

export const getAvailabilityString = availability => {
    switch (availability) {
        case 'A':
            return 'Available';
        case 'C':
            return 'Closed';
        case 'D':
            return 'Done';
        default:
            return 'In progress';
    }
};

export const getAvailabilityColor = availability => {
    switch (availability) {
        case 'A':
            return 'green';
        case 'C':
            return 'red';
        case 'D':
            return 'grey';
        default:
            return 'blue';
    }
};

export const formatCurrency = amount => +amount + '€';