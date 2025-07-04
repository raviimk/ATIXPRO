import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Settings, Users, Factory, Gauge } from 'lucide-react';
import OperatorManagement from './control/OperatorManagement';
import MachineManagement from './control/MachineManagement';
import TensionTypeManagement from './control/TensionTypeManagement';
import SystemSettings from './control/SystemSettings';

const LaserControlPanel = () => {
  const { toast } = useToast();

  // State for different management sections
  const [operators, setOperators] = useState([
    { id: 1, name: 'John Laser Operator', type: 'laser', machineId: 'M1', status: 'Active' },
    { id: 2, name: 'Jane Laser Operator', type: 'laser', machineId: 'M2', status: 'Active' },
    { id: 3, name: 'Mike Sarin Operator', type: 'sarin', machineId: 'S1', status: 'Active' },
    { id: 4, name: 'Sarah Sarin Operator', type: 'sarin', machineId: 'S2', status: 'Active' }
  ]);

  const [machines, setMachines] = useState([
    { id: 'M1', name: 'Laser Machine 1', type: 'laser', status: 'Active' },
    { id: 'M2', name: 'Laser Machine 2', type: 'laser', status: 'Active' },
    { id: 'M3', name: 'Laser Machine 3', type: 'laser', status: 'Maintenance' },
    { id: 'S1', name: 'Sarin Machine 1', type: 'sarin', status: 'Active' },
    { id: 'S2', name: 'Sarin Machine 2', type: 'sarin', status: 'Active' }
  ]);

  const [tensionTypes, setTensionTypes] = useState([
    { id: 'T001', name: 'Normal' },
    { id: 'T002', name: 'Pressure' },
    { id: 'T003', name: 'None' },
    { id: 'T004', name: 'Variable' },
    { id: 'T005', name: 'High Pressure' }
  ]);

  const handleOperatorAdded = (operator: any) => {
    setOperators([...operators, operator]);
  };

  const handleOperatorDeleted = (id: number) => {
    setOperators(operators.filter(op => op.id !== id));
    toast({
      title: "✅ Operator Deleted",
      description: "Operator has been removed successfully",
    });
  };

  const handleMachineAdded = (machine: any) => {
    setMachines([...machines, machine]);
  };

  const handleMachineDeleted = (id: string) => {
    setMachines(machines.filter(m => m.id !== id));
    toast({
      title: "✅ Machine Deleted",
      description: "Machine has been removed successfully",
    });
  };

  const handleTensionTypeAdded = (tensionType: any) => {
    setTensionTypes([...tensionTypes, tensionType]);
  };

  const handleTensionTypeDeleted = (id: string) => {
    setTensionTypes(tensionTypes.filter(t => t.id !== id));
    toast({
      title: "✅ Tension Type Deleted",
      description: "Tension type has been removed successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Settings className="w-6 h-6" />
          ⚙️ Control Panel & Master Setup
        </h2>
        <p className="text-slate-300">Manage operators, machines, tension types, and system settings</p>
      </div>

      <Tabs defaultValue="operators" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-xl border border-white/20">
          <TabsTrigger value="operators" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
            <Users className="w-4 h-4 mr-2" />
            Operators
          </TabsTrigger>
          <TabsTrigger value="machines" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
            <Factory className="w-4 h-4 mr-2" />
            Machines
          </TabsTrigger>
          <TabsTrigger value="tension" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
            <Gauge className="w-4 h-4 mr-2" />
            Tension Types
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="operators" className="animate-fade-in">
          <OperatorManagement
            operators={operators}
            machines={machines}
            onOperatorAdded={handleOperatorAdded}
            onOperatorDeleted={handleOperatorDeleted}
          />
        </TabsContent>

        <TabsContent value="machines" className="animate-fade-in">
          <MachineManagement
            machines={machines}
            onMachineAdded={handleMachineAdded}
            onMachineDeleted={handleMachineDeleted}
          />
        </TabsContent>

        <TabsContent value="tension" className="animate-fade-in">
          <TensionTypeManagement
            tensionTypes={tensionTypes}
            onTensionTypeAdded={handleTensionTypeAdded}
            onTensionTypeDeleted={handleTensionTypeDeleted}
          />
        </TabsContent>

        <TabsContent value="settings" className="animate-fade-in">
          <SystemSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LaserControlPanel;
