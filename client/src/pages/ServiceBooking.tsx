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
import { Wrench, Calendar, Clock, CheckCircle } from "lucide-react";

interface ServiceFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  serviceType: string;
  productModel: string;
  description: string;
}

export default function ServiceBooking() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ServiceFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    serviceType: "",
    productModel: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/service-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Service Request Submitted!",
          description: "Our team will contact you within 24 hours to schedule the service.",
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          serviceType: "",
          productModel: "",
          description: "",
        });
      } else {
        throw new Error("Failed to submit request");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit service request. Please try again.",
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
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Wrench className="w-6 h-6 text-primary" />
            </div>
            <p className="text-primary text-sm font-medium tracking-widest uppercase">
              Book Service
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Schedule Your Service
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Need installation, maintenance, or repair? Book a service appointment with our expert technicians.
          </p>
        </div>
      </section>

      {/* Service Types */}
      <section className="pb-12 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-white/10 bg-[#0a0f1a]">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Wrench className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Installation</h3>
                <p className="text-gray-400 text-sm">
                  Professional installation of your new RO water purifier with proper setup and testing.
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-[#0a0f1a]">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Maintenance</h3>
                <p className="text-gray-400 text-sm">
                  Regular maintenance and filter replacement to ensure optimal performance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-[#0a0f1a]">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Repair</h3>
                <p className="text-gray-400 text-sm">
                  Quick and efficient repair services for any issues with your water purifier.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Booking Form */}
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
                      Service Type *
                    </label>
                    <Select
                      value={formData.serviceType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, serviceType: value })
                      }
                      required
                    >
                      <SelectTrigger className="bg-black border-white/10 text-white">
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="installation">Installation</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="repair">Repair</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Address *
                  </label>
                  <Input
                    required
                    placeholder="Complete address with pincode"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="bg-black border-white/10 text-white"
                  />
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
                    Description *
                  </label>
                  <Textarea
                    required
                    placeholder="Please describe the service you need or any issues you're experiencing..."
                    rows={5}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="bg-black border-white/10 text-white resize-none"
                  />
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-300">
                      <p className="font-medium text-white mb-1">What happens next?</p>
                      <ul className="space-y-1 text-gray-400">
                        <li>• Our team will review your request within 24 hours</li>
                        <li>• We'll contact you to schedule a convenient appointment</li>
                        <li>• A certified technician will visit at the scheduled time</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Wrench className="w-4 h-4 mr-2" />
                      Book Service
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
