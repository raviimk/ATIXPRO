
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Package, Users, Zap } from 'lucide-react';

const Dashboard = () => {
  // Mock data - in real app this would come from API
  const stats = {
    totalPackets: 1247,
    activeOperators: 12,
    laserLots: 45,
    completedToday: 234
  };

  const recentActivity = [
    { operator: "John Doe", action: "Added 50 packets to Lot #L001", time: "2 mins ago", type: "sarin" },
    { operator: "Jane Smith", action: "Created Laser Lot #LL123", time: "5 mins ago", type: "laser" },
    { operator: "Mike Wilson", action: "Reassigned 25 packets", time: "8 mins ago", type: "reassign" },
    { operator: "Sarah Johnson", action: "Completed analysis for Lot #L005", time: "12 mins ago", type: "analysis" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'sarin': return '📦';
      case 'laser': return '⚡';
      case 'reassign': return '🔄';
      case 'analysis': return '📊';
      default: return '📝';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'sarin': return 'bg-blue-500/20 text-blue-300';
      case 'laser': return 'bg-yellow-500/20 text-yellow-300';
      case 'reassign': return 'bg-purple-500/20 text-purple-300';
      case 'analysis': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total Packets</CardTitle>
            <Package className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalPackets.toLocaleString()}</div>
            <p className="text-xs text-slate-400">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Active Operators</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.activeOperators}</div>
            <p className="text-xs text-slate-400">Currently working</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Laser Lots</CardTitle>
            <Zap className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.laserLots}</div>
            <p className="text-xs text-slate-400">This week</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Completed Today</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.completedToday}</div>
            <p className="text-xs text-slate-400">+8% efficiency</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white">📈 Production Progress</CardTitle>
            <CardDescription className="text-slate-400">Today's processing status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Sarin Processing</span>
                <span className="text-slate-300">75%</span>
              </div>
              <Progress value={75} className="h-2 bg-slate-800" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Laser Operations</span>
                <span className="text-slate-300">60%</span>
              </div>
              <Progress value={60} className="h-2 bg-slate-800" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Quality Check</span>
                <span className="text-slate-300">90%</span>
              </div>
              <Progress value={90} className="h-2 bg-slate-800" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white">🕓 Recent Activity</CardTitle>
            <CardDescription className="text-slate-400">Latest operations and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="text-lg">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium">{activity.operator}</p>
                    <p className="text-xs text-slate-400 truncate">{activity.action}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge className={`text-xs ${getActivityColor(activity.type)}`}>
                      {activity.type}
                    </Badge>
                    <span className="text-xs text-slate-500 mt-1">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
