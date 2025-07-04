import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { RotateCcw, CheckCircle } from 'lucide-react';

interface ReturnLotFormProps {
  selectedLot: any;
  onLotReturned: () => void;
}

const ReturnLotForm = ({ selectedLot, onLotReturned }: ReturnLotFormProps) => {
  const { toast } = useToast();
  const [returnReason, setReturnReason] = useState('');
  const [loading, setLoading] = useState(false);

  const returnReasons = [
    'Quality Issues',
    'Machine Malfunction',
    'Wrong Tension Setting',
    'Operator Request',
    'Process Incomplete',
    'Technical Error',
    'Other'
  ];

  const handleReturnLot = () => {
    if (!returnReason) {
      toast({
        title: "❌ Missing Information",
        description: "Please select a return reason",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      console.log('Returning lot:', {
        lotNumber: selectedLot.lotNumber,
        returnReason,
        returnDate: new Date().toISOString()
      });

      toast({
        title: "✅ Lot Returned Successfully",
        description: `Lot ${selectedLot.lotNumber} has been marked as returned`,
      });

      setLoading(false);
      onLotReturned();
    }, 1500);
  };

  if (!selectedLot) return null;

  return (
    <Card className="bg-white/10 backdrop-blur-xl border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <RotateCcw className="w-5 h-5 text-yellow-400" />
          Lot Details: {selectedLot.lotNumber}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-slate-400 text-sm">Operator</p>
            <p className="text-white font-medium text-lg">{selectedLot.operatorName}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Machine</p>
            <Badge className="bg-blue-500/20 text-blue-300">{selectedLot.machineId}</Badge>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Tension Type</p>
            <Badge className="bg-green-500/20 text-green-300">{selectedLot.tensionType}</Badge>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Kapan Number</p>
            <p className="text-white font-medium">{selectedLot.kapanNumber}</p>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Packet Count</p>
            <Badge className="bg-purple-500/20 text-purple-300">{selectedLot.packetCount}</Badge>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Entry Date</p>
            <p className="text-white font-medium">
              {new Date(selectedLot.entryDate).toLocaleDateString()} {new Date(selectedLot.entryDate).toLocaleTimeString()}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="returnReason" className="text-slate-300">Return Reason *</Label>
            <Select value={returnReason} onValueChange={setReturnReason}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select return reason" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {returnReasons.map((reason) => (
                  <SelectItem key={reason} value={reason} className="text-white hover:bg-slate-700">
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleReturnLot}
            disabled={loading || !returnReason}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                Processing Return...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Return Lot
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReturnLotForm;
