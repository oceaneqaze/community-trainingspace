
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from 'lucide-react';

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
  trendValue?: string;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon, trend, trendValue }) => (
  <Card className="transition-all duration-300 hover:shadow-md">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
            {trend && trendValue && (
              <div className={`flex items-center text-sm font-medium ${
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend === 'up' 
                  ? <TrendingUp className="mr-1 h-4 w-4" /> 
                  : <TrendingDown className="mr-1 h-4 w-4" />
                }
                {trendValue}
              </div>
            )}
          </div>
        </div>
        <div className={`p-3 rounded-lg ${
          trend === 'up' ? 'bg-green-100 text-green-700' : 
          trend === 'down' ? 'bg-red-100 text-red-700' : 
          'bg-blue-100 text-blue-700'
        }`}>
          {icon}
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default StatCard;
