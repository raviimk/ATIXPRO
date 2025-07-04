
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Plus, Save } from 'lucide-react';

const PacketEntry = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    senderName: 'Default Sender',
    operatorName: '',
    machineNumber: '',
    kapanNumber: '',
    lotNumber: '',
    mainPacketNumber: '',
    packetCount: '',
    jiram: false,
    jiramText: ''
  });

  const operators = [
    'John Doe', 'Jane Smith', 'Mike Wilson', 'Sarah Johnson', 
    'David Brown', 'Lisa Davis', 'Tom Anderson', 'Emma Wilson'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.operatorName || !formData.machineNumber || !formData.kapanNumber || 
        !formData.lotNumber || !formData.packetCount) {
      toast({
        title: "❌ Missing Fields",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    if (parseInt(formData.packetCount) <= 0) {
      toast({
        title: "❌ Invalid Packet Count",
        description: "Packet count must be greater than 0",
        variant: "destructive",
      });
      return;
    }

    // Here you would make API call to save the data
    console.log('Packet Entry Data:', formData);
    
    toast({
      title: "✅ Packet Added Successfully",
      description: `${formData.packetCount} packets added to Lot ${formData.lotNumber}`,
    });

    // Reset form
    setFormData({
      ...formData,
      operatorName: '',
      machineNumber: '',
      kapanNumber: '',
      lotNumber: '',
      mainPacketNumber: '',
      packetCount: '',
      jiram: false,
      jiramText: ''
    });
  };

  return (
    <Card className="bg-white/10 backdrop-blur-xl border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Plus className="w-5 h-5" />
          📝 Packet Entry Form
        </CardTitle>
        <CardDescription className="text-slate-400">
          Enter packet details for operator tracking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="sender" className="text-slate-300">Sender Name</Label>
            <Input
              id="sender"
              value={formData.senderName}
              onChange={(e) => setFormData({...formData, senderName: e.target.value})}
              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="operator" className="text-slate-300">Operator Name *</Label>
            <Select value={formData.operatorName} onValueChange={(value) => setFormData({...formData, operatorName: value})}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select Operator" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {operators.map((operator) => (
                  <SelectItem key={operator} value={operator} className="text-white hover:bg-slate-700">
                    {operator}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="machine" className="text-slate-300">Machine Number *</Label>
            <Input
              id="machine"
              value={formData.machineNumber}
              onChange={(e) => setFormData({...formData, machineNumber: e.target.value})}
              placeholder="e.g., M001"
              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="kapan" className="text-slate-300">Kapan Number *</Label>
            <Input
              id="kapan"
              value={formData.kapanNumber}
              onChange={(e) => setFormData({...formData, kapanNumber: e.target.value})}
              placeholder="e.g., K12345"
              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lot" className="text-slate-300">Lot Number *</Label>
            <Input
              id="lot"
              value={formData.lotNumber}
              onChange={(e) => setFormData({...formData, lotNumber: e.target.value})}
              placeholder="e.g., L001"
              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mainPacket" className="text-slate-300">Main Packet Number</Label>
            <Input
              id="mainPacket"
              value={formData.mainPacketNumber}
              onChange={(e) => setFormData({...formData, mainPacketNumber: e.target.value})}
              placeholder="Optional"
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
              placeholder="Enter count"
              min="1"
              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="jiram"
                checked={formData.jiram}
                onCheckedChange={(checked) => setFormData({...formData, jiram: checked as boolean})}
                className="border-white/20 data-[state=checked]:bg-orange-500"
              />
              <Label htmlFor="jiram" className="text-slate-300">Jiram</Label>
            </div>
            
            {formData.jiram && (
              <Input
                value={formData.jiramText}
                onChange={(e) => setFormData({...formData, jiramText: e.target.value})}
                placeholder="Jiram details"
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            )}
          </div>

          <div className="md:col-span-2">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Save className="w-4 h-4 mr-2" />
              Add Packet Entry
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PacketEntry;
