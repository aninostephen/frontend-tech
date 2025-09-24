const fields = ({ instruments }: { instruments: any[] }) => [
    {
        name: 'instrument_id',
        label: 'Portfolio',
        type: 'select',
        placeholder: 'Select portfolio',
        required: true,
        validation: {
            min: 1,
        },
        options: instruments,
    },
    {
        name: 'quantity',
        label: 'Quantity',
        type: 'number',
        placeholder: 'Enter quantity',
        required: true,
        validation: {
            min: 0.01,
        },
    },
    {
        name: 'price',
        label: 'Price',
        type: 'number',
        placeholder: 'Enter price',
        required: true,
        validation: {
            min: 0.01,
        },
    },
    {
        name: 'transaction_costs',
        label: 'Transaction Costs',
        type: 'number',
        placeholder: 'Enter transaction costs',
        required: true,
        validation: {
            min: 0,
        },
    },
    {
        name: 'trade_date',
        label: 'Trade Date',
        type: 'datepicker',
        placeholder: 'Select trade date',
        required: true,
        format: 'YYYY-MM-DD',
        allowClear: true,
    },
    {
        name: 'fx_rate',
        label: 'FX Rate',
        type: 'text',
        placeholder: 'Enter FX rate',
        required: true,
        validation: {
            pattern: /^\d+(\.\d{1,6})?$/,
        },
    },
    {
        name: 'settlement_date',
        label: 'Settlement Date',
        type: 'datepicker',
        placeholder: 'Select settlement date',
        required: true,
        format: 'YYYY-MM-DD',
        allowClear: true,
    },
    {
        name: 'transaction_type',
        label: 'Transaction Type',
        type: 'select',
        placeholder: 'Enter transaction type',
        required: true,
        options: [
            { label: 'Buy', value: 'BUY' },
            { label: 'Sell', value: 'SELL' },
        ],
    },
    {
        name: 'sale_method',
        label: 'Sale Method',
        type: 'select',
        placeholder: 'Enter sale method',
        required: (form: any) => form.watch('transaction_type') === 'SELL',
        visibleWhen: (values: any) => values.transaction_type === 'SELL',
        options: [
            { label: 'FIFO', value: 'FIFO' },
            { label: 'LIFO', value: 'LIFO' },
        ],
    },
    {
        name: 'comments',
        label: 'Comments',
        type: 'textarea',
        placeholder: 'Enter any comments (optional)',
        required: false,
        validation: {
            maxLength: 500,
        },
    },
    {
        name: 'status',
        label: 'Status',
        type: 'select',
        placeholder: 'Status',
        required: true,
        options: [
            { label: 'Pending', value: 'PENDING' },
            { label: 'Settled', value: 'SETTLED' },
        ],
    }
];

export default fields;