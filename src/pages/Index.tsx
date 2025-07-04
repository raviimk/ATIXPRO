
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SarinModule from "@/components/SarinModule";
import LaserModule from "@/components/LaserModule";
import Dashboard from "@/components/Dashboard";
import { Gem, Zap, BarChart3 } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            💎 Diamond Factory Manager
          </h1>
          <p className="text-slate-300 text-lg">
            Advanced Production Tracking System
          </p>
        </div>

        {/* Main Navigation */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-xl border border-white/20 mb-8">
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white text-slate-300 transition-all duration-300"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              📊 Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="sarin" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white text-slate-300 transition-all duration-300"
            >
              <Gem className="w-4 h-4 mr-2" />
              🧑‍🏭 Sarin Tracker
            </TabsTrigger>
            <TabsTrigger 
              value="laser" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white text-slate-300 transition-all duration-300"
            >
              <Zap className="w-4 h-4 mr-2" />
              ⚡ Laser Tracker
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="animate-fade-in">
            <Dashboard />
          </TabsContent>

          <TabsContent value="sarin" className="animate-fade-in">
            <SarinModule />
          </TabsContent>

          <TabsContent value="laser" className="animate-fade-in">
            <LaserModule />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
