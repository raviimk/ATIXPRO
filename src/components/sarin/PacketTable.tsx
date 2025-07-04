
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Package, User, Clock } from 'lucide-react';

const PacketTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in real app this would come from API
  const packetData = [
    {
      id: 1,
      lotNumber: 'L001',
      operatorName: 'John Doe',
      machineNumber: 'M001',
      kapanNumber: 'K12345',
      packetCount: 50,
      mainPacketNumber: 'MP001',
      jiram: 'Special handling',
      timestamp: '2024-01-15 10:30:00',
      senderName: 'Default Sender'
    },
    {
      id: 2,
      lotNumber: 'L001',
      operatorName: 'Jane Smith',
      machineNumber: 'M002',
      kapanNumber: 'K12345',
      packetCount: 35,
      mainPacketNumber: 'MP002',
      jiram: '',
      timestamp: '2024-01-15 10:45:00',
      senderName: 'Default Sender'
    },
    {
      id: 3,
      lotNumber: 'L002',
      operatorName: 'Mike Wilson',
      machineNumber: 'M003',
      kapanNumber: 'K67890',
      packetCount: 75,
      mainPacketNumber: 'MP003',
      jiram: 'Priority processing',
      timestamp: '2024-01-15 11:00:00',
      senderName: 'Default Sender'
    },
    {
      id: 4,
      lotNumber: 'L002',
      operatorName: 'Sarah Johnson',
      machineNumber: 'M001',
      kapanNumber: 'K67890',
      packetCount: 42,
      mainPacketNumber: 'MP004',
      jiram: '',
      timestamp: '2024-01-15 11:15:00',
      senderName: 'Default Sender'
    }
  ];

  // Group packets by lot number
  const groupedPackets = packetData.reduce((acc, packet) => {
    const lot = packet.lotNumber;
    if (!acc[lot]) {
      acc[lot] = [];
    }
    acc[lot].push(packet);
    return acc;
  }, {} as Record<string, typeof packetData>);

  // Calculate totals for each lot
  const getLotSummary = (packets: typeof packetData) => {
    const totalPackets = packets.reduce((sum, p) => sum + p.packetCount, 0);
    const operators = [...new Set(packets.map(p => p.operatorName))];
    const jiramCount = packets.filter(p => p.jiram).length;
    
    return { totalPackets, operators, jiramCount };
  };

  const filteredData = searchTerm 
    ? packetData.filter(packet => 
        packet.lotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        packet.operatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        packet.kapanNumber.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : packetData;

  return (
    <div className="space-y-6">
      {/* Search and Stats */}
      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Package className="w-5 h-5" />
            📦 Live Packet Tracking
          </CardTitle>
          <CardDescription className="text-slate-400">
            Real-time packet data grouped by lot number
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by lot, operator, or kapan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex gap-4 text-center">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-white font-bold text-lg">{Object.keys(groupedPackets).length}</div>
                <div className="text-slate-400 text-sm">Active Lots</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-white font-bold text-lg">{packetData.reduce((sum, p) => sum + p.packetCount, 0)}</div>
                <div className="text-slate-400 text-sm">Total Packets</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grouped Packet Tables */}
      {Object.entries(groupedPackets).map(([lotNumber, packets]) => {
        const summary = getLotSummary(packets);
        
        return (
          <Card key={lotNumber} className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white text-xl">Lot #{lotNumber}</CardTitle>
                  <CardDescription className="text-slate-400">
                    {packets.length} entries • {summary.totalPackets} total packets
                  </CardDescription>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Badge className="bg-orange-500/20 text-orange-300">
                    {summary.operators.length} operators
                  </Badge>
                  {summary.jiramCount > 0 && (
                    <Badge className="bg-yellow-500/20 text-yellow-300">
                      {summary.jiramCount} jiram
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-white/20 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20 hover:bg-white/5">
                      <TableHead className="text-slate-300">Operator</TableHead>
                      <TableHead className="text-slate-300">Machine</TableHead>
                      <TableHead className="text-slate-300">Kapan</TableHead>
                      <TableHead className="text-slate-300">Packets</TableHead>
                      <TableHead className="text-slate-300">Main Packet</TableHead>
                      <TableHead className="text-slate-300">Jiram</TableHead>
                      <TableHead className="text-slate-300">Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {packets.map((packet) => (
                      <TableRow key={packet.id} className="border-white/20 hover:bg-white/5">
                        <TableCell className="text-white font-medium">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-slate-400" />
                            {packet.operatorName}
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-300">{packet.machineNumber}</TableCell>
                        <TableCell className="text-slate-300">{packet.kapanNumber}</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-500/20 text-blue-300">
                            {packet.packetCount}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-300">{packet.mainPacketNumber || '-'}</TableCell>
                        <TableCell className="text-slate-300">
                          {packet.jiram ? (
                            <Badge className="bg-yellow-500/20 text-yellow-300">
                              {packet.jiram}
                            </Badge>
                          ) : '-'}
                        </TableCell>
                        <TableCell className="text-slate-400">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(packet.timestamp).toLocaleTimeString()}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default PacketTable;
