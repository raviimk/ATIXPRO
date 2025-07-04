import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, RotateCcw } from 'lucide-react';

const RecentReturnsTable = () => {
  const recentReturns = [
    {
      id: 1,
      lotNumber: 'LL005',
      operatorName: 'Mike Operator',
      returnReason: 'Quality Issues',
      returnDate: '2024-01-15T09:30:00Z'
    },
    {
      id: 2,
      lotNumber: 'LL003',
      operatorName: 'Sarah Operator',
      returnReason: 'Machine Malfunction',
      returnDate: '2024-01-15T08:15:00Z'
    }
  ];

  return (
    <Card className="bg-white/10 backdrop-blur-xl border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Clock className="w-5 h-5" />
          📋 Recent Returns
        </CardTitle>
        <CardDescription className="text-slate-400">
          History of recently returned laser lots
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-white/20 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/20 hover:bg-white/5">
                <TableHead className="text-slate-300">Lot Number</TableHead>
                <TableHead className="text-slate-300">Operator</TableHead>
                <TableHead className="text-slate-300">Return Reason</TableHead>
                <TableHead className="text-slate-300">Return Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentReturns.map((returnItem) => (
                <TableRow key={returnItem.id} className="border-white/20 hover:bg-white/5">
                  <TableCell className="text-white font-medium">
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-red-400" />
                      {returnItem.lotNumber}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300">{returnItem.operatorName}</TableCell>
                  <TableCell>
                    <Badge className="bg-red-500/20 text-red-300">
                      {returnItem.returnReason}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-400">
                    <div className="flex flex-col">
                      <span>{new Date(returnItem.returnDate).toLocaleDateString()}</span>
                      <span className="text-xs">{new Date(returnItem.returnDate).toLocaleTimeString()}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {recentReturns.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🔄</div>
            <p className="text-slate-400">No recent returns found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentReturnsTable;
