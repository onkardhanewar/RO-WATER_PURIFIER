import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Shield, FileText } from "lucide-react";

interface ComplaintFormData {
  name: string;
  email: string;
  phone: string;
  productModel: string;
  complaintType: string;
  description: string;
}

export default function ComplaintForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ComplaintFormData>({
    name: "",
    email: "",
    phone: "",
    productModel: "",
    complaintType: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Complaint Registered",
          description: "Your complaint has been registered. We'll address it as soon as possible.",
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          productModel: "",
          complaintType: "",
          description: "",
        });
      } else {
        throw new Error("Failed to submit complaint");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit complaint. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-red-500/5 to-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-red-500 text-sm font-medium tracking-widest uppercase">
              File a Complaint
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            We're Here to Help
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Not satisfied with our product or service? Let us know and we'll work to resolve your concerns.
          </p>
        </div>
      </section>

      {/* Complaint Types Info */}
      <section className="pb-12 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-white/10 bg-[#0a0f1a]">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Product Issue</h3>
                <p className="text-gray-400 text-sm">
                  Report problems with product quality, performance, or functionality.
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-[#0a0f1a]">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Service Issue</h3>
                <p className="text-gray-400 text-sm">
                  Issues with installation, maintenance, or repair services.
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-[#0a0f1a]">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-yellow-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Other Concerns</h3>
                <p className="text-gray-400 text-sm">
                  Billing issues, delivery problems, or any other concerns.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Complaint Form */}
      <section className="pb-24 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <Card className="border-white/10 bg-[#0a0f1a]">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Full Name *
                    </label>
                    <Input
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="bg-black border-white/10 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Email *
                    </label>
                    <Input
                      required
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="bg-black border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Phone Number *
                    </label>
                    <Input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="bg-black border-white/10 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Complaint Type *
                    </label>
                    <Select
                      value={formData.complaintType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, complaintType: value })
                      }
                      required
                    >
                      <SelectTrigger className="bg-black border-white/10 text-white">
                        <SelectValue placeholder="Select complaint type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product-issue">Product Issue</SelectItem>
                        <SelectItem value="service-issue">Service Issue</SelectItem>
                        <SelectItem value="billing">Billing Issue</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Product Model (if applicable)
                  </label>
                  <Input
                    placeholder="e.g., AquaPure Premium RO"
                    value={formData.productModel}
                    onChange={(e) =>
                      setFormData({ ...formData, productModel: e.target.value })
                    }
                    className="bg-black border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Complaint Description *
                  </label>
                  <Textarea
                    required
                    placeholder="Please describe your complaint in detail..."
                    rows={6}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="bg-black border-white/10 text-white resize-none"
                  />
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">
                      <p className="font-medium text-white mb-1">Our Commitment</p>
                      <ul className="space-y-1 text-gray-400">
                        <li>• We take all complaints seriously and investigate thoroughly</li>
                        <li>• You'll receive an acknowledgment within 24 hours</li>
                        <li>• We'll work to resolve your issue as quickly as possible</li>
                        <li>• Your feedback helps us improve our products and services</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Submit Complaint
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
