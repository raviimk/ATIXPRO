import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Users } from 'lucide-react';

interface OperatorManagementProps {
  operators: Array<{
    id: number;
    name: string;
    type: string;
    machineId: string;
    status: string;
  }>;
  machines: Array<{
    id: string;
    name: string;
    type: string;
    status: string;
  }>;
  onOperatorAdded: (operator: any) => void;
  onOperatorDeleted: (id: number) => void;
}

const OperatorManagement = ({ operators, machines, onOperatorAdded, onOperatorDeleted }: OperatorManagementProps) => {
  const { toast } = useToast();
  const [newOperator, setNewOperator] = useState({ name: '', type: 'laser', machineId: '' });

  const handleAddOperator = () => {
    if (!newOperator.name || !newOperator.type) {
      toast({
        title: "❌ Missing Fields",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const operator = {
      id: operators.length + 1,
      ...newOperator,
      status: 'Active'
    };

    onOperatorAdded(operator);
    setNewOperator({ name: '', type: 'laser', machineId: '' });
    
    toast({
      title: "✅ Operator Added",
      description: `${operator.name} has been added successfully`,
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
            Add New Operator
          </CardTitle>
          <CardDescription className="text-slate-400">
            Add operators for laser or sarin operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="operatorName" className="text-slate-300">Operator Name *</Label>
              <Input
                id="operatorName"
                value={newOperator.name}
                onChange={(e) => setNewOperator({...newOperator, name: e.target.value})}
                placeholder="Enter operator name"
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <Label htmlFor="operatorType" className="text-slate-300">Operation Type *</Label>
              <Select value={newOperator.type} onValueChange={(value) => setNewOperator({...newOperator, type: value})}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="laser" className="text-white hover:bg-slate-700">Laser</SelectItem>
                  <SelectItem value="sarin" className="text-white hover:bg-slate-700">Sarin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="assignedMachine" className="text-slate-300">Assigned Machine</Label>
              <Select value={newOperator.machineId} onValueChange={(value) => setNewOperator({...newOperator, machineId: value})}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select machine" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {machines.filter(m => m.type === newOperator.type && m.status === 'Active').map((machine) => (
                    <SelectItem key={machine.id} value={machine.id} className="text-white hover:bg-slate-700">
                      {machine.name} ({machine.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleAddOperator} className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Operator
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Existing Operators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-white/20 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-white/20 hover:bg-white/5">
                  <TableHead className="text-slate-300">Name</TableHead>
                  <TableHead className="text-slate-300">Type</TableHead>
                  <TableHead className="text-slate-300">Assigned Machine</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {operators.map((operator) => (
                  <TableRow key={operator.id} className="border-white/20 hover:bg-white/5">
                    <TableCell className="text-white font-medium">{operator.name}</TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(operator.type)}>
                        {operator.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300">{operator.machineId || 'Not Assigned'}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(operator.status)}>
                        {operator.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onOperatorDeleted(operator.id)}
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

export default OperatorManagement;
