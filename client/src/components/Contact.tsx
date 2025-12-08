import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
}

interface ContactProps {
  onSubmit?: (data: ContactFormData) => void;
}

export default function Contact({ onSubmit }: ContactProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // todo: remove mock functionality - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onSubmit?.(formData);
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="py-16 md:py-24 lg:py-32 bg-card"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="contact-title">
              Get In <span className="text-primary">Touch</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Have questions about our products or services? Fill out the form and our team will 
              get back to you within 24 hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <i className="fa-solid fa-phone text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Call Us</div>
                  <a
                    href="tel:+911234567890"
                    className="text-foreground font-medium hover:text-primary transition-colors"
                    data-testid="contact-phone"
                  >
                    +91 123 456 7890
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <i className="fa-solid fa-envelope text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email Us</div>
                  <a
                    href="mailto:info@aquapure.com"
                    className="text-foreground font-medium hover:text-primary transition-colors"
                    data-testid="contact-email"
                  >
                    info@aquapure.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <i className="fa-solid fa-location-dot text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Visit Us</div>
                  <p className="text-foreground font-medium" data-testid="contact-address">
                    123 Water Street, Mumbai, MH 400001
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-xl p-6 md:p-8 border border-border">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  data-testid="input-name"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  data-testid="input-email"
                />
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  data-testid="input-phone"
                />
              </div>
              <div>
                <Select
                  value={formData.serviceType}
                  onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                >
                  <SelectTrigger data-testid="select-service">
                    <SelectValue placeholder="Select Service Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new-purchase">New Purchase</SelectItem>
                    <SelectItem value="installation">Installation</SelectItem>
                    <SelectItem value="amc">AMC Plan</SelectItem>
                    <SelectItem value="repair">Repair & Maintenance</SelectItem>
                    <SelectItem value="water-testing">Water Testing</SelectItem>
                    <SelectItem value="other">Other Inquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="resize-none"
                  data-testid="input-message"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
                data-testid="button-submit"
              >
                {isSubmitting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
