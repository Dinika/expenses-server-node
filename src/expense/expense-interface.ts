import { Currency } from '../currency/currency-interface';

export interface Expense {
    id: number;
    amount: number;
    currency: Currency;
    date: string;
    category: string;
    description: string;
}

export type IncomingExpense = Omit<Expense, 'id'>;
