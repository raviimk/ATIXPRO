import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from 'lucide-react';

interface MachineManagementProps {
  machines: Array<{
    id: string;
    name: string;
    type: string;
    status: string;
  }>;
  onMachineAdded: (machine: any) => void;
  onMachineDeleted: (id: string) => void;
}

const MachineManagement = ({ machines, onMachineAdded, onMachineDeleted }: MachineManagementProps) => {
  const { toast } = useToast();
  const [newMachine, setNewMachine] = useState({ id: '', name: '', status: 'Active' });

  const handleAddMachine = () => {
    if (!newMachine.id || !newMachine.name) {
      toast({
        title: "❌ Missing Fields",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    if (machines.find(m => m.id === newMachine.id)) {
      toast({
        title: "❌ Machine ID Exists",
        description: "This machine ID already exists",
        variant: "destructive",
      });
      return;
    }

    const machine = {
      ...newMachine,
      type: newMachine.id.startsWith('M') ? 'laser' : 'sarin'
    };

    onMachineAdded(machine);
    setNewMachine({ id: '', name: '', status: 'Active' });
    
    toast({
      title: "✅ Machine Added",
      description: `${machine.name} has been added successfully`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-300';
      case 'Maintenance': return 'bg-yellow-500/20 text-yellow-300';
      case 'Inactive': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'laser' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Machine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="machineId" className="text-slate-300">Machine ID *</Label>
              <Input
                id="machineId"
                value={newMachine.id}
                onChange={(e) => setNewMachine({...newMachine, id: e.target.value})}
                placeholder="e.g., M1 or S1"
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <Label htmlFor="machineName" className="text-slate-300">Machine Name *</Label>
              <Input
                id="machineName"
                value={newMachine.name}
                onChange={(e) => setNewMachine({...newMachine, name: e.target.value})}
                placeholder="Enter machine name"
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <Label htmlFor="machineStatus" className="text-slate-300">Status</Label>
              <Select value={newMachine.status} onValueChange={(value) => setNewMachine({...newMachine, status: value})}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="Active" className="text-white hover:bg-slate-700">Active</SelectItem>
                  <SelectItem value="Maintenance" className="text-white hover:bg-slate-700">Maintenance</SelectItem>
                  <SelectItem value="Inactive" className="text-white hover:bg-slate-700">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleAddMachine} className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Machine
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Existing Machines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-white/20 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-white/20 hover:bg-white/5">
                  <TableHead className="text-slate-300">Machine ID</TableHead>
                  <TableHead className="text-slate-300">Name</TableHead>
                  <TableHead className="text-slate-300">Type</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {machines.map((machine) => (
                  <TableRow key={machine.id} className="border-white/20 hover:bg-white/5">
                    <TableCell className="text-white font-medium">{machine.id}</TableCell>
                    <TableCell className="text-slate-300">{machine.name}</TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(machine.type)}>
                        {machine.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(machine.status)}>
                        {machine.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onMachineDeleted(machine.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MachineManagement;
