/* Mock */

import { Currency } from '../currency/currency-interface';
import { Expense, IncomingExpense } from './expense-interface';

export async function getAll(): Promise<Expense[]> {
    return mockExpenses;
}

export async function get(id: number): Promise<Expense> {
    const expense = mockExpenses.find((e) => e.id === id);
    if (!expense) {
        throw new Error('No expense found with id: ' + id);
    }
    return expense;
}

export async function create(expense: IncomingExpense): Promise<Expense> {
    const newId = Math.max(...mockExpenses.map((e) => e.id));
    const newExpense: Expense = { id: newId, ...expense };
    mockExpenses.push(newExpense);
    return newExpense;
}

export async function update(id: number, expense: IncomingExpense): Promise<Expense> {
    const oldExpense = get(id);
    for (let e of mockExpenses) {
        if (e.id === id) {
            e = { id, ...expense };
            break;
        }
    }
    return { id, ...expense };
}

export async function remove(id: number): Promise<number> {
    const index = mockExpenses.findIndex((e) => e.id === id);
    if (index === -1) {
        throw new Error('No expense found with id: ' + id);
    }

    mockExpenses.splice(index, 1);
    return id;
}

const mockExpenses: Expense[] = [
    {
        id: 1,
        amount: 4.99,
        currency: Currency.EUR,
        date: new Date().toISOString(),
        category: 'groceries',
        description: 'Grapes',
    },
    {
        id: 2,
        amount: 25,
        currency: Currency.EUR,
        date: new Date().toISOString(),
        category: 'entertainment',
        description: 'emby sub',
    },
    {
        id: 3,
        amount: 45,
        currency: Currency.CHF,
        date: new Date().toISOString(),
        category: 'pet',
        description: 'GPS',
    },
    {
        id: 4,
        amount: 78,
        currency: Currency.CHF,
        date: new Date().toISOString(),
        category: 'travel',
        description: 'vignette',
    },
    {
        id: 5,
        amount: 4.99,
        currency: Currency.EUR,
        date: new Date().toISOString(),
        category: 'groceries',
        description: 'Grapges',
    },
];
