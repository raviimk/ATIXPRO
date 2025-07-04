
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Zap, Calendar, Package, Settings } from 'lucide-react';

const LaserTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in real app this would come from API
  const laserLotData = [
    {
      id: 1,
      lotNumber: 'LL001',
      tensionType: { id: 'T001', name: 'High Tension' },
      machineId: 'LM001',
      machineName: 'Laser Machine 1',
      packetCount: 150,
      kapanNumber: 'K12345',
      entryDate: '2024-01-15T10:30:00Z',
      status: 'Active'
    },
    {
      id: 2,
      lotNumber: 'LL002',
      tensionType: { id: 'T002', name: 'Medium Tension' },
      machineId: 'LM002',
      machineName: 'Laser Machine 2',
      packetCount: 200,
      kapanNumber: 'K67890',
      entryDate: '2024-01-15T11:15:00Z',
      status: 'Completed'
    },
    {
      id: 3,
      lotNumber: 'LL003',
      tensionType: { id: 'T004', name: 'Variable Tension' },
      machineId: 'LM004',
      machineName: 'Laser Machine 4',
      packetCount: 75,
      kapanNumber: 'K11111',
      entryDate: '2024-01-15T12:00:00Z',
      status: 'Processing'
    },
    {
      id: 4,
      lotNumber: 'LL004',
      tensionType: { id: 'T003', name: 'Low Tension' },
      machineId: 'LM005',
      machineName: 'Laser Machine 5',
      packetCount: 120,
      kapanNumber: 'K22222',
      entryDate: '2024-01-15T13:30:00Z',
      status: 'Active'
    },
    {
      id: 5,
      lotNumber: 'LL005',
      tensionType: { id: 'T005', name: 'Ultra High Tension' },
      machineId: 'LM001',
      machineName: 'Laser Machine 1',
      packetCount: 90,
      kapanNumber: 'K33333',
      entryDate: '2024-01-15T14:15:00Z',
      status: 'Queued'
    }
  ];

  const filteredData = searchTerm 
    ? laserLotData.filter(lot => 
        lot.lotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lot.kapanNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lot.machineId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lot.tensionType.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : laserLotData;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-300';
      case 'Processing': return 'bg-blue-500/20 text-blue-300';
      case 'Completed': return 'bg-purple-500/20 text-purple-300';
      case 'Queued': return 'bg-yellow-500/20 text-yellow-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return '🟢';
      case 'Processing': return '🔵';
      case 'Completed': return '✅';
      case 'Queued': return '⏳';
      default: return '⚪';
    }
  };

  const getTensionColor = (tensionName: string) => {
    switch (tensionName) {
      case 'High Tension': return 'bg-red-500/20 text-red-300';
      case 'Ultra High Tension': return 'bg-red-600/20 text-red-400';
      case 'Medium Tension': return 'bg-orange-500/20 text-orange-300';
      case 'Low Tension': return 'bg-green-500/20 text-green-300';
      case 'Variable Tension': return 'bg-purple-500/20 text-purple-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  // Calculate statistics
  const totalLots = laserLotData.length;
  const totalPackets = laserLotData.reduce((sum, lot) => sum + lot.packetCount, 0);
  const activeLots = laserLotData.filter(lot => lot.status === 'Active').length;
  const machinesInUse = new Set(laserLotData.filter(lot => lot.status !== 'Completed').map(lot => lot.machineId)).size;

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Lots</p>
                <p className="text-2xl font-bold text-white">{totalLots}</p>
              </div>
              <Zap className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Packets</p>
                <p className="text-2xl font-bold text-white">{totalPackets.toLocaleString()}</p>
              </div>
              <Package className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Lots</p>
                <p className="text-2xl font-bold text-white">{activeLots}</p>
              </div>
              <div className="text-2xl">🟢</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Machines in Use</p>
                <p className="text-2xl font-bold text-white">{machinesInUse}</p>
              </div>
              <Settings className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Table */}
      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            📋 Laser Lot History
          </CardTitle>
          <CardDescription className="text-slate-400">
            Complete history of all laser lot operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by lot number, kapan, machine, or tension type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-white/20 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-white/20 hover:bg-white/5">
                  <TableHead className="text-slate-300">Lot Number</TableHead>
                  <TableHead className="text-slate-300">Tension Type</TableHead>
                  <TableHead className="text-slate-300">Machine</TableHead>
                  <TableHead className="text-slate-300">Packets</TableHead>
                  <TableHead className="text-slate-300">Kapan</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((lot) => (
                  <TableRow key={lot.id} className="border-white/20 hover:bg-white/5">
                    <TableCell className="text-white font-medium">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        {lot.lotNumber}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTensionColor(lot.tensionType.name)}>
                        {lot.tensionType.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      <div>
                        <div className="font-medium">{lot.machineId}</div>
                        <div className="text-xs text-slate-400">{lot.machineName}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-blue-500/20 text-blue-300">
                        {lot.packetCount.toLocaleString()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300">{lot.kapanNumber}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(lot.status)}>
                        {getStatusIcon(lot.status)} {lot.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-400">
                      <div className="flex flex-col">
                        <span>{new Date(lot.entryDate).toLocaleDateString()}</span>
                        <span className="text-xs">{new Date(lot.entryDate).toLocaleTimeString()}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🔍</div>
              <p className="text-slate-400">No laser lots found matching your search criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LaserTable;
