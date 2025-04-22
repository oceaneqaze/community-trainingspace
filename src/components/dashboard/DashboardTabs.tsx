
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MemberDashboardOverview from './MemberDashboardOverview';

const DashboardTabs: React.FC = () => {
  return (
    <Tabs defaultValue="overview" className="mb-8">
      <TabsList className="mb-6 w-full sm:w-auto p-1 bg-muted/80 backdrop-blur-sm">
        <TabsTrigger value="overview" className="px-6 py-2.5">
          Vue d'ensemble
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <MemberDashboardOverview />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
