
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LaserEntry from './laser/LaserEntry';
import LaserTable from './laser/LaserTable';
import LaserAnalysis from './laser/LaserAnalysis';
import LaserReturnLot from './laser/LaserReturnLot';
import LaserControlPanel from './laser/LaserControlPanel';

const LaserModule = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">⚡ Laser Lot Tracker</h2>
        <p className="text-slate-300">Laser lot generation and machine management</p>
      </div>

      <Tabs defaultValue="entry" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-white/10 backdrop-blur-xl border border-white/20">
          <TabsTrigger value="entry" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
            ➕ Entry
          </TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
            📊 Analysis
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
            📂 History
          </TabsTrigger>
          <TabsTrigger value="return" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
            🔄 Return Lot
          </TabsTrigger>
          <TabsTrigger value="control" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
            ⚙️ Control
          </TabsTrigger>
        </TabsList>

        <TabsContent value="entry" className="animate-fade-in">
          <LaserEntry />
        </TabsContent>

        <TabsContent value="analysis" className="animate-fade-in">
          <LaserAnalysis />
        </TabsContent>

        <TabsContent value="history" className="animate-fade-in">
          <LaserTable />
        </TabsContent>

        <TabsContent value="return" className="animate-fade-in">
          <LaserReturnLot />
        </TabsContent>

        <TabsContent value="control" className="animate-fade-in">
          <LaserControlPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LaserModule;
