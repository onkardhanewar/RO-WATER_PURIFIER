import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Package, 
  MessageSquare, 
  Wrench, 
  AlertTriangle,
  LogOut,
  Menu,
  X,
  ShoppingCart,
  TrendingUp,
  Users,
  Activity
} from "lucide-react";

interface DashboardStats {
  totalProducts: number;
  totalQueries: number;
  totalServiceRequests: number;
  totalComplaints: number;
  totalOrders: number;
  pendingQueries: number;
  pendingServiceRequests: number;
  openComplaints: number;
  pendingOrders: number;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [admin, setAdmin] = useState<any>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    checkAuth();
    loadStats();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/me", { credentials: "include" });
      if (!response.ok) {
        setLocation("/admin/login");
        return;
      }
      const data = await response.json();
      setAdmin(data);
    } catch (error) {
      setLocation("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch("/api/admin/stats", { credentials: "include" });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
      setLocation("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Package, label: "Products", path: "/admin/products" },
    { icon: ShoppingCart, label: "Orders", path: "/admin/orders" },
    { icon: MessageSquare, label: "Contact Queries", path: "/admin/queries" },
    { icon: Wrench, label: "Service Requests", path: "/admin/services" },
    { icon: AlertTriangle, label: "Complaints", path: "/admin/complaints" },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 border-r border-gray-800 shadow-sm transform transition-transform duration-200 ease-in-out z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white">RO Admin</h1>
          <p className="text-sm text-gray-400 mt-1">
            Welcome, {admin?.username}
          </p>
        </div>

        <nav className="px-4 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white">
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </a>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          <Link href="/admin/settings">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setSidebarOpen(false)}
            >
              <i className="fa-solid fa-gear w-4 h-4 mr-2" />
              Settings
            </Button>
          </Link>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-64 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
            <p className="text-gray-400">Welcome back, {admin?.username}! Here's what's happening today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {/* Total Orders */}
            <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-transparent">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-gray-400">Total Orders</CardDescription>
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-white">{stats?.totalOrders || 0}</CardTitle>
              </CardHeader>
              <CardContent>
                {stats?.pendingOrders ? (
                  <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                    {stats.pendingOrders} pending
                  </Badge>
                ) : null}
                <Link href="/admin/orders">
                  <a className="text-sm text-primary hover:underline block mt-2">View All →</a>
                </Link>
              </CardContent>
            </Card>

            {/* Total Products */}
            <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-transparent">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-gray-400">Total Products</CardDescription>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Package className="w-4 h-4 text-blue-500" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-white">{stats?.totalProducts || 0}</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/admin/products">
                  <a className="text-sm text-blue-500 hover:underline">Manage Products →</a>
                </Link>
              </CardContent>
            </Card>

            {/* Contact Queries */}
            <Card className="border-green-500/20 bg-gradient-to-br from-green-500/10 to-transparent">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-gray-400">Contact Queries</CardDescription>
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-green-500" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-white">{stats?.totalQueries || 0}</CardTitle>
              </CardHeader>
              <CardContent>
                {stats?.pendingQueries ? (
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    {stats.pendingQueries} pending
                  </Badge>
                ) : null}
                <Link href="/admin/queries">
                  <a className="text-sm text-green-500 hover:underline block mt-2">View All →</a>
                </Link>
              </CardContent>
            </Card>

            {/* Service Requests */}
            <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-transparent">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-gray-400">Service Requests</CardDescription>
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Wrench className="w-4 h-4 text-purple-500" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-white">{stats?.totalServiceRequests || 0}</CardTitle>
              </CardHeader>
              <CardContent>
                {stats?.pendingServiceRequests ? (
                  <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                    {stats.pendingServiceRequests} pending
                  </Badge>
                ) : null}
                <Link href="/admin/services">
                  <a className="text-sm text-purple-500 hover:underline block mt-2">View All →</a>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Complaints Card */}
            <Card className="border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Complaints</CardTitle>
                    <CardDescription>Customer feedback and issues</CardDescription>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <div className="text-4xl font-bold text-white mb-1">{stats?.totalComplaints || 0}</div>
                    <div className="text-sm text-gray-400">Total complaints</div>
                  </div>
                  {stats?.openComplaints ? (
                    <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 text-lg px-3 py-1">
                      {stats.openComplaints} open
                    </Badge>
                  ) : null}
                </div>
                <Link href="/admin/complaints">
                  <Button variant="outline" className="w-full border-red-500/20 text-red-500 hover:bg-red-500/10">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    View All Complaints
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card className="border-white/10 bg-gradient-to-br from-white/5 to-transparent">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Quick Actions</CardTitle>
                    <CardDescription>Common administrative tasks</CardDescription>
                  </div>
                  <Activity className="w-6 h-6 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/admin/products?action=add">
                  <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                    <Package className="w-4 h-4 mr-2" />
                    Add New Product
                  </Button>
                </Link>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/admin/orders">
                    <Button variant="outline" className="w-full border-white/10" size="sm">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Orders
                    </Button>
                  </Link>
                  <Link href="/admin/queries">
                    <Button variant="outline" className="w-full border-white/10" size="sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Queries
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Summary */}
          <Card className="border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Activity Summary</CardTitle>
                  <CardDescription>Recent activity across all modules</CardDescription>
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{stats?.pendingOrders || 0}</div>
                  <div className="text-sm text-gray-400">Pending Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500 mb-1">{stats?.pendingQueries || 0}</div>
                  <div className="text-sm text-gray-400">Pending Queries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500 mb-1">{stats?.pendingServiceRequests || 0}</div>
                  <div className="text-sm text-gray-400">Pending Services</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500 mb-1">{stats?.openComplaints || 0}</div>
                  <div className="text-sm text-gray-400">Open Complaints</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
