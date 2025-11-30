import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Grid3X3, Award, FileText, Plus, TrendingUp } from 'lucide-react';
import api from '../../utils/api';

const Dashboard = () => {
  const [stats, setStats] = React.useState(null);

  const statCards = stats
    ? [
        { name: 'Total Products', value: stats.totalProducts, icon: Package },
        { name: 'Categories', value: stats.totalCategories, icon: Grid3X3 },
        { name: 'Brands', value: stats.totalBrands, icon: Award },
        { name: 'Blog Posts', value: stats.totalBlogPosts, icon: FileText },
        { name: 'Featured Products', value: stats.totalFeaturedProducts, icon: TrendingUp },
      ]
    : [];

  const quickActions = [
    { name: 'Add Product', href: '/admin/products', icon: Package },
    { name: 'Add Category', href: '/admin/categories', icon: Grid3X3 },
    { name: 'Add Brand', href: '/admin/brands', icon: Award },
    { name: 'Add Blog Post', href: '/admin/blogs', icon: FileText },
  ];

  const getDashboardSummary = async () => {
    try {
      const res = await api.get("/products/dashboard/stats");
      setStats(res.data);
    } catch (error) {
      console.log("Error fetching dashboard stats:", error);
    }
  };

  useEffect(() => {
    getDashboardSummary();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-4xl font-bold text-marine-navy uppercase tracking-wide">Dashboard</h1>
          <p className="text-marine-blue mt-2 font-sans">Welcome to Corona Marine Admin Panel</p>
        </div>
        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-md border border-marine-aqua/20">
          <TrendingUp className="w-5 h-5 text-marine-aqua" />
          <span className="text-sm font-bold text-marine-navy uppercase tracking-wide">All Systems Operational</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md border-l-4 border-marine-aqua p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-marine-blue uppercase tracking-wide">{stat.name}</p>
                  <p className="text-3xl font-bold text-marine-navy mt-2">{stat.value}</p>
                </div>
                <div className="p-3 rounded-lg bg-marine-aqua/10">
                  <Icon className="w-8 h-8 text-marine-aqua" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md border border-marine-aqua/10 p-6">
        <h2 className="font-heading text-2xl font-bold text-marine-navy mb-6 uppercase tracking-wide">Quick Actions</h2>
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
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-marine-aqua text-marine-navy font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-marine-navy hover:text-white transition-all shadow-md hover:shadow-lg"
                >
                  <Icon className="w-5 h-5" />
                  {action.name}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md border border-marine-aqua/10 p-6">
        <h2 className="font-heading text-2xl font-bold text-marine-navy mb-6 uppercase tracking-wide">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-sm pb-4 border-b border-marine-aqua/10">
            <div className="w-2 h-2 bg-marine-aqua rounded-full"></div>
            <span className="font-sans text-marine-blue flex-1">New product "Marine Diesel Engine 500HP" added</span>
            <span className="text-marine-blue/60 font-semibold">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 text-sm pb-4 border-b border-marine-aqua/10">
            <div className="w-2 h-2 bg-marine-seafoam rounded-full"></div>
            <span className="font-sans text-marine-blue flex-1">Blog post "Essential Marine Safety Equipment" published</span>
            <span className="text-marine-blue/60 font-semibold">1 day ago</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-marine-blue rounded-full"></div>
            <span className="font-sans text-marine-blue flex-1">New brand "Caterpillar" added to catalog</span>
            <span className="text-marine-blue/60 font-semibold">2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;