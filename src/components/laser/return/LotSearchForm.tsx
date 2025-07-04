import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Search } from 'lucide-react';

interface LotSearchFormProps {
  onLotFound: (lotData: any) => void;
}

const LotSearchForm = ({ onLotFound }: LotSearchFormProps) => {
  const { toast } = useToast();
  const [searchLot, setSearchLot] = useState('');

  const mockLotData = {
    'LL001': {
      lotNumber: 'LL001',
      tensionType: 'Normal',
      machineId: 'M1',
      operatorName: 'John Operator',
      kapanNumber: 'K12345',
      packetCount: 150,
      entryDate: '2024-01-15T10:30:00Z',
      status: 'Active'
    },
    'LL002': {
      lotNumber: 'LL002',
      tensionType: 'Pressure',
      machineId: 'M2',
      operatorName: 'Jane Operator',
      kapanNumber: 'K67890',
      packetCount: 200,
      entryDate: '2024-01-15T11:15:00Z',
      status: 'Active'
    }
  };

  const handleSearchLot = () => {
    if (!searchLot.trim()) {
      toast({
        title: "❌ Missing Lot Number",
        description: "Please enter a lot number to search",
        variant: "destructive",
      });
      return;
    }

    const lotData = mockLotData[searchLot.toUpperCase()];
    if (!lotData) {
      toast({
        title: "❌ Lot Not Found",
        description: `No active lot found with number: ${searchLot}`,
        variant: "destructive",
      });
      onLotFound(null);
      return;
    }

    onLotFound(lotData);
    toast({
      title: "✅ Lot Found",
      description: `Lot ${searchLot} loaded successfully`,
    });
  };

  return (
    <Card className="bg-white/10 backdrop-blur-xl border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Search className="w-5 h-5" />
          🔄 Return Laser Lot
        </CardTitle>
        <CardDescription className="text-slate-400">
          Search and return completed or problematic laser lots
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="lotSearch" className="text-slate-300">Lot Number</Label>
            <Input
              id="lotSearch"
              value={searchLot}
              onChange={(e) => setSearchLot(e.target.value)}
              placeholder="Enter lot number (e.g., LL001)"
              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-yellow-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSearchLot()}
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleSearchLot}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
            >
              <Search className="w-4 h-4 mr-2" />
              Search Lot
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LotSearchForm;
