import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Grid3X3, Award, FileText, Plus, TrendingUp } from 'lucide-react';
import api from '../../utils/api';

const Dashboard = () => {
    const [stats, setStats] = React.useState(null);

const statCards = stats
  ? [
      { name: 'Total Products', value: stats.totalProducts, icon: Package, color: 'text-blue-600', bg: 'bg-blue-100' },
      { name: 'Categories', value: stats.totalCategories, icon: Grid3X3, color: 'text-green-600', bg: 'bg-green-100' },
      { name: 'Brands', value: stats.totalBrands, icon: Award, color: 'text-purple-600', bg: 'bg-purple-100' },
      { name: 'Blog Posts', value: stats.totalBlogPosts, icon: FileText, color: 'text-orange-600', bg: 'bg-orange-100' },
      { name: 'Featured Products', value: stats.totalFeaturedProducts, icon: TrendingUp, color: 'text-pink-600', bg: 'bg-pink-100' },
    ]
  : [];

  const quickActions = [
    { name: 'Add Product', href: '/admin/products', icon: Package, color: 'btn-primary' },
    { name: 'Add Category', href: '/admin/categories', icon: Grid3X3, color: 'btn-secondary' },
    { name: 'Add Brand', href: '/admin/brands', icon: Award, color: 'btn-accent' },
    { name: 'Add Blog Post', href: '/admin/blogs', icon: FileText, color: 'btn-info' },
  ];




const getdashboardSummary = async () => {
  try {
    const res = await api.get("/products/dashboard/stats");
    setStats(res.data); // 👈 save stats to state
  } catch (error) {
    console.log("Error fetching dashboard stats:", error);
  }
};


  useEffect(()=>{
    getdashboardSummary();
  },[])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome to MarineServ Admin Panel</p>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-green-500" />
          <span className="text-sm text-gray-600">All systems operational</span>
        </div>
      </div>

      {/* Stats Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {statCards.map((stat, index) => {
    const Icon = stat.icon;
    return (
      <motion.div
        key={stat.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center">
          <div className={`p-3 rounded-lg ${stat.bg}`}>
            <Icon className={`w-6 h-6 ${stat.color}`} />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{stat.name}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        </div>
      </motion.div>
    );
  })}
</div>


      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={action.href}
                  className={`btn ${action.color} w-full justify-start`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {action.name}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">New product "Marine Diesel Engine 500HP" added</span>
            <span className="text-gray-400">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">Blog post "Essential Marine Safety Equipment" published</span>
            <span className="text-gray-400">1 day ago</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-gray-600">New brand "Caterpillar" added to catalog</span>
            <span className="text-gray-400">2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;