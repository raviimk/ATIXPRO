
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Zap, Save, Plus, User } from 'lucide-react';

const LaserEntry = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    lotNumber: '',
    tensionTypeId: '',
    machineId: '',
    packetCount: '',
    kapanNumber: '',
    senderName: '',
    operatorName: ''
  });
  const [setAsDefault, setSetAsDefault] = useState(false);

  // Smart mapping: Tension Type -> Machine
  const tensionMachineMapping = {
    'T001': 'M1', // Normal -> Machine M1
    'T002': 'M2', // Pressure -> Machine M2
    'T003': 'M3'  // None -> Machine M3
  };

  const tensionTypes = [
    { id: 'T001', name: 'Normal', mappedMachine: 'M1' },
    { id: 'T002', name: 'Pressure', mappedMachine: 'M2' },
    { id: 'T003', name: 'None', mappedMachine: 'M3' },
    { id: 'T004', name: 'Variable', mappedMachine: 'M4' },
    { id: 'T005', name: 'High Pressure', mappedMachine: 'M5' }
  ];

  const machines = [
    { id: 'M1', name: 'Machine M1', status: 'Active' },
    { id: 'M2', name: 'Machine M2', status: 'Active' },
    { id: 'M3', name: 'Machine M3', status: 'Active' },
    { id: 'M4', name: 'Machine M4', status: 'Active' },
    { id: 'M5', name: 'Machine M5', status: 'Maintenance' }
  ];

  const operators = [
    { name: 'John Laser Operator', defaultMachine: 'M1' },
    { name: 'Jane Laser Operator', defaultMachine: 'M2' },
    { name: 'Mike Laser Operator', defaultMachine: 'M3' }
  ];

  const activeMachines = machines.filter(machine => machine.status === 'Active');

  // Load default sender from localStorage
  useEffect(() => {
    const savedSender = localStorage.getItem('defaultLaserSender');
    if (savedSender) {
      setFormData(prev => ({ ...prev, senderName: savedSender }));
    }
  }, []);

  // Smart auto-assign logic: When tension type is selected, auto-select machine
  const handleTensionTypeChange = (tensionTypeId: string) => {
    const mappedMachine = tensionMachineMapping[tensionTypeId];
    setFormData(prev => ({
      ...prev,
      tensionTypeId,
      machineId: mappedMachine || prev.machineId
    }));
    
    if (mappedMachine) {
      toast({
        title: "🤖 Smart Assignment",
        description: `Machine ${mappedMachine} auto-selected for ${tensionTypes.find(t => t.id === tensionTypeId)?.name} tension`,
      });
    }
  };

  // Smart auto-assign logic: When operator is selected, auto-select machine
  const handleOperatorChange = (operatorName: string) => {
    const operator = operators.find(op => op.name === operatorName);
    if (operator) {
      setFormData(prev => ({
        ...prev,
        operatorName,
        machineId: operator.defaultMachine
      }));
      
      toast({
        title: "🤖 Smart Assignment",
        description: `Machine ${operator.defaultMachine} auto-assigned to ${operatorName}`,
      });
    } else {
      setFormData(prev => ({ ...prev, operatorName }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.lotNumber || !formData.tensionTypeId || !formData.machineId || 
        !formData.packetCount || !formData.kapanNumber) {
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

    // Here you would make API call to check lot number uniqueness and save
    console.log('Laser Lot Entry Data:', {
      ...formData,
      entryDate: new Date().toISOString()
    });
    
    toast({
      title: "✅ Laser Lot Created Successfully",
      description: `Lot ${formData.lotNumber} created with ${formData.packetCount} packets`,
    });

    // Save default sender if checkbox is checked
    if (setAsDefault && formData.senderName) {
      localStorage.setItem('defaultLaserSender', formData.senderName);
      toast({
        title: "✅ Default Sender Saved",
        description: `${formData.senderName} will be auto-filled in future entries`,
      });
    }

    // Reset form (keep sender if it's set as default)
    setFormData({
      lotNumber: '',
      tensionTypeId: '',
      machineId: '',
      packetCount: '',
      kapanNumber: '',
      senderName: setAsDefault ? formData.senderName : '',
      operatorName: ''
    });
    setSetAsDefault(false);
  };

  return (
    <Card className="bg-white/10 backdrop-blur-xl border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Plus className="w-5 h-5" />
          ⚡ Create New Laser Lot
        </CardTitle>
        <CardDescription className="text-slate-400">
          Generate a new laser lot with machine and tension specifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="lotNumber" className="text-slate-300">Lot Number *</Label>
            <Input
              id="lotNumber"
              value={formData.lotNumber}
              onChange={(e) => setFormData({...formData, lotNumber: e.target.value})}
              placeholder="e.g., LL001 (must be unique)"
              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            <p className="text-xs text-slate-400">Lot number must be unique across all laser operations</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="senderName" className="text-slate-300">Sender Name</Label>
            <div className="space-y-2">
              <Input
                id="senderName"
                value={formData.senderName}
                onChange={(e) => setFormData({...formData, senderName: e.target.value})}
                placeholder="Enter sender name"
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="setDefault"
                  checked={setAsDefault}
                  onCheckedChange={(checked) => setSetAsDefault(checked === true)}
                  className="border-white/20"
                />
                <Label htmlFor="setDefault" className="text-slate-400 text-sm">
                  Set as default sender
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="operatorName" className="text-slate-300">Operator Name</Label>
            <Select value={formData.operatorName} onValueChange={handleOperatorChange}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select Operator" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {operators.map((operator) => (
                  <SelectItem key={operator.name} value={operator.name} className="text-white hover:bg-slate-700">
                    <div className="flex items-center justify-between w-full">
                      <span>{operator.name}</span>
                      <span className="text-slate-400 text-sm ml-2">→ {operator.defaultMachine}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tensionType" className="text-slate-300">Tension Type *</Label>
            <Select value={formData.tensionTypeId} onValueChange={handleTensionTypeChange}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select Tension Type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {tensionTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id} className="text-white hover:bg-slate-700">
                    <div className="flex items-center justify-between w-full">
                      <span>{type.name}</span>
                      <span className="text-slate-400 text-sm ml-2">→ {type.mappedMachine}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="machine" className="text-slate-300">Machine ID *</Label>
            <Select value={formData.machineId} onValueChange={(value) => setFormData({...formData, machineId: value})}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select Machine" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {activeMachines.map((machine) => (
                  <SelectItem key={machine.id} value={machine.id} className="text-white hover:bg-slate-700">
                    <div className="flex items-center justify-between w-full">
                      <span>{machine.name}</span>
                      <span className="text-green-400 text-sm ml-2">● {machine.status}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-slate-400">
              {activeMachines.length} of {machines.length} machines available
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="packetCount" className="text-slate-300">Packet Count *</Label>
            <Input
              id="packetCount"
              type="number"
              value={formData.packetCount}
              onChange={(e) => setFormData({...formData, packetCount: e.target.value})}
              placeholder="Enter packet count"
              min="1"
              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <div className="space-y-2">
              <Label htmlFor="kapan" className="text-slate-300">Kapan Number *</Label>
              <Input
                id="kapan"
                value={formData.kapanNumber}
                onChange={(e) => setFormData({...formData, kapanNumber: e.target.value})}
                placeholder="e.g., K12345"
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Form Preview */}
          {formData.lotNumber && formData.tensionTypeId && formData.machineId && (
            <div className="md:col-span-2 p-4 bg-white/5 rounded-lg border border-white/10">
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                Lot Preview:
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Lot:</span>
                  <div className="text-white font-medium">{formData.lotNumber}</div>
                </div>
                <div>
                  <span className="text-slate-400">Tension:</span>
                  <div className="text-white font-medium">
                    {tensionTypes.find(t => t.id === formData.tensionTypeId)?.name}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400">Machine:</span>
                  <div className="text-white font-medium">{formData.machineId}</div>
                </div>
                <div>
                  <span className="text-slate-400">Packets:</span>
                  <div className="text-white font-medium">{formData.packetCount || '0'}</div>
                </div>
              </div>
            </div>
          )}

          <div className="md:col-span-2">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Save className="w-4 h-4 mr-2" />
              Create Laser Lot
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LaserEntry;
