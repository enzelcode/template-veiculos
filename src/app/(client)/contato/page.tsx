import Image from 'next/image';
import { MapPin, Phone, Clock } from 'lucide-react';
import { WhatsAppButton, WhatsAppIcon, AnimateOnScroll } from '@/components/shared';
import { ContactCTA } from '@/components/home';
import { SITE_CONFIG } from '@/constants/site';

const contactInfo = [
  {
    icon: MapPin,
    label: 'Endereço',
    value: SITE_CONFIG.address.full,
  },
  {
    icon: Phone,
    label: 'Telefone',
    value: SITE_CONFIG.phone,
    href: `tel:${SITE_CONFIG.phone.replace(/\D/g, '')}`,
  },
  {
    icon: Clock,
    label: 'Horário',
    value: SITE_CONFIG.businessHours.formatted,
  },
];

export default function ContatoPage() {
  return (
    <div>
      <section className="relative bg-zinc-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1360&h=1020&fit=crop"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="container-custom relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contato</h1>
          <p className="text-zinc-300 text-lg max-w-2xl">
            Entre em contato conosco. Estamos prontos para atendê-lo!
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <AnimateOnScroll animation="slideLeft">
              <div>
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Fale Conosco
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-8">
                  Informações de Contato
                </h2>

                <div className="space-y-6 mb-10">
                  {contactInfo.map(({ icon: Icon, label, value, href }, index) => (
                    <AnimateOnScroll key={label} animation="fadeUp" delay={index * 100}>
                      <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-zinc-50 transition-all duration-300">
                        <div className="flex-shrink-0 w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{label}</p>
                          {href ? (
                            <a
                              href={href}
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              {value}
                            </a>
                          ) : (
                            <p className="text-muted-foreground">{value}</p>
                          )}
                        </div>
                      </div>
                    </AnimateOnScroll>
                  ))}
                </div>

                <AnimateOnScroll animation="fadeUp" delay={400}>
                  <div className="p-6 bg-[#25D366]/10 rounded-2xl hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <WhatsAppIcon className="h-7 w-7 text-[#25D366]" />
                      <h3 className="text-xl font-bold">Atendimento via WhatsApp</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Prefere WhatsApp? Clique no botão abaixo para iniciar uma conversa.
                    </p>
                    <WhatsAppButton message="Olá! Gostaria de mais informações." />
                  </div>
                </AnimateOnScroll>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="slideRight" delay={200}>
              <div className="relative h-[400px] lg:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(SITE_CONFIG.address.full)}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização"
                  className="absolute inset-0"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <AnimateOnScroll animation="fadeUp">
        <ContactCTA />
      </AnimateOnScroll>
    </div>
  );
}
