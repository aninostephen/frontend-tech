import { useEffect, useRef, useState } from "react";
import type { PaginationConfig } from "../../../core/Interface/Pagination";
import { ApiService } from "../../../core/api/services";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";

export const useListHook = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [lastKey, setLastKey] = useState("");
    const [data, setData] = useState<any>([]);
    const [pagination, setPagination] = useState<PaginationConfig>({
        current: 1,
        pageSize: 10,
        total: 0,
    })

    const allDataRef = useRef<any>(null);
    
    // Filter data based on search
    // const filteredData = searchValue 
    //     ? allDataRef.current?.filter((item: any) => 
    //         Object.values(item).some((value: any) => 
    //             String(value).toLowerCase().includes(searchValue.toLowerCase())
    //         )
    //       ) 
    //     : allDataRef.current;

    useEffect(() => {
        if (!allDataRef.current) {
            setIsLoading(true);
            fetchTransactions({});
        }
    }, []);

    const fetchTransactions = async ({pageSize = 10, lastKey = ""}: {pageSize?: number, lastKey?: string}) => {
        try {
            const result = await ApiService.get('/transactions', {
                params: {
                    limit: pageSize,
                    last_evaluated_key: lastKey,
                }
            });
            if (result?.status === 200) {
                allDataRef.current = result?.data?.transactions;
                setData(result?.data?.transactions);
                setLastKey(result?.data?.last_evaluated_key);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const handleEdit = (id: string) => {
        navigate(`/transactions/edit/${id}`);
    }
    
    const handleDelete = async (data: any) => {
        const id = data?.id;
        setIsLoading(true);
        const result =await ApiService.delete(`/transaction/${id}`);
        if (result?.status === 200 || result?.status === 201) {
            fetchTransactions({});
            message.success('Transaction deleted successfully');
        }
    }
    
    const handleView = (id: string) => {
        navigate(`/transactions/view/${id}`);
    }

    const handleSearch = (value: string) => {
        setSearchValue(value);
    }

    const handleAddTransaction = () => {
        navigate('/transactions/create');
    };

    const handleCursorPagiantion = (pageSize: number, lastKey: string) => {
        setIsLoading(true);
        fetchTransactions({pageSize, lastKey})
    }

    return {
        isLoading,
        pagination,
        data,
        searchValue,
        lastKey,
        setPagination,
        handleEdit,
        handleDelete,
        handleView,
        handleSearch,
        handleAddTransaction,
        handleCursorPagiantion,
    }
}

export const useFormHook = ({mode}: {mode: 'create' | 'edit' | 'view'}) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [transaction, setTransaction] = useState<any>(null);
    const [instruments, setInstruments] = useState<any>(null);
    const [isFetchTransaction, setIsFetchTransaction] = useState(false);

    useEffect(() => {
        fetchInstruments();
        if (id && mode === 'edit' || mode === 'view') {
            fetchTransaction();
        }
    }, []);

    const fetchTransaction = async () => {
        setIsFetchTransaction(true);
        try {
            const result = await ApiService.get(`/transaction/${id}`);
            if (result?.status === 200 || result?.status === 201) {
                setTransaction(result?.data);
            }
            setIsFetchTransaction(false);
        } catch (error) {
            setIsFetchTransaction(false);
        }
    }

    const fetchInstruments = async () => {
        setIsLoading(true);
        try {
            const result = await ApiService.get('/instruments');
            if (result?.status === 200) {
                const instruments = result?.data?.instruments && result?.data?.instruments.map((instrument: any) => ({
                    value: instrument?.id,
                    label: instrument?.name,
                }));
                setInstruments(instruments);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (values: any) => {
        setIsLoading(true);
        try {
            let result: any = {};
            const data = {
                ...values,
                portfolio_id: 51698,
                quantity: parseFloat(values?.quantity),
                price: parseFloat(values?.price),
                transaction_costs: parseFloat(values?.transaction_costs),
                instrument_id: parseInt(values?.instrument_id),
            }

            if (mode === 'edit') {
                data.id = id;
                result = await ApiService.put(`/transaction/${id}`, data);
                if (result?.status === 200 || result?.status === 201) {
                    navigate('/transactions');
                }
            } else {
                result = await ApiService.post('/transaction', data);
                if (result?.status === 201) {
                    navigate('/transactions');
                }
            }
            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/transactions');
    };
    
    return {
        isLoading,
        instruments,
        transaction,
        isFetchTransaction,
        handleSubmit,
        handleCancel,
    }
}