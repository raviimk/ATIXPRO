
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PacketEntry from './sarin/PacketEntry';
import PacketTable from './sarin/PacketTable';
import LotAnalysis from './sarin/LotAnalysis';
import PacketReassign from './sarin/PacketReassign';

const SarinModule = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">🧑‍🏭 Sarin Operator Tracker</h2>
        <p className="text-slate-300">Diamond packet tracking and operator management</p>
      </div>

      <Tabs defaultValue="entry" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-xl border border-white/20">
          <TabsTrigger value="entry" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
            📝 Entry
          </TabsTrigger>
          <TabsTrigger value="table" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
            📦 Packets
          </TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
            📊 Analysis
          </TabsTrigger>
          <TabsTrigger value="reassign" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
            🔄 Reassign
          </TabsTrigger>
        </TabsList>

        <TabsContent value="entry" className="animate-fade-in">
          <PacketEntry />
        </TabsContent>

        <TabsContent value="table" className="animate-fade-in">
          <PacketTable />
        </TabsContent>

        <TabsContent value="analysis" className="animate-fade-in">
          <LotAnalysis />
        </TabsContent>

        <TabsContent value="reassign" className="animate-fade-in">
          <PacketReassign />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SarinModule;
