import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  Eye,
  Ban,
  IndianRupee,
  Activity,
  Shield,
  Settings,
  BarChart3,
  FileText,
  AlertTriangle,
} from "lucide-react";

const stats = [
  { label: "Total Users", value: "45,289", change: "+12.5%", trend: "up", icon: Users },
  { label: "Active Tutors", value: "8,432", change: "+8.2%", trend: "up", icon: GraduationCap },
  { label: "Institutes", value: "1,245", change: "+15.3%", trend: "up", icon: Building2 },
  { label: "Active Jobs", value: "3,567", change: "-2.4%", trend: "down", icon: Briefcase },
  { label: "Revenue", value: "₹24.5L", change: "+18.7%", trend: "up", icon: IndianRupee },
  { label: "Pending Verifications", value: "156", change: "", trend: "neutral", icon: AlertTriangle },
];

const recentUsers = [
  { id: 1, name: "Rahul Kumar", email: "rahul@email.com", role: "Tutor", status: "active", joined: "2 hours ago", verified: true },
  { id: 2, name: "ABC Academy", email: "abc@academy.com", role: "Institute", status: "pending", joined: "5 hours ago", verified: false },
  { id: 3, name: "Priya Sharma", email: "priya@email.com", role: "Parent", status: "active", joined: "1 day ago", verified: true },
  { id: 4, name: "Amit Singh", email: "amit@email.com", role: "Student", status: "active", joined: "1 day ago", verified: true },
  { id: 5, name: "XYZ Coaching", email: "xyz@coaching.com", role: "Institute", status: "suspended", joined: "3 days ago", verified: false },
];

const platformActivity = [
  { time: "2 min ago", action: "New tutor registered", user: "Vikram Patel", type: "registration" },
  { time: "15 min ago", action: "Job posted", user: "ABC Academy", type: "job" },
  { time: "1 hour ago", action: "Payment processed", user: "Global Learning", type: "payment" },
  { time: "2 hours ago", action: "Institute verified", user: "Delhi Tutors Hub", type: "verification" },
  { time: "3 hours ago", action: "Report submitted", user: "User #4523", type: "report" },
];

const tabs = ["Overview", "Users", "Institutes", "Jobs", "Reports", "Settings"];

export default function SuperadminDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            </div>
            <p className="text-muted-foreground">Platform management and analytics</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileText className="h-5 w-5" />
              Export Report
            </Button>
            <Button>
              <Settings className="h-5 w-5" />
              Settings
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 overflow-x-auto border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                {stat.trend !== "neutral" && (
                  <div className={`flex items-center gap-1 text-xs ${stat.trend === "up" ? "text-success" : "text-destructive"}`}>
                    {stat.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {stat.change}
                  </div>
                )}
              </div>
              <div className="text-xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Users Table */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card">
              <div className="flex flex-col gap-4 border-b border-border p-6 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-semibold text-foreground">Recent Users</h2>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-left text-sm text-muted-foreground">
                      <th className="p-4 font-medium">User</th>
                      <th className="p-4 font-medium">Role</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Joined</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="border-b border-border last:border-0">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                              {user.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 font-medium text-foreground">
                                {user.name}
                                {user.verified && <CheckCircle className="h-4 w-4 text-success" />}
                              </div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            user.role === "Tutor" ? "bg-primary/10 text-primary" :
                            user.role === "Institute" ? "bg-accent/10 text-accent" :
                            user.role === "Parent" ? "bg-warning/10 text-warning" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            user.status === "active" ? "bg-success/10 text-success" :
                            user.status === "pending" ? "bg-warning/10 text-warning" :
                            "bg-destructive/10 text-destructive"
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{user.joined}</td>
                        <td className="p-4">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Ban className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between border-t border-border p-4">
                <span className="text-sm text-muted-foreground">Showing 5 of 45,289 users</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Activity Feed */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Platform Activity</h2>
                <Activity className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="space-y-4">
                {platformActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 border-b border-border pb-4 last:border-0 last:pb-0">
                    <div className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full ${
                      activity.type === "registration" ? "bg-success/10" :
                      activity.type === "job" ? "bg-primary/10" :
                      activity.type === "payment" ? "bg-warning/10" :
                      activity.type === "verification" ? "bg-accent/10" :
                      "bg-destructive/10"
                    }`}>
                      {activity.type === "registration" && <Users className="h-4 w-4 text-success" />}
                      {activity.type === "job" && <Briefcase className="h-4 w-4 text-primary" />}
                      {activity.type === "payment" && <IndianRupee className="h-4 w-4 text-warning" />}
                      {activity.type === "verification" && <CheckCircle className="h-4 w-4 text-accent" />}
                      {activity.type === "report" && <AlertTriangle className="h-4 w-4 text-destructive" />}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-foreground">{activity.action}</div>
                      <div className="text-xs text-muted-foreground">{activity.user} • {activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats Chart */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">User Growth</h2>
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="flex h-32 items-end justify-between gap-2">
                {[65, 45, 75, 55, 85, 60, 90].map((height, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t gradient-primary"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {["M", "T", "W", "T", "F", "S", "S"][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
