import Image from 'next/image';
import { CheckCircle, Users, Award, ThumbsUp, Shield } from 'lucide-react';
import { ContactCTA } from '@/components/home';
import { AnimateOnScroll } from '@/components/shared';
import { SITE_CONFIG } from '@/constants/site';

const stats = [
  { icon: Users, value: '5.000+', label: 'Clientes satisfeitos' },
  { icon: Award, value: '15+', label: 'Anos no mercado' },
  { icon: ThumbsUp, value: '98%', label: 'Aprovação' },
  { icon: Shield, value: '100%', label: 'Procedência garantida' },
];

const values = [
  'Transparência em todas as negociações',
  'Veículos revisados e com procedência',
  'Atendimento personalizado',
  'Facilidade no financiamento',
  'Pós-venda de qualidade',
  'Preços justos e competitivos',
];

export default function QuemSomosPage() {
  return (
    <div>
      <section className="relative bg-zinc-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200"
            alt=""
            fill
            className="object-cover"
          />
        </div>
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
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800"
                    alt="Showroom de veículos"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-xl hidden md:block">
                  <p className="text-4xl font-bold">15+</p>
                  <p className="text-sm">Anos de mercado</p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="slideRight" delay={200}>
              <div>
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Nossa História
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                  Tradição e confiança no mercado automotivo
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    A <strong className="text-foreground">{SITE_CONFIG.name}</strong> nasceu
                    do sonho de oferecer veículos de qualidade com atendimento diferenciado.
                    Há mais de 15 anos no mercado, construímos uma reputação sólida baseada
                    na confiança e transparência.
                  </p>
                  <p>
                    Nossa equipe é formada por profissionais experientes e apaixonados pelo
                    mundo automotivo, prontos para ajudar você a encontrar o veículo ideal
                    para suas necessidades.
                  </p>
                  <p>
                    Trabalhamos com as melhores marcas do mercado e todos os nossos veículos
                    passam por rigorosa inspeção antes de serem disponibilizados para venda.
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
            {stats.map(({ icon: Icon, value, label }, index) => (
              <AnimateOnScroll key={label} animation="fadeUp" delay={index * 100}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 mb-4">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <p className="text-3xl md:text-4xl font-bold">{value}</p>
                  <p className="text-zinc-400 text-sm mt-1">{label}</p>
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
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800"
                  alt="Veículo em destaque"
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
