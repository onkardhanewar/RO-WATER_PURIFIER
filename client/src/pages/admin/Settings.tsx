import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AdminSettings() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword) {
      toast({
        title: "Error",
        description: "Current password is required",
        variant: "destructive",
      });
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (!newUsername && !newPassword) {
      toast({
        title: "Error",
        description: "Please provide new username or password to update",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/update-credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          currentPassword,
          newUsername: newUsername || undefined,
          newPassword: newPassword || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: "Credentials updated successfully. Please login again.",
        });
        
        // Clear form
        setCurrentPassword("");
        setNewUsername("");
        setNewPassword("");
        setConfirmPassword("");
        
        // Logout and redirect to login
        setTimeout(() => {
          setLocation("/admin/login");
        }, 2000);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to update credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your admin credentials</p>
          </div>
          <Button variant="outline" onClick={() => setLocation("/admin/dashboard")}>
            <i className="fa-solid fa-arrow-left mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <Alert className="mb-6 border-yellow-500/50 bg-yellow-500/10">
          <i className="fa-solid fa-triangle-exclamation text-yellow-500" />
          <AlertDescription className="ml-2">
            Changing your credentials will log you out. You'll need to login with your new credentials.
          </AlertDescription>
        </Alert>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Update Credentials</CardTitle>
            <CardDescription>
              Change your admin username and/or password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateCredentials} className="space-y-6">
              {/* Current Password */}
              <div className="space-y-2">
                <Label htmlFor="currentPassword">
                  Current Password <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password"
                  required
                  className="bg-background"
                />
                <p className="text-xs text-muted-foreground">
                  Required for verification
                </p>
              </div>

              <div className="border-t border-border/50 pt-6">
                <h3 className="text-sm font-medium text-foreground mb-4">New Credentials</h3>
                
                {/* New Username */}
                <div className="space-y-2 mb-4">
                  <Label htmlFor="newUsername">New Username (Optional)</Label>
                  <Input
                    id="newUsername"
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="Leave blank to keep current username"
                    className="bg-background"
                  />
                </div>

                {/* New Password */}
                <div className="space-y-2 mb-4">
                  <Label htmlFor="newPassword">New Password (Optional)</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Leave blank to keep current password"
                    className="bg-background"
                  />
                </div>

                {/* Confirm Password */}
                {newPassword && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your new password"
                      required
                      className="bg-background"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin mr-2" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-save mr-2" />
                      Update Credentials
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setCurrentPassword("");
                    setNewUsername("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                  disabled={loading}
                >
                  Clear
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
