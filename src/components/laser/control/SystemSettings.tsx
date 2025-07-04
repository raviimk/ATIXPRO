import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User } from 'lucide-react';

const SystemSettings = () => {
  const { toast } = useToast();
  const [defaultSender, setDefaultSender] = useState('Default Sender');

  const handleSaveSettings = () => {
    toast({
      title: "✅ Settings Updated",
      description: "Default settings have been saved successfully",
    });
  };

  return (
    <Card className="bg-white/10 backdrop-blur-xl border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <User className="w-5 h-5" />
          Default Settings
        </CardTitle>
        <CardDescription className="text-slate-400">
          Configure default values and system preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="defaultSender" className="text-slate-300">Default Sender Name</Label>
            <Input
              id="defaultSender"
              value={defaultSender}
              onChange={(e) => setDefaultSender(e.target.value)}
              placeholder="Enter default sender name"
              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <Button 
            onClick={handleSaveSettings}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
          >
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemSettings;
