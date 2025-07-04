import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BarChart3, Zap, Package, Clock, Factory, Settings, Calendar, Download, TrendingUp, Users } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const LaserAnalysis = () => {
  const { toast } = useToast();
  const [lotNumber, setLotNumber] = useState('');
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState('today');
  const [selectedOperator, setSelectedOperator] = useState('');
  const [selectedMachine, setSelectedMachine] = useState('');

  // Mock data for comprehensive analysis
  const mockLotData = {
    'LL001': {
      lotNumber: 'LL001',
      totalEntries: 5,
      totalPackets: 750,
      kapanNumber: 'K12345',
      tensionType: 'Normal',
      machineId: 'M1',
      operatorName: 'John Laser Operator',
      senderName: 'Main Sender',
      returnStatus: false,
      createdAt: '2024-01-15T10:30:00Z',
      entries: [
        {
          id: 1,
          machineId: 'M1',
          tensionType: 'Normal',
          kapanNumber: 'K12345',
          packetCount: 150,
          operatorName: 'John Laser Operator',
          entryDate: '2024-01-15T10:30:00Z'
        },
        {
          id: 2,
          machineId: 'M1',
          tensionType: 'Normal',
          kapanNumber: 'K12345',
          packetCount: 200,
          operatorName: 'John Laser Operator',
          entryDate: '2024-01-15T11:15:00Z'
        },
        {
          id: 3,
          machineId: 'M2',
          tensionType: 'Pressure',
          kapanNumber: 'K12345',
          packetCount: 100,
          operatorName: 'Jane Laser Operator',
          entryDate: '2024-01-15T12:00:00Z'
        },
        {
          id: 4,
          machineId: 'M1',
          tensionType: 'Normal',
          kapanNumber: 'K12345',
          packetCount: 150,
          operatorName: 'John Laser Operator',
          entryDate: '2024-01-15T13:30:00Z'
        },
        {
          id: 5,
          machineId: 'M3',
          tensionType: 'None',
          kapanNumber: 'K12345',
          packetCount: 150,
          operatorName: 'Mike Laser Operator',
          entryDate: '2024-01-15T14:15:00Z'
        }
      ]
    }
  };

  // Mock performance data for date-wise analysis
  const mockPerformanceData = {
    today: {
      totalLots: 15,
      totalPackets: 3250,
      operatorBreakdown: {
        'John Laser Operator': { lots: 6, packets: 1200, machines: ['M1', 'M2'] },
        'Jane Laser Operator': { lots: 5, packets: 950, machines: ['M2', 'M3'] },
        'Mike Laser Operator': { lots: 4, packets: 1100, machines: ['M3', 'M1'] }
      },
      machineBreakdown: {
        'M1': { lots: 8, packets: 1650, operators: ['John Laser Operator', 'Mike Laser Operator'] },
        'M2': { lots: 4, packets: 850, operators: ['John Laser Operator', 'Jane Laser Operator'] },
        'M3': { lots: 3, packets: 750, operators: ['Jane Laser Operator', 'Mike Laser Operator'] }
      },
      tensionBreakdown: {
        'Normal': { lots: 8, packets: 1800 },
        'Pressure': { lots: 4, packets: 900 },
        'None': { lots: 3, packets: 550 }
      }
    }
  };

  const operators = ['John Laser Operator', 'Jane Laser Operator', 'Mike Laser Operator'];
  const machines = ['M1', 'M2', 'M3', 'M4', 'M5'];

  const handleAnalyze = () => {
    if (!lotNumber.trim()) {
      toast({
        title: "❌ Missing Lot Number",
        description: "Please enter a lot number to analyze",
        variant: "destructive",
      });
      return;
    }

    const data = mockLotData[lotNumber.toUpperCase()];
    if (!data) {
      toast({
        title: "❌ Lot Not Found",
        description: `No data found for lot number: ${lotNumber}`,
        variant: "destructive",
      });
      setAnalysisData(null);
      return;
    }

    setAnalysisData(data);
    toast({
      title: "✅ Analysis Complete",
      description: `Found ${data.totalEntries} entries for lot ${lotNumber}`,
    });
  };

  const handleExportReport = (type: string) => {
    toast({
      title: "📄 Export Started",
      description: `${type} report is being generated...`,
    });
    // In real app, trigger download
  };

  const getTensionColor = (tensionType: string) => {
    switch (tensionType) {
      case 'Normal': return 'bg-green-500/20 text-green-300';
      case 'Pressure': return 'bg-orange-500/20 text-orange-300';
      case 'None': return 'bg-gray-500/20 text-gray-300';
      default: return 'bg-blue-500/20 text-blue-300';
    }
  };

  const getMachineColor = (machineId: string) => {
    const colors = {
      'M1': 'bg-blue-500/20 text-blue-300',
      'M2': 'bg-purple-500/20 text-purple-300',
      'M3': 'bg-pink-500/20 text-pink-300',
      'M4': 'bg-yellow-500/20 text-yellow-300',
      'M5': 'bg-red-500/20 text-red-300',
    };
    return colors[machineId] || 'bg-gray-500/20 text-gray-300';
  };

  const getBreakdownData = () => {
    if (!analysisData) return null;

    const machineBreakdown = analysisData.entries.reduce((acc, entry) => {
      acc[entry.machineId] = (acc[entry.machineId] || 0) + entry.packetCount;
      return acc;
    }, {});

    const tensionBreakdown = analysisData.entries.reduce((acc, entry) => {
      acc[entry.tensionType] = (acc[entry.tensionType] || 0) + entry.packetCount;
      return acc;
    }, {});

    const operatorBreakdown = analysisData.entries.reduce((acc, entry) => {
      acc[entry.operatorName] = (acc[entry.operatorName] || 0) + entry.packetCount;
      return acc;
    }, {});

    return {
      machineBreakdown,
      tensionBreakdown,
      operatorBreakdown,
      uniqueMachines: Object.keys(machineBreakdown).length,
      uniqueTensionTypes: Object.keys(tensionBreakdown).length,
      uniqueOperators: Object.keys(operatorBreakdown).length
    };
  };

  const breakdownData = getBreakdownData();
  const performanceData = mockPerformanceData[selectedDate] || mockPerformanceData.today;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="lot-search" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-xl border border-white/20">
          <TabsTrigger value="lot-search" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
            🔍 Lot Search
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
            📊 Performance
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
            📄 Reports
          </TabsTrigger>
        </TabsList>

        {/* Lot Search Tab */}
        <TabsContent value="lot-search" className="space-y-6">
          {/* Search Section */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Search className="w-5 h-5" />
                🔍 Laser Lot Analysis
              </CardTitle>
              <CardDescription className="text-slate-400">
                Search and analyze complete lot data with detailed breakdowns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="lotSearch" className="text-slate-300">Lot Number</Label>
                  <Input
                    id="lotSearch"
                    value={lotNumber}
                    onChange={(e) => setLotNumber(e.target.value)}
                    placeholder="Enter lot number (e.g., LL001)"
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-yellow-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={handleAnalyze}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Analyze Lot
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysisData && (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Total Entries</p>
                        <p className="text-2xl font-bold text-white">{analysisData.totalEntries}</p>
                      </div>
                      <Clock className="w-8 h-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Total Packets</p>
                        <p className="text-2xl font-bold text-white">{analysisData.totalPackets.toLocaleString()}</p>
                      </div>
                      <Package className="w-8 h-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Operators</p>
                        <p className="text-2xl font-bold text-white">{breakdownData?.uniqueOperators}</p>
                      </div>
                      <Users className="w-8 h-8 text-purple-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Status</p>
                        <Badge className={analysisData.returnStatus ? "bg-red-500/20 text-red-300" : "bg-green-500/20 text-green-300"}>
                          {analysisData.returnStatus ? 'Returned' : 'Active'}
                        </Badge>
                      </div>
                      <Zap className="w-8 h-8 text-orange-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Lot Information */}
              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    Lot Information: {analysisData.lotNumber}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <p className="text-slate-400 text-sm">Kapan Number</p>
                      <p className="text-white font-medium text-lg">{analysisData.kapanNumber}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Main Operator</p>
                      <p className="text-white font-medium">{analysisData.operatorName}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Sender</p>
                      <p className="text-white font-medium">{analysisData.senderName}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Created On</p>
                      <p className="text-white font-medium">
                        {new Date(analysisData.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Breakdown Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Operator Breakdown */}
                <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Operator Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {breakdownData && Object.entries(breakdownData.operatorBreakdown).map(([operator, packets]) => (
                        <div key={operator} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <span className="text-slate-300 text-sm">{operator}</span>
                          <Badge className="bg-blue-500/20 text-blue-300">
                            {packets as number} packets
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Machine Breakdown */}
                <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Factory className="w-5 h-5" />
                      Machine Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {breakdownData && Object.entries(breakdownData.machineBreakdown).map(([machine, packets]) => (
                        <div key={machine} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <Badge className={getMachineColor(machine)}>
                            {machine}
                          </Badge>
                          <span className="text-white font-medium">{packets as number} packets</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Tension Type Breakdown */}
                <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Tension Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {breakdownData && Object.entries(breakdownData.tensionBreakdown).map(([tension, packets]) => (
                        <div key={tension} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <Badge className={getTensionColor(tension)}>
                            {tension}
                          </Badge>
                          <span className="text-white font-medium">{packets as number} packets</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Entries Table */}
              <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    📋 Entry Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-white/20 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/20 hover:bg-white/5">
                          <TableHead className="text-slate-300">Entry #</TableHead>
                          <TableHead className="text-slate-300">Operator</TableHead>
                          <TableHead className="text-slate-300">Machine</TableHead>
                          <TableHead className="text-slate-300">Tension</TableHead>
                          <TableHead className="text-slate-300">Packets</TableHead>
                          <TableHead className="text-slate-300">Time</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {analysisData.entries.map((entry, index) => (
                          <TableRow key={entry.id} className="border-white/20 hover:bg-white/5">
                            <TableCell className="text-white font-medium">#{index + 1}</TableCell>
                            <TableCell className="text-slate-300">{entry.operatorName}</TableCell>
                            <TableCell>
                              <Badge className={getMachineColor(entry.machineId)}>
                                {entry.machineId}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getTensionColor(entry.tensionType)}>
                                {entry.tensionType}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-blue-500/20 text-blue-300">
                                {entry.packetCount.toLocaleString()}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-slate-400 text-sm">
                              {new Date(entry.entryDate).toLocaleTimeString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Empty State */}
          {!analysisData && (
            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardContent className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-white text-xl font-semibold mb-2">Ready for Analysis</h3>
                <p className="text-slate-400">Enter a lot number above to view detailed analysis and breakdowns</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Performance Dashboard Tab */}
        <TabsContent value="performance" className="space-y-6">
          {/* Date and Filter Selection */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                📊 Performance Dashboard
              </CardTitle>
              <CardDescription className="text-slate-400">
                Operator and machine performance analysis with date filters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-slate-300">Date Range</Label>
                  <Select value={selectedDate} onValueChange={setSelectedDate}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="today" className="text-white hover:bg-slate-700">Today</SelectItem>
                      <SelectItem value="yesterday" className="text-white hover:bg-slate-700">Yesterday</SelectItem>
                      <SelectItem value="week" className="text-white hover:bg-slate-700">This Week</SelectItem>
                      <SelectItem value="month" className="text-white hover:bg-slate-700">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Filter by Operator</Label>
                  <Select value={selectedOperator} onValueChange={setSelectedOperator}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="All Operators" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="" className="text-white hover:bg-slate-700">All Operators</SelectItem>
                      {operators.map((op) => (
                        <SelectItem key={op} value={op} className="text-white hover:bg-slate-700">{op}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Filter by Machine</Label>
                  <Select value={selectedMachine} onValueChange={setSelectedMachine}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="All Machines" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="" className="text-white hover:bg-slate-700">All Machines</SelectItem>
                      {machines.map((machine) => (
                        <SelectItem key={machine} value={machine} className="text-white hover:bg-slate-700">{machine}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Total Lots Today</p>
                    <p className="text-3xl font-bold text-white">{performanceData.totalLots}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Total Packets</p>
                    <p className="text-3xl font-bold text-white">{performanceData.totalPackets.toLocaleString()}</p>
                  </div>
                  <Package className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Active Operators</p>
                    <p className="text-3xl font-bold text-white">{Object.keys(performanceData.operatorBreakdown).length}</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Performance Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Operator Performance */}
            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Operator Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(performanceData.operatorBreakdown).map(([operator, data]: [string, any]) => (
                    <div key={operator} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-medium">{operator}</h4>
                        <Badge className="bg-blue-500/20 text-blue-300">{data.lots} lots</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">Packets:</span>
                          <span className="text-white ml-2">{data.packets.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Machines:</span>
                          <span className="text-white ml-2">{data.machines.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Machine Performance */}
            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Factory className="w-5 h-5" />
                  Machine Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(performanceData.machineBreakdown).map(([machine, data]: [string, any]) => (
                    <div key={machine} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <Badge className={getMachineColor(machine)}>{machine}</Badge>
                        <Badge className="bg-green-500/20 text-green-300">{data.lots} lots</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">Packets:</span>
                          <span className="text-white ml-2">{data.packets.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Operators:</span>
                          <span className="text-white ml-2 text-xs">{data.operators.length} active</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Download className="w-5 h-5" />
                📄 Unified Report System
              </CardTitle>
              <CardDescription className="text-slate-400">
                Generate and export comprehensive production reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button
                  onClick={() => handleExportReport('Daily Production')}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white h-20 flex-col"
                >
                  <Download className="w-6 h-6 mb-2" />
                  Daily Report (PDF)
                </Button>
                
                <Button
                  onClick={() => handleExportReport('Weekly Summary')}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white h-20 flex-col"
                >
                  <Download className="w-6 h-6 mb-2" />
                  Weekly Report (CSV)
                </Button>
                
                <Button
                  onClick={() => handleExportReport('Operator Performance')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white h-20 flex-col"
                >
                  <Download className="w-6 h-6 mb-2" />
                  Operator Report
                </Button>
                
                <Button
                  onClick={() => handleExportReport('Machine Utilization')}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white h-20 flex-col"
                >
                  <Download className="w-6 h-6 mb-2" />
                  Machine Report
                </Button>
                
                <Button
                  onClick={() => handleExportReport('Monthly Summary')}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white h-20 flex-col"
                >
                  <Download className="w-6 h-6 mb-2" />
                  Monthly Report
                </Button>
                
                <Button
                  onClick={() => handleExportReport('Custom Range')}
                  className="bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white h-20 flex-col"
                >
                  <Download className="w-6 h-6 mb-2" />
                  Custom Range
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LaserAnalysis;
