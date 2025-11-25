import { useState } from 'react';
import { Mail, Phone, MessageCircle, FileText, Shield, Wrench, ChevronRight } from 'lucide-react';

// ROLEX GREEN CONSTANT
const ROLEX_GREEN = '#006039';

interface SupportProps {
  onNavigate: (page: string) => void;
}

export function Support({ onNavigate }: SupportProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const supportCategories = [
    {
      id: 'warranty',
      icon: Shield,
      title: 'Warranty & Guarantee',
      description: 'Information about your Rolex warranty and international guarantee',
      faqs: [
        { q: 'How long is the Rolex warranty?', a: 'All Rolex watches come with a 5-year international warranty from the date of purchase.' },
        { q: 'What does the warranty cover?', a: 'The warranty covers any manufacturing defects and malfunctions occurring under normal use.' },
        { q: 'Can I extend my warranty?', a: 'Contact your authorized dealer for information about extended service plans.' }
      ]
    },
    {
      id: 'service',
      icon: Wrench,
      title: 'Servicing & Repairs',
      description: 'Professional maintenance and repair services for your timepiece',
      faqs: [
        { q: 'How often should I service my Rolex?', a: 'We recommend servicing your Rolex approximately every 10 years, depending on the model and real-life usage.' },
        { q: 'Where can I get my watch serviced?', a: 'All servicing should be performed by authorized Rolex service centers or retailers.' },
        { q: 'How long does servicing take?', a: 'A complete service typically takes 4-6 weeks, depending on the model and required work.' }
      ]
    },
    {
      id: 'authenticity',
      icon: FileText,
      title: 'Authenticity Verification',
      description: 'Verify the authenticity of your Rolex timepiece',
      faqs: [
        { q: 'How can I verify my Rolex is authentic?', a: 'Visit an authorized Rolex retailer with your watch and papers for official verification.' },
        { q: 'What documents should come with my watch?', a: 'All genuine Rolex watches include a warranty card, instruction manual, and certificate.' },
        { q: 'Can I check authenticity online?', a: 'For security reasons, full authenticity verification must be done in person at an authorized location.' }
      ]
    },
    {
      id: 'care',
      icon: MessageCircle,
      title: 'Care Instructions',
      description: 'Learn how to properly care for and maintain your Rolex',
      faqs: [
        { q: 'How should I clean my Rolex?', a: 'Clean your watch with a soft cloth. For deeper cleaning, use lukewarm water and a soft brush.' },
        { q: 'Can I wear my Rolex while swimming?', a: 'Yes, Rolex Oyster models are waterproof and suitable for swimming. Ensure the crown is properly screwed down.' },
        { q: 'How should I store my watch?', a: 'Store in a clean, dry place away from magnets and extreme temperatures. Use a watch winder for automatic models.' }
      ]
    }
  ];

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.subject && formData.message) {
      alert('Thank you for contacting us. Our team will respond within 24 hours.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="min-h-screen bg-black pt-0 pb-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mb-20">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, #1a1a1a 0%, #000000 70%)',
          }}
        />
        <div className="relative z-10 text-center px-8">
          <div
            className="mb-6 text-[#a37e2c] tracking-[0.3em]"
            style={{
              fontFamily: '-apple-system, Helvetica Neue, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 500,
            }}
          >
            WE'RE HERE TO HELP
          </div>
          <h1
            className="mb-8 text-white"
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: '4.5rem',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Customer Support
          </h1>
          <p
            className="max-w-[600px] mx-auto text-[#cccccc]"
            style={{
              fontFamily: '-apple-system, Helvetica Neue, sans-serif',
              fontSize: '1.125rem',
              lineHeight: 1.8,
              letterSpacing: '0.02em',
            }}
          >
            Expert assistance for all your Rolex needs
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="max-w-[1400px] mx-auto px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            className="bg-[#0a0a0a] border p-10 text-center transition-all duration-300"
            style={{ borderColor: 'rgba(163, 126, 44, 0.1)' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${ROLEX_GREEN}50`; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(163, 126, 44, 0.1)'; }}
          >
            <div 
              className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full transition-colors duration-300"
              style={{ backgroundColor: 'rgba(163, 126, 44, 0.1)' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${ROLEX_GREEN}20`; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(163, 126, 44, 0.1)'; }}
            >
              <Phone 
                className="transition-colors duration-300" 
                size={28}
                style={{ color: '#a37e2c' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = ROLEX_GREEN; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#a37e2c'; }}
              />
            </div>
            <h3
              className="mb-4 text-white"
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: '1.5rem',
                fontWeight: 400,
              }}
            >
              Call Us
            </h3>
            <p
              className="mb-6 text-[#999999]"
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                fontSize: '0.95rem',
                lineHeight: 1.8,
              }}
            >
              Mon-Fri: 9:00 - 18:00 CET
            </p>
            <a
              href="tel:+41123456789"
              className="text-[#a37e2c] hover:text-[#c5a85f] transition-colors tracking-[0.1em]"
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                fontSize: '1.1rem',
              }}
            >
              +41 12 345 67 89
            </a>
          </div>

          <div 
            className="bg-[#0a0a0a] border p-10 text-center transition-all duration-300"
            style={{ borderColor: 'rgba(163, 126, 44, 0.1)' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${ROLEX_GREEN}50`; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(163, 126, 44, 0.1)'; }}
          >
            <div 
              className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full transition-colors duration-300"
              style={{ backgroundColor: 'rgba(163, 126, 44, 0.1)' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${ROLEX_GREEN}20`; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(163, 126, 44, 0.1)'; }}
            >
              <Mail 
                className="transition-colors duration-300" 
                size={28}
                style={{ color: '#a37e2c' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = ROLEX_GREEN; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#a37e2c'; }}
              />
            </div>
            <h3
              className="mb-4 text-white"
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: '1.5rem',
                fontWeight: 400,
              }}
            >
              Email Us
            </h3>
            <p
              className="mb-6 text-[#999999]"
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                fontSize: '0.95rem',
                lineHeight: 1.8,
              }}
            >
              Response within 24 hours
            </p>
            <a
              href="mailto:support@rolex.com"
              className="text-[#a37e2c] hover:text-[#c5a85f] transition-colors tracking-[0.05em]"
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                fontSize: '1rem',
              }}
            >
              support@rolex.com
            </a>
          </div>

          <div className="bg-[#0a0a0a] border border-[#a37e2c]/10 p-10 text-center hover:border-[#a37e2c]/30 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-[#a37e2c]/10 rounded-full">
              <MessageCircle className="text-[#a37e2c]" size={28} />
            </div>
            <h3
              className="mb-4 text-white"
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: '1.5rem',
                fontWeight: 400,
              }}
            >
              Live Chat
            </h3>
            <p
              className="mb-6 text-[#999999]"
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                fontSize: '0.95rem',
                lineHeight: 1.8,
              }}
            >
              Available during business hours
            </p>
            <button
              className="text-[#a37e2c] hover:text-[#c5a85f] transition-colors tracking-[0.1em]"
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                fontSize: '1rem',
              }}
            >
              Start Chat →
            </button>
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="max-w-[1400px] mx-auto px-8 mb-20">
        <div className="text-center mb-16">
          <h2
            className="mb-4 text-white"
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: '3rem',
              fontWeight: 400,
            }}
          >
            How Can We Assist You?
          </h2>
          <p
            className="text-[#999999]"
            style={{
              fontFamily: '-apple-system, Helvetica Neue, sans-serif',
              fontSize: '1.05rem',
            }}
          >
            Select a category to view frequently asked questions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {supportCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                className={`text-left bg-[#0a0a0a] border p-8 transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'border-[#a37e2c]'
                    : 'border-[#a37e2c]/10 hover:border-[#a37e2c]/30'
                }`}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className={`w-14 h-14 flex items-center justify-center rounded-full ${
                      activeCategory === category.id ? 'bg-[#a37e2c]' : 'bg-[#a37e2c]/10'
                    }`}>
                      <Icon className={activeCategory === category.id ? 'text-black' : 'text-[#a37e2c]'} size={24} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3
                      className="mb-2 text-white"
                      style={{
                        fontFamily: 'Playfair Display, Georgia, serif',
                        fontSize: '1.5rem',
                        fontWeight: 400,
                      }}
                    >
                      {category.title}
                    </h3>
                    <p
                      className="text-[#999999]"
                      style={{
                        fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                      }}
                    >
                      {category.description}
                    </p>
                  </div>
                  <ChevronRight
                    className={`flex-shrink-0 text-[#a37e2c] transition-transform duration-300 ${
                      activeCategory === category.id ? 'rotate-90' : ''
                    }`}
                    size={24}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* FAQs */}
        {activeCategory && (
          <div className="bg-[#0a0a0a] border border-[#a37e2c]/20 p-10">
            <h3
              className="mb-8 text-white"
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: '2rem',
                fontWeight: 400,
              }}
            >
              Frequently Asked Questions
            </h3>
            <div className="space-y-6">
              {supportCategories.find(c => c.id === activeCategory)?.faqs.map((faq, index) => (
                <div key={index} className="border-b border-[#a37e2c]/10 pb-6 last:border-0">
                  <h4
                    className="mb-3 text-[#a37e2c]"
                    style={{
                      fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                      fontSize: '1.1rem',
                      fontWeight: 500,
                    }}
                  >
                    {faq.q}
                  </h4>
                  <p
                    className="text-[#cccccc]"
                    style={{
                      fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                      fontSize: '1rem',
                      lineHeight: 1.8,
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Contact Form */}
      <section className="max-w-[900px] mx-auto px-8">
        <div className="bg-[#0a0a0a] border border-[#a37e2c]/10 p-12">
          <div className="text-center mb-10">
            <h2
              className="mb-4 text-white"
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: '2.5rem',
                fontWeight: 400,
              }}
            >
              Send Us a Message
            </h2>
            <p
              className="text-[#999999]"
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                fontSize: '1.05rem',
              }}
            >
              Our team will respond within 24 hours
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block mb-2 text-[#a37e2c] tracking-[0.1em]"
                  style={{
                    fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                    fontSize: '0.75rem',
                  }}
                >
                  FULL NAME *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black border border-[#a37e2c]/20 text-white px-4 py-4 focus:outline-none focus:border-[#a37e2c] transition-colors"
                  style={{
                    fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                    fontSize: '1rem',
                  }}
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-[#a37e2c] tracking-[0.1em]"
                  style={{
                    fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                    fontSize: '0.75rem',
                  }}
                >
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black border border-[#a37e2c]/20 text-white px-4 py-4 focus:outline-none focus:border-[#a37e2c] transition-colors"
                  style={{
                    fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                    fontSize: '1rem',
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block mb-2 text-[#a37e2c] tracking-[0.1em]"
                  style={{
                    fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                    fontSize: '0.75rem',
                  }}
                >
                  PHONE NUMBER
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-black border border-[#a37e2c]/20 text-white px-4 py-4 focus:outline-none focus:border-[#a37e2c] transition-colors"
                  style={{
                    fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                    fontSize: '1rem',
                  }}
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-[#a37e2c] tracking-[0.1em]"
                  style={{
                    fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                    fontSize: '0.75rem',
                  }}
                >
                  SUBJECT *
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-black border border-[#a37e2c]/20 text-white px-4 py-4 focus:outline-none focus:border-[#a37e2c] transition-colors"
                  style={{
                    fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                    fontSize: '1rem',
                  }}
                >
                  <option value="">Select a subject</option>
                  <option value="warranty">Warranty & Guarantee</option>
                  <option value="service">Servicing & Repairs</option>
                  <option value="authenticity">Authenticity Verification</option>
                  <option value="care">Care Instructions</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>
            </div>

            <div>
              <label
                className="block mb-2 text-[#a37e2c] tracking-[0.1em]"
                style={{
                  fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                  fontSize: '0.75rem',
                }}
              >
                MESSAGE *
              </label>
              <textarea
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-black border border-[#a37e2c]/20 text-white px-4 py-4 focus:outline-none focus:border-[#a37e2c] transition-colors resize-none"
                style={{
                  fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                }}
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-5 bg-[#a37e2c] text-black hover:bg-[#c5a85f] transition-all duration-300 tracking-[0.15em]"
              style={{
                fontFamily: '-apple-system, Helvetica Neue, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              SEND MESSAGE
            </button>
          </div>
        </div>
      </section>

      {/* Service Centers Link */}
      <section className="mt-20 py-20 px-8 bg-[#0a0a0a]">
        <div className="max-w-[800px] mx-auto text-center">
          <h2
            className="mb-6 text-white"
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: '2.5rem',
              fontWeight: 400,
            }}
          >
            Visit Our Service Centers
          </h2>
          <p
            className="mb-8 text-[#cccccc]"
            style={{
              fontFamily: '-apple-system, Helvetica Neue, sans-serif',
              fontSize: '1.05rem',
              lineHeight: 1.8,
            }}
          >
            Find an authorized Rolex service center near you for professional maintenance and repairs
          </p>
          <button
            onClick={() => onNavigate('boutiques')}
            className="px-12 py-4 border-2 border-[#a37e2c] text-[#a37e2c] hover:bg-[#a37e2c] hover:text-black transition-all duration-300 tracking-[0.15em]"
            style={{
              fontFamily: '-apple-system, Helvetica Neue, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            FIND SERVICE CENTER
          </button>
        </div>
      </section>
    </div>
  );
}