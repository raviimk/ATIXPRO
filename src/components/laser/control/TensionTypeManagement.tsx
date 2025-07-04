import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from 'lucide-react';

interface TensionTypeManagementProps {
  tensionTypes: Array<{
    id: string;
    name: string;
  }>;
  onTensionTypeAdded: (tensionType: any) => void;
  onTensionTypeDeleted: (id: string) => void;
}

const TensionTypeManagement = ({ tensionTypes, onTensionTypeAdded, onTensionTypeDeleted }: TensionTypeManagementProps) => {
  const { toast } = useToast();
  const [newTensionType, setNewTensionType] = useState({ id: '', name: '' });

  const handleAddTensionType = () => {
    if (!newTensionType.id || !newTensionType.name) {
      toast({
        title: "❌ Missing Fields",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    if (tensionTypes.find(t => t.id === newTensionType.id)) {
      toast({
        title: "❌ Tension Type ID Exists",
        description: "This tension type ID already exists",
        variant: "destructive",
      });
      return;
    }

    onTensionTypeAdded(newTensionType);
    setNewTensionType({ id: '', name: '' });
    
    toast({
      title: "✅ Tension Type Added",
      description: `${newTensionType.name} has been added successfully`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Tension Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="tensionId" className="text-slate-300">Tension Type ID *</Label>
              <Input
                id="tensionId"
                value={newTensionType.id}
                onChange={(e) => setNewTensionType({...newTensionType, id: e.target.value})}
                placeholder="e.g., T006"
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <Label htmlFor="tensionName" className="text-slate-300">Tension Type Name *</Label>
              <Input
                id="tensionName"
                value={newTensionType.name}
                onChange={(e) => setNewTensionType({...newTensionType, name: e.target.value})}
                placeholder="Enter tension type name"
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
          <Button onClick={handleAddTensionType} className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Tension Type
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-xl border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Existing Tension Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-white/20 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-white/20 hover:bg-white/5">
                  <TableHead className="text-slate-300">Type ID</TableHead>
                  <TableHead className="text-slate-300">Name</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tensionTypes.map((tension) => (
                  <TableRow key={tension.id} className="border-white/20 hover:bg-white/5">
                    <TableCell className="text-white font-medium">{tension.id}</TableCell>
                    <TableCell className="text-slate-300">{tension.name}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onTensionTypeDeleted(tension.id)}
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

export default TensionTypeManagement;
