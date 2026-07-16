import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import ServiceBooking from "@/pages/ServiceBooking";
import ComplaintForm from "@/pages/ComplaintForm";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminProducts from "@/pages/admin/Products";
import AdminQueries from "@/pages/admin/Queries";
import AdminServices from "@/pages/admin/Services";
import AdminComplaints from "@/pages/admin/Complaints";
import AdminOrders from "@/pages/admin/Orders";
import AdminSettings from "@/pages/admin/Settings";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Compare from "@/pages/Compare";
import Checkout from "@/pages/Checkout";
import OrderConfirmation from "@/pages/OrderConfirmation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/products/:id" component={ProductDetail} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/order-confirmation/:orderNumber" component={OrderConfirmation} />
      <Route path="/compare" component={Compare} />
      <Route path="/services" component={Services} />
      <Route path="/service-booking" component={ServiceBooking} />
      <Route path="/complaint" component={ComplaintForm} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/products" component={AdminProducts} />
      <Route path="/admin/orders" component={AdminOrders} />
      <Route path="/admin/queries" component={AdminQueries} />
      <Route path="/admin/services" component={AdminServices} />
      <Route path="/admin/complaints" component={AdminComplaints} />
      <Route path="/admin/settings" component={AdminSettings} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <WhatsAppFloat />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
