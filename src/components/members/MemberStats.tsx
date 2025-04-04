
import React from 'react';
import { Member } from '@/types/member.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, Legend, PieChart, Pie } from 'recharts';
import { UserPlus, UserMinus, AlertTriangle, Users } from 'lucide-react';

type MemberStatsProps = {
  members: Member[];
};

const MemberStats: React.FC<MemberStatsProps> = ({ members }) => {
  // Calculate statistics
  const totalMembers = members.length;
  const activeMembers = members.filter(m => !m.banned).length;
  const inactiveMembers = members.filter(m => m.banned).length;
  const limitedMembers = members.filter(m => m.limited).length;
  
  const adminCount = members.filter(m => m.role === 'admin').length;
  const memberCount = members.filter(m => m.role === 'member').length;
  
  // Data for role distribution chart
  const roleData = [
    { name: 'Administrateurs', value: adminCount, color: '#8B5CF6' },
    { name: 'Membres', value: memberCount, color: '#3B82F6' },
  ];
  
  // Data for status distribution chart
  const statusData = [
    { name: 'Actifs', value: activeMembers, color: '#10B981' },
    { name: 'Inactifs', value: inactiveMembers, color: '#EF4444' },
    { name: 'Limités', value: limitedMembers, color: '#F59E0B' },
  ];

  // Custom tooltip configuration
  const config = {
    'Administrateurs': { color: '#8B5CF6' },
    'Membres': { color: '#3B82F6' },
    'Actifs': { color: '#10B981' },
    'Inactifs': { color: '#EF4444' },
    'Limités': { color: '#F59E0B' },
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total des membres
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-primary" />
              <div className="text-2xl font-bold">{totalMembers}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Membres actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <UserPlus className="w-5 h-5 mr-2 text-green-500" />
              <div className="text-2xl font-bold">{activeMembers}</div>
              <div className="ml-2 text-sm text-muted-foreground">
                ({Math.round((activeMembers / totalMembers) * 100)}%)
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Membres bannis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <UserMinus className="w-5 h-5 mr-2 text-destructive" />
              <div className="text-2xl font-bold">{inactiveMembers}</div>
              <div className="ml-2 text-sm text-muted-foreground">
                ({Math.round((inactiveMembers / totalMembers) * 100)}%)
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Membres limités
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
              <div className="text-2xl font-bold">{limitedMembers}</div>
              <div className="ml-2 text-sm text-muted-foreground">
                ({Math.round((limitedMembers / totalMembers) * 100)}%)
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribution des rôles</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={config} className="h-[300px]">
              <PieChart>
                <Pie
                  data={roleData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {roleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Statut des membres</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={config} className="h-[300px]">
              <BarChart data={statusData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="value" name="Nombre">
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MemberStats;
