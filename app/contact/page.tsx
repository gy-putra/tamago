import ContactForm from "./_components/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - TAMAGO.ID",
  description: "Get in touch with TAMAGO.ID for any questions about our premium shoe collection. Send us a message and we'll respond via WhatsApp.",
};

const ContactPage = () => {
  return (
    <main className="md:px-16 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our products or need assistance? 
            We'd love to hear from you. Send us a message and we'll get back to you via WhatsApp!
          </p>
        </div>

        {/* Contact Form */}
        <ContactForm />

        {/* Additional Contact Info */}
        <div className="mt-16 text-center">
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Other Ways to Reach Us</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">WhatsApp Direct</h4>
                <p className="text-muted-foreground">+62 857-7272-3758</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Business Hours</h4>
                <p className="text-muted-foreground">Monday - Sunday: 9:00 AM - 10:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;