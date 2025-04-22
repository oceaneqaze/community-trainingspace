
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import MemberDashboardOverview from './MemberDashboardOverview';

const DashboardTabs: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Tabs defaultValue="overview" className="mb-8">
      <TabsList className="mb-6 w-full sm:w-auto p-1 bg-muted/80 backdrop-blur-sm">
        <TabsTrigger value="overview" className="px-6 py-2.5">
          Vue d'ensemble
        </TabsTrigger>
        <TabsTrigger value="blog" className="px-6 py-2.5">
          Blog
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <MemberDashboardOverview />
      </TabsContent>

      <TabsContent value="blog">
        <div className="grid gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Gestion du Blog</h2>
            <Button 
              onClick={() => navigate('/blog/manage')}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Créer un article
            </Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
