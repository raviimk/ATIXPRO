
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, BarChart3, Users, Package, FileText } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const LotAnalysis = () => {
  const { toast } = useToast();
  const [lotNumber, setLotNumber] = useState('');
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Mock analysis data
  const mockAnalysisData = {
    lotNumber: 'L001',
    totalEntries: 4,
    totalPackets: 145,
    uniqueOperators: ['John Doe', 'Jane Smith', 'Mike Wilson'],
    mainPacketNumbers: ['MP001', 'MP002', 'MP003'],
    jiramEntriesCount: 2,
    entries: [
      {
        id: 1,
        operatorName: 'John Doe',
        machineNumber: 'M001',
        mainPacketNumber: 'MP001',
        packetCount: 50,
        jiram: 'Special handling',
        timestamp: '2024-01-15 10:30:00',
        kapanNumber: 'K12345'
      },
      {
        id: 2,
        operatorName: 'Jane Smith',
        machineNumber: 'M002',
        mainPacketNumber: 'MP002',
        packetCount: 35,
        jiram: '',
        timestamp: '2024-01-15 10:45:00',
        kapanNumber: 'K12345'
      },
      {
        id: 3,
        operatorName: 'Mike Wilson',
        machineNumber: 'M003',
        mainPacketNumber: 'MP003',
        packetCount: 60,
        jiram: 'Priority processing',
        timestamp: '2024-01-15 11:00:00',
        kapanNumber: 'K12345'
      }
    ]
  };

  const handleAnalysis = () => {
    if (!lotNumber.trim()) {
      toast({
        title: "❌ Missing Lot Number",
        description: "Please enter a lot number to analyze",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (lotNumber.toUpperCase() === 'L001') {
        setAnalysisData(mockAnalysisData);
        toast({
          title: "✅ Analysis Complete",
          description: `Found ${mockAnalysisData.totalEntries} entries for lot ${lotNumber}`,
        });
      } else {
        setAnalysisData(null);
        toast({
          title: "❌ No Data Found",
          description: `No entries found for lot ${lotNumber}`,
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Search className="w-5 h-5" />
            📊 Lot Analysis
          </CardTitle>
          <CardDescription className="text-slate-400">
            Enter a lot number to get detailed breakdown and statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="lotSearch" className="text-slate-300 mb-2 block">Lot Number</Label>
              <Input
                id="lotSearch"
                value={lotNumber}
                onChange={(e) => setLotNumber(e.target.value)}
                placeholder="Enter lot number (e.g., L001)"
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500"
                onKeyPress={(e) => e.key === 'Enter' && handleAnalysis()}
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleAnalysis}
                disabled={loading}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                {loading ? 'Analyzing...' : 'Analyze Lot'}
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
                  <FileText className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Total Packets</p>
                    <p className="text-2xl font-bold text-white">{analysisData.totalPackets}</p>
                  </div>
                  <Package className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Unique Operators</p>
                    <p className="text-2xl font-bold text-white">{analysisData.uniqueOperators.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Jiram Entries</p>
                    <p className="text-2xl font-bold text-white">{analysisData.jiramEntriesCount}</p>
                  </div>
                  <div className="text-2xl">⚡</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardHeader>
                <CardTitle className="text-white">👥 Operators Involved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analysisData.uniqueOperators.map((operator: string, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-white">{operator}</span>
                      <Badge className="bg-blue-500/20 text-blue-300">
                        {analysisData.entries.filter((e: any) => e.operatorName === operator).length} entries
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardHeader>
                <CardTitle className="text-white">📦 Main Packet Numbers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analysisData.mainPacketNumbers.map((packetNum: string, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-white">{packetNum}</span>
                      <Badge className="bg-green-500/20 text-green-300">
                        Active
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Entries Table */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <CardTitle className="text-white">📋 Detailed Entries</CardTitle>
              <CardDescription className="text-slate-400">
                Complete breakdown of all entries for Lot #{analysisData.lotNumber}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-white/20 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20 hover:bg-white/5">
                      <TableHead className="text-slate-300">Operator</TableHead>
                      <TableHead className="text-slate-300">Machine</TableHead>
                      <TableHead className="text-slate-300">Main Packet</TableHead>
                      <TableHead className="text-slate-300">Count</TableHead>
                      <TableHead className="text-slate-300">Jiram</TableHead>
                      <TableHead className="text-slate-300">Time</TableHead>
                      <TableHead className="text-slate-300">Kapan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analysisData.entries.map((entry: any) => (
                      <TableRow key={entry.id} className="border-white/20 hover:bg-white/5">
                        <TableCell className="text-white font-medium">{entry.operatorName}</TableCell>
                        <TableCell className="text-slate-300">{entry.machineNumber}</TableCell>
                        <TableCell className="text-slate-300">{entry.mainPacketNumber}</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-500/20 text-blue-300">
                            {entry.packetCount}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {entry.jiram ? (
                            <Badge className="bg-yellow-500/20 text-yellow-300">
                              {entry.jiram}
                            </Badge>
                          ) : (
                            <span className="text-slate-500">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-slate-400">
                          {new Date(entry.timestamp).toLocaleTimeString()}
                        </TableCell>
                        <TableCell className="text-slate-300">{entry.kapanNumber}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default LotAnalysis;
