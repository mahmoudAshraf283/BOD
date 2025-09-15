import { useState, useCallback } from 'react';

export const useApiCall = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const executeApiCall = useCallback(async (apiFunction) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await apiFunction();
            return response.data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || 'Operation failed';
            setError(errorMsg);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const executeMultipleApiCalls = useCallback(async (apiCalls) => {
        try {
            setLoading(true);
            setError(null);
            
            const responses = await Promise.all(apiCalls);
            const data = responses.map(response => response.data);
            return data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || 'Failed to load data';
            setError(errorMsg);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        executeApiCall,
        executeMultipleApiCalls
    };
};

export default useApiCall;