import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Mail, Phone, AlertCircle } from "lucide-react";

interface Complaint {
  id: string;
  name: string;
  email: string;
  phone: string;
  productModel: string | null;
  complaintType: string;
  description: string;
  priority: string;
  status: string;
  resolution: string | null;
  createdAt: string;
  resolvedAt: string | null;
}

export default function AdminComplaints() {
  const [, setLocation] = useLocation();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [resolution, setResolution] = useState("");

  useEffect(() => {
    checkAuth();
    loadComplaints();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/me", { credentials: "include" });
      if (!response.ok) {
        setLocation("/admin/login");
      }
    } catch (error) {
      setLocation("/admin/login");
    }
  };

  const loadComplaints = async () => {
    try {
      const response = await fetch("/api/admin/complaints", { credentials: "include" });
      if (response.ok) {
        const data = await response.json();
        setComplaints(data);
      }
    } catch (error) {
      console.error("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  const updateComplaint = async (id: string, data: Partial<Complaint>) => {
    try {
      const response = await fetch(`/api/admin/complaints/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        loadComplaints();
      }
    } catch (error) {
      console.error("Failed to update complaint");
    }
  };

  const handleResolve = async () => {
    if (!selectedComplaint || !resolution.trim()) return;

    await updateComplaint(selectedComplaint.id, {
      status: "resolved",
      resolution: resolution,
    });

    setSelectedComplaint(null);
    setResolution("");
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      open: "destructive",
      investigating: "default",
      resolved: "default",
      closed: "secondary",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const colors: Record<string, string> = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
    };
    return (
      <Badge className={colors[priority] || ""}>{priority}</Badge>
    );
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="lg:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/admin/dashboard")}
            >
              <ArrowLeft />
            </Button>
            <h2 className="text-3xl font-bold text-white">Complaints Management</h2>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Complaints ({complaints.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading complaints...</div>
              ) : complaints.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No complaints yet.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer Info</TableHead>
                      <TableHead>Complaint Details</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complaints.map((complaint) => (
                      <TableRow key={complaint.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{complaint.name}</div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <Mail className="w-3 h-3" />
                              {complaint.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone className="w-3 h-3" />
                              {complaint.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <Badge variant="outline" className="mb-1">
                              {complaint.complaintType}
                            </Badge>
                            {complaint.productModel && (
                              <div className="text-sm mb-1">
                                <span className="font-medium">Model:</span> {complaint.productModel}
                              </div>
                            )}
                            <div className="max-w-md line-clamp-2 text-sm text-muted-foreground">
                              {complaint.description}
                            </div>
                            {complaint.resolution && (
                              <div className="mt-2 p-2 bg-green-50 rounded text-sm">
                                <span className="font-medium">Resolution:</span> {complaint.resolution}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getPriorityBadge(complaint.priority)}</TableCell>
                        <TableCell>
                          {new Date(complaint.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{getStatusBadge(complaint.status)}</TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <Select
                              value={complaint.status}
                              onValueChange={(value) => updateComplaint(complaint.id, { status: value })}
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="open">Open</SelectItem>
                                <SelectItem value="investigating">Investigating</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Select
                              value={complaint.priority}
                              onValueChange={(value) => updateComplaint(complaint.id, { priority: value })}
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>

                            {complaint.status !== "resolved" && complaint.status !== "closed" && (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => {
                                      setSelectedComplaint(complaint);
                                      setResolution(complaint.resolution || "");
                                    }}
                                  >
                                    Resolve
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Resolve Complaint</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <p className="text-sm text-muted-foreground mb-2">
                                        Complaint from {complaint.name}
                                      </p>
                                      <p className="text-sm">{complaint.description}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Resolution Notes</label>
                                      <Textarea
                                        value={resolution}
                                        onChange={(e) => setResolution(e.target.value)}
                                        placeholder="Enter resolution details..."
                                        rows={4}
                                        className="mt-2"
                                      />
                                    </div>
                                    <Button
                                      onClick={handleResolve}
                                      className="w-full"
                                      disabled={!resolution.trim()}
                                    >
                                      Mark as Resolved
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
