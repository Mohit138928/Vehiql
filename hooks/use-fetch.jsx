import { useActionState, useState } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';

const useFetch = (cb) => {
    const [data, setData] = useState(undefined);
    // const [data, setData] = useActionState(undefined);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const fn = async(...args) => {
        setLoading(true);
        setError(null);
        try {
            const response = await cb(...args);
            console.log(response)
            setData(response);
            setError(null);
            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }
        } catch (err) {
            setError(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }
    return {data, loading,error, fn, setData}
};

export default useFetch;