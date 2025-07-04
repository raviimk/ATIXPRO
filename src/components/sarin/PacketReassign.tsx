
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, ArrowRight, CheckCircle } from 'lucide-react';

const PacketReassign = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    lotNumber: '',
    fromOperator: '',
    toOperator: '',
    packetCount: ''
  });
  const [loading, setLoading] = useState(false);

  const operators = [
    'John Doe', 'Jane Smith', 'Mike Wilson', 'Sarah Johnson', 
    'David Brown', 'Lisa Davis', 'Tom Anderson', 'Emma Wilson'
  ];

  // Mock data for operator packet counts
  const operatorPackets = {
    'John Doe': { L001: 50, L002: 30 },
    'Jane Smith': { L001: 35, L003: 25 },
    'Mike Wilson': { L001: 60, L002: 40 },
    'Sarah Johnson': { L002: 42, L004: 15 }
  };

  const getOperatorPacketCount = (operator: string, lot: string) => {
    return operatorPackets[operator as keyof typeof operatorPackets]?.[lot as keyof any] || 0;
  };

  const handleReassign = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.lotNumber || !formData.fromOperator || !formData.toOperator || !formData.packetCount) {
      toast({
        title: "❌ Missing Fields",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    if (formData.fromOperator === formData.toOperator) {
      toast({
        title: "❌ Invalid Selection",
        description: "From and To operators cannot be the same",
        variant: "destructive",
      });
      return;
    }

    const packetCount = parseInt(formData.packetCount);
    const availablePackets = getOperatorPacketCount(formData.fromOperator, formData.lotNumber);

    if (packetCount <= 0) {
      toast({
        title: "❌ Invalid Packet Count",
        description: "Packet count must be greater than 0",
        variant: "destructive",
      });
      return;
    }

    if (packetCount > availablePackets) {
      toast({
        title: "❌ Insufficient Packets",
        description: `${formData.fromOperator} only has ${availablePackets} packets in lot ${formData.lotNumber}`,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Reassigning packets:', formData);
      
      toast({
        title: "✅ Packets Reassigned Successfully",
        description: `${packetCount} packets transferred from ${formData.fromOperator} to ${formData.toOperator}`,
      });

      // Reset form
      setFormData({
        lotNumber: '',
        fromOperator: '',
        toOperator: '',
        packetCount: ''
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Reassign Form */}
      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            🔄 Packet Reassignment
          </CardTitle>
          <CardDescription className="text-slate-400">
            Transfer packets between operators with validation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleReassign} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="lotNumber" className="text-slate-300">Lot Number *</Label>
              <Input
                id="lotNumber"
                value={formData.lotNumber}
                onChange={(e) => setFormData({...formData, lotNumber: e.target.value})}
                placeholder="e.g., L001"
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="packetCount" className="text-slate-300">Packet Count *</Label>
              <Input
                id="packetCount"
                type="number"
                value={formData.packetCount}
                onChange={(e) => setFormData({...formData, packetCount: e.target.value})}
                placeholder="Number to reassign"
                min="1"
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fromOperator" className="text-slate-300">From Operator *</Label>
              <Select value={formData.fromOperator} onValueChange={(value) => setFormData({...formData, fromOperator: value})}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select source operator" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {operators.map((operator) => (
                    <SelectItem key={operator} value={operator} className="text-white hover:bg-slate-700">
                      <div className="flex items-center justify-between w-full">
                        <span>{operator}</span>
                        {formData.lotNumber && (
                          <Badge className="ml-2 bg-blue-500/20 text-blue-300">
                            {getOperatorPacketCount(operator, formData.lotNumber)} packets
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.fromOperator && formData.lotNumber && (
                <p className="text-xs text-slate-400">
                  Available: {getOperatorPacketCount(formData.fromOperator, formData.lotNumber)} packets
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="toOperator" className="text-slate-300">To Operator *</Label>
              <Select value={formData.toOperator} onValueChange={(value) => setFormData({...formData, toOperator: value})}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select destination operator" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {operators.filter(op => op !== formData.fromOperator).map((operator) => (
                    <SelectItem key={operator} value={operator} className="text-white hover:bg-slate-700">
                      {operator}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              {/* Transfer Preview */}
              {formData.fromOperator && formData.toOperator && formData.packetCount && (
                <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
                  <h4 className="text-white font-medium mb-3">Transfer Preview:</h4>
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <div className="text-center">
                      <div className="text-white font-medium">{formData.fromOperator}</div>
                      <div className="text-slate-400">
                        {formData.lotNumber && getOperatorPacketCount(formData.fromOperator, formData.lotNumber)} 
                        {formData.packetCount && ` → ${getOperatorPacketCount(formData.fromOperator, formData.lotNumber) - parseInt(formData.packetCount)}`} packets
                      </div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-orange-400" />
                    <div className="text-center">
                      <div className="text-white font-medium">{formData.toOperator}</div>
                      <div className="text-slate-400">
                        {formData.lotNumber && getOperatorPacketCount(formData.toOperator, formData.lotNumber)} 
                        {formData.packetCount && ` → ${getOperatorPacketCount(formData.toOperator, formData.lotNumber) + parseInt(formData.packetCount)}`} packets
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    <Badge className="bg-green-500/20 text-green-300">
                      Transferring {formData.packetCount} packets
                    </Badge>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Processing Transfer...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirm Reassignment
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Recent Reassignments */}
      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="text-white">📋 Recent Reassignments</CardTitle>
          <CardDescription className="text-slate-400">
            History of packet transfers and reassignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { from: 'John Doe', to: 'Jane Smith', lot: 'L001', count: 15, time: '10 mins ago' },
              { from: 'Mike Wilson', to: 'Sarah Johnson', lot: 'L002', count: 25, time: '25 mins ago' },
              { from: 'David Brown', to: 'Lisa Davis', lot: 'L003', count: 10, time: '1 hour ago' },
            ].map((reassignment, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">🔄</div>
                  <div>
                    <p className="text-white font-medium">
                      {reassignment.from} → {reassignment.to}
                    </p>
                    <p className="text-slate-400 text-sm">
                      Lot {reassignment.lot} • {reassignment.count} packets
                    </p>
                  </div>
                </div>
                <div className="text-slate-400 text-sm">{reassignment.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PacketReassign;
