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
import { MessageSquare, Phone, Mail, MapPin } from "lucide-react";

interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  serviceInterest: string;
  message: string;
}

export default function ServicesEnquiry() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: "",
    email: "",
    phone: "",
    serviceInterest: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Service Interest: ${formData.serviceInterest}\n\n${formData.message}`,
        }),
      });

      if (response.ok) {
        toast({
          title: "Enquiry Submitted!",
          description: "Our team will contact you within 24 hours with detailed information.",
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          serviceInterest: "",
          message: "",
        });
      } else {
        throw new Error("Failed to submit enquiry");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit enquiry. Please try again.",
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
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-500/5 to-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-blue-500 text-sm font-medium tracking-widest uppercase">
              Services Enquiry
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Ask About Our Services
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Interested in our services? Fill out the form below and our team will provide you with detailed information and pricing.
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="pb-12 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-white/10 bg-[#0a0f1a]">
              <CardContent className="p-6">
                <div className="text-4xl mb-3">🔧</div>
                <h3 className="text-lg font-semibold text-white mb-2">Installation Services</h3>
                <p className="text-gray-400 text-sm">
                  Professional installation with 1-year free service warranty
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-[#0a0f1a]">
              <CardContent className="p-6">
                <div className="text-4xl mb-3">🛠️</div>
                <h3 className="text-lg font-semibold text-white mb-2">AMC Packages</h3>
                <p className="text-gray-400 text-sm">
                  Annual maintenance contracts with regular filter changes
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-[#0a0f1a]">
              <CardContent className="p-6">
                <div className="text-4xl mb-3">💼</div>
                <h3 className="text-lg font-semibold text-white mb-2">Corporate Solutions</h3>
                <p className="text-gray-400 text-sm">
                  Bulk installations and maintenance for offices and businesses
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enquiry Form & Contact Info */}
      <section className="pb-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              <Card className="border-white/10 bg-[#0a0f1a]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Get In Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Phone</div>
                        <a href="tel:+911234567890" className="text-white hover:text-primary transition-colors">
                          +91 123 456 7890
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Email</div>
                        <a href="mailto:services@aquapure.in" className="text-white hover:text-primary transition-colors">
                          services@aquapure.in
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Location</div>
                        <p className="text-white">Mumbai, Maharashtra</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-gradient-to-br from-primary/10 to-transparent">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Quick Response</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Our team typically responds to enquiries within 2-4 hours during business hours.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Available now
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enquiry Form */}
            <div className="lg:col-span-2">
              <Card className="border-white/10 bg-[#0a0f1a]">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Send Your Enquiry</h2>
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
                          Service Interest *
                        </label>
                        <Select
                          value={formData.serviceInterest}
                          onValueChange={(value) =>
                            setFormData({ ...formData, serviceInterest: value })
                          }
                          required
                        >
                          <SelectTrigger className="bg-black border-white/10 text-white">
                            <SelectValue placeholder="Select service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="installation">New Installation</SelectItem>
                            <SelectItem value="amc">AMC Package</SelectItem>
                            <SelectItem value="corporate">Corporate Solution</SelectItem>
                            <SelectItem value="maintenance">One-time Maintenance</SelectItem>
                            <SelectItem value="filter-change">Filter Replacement</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Your Message *
                      </label>
                      <Textarea
                        required
                        placeholder="Please tell us about your requirements, budget, location, etc."
                        rows={6}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="bg-black border-white/10 text-white resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Submit Enquiry
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
