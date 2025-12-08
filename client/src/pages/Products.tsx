import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

export default function Products() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Our Products
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Premium RO Purifiers
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Discover our range of advanced water purification systems designed for every need and budget.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-card/30 border-y border-border/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-shield-halved text-2xl text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Quality Assured</h3>
              <p className="text-muted-foreground text-sm">
                All products are certified and tested for optimal performance.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-truck-fast text-2xl text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Free Installation</h3>
              <p className="text-muted-foreground text-sm">
                Professional installation included with every purchase.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-headset text-2xl text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">24/7 Support</h3>
              <p className="text-muted-foreground text-sm">
                Round-the-clock customer support for all your queries.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
