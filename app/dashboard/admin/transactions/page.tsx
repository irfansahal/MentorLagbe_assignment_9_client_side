
import { getAllPayments } from '@/lib/api/payments';
import React from 'react';

type TransactionType = {
    _id: string,
    userName: string,
    customer_email: string,
    userRole?: string,
    payment_status: string,
    amount_total: string | number,
    payment_intent?: string,
    payment_date?: string
}

const Transactions = async () => {

     const payments = await getAllPayments();
     
     console.log("payments", payments);
     
     const trunsictions: TransactionType[] = Array.isArray(payments) ? payments : []

    return (
        <div className="px-10">
            <h1 className="mb-4 text-xl font-semibold">Transactions</h1>

            <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[900px] border-collapse text-sm pb-5">
                    <thead>
                        <tr className="bg-[#fbad06] text-left text-xs font-semibold uppercase tracking-wide text-black">
                            <th className="px-4 py-3">User Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Plan Name</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Transaction ID</th>
                            <th className="px-4 py-3">Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trunsictions.map((transaction) => (
                            <tr
                                key={transaction._id}
                                className="border-b border-border last:border-b-0 even:bg-muted/50"
                            >
                                <td className="px-4 py-3">{transaction.userName}</td>
                                <td className="px-4 py-3">{transaction.customer_email}</td>
                                <td className="px-4 py-3">{transaction.userRole || "N/A"}</td>
                                <td className="px-4 py-3">{transaction.payment_status}</td>
                                <td className="px-4 py-3">${transaction.amount_total}</td>
                                <td className="px-4 py-3">{transaction.payment_intent || "N/A"}</td>
                                <td className="px-4 py-3">
                                    {transaction.payment_date ? new Date(transaction.payment_date).toLocaleDateString() : "N/A"}
                                </td>
                            </tr>
                        ))}

                        {trunsictions.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-4 py-6 text-center text-sm text-muted-foreground">
                                    No transactions found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transactions;
