import Image from 'next/image';
import { CheckCircle, Megaphone, UserCheck, Handshake, Car, Shield, Clock } from 'lucide-react';
import { ContactCTA } from '@/components/home';
import { AnimateOnScroll } from '@/components/shared';
import { SITE_CONFIG } from '@/constants/site';

const diferenciais = [
  { icon: Megaphone, label: 'Divulgação profissional' },
  { icon: UserCheck, label: 'Filtragem de interessados' },
  { icon: Handshake, label: 'Negociação completa' },
  { icon: Car, label: 'Carro fica com você' },
];

const values = [
  'Você não precisa deixar o carro conosco',
  'Divulgação em todas as plataformas',
  'Filtramos curiosos e só passamos interessados reais',
  'Cuidamos de toda a negociação por você',
  'Processo seguro e transparente',
  'Zero dor de cabeça na venda',
];

export default function QuemSomosPage() {
  return (
    <div>
      <section className="relative bg-[#020202] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/herost.webp"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="container-custom relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Quem Somos</h1>
          <p className="text-zinc-300 text-lg max-w-2xl">
            Conheça a {SITE_CONFIG.name} e nossa forma diferente de vender veículos
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateOnScroll animation="slideLeft">
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-[#020202] flex items-center justify-center p-8">
                  <Image
                    src="/style.png"
                    alt="StyleCars"
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
                  Consignação de veículos do jeito certo
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    A <strong className="text-foreground">{SITE_CONFIG.name}</strong> nasceu
                    para resolver um problema: vender seu carro sem dor de cabeça.
                    Sabemos que anunciar, filtrar curiosos e negociar toma tempo e energia.
                  </p>
                  <p>
                    Por isso, criamos um modelo de consignação onde <strong className="text-foreground">você não precisa
                    deixar o veículo conosco</strong>. Fazemos toda a divulgação profissional,
                    filtramos os interessados reais e cuidamos da negociação.
                  </p>
                  <p>
                    Você só apresenta o carro quando houver um comprador de verdade.
                    Mais segurança, mais conforto e <strong className="text-foreground">zero dor de cabeça</strong>.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#020202] text-white">
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
                  Nossos Diferenciais
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
              <div className="bg-zinc-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Como funciona?</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Entre em contato</h4>
                      <p className="text-sm text-muted-foreground">Fale conosco pelo WhatsApp com as informações do seu veículo.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Avaliação e fotos</h4>
                      <p className="text-sm text-muted-foreground">Avaliamos seu veículo e fazemos fotos profissionais.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Divulgação</h4>
                      <p className="text-sm text-muted-foreground">Anunciamos em todas as plataformas e filtramos interessados.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Venda realizada</h4>
                      <p className="text-sm text-muted-foreground">Você só apresenta o carro quando houver interesse real.</p>
                    </div>
                  </div>
                </div>
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
