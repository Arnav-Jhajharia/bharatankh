
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Transaction {
  date: string;
  type: string;
  amount: number;
  description: string;
  category: string;
}

interface TransactionHistoryTableProps {
  transactions: Transaction[];
}

export const TransactionHistoryTable = ({ transactions }: TransactionHistoryTableProps) => {
  return (
    <Card className="institutional-card">
      <CardHeader>
        <CardTitle className="institutional-card-title">Recent Transaction History</CardTitle>
      </CardHeader>
      <CardContent className="institutional-card-content">
        <div className="transaction-table-container">
          <Table className="transaction-table">
            <TableHeader>
              <TableRow className="transaction-header-row">
                <TableHead className="transaction-header">Date</TableHead>
                <TableHead className="transaction-header">Type</TableHead>
                <TableHead className="transaction-header">Description</TableHead>
                <TableHead className="transaction-header">Category</TableHead>
                <TableHead className="transaction-header amount-header">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((txn, index) => (
                <TableRow key={index} className="transaction-row">
                  <TableCell className="transaction-cell">{txn.date}</TableCell>
                  <TableCell className="transaction-cell">{txn.type}</TableCell>
                  <TableCell className="transaction-cell">{txn.description}</TableCell>
                  <TableCell className="transaction-cell">{txn.category}</TableCell>
                  <TableCell className={`transaction-cell amount-cell ${txn.type.includes('Credit') ? 'credit' : 'debit'}`}>
                    {txn.type.includes('Credit') ? '+' : '-'}₹{txn.amount.toLocaleString('en-IN')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
