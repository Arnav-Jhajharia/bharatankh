
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
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl font-bold text-gray-900">Recent Transaction History</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200/50 bg-gray-50/50">
                <TableHead className="h-14 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wide">Date</TableHead>
                <TableHead className="h-14 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wide">Type</TableHead>
                <TableHead className="h-14 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wide">Description</TableHead>
                <TableHead className="h-14 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wide">Category</TableHead>
                <TableHead className="h-14 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wide text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((txn, index) => (
                <TableRow key={index} className="border-b border-gray-100/50 hover:bg-gray-50/50 transition-colors duration-200">
                  <TableCell className="h-16 px-6 text-base font-medium text-gray-900">{txn.date}</TableCell>
                  <TableCell className="h-16 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      txn.type.includes('Credit') 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {txn.type}
                    </span>
                  </TableCell>
                  <TableCell className="h-16 px-6 text-base text-gray-700">{txn.description}</TableCell>
                  <TableCell className="h-16 px-6">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {txn.category}
                    </span>
                  </TableCell>
                  <TableCell className={`h-16 px-6 text-right text-base font-bold ${
                    txn.type.includes('Credit') ? 'text-green-600' : 'text-red-600'
                  }`}>
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
