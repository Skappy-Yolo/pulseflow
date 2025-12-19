import { motion } from "motion/react";
import { TrendingUp, Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

interface NewOverviewProps {
  clientData: any[];
}

export function NewOverview({ clientData }: NewOverviewProps) {
  const statsCards = [
    {
      title: "Total Revenue",
      value: "$124.5K",
      change: "+12.5%",
      changeType: "positive",
      icon: DollarSign,
      description: "vs last month"
    },
    {
      title: "Active Clients",
      value: "18",
      change: "+3",
      changeType: "positive", 
      icon: Users,
      description: "new this quarter"
    },
    {
      title: "Avg Health Score",
      value: "87.2",
      change: "-2.1%",
      changeType: "negative",
      icon: Activity,
      description: "across all clients"
    },
    {
      title: "Growth Rate",
      value: "23.8%",
      change: "+4.2%",
      changeType: "positive",
      icon: TrendingUp,
      description: "quarterly growth"
    }
  ];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard V2 Overview
          </h1>
          <p className="text-gray-600">
            Welcome to the new and improved client management dashboard
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline">
            Export Data
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Add New Client
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <stat.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.changeType === 'positive' 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {stat.changeType === 'positive' ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {stat.change}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Client Overview Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Client Portfolio</h2>
          <Button variant="outline" size="sm">View All Clients</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {clientData.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{client.name}</h3>
                    <p className="text-sm text-gray-600">{client.category}</p>
                  </div>
                  <div className={`text-right`}>
                    <div className={`text-2xl font-bold ${client.scoreColor}`}>
                      {client.score}
                    </div>
                    <p className="text-xs text-gray-500">Health Score</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Users</span>
                    <span className="text-sm font-medium">{client.users}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Assigned to</span>
                    <span className="text-sm font-medium">{client.assignedTo}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <div className={`flex items-center gap-1 text-sm ${
                      client.trend === 'up' ? 'text-green-600' :
                      client.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {client.trend === 'up' ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : client.trend === 'down' ? (
                        <ArrowDownRight className="h-3 w-3" />
                      ) : (
                        <Activity className="h-3 w-3" />
                      )}
                      {client.trendValue}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">
                    {client.trendText}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-medium">Generate Report</div>
                <div className="text-sm text-gray-600">Create comprehensive client reports</div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-medium">Schedule Meeting</div>
                <div className="text-sm text-gray-600">Book time with your clients</div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-medium">Send Update</div>
                <div className="text-sm text-gray-600">Share progress with stakeholders</div>
              </div>
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}