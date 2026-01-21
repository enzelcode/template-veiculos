import Image from 'next/image';
import { CheckCircle, Users, Car, ThumbsUp, Shield } from 'lucide-react';
import { ContactCTA } from '@/components/home';
import { AnimateOnScroll } from '@/components/shared';
import { SITE_CONFIG } from '@/constants/site';

const diferenciais = [
  { icon: Users, label: 'Atendimento personalizado' },
  { icon: Car, label: 'Veículos de qualidade' },
  { icon: ThumbsUp, label: 'Realizamos seu sonho' },
  { icon: Shield, label: 'Procedência garantida' },
];

const values = [
  'Atendimento personalizado e exclusivo',
  'Veículos revisados e com procedência',
  'Compromisso com a realização do seu sonho',
  'Facilidade no financiamento',
  'Qualidade acima de tudo',
  'Preços justos e competitivos',
];

export default function QuemSomosPage() {
  return (
    <div>
      <section className="relative bg-zinc-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1360&h=1020&fit=crop"
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
                    src="https://lh3.googleusercontent.com/p/AF1QipMX_RO6iTP0mi-AZ3mpE9g_lACLDyHZqWiLM1gr=s1360-w1360-h1020-rw"
                    alt="Showroom de veículos"
                    fill
                    className="object-cover"
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
                  Realizando sonhos sobre rodas
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">Há 30 anos no ramo de automóveis</strong>, a{' '}
                    <strong className="text-foreground">{SITE_CONFIG.name}</strong> nasceu
                    com um propósito claro: realizar o seu sonho de ter o carro ideal.
                    Somos referência em veículos de qualidade e atendimento personalizado.
                  </p>
                  <p>
                    Nossa equipe é formada por profissionais dedicados a entender suas necessidades
                    e encontrar o veículo perfeito para você. Atendimento exclusivo do início ao fim.
                  </p>
                  <p>
                    Todos os nossos veículos passam por rigorosa inspeção antes de serem
                    disponibilizados. Qualidade e procedência garantidas.
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
            {diferenciais.map(({ icon: Icon, label }, index) => (
              <AnimateOnScroll key={label} animation="fadeUp" delay={index * 100}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 mb-4">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <p className="text-zinc-100 font-medium">{label}</p>
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
                  src="https://lh3.googleusercontent.com/proxy/Zm3nis37TRkgYmpdyt9BHLCAmLdoMXIcA9pLD8XwP7e44DR-vWfboVHgXxMuiea_EZzVCcxDubElGROfWBZlcaUccPS_ASXdIkcqUf6gc9UANhhuu5PJ2CST6PdtTLDQYckco4UL2Qs3U99oJlpOEP2yy1brew89-urSPg=s1360-w1360-h1020-rw"
                  alt="Por que nos escolher"
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
