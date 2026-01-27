import Image from 'next/image';
import { CheckCircle, Users, Award, Shield, Car } from 'lucide-react';
import { ContactCTA } from '@/components/home';
import { AnimateOnScroll } from '@/components/shared';
import { SITE_CONFIG } from '@/constants/site';

const stats = [
  { icon: Users, label: 'Clientes satisfeitos' },
  { icon: Award, label: 'Experiência no mercado' },
  { icon: Car, label: 'Variedade de veículos' },
  { icon: Shield, label: 'Procedência garantida' },
];

const values = [
  'Transparência em todas as negociações',
  'Veículos revisados e com procedência',
  'Atendimento personalizado',
  'Facilidade no financiamento',
  'Aceitamos veículo na troca',
  'Preços justos e competitivos',
];

export default function QuemSomosPage() {
  return (
    <div>
      <section className="relative bg-zinc-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-zinc-900" />
        <div className="container-custom relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Quem Somos</h1>
          <p className="text-zinc-300 text-lg max-w-2xl">
            Conheça a história e os valores da {SITE_CONFIG.name}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateOnScroll animation="slideLeft">
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-black flex items-center justify-center p-8">
                  <Image
                    src="/viajaguar.png"
                    alt="Via Jaguar"
                    width={400}
                    height={200}
                    className="object-contain"
                  />
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="slideRight" delay={200}>
              <div>
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Nossa História
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                  Tradição e confiança em Jaguariúna!
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    A <strong className="text-foreground">{SITE_CONFIG.name}</strong> nasceu
                    com o propósito de oferecer os melhores veículos seminovos da região.
                    Trabalhamos com dedicação e transparência em Jaguariúna/SP.
                  </p>
                  <p>
                    Trabalhamos com compra, venda, troca e financiamento de veículos,
                    sempre oferecendo atendimento personalizado e as melhores condições do mercado.
                  </p>
                  <p>
                    Todos os nossos veículos passam por rigorosa inspeção antes de serem
                    disponibilizados para venda. Qualidade e procedência garantidas!
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="py-16 bg-zinc-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, label }, index) => (
              <AnimateOnScroll key={label} animation="fadeUp" delay={index * 100}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-base font-semibold">{label}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateOnScroll animation="slideLeft">
              <div>
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Por que nos escolher
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-8">
                  Nossos Valores
                </h2>
                <div className="space-y-4">
                  {values.map((value, index) => (
                    <AnimateOnScroll key={value} animation="fadeUp" delay={index * 80}>
                      <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-xl hover:bg-zinc-100 hover:shadow-md transition-all duration-300">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium">{value}</span>
                      </div>
                    </AnimateOnScroll>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="slideRight" delay={200}>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl bg-zinc-900">
                <Image
                  src="/default.jpg"
                  alt="Via Jaguar"
                  fill
                  className="object-cover"
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
