import express, { Request, Response } from 'express';
import { Expense, IncomingExpense } from './expense-interface';
import * as ExpenseService from './expense-service';

export const expenseRouter = express.Router();

expenseRouter.get('/', async (req: Request, res: Response) => {
    try {
        const expenses: Expense[] = await ExpenseService.getAll();
        res.status(200).send(expenses);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

expenseRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const expense: Expense = await ExpenseService.get(id);

        if (expense) {
            return res.status(200).send(expense);
        }

        res.status(404).send('item not found');
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// POST items

expenseRouter.post('/', async (req: Request, res: Response) => {
    try {
        const expense: IncomingExpense = req.body;

        const newExpense = await ExpenseService.create(expense);

        res.status(201).json(newExpense);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// PUT items/:id
expenseRouter.put('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const itemUpdate: Expense = req.body;

        const updatedItem = await ExpenseService.update(id, itemUpdate);
        return res.status(200).json(updatedItem);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE items/:id

expenseRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        await ExpenseService.remove(id);

        res.status(204).json(id);
    } catch (e) {
        res.status(500).send(e.message);
    }
});
