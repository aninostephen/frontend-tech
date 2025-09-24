interface Transaction {
    portfolio_id: number;
    portfolio: string;
    instrument_id: number;
    status: string;
    comments?: string; // Optional field
    quantity: number;
    price: number;
    transaction_costs: number;
    trade_date: string;
    fx_rate: string;
    settlement_date: string;
    transaction_type: string;
    sale_method: string;
}

export type {Transaction};