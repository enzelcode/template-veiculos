import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WhatsAppButton } from '@/components/shared';
import { AnimateOnScroll } from '@/components/shared';
import { Megaphone, UserCheck, Handshake, Car, Shield, Clock, CheckCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/constants/site';

export const metadata: Metadata = {
  title: `Venda seu Veículo | ${SITE_CONFIG.name}`,
  description: 'Venda seu carro em consignação com a StyleCars. Divulgação profissional, filtragem de interessados e negociação completa. Zero dor de cabeça.',
};

export default function VendaSeuVeiculoPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[400px] flex items-center bg-[#020202]">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/herost.webp"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-10 py-16">
          <div className="max-w-3xl">
            <AnimateOnScroll animation="fadeUp">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Venda seu carro em consignação
              </h1>
              <p className="text-xl text-zinc-300 mb-8">
                Sem precisar deixar o veículo conosco. Mais segurança, mais conforto e zero dor de cabeça.
              </p>
              <WhatsAppButton
                size="lg"
                className="text-base"
                message="Olá! Quero vender meu veículo em consignação."
              />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <AnimateOnScroll animation="fadeUp">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Como Funciona</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Um processo simples e transparente para você vender seu veículo sem complicações.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimateOnScroll animation="fadeUp" delay={0}>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Entre em Contato</h3>
                <p className="text-sm text-muted-foreground">
                  Fale conosco pelo WhatsApp e envie as informações do seu veículo.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeUp" delay={100}>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Avaliação</h3>
                <p className="text-sm text-muted-foreground">
                  Avaliamos seu veículo e definimos juntos o melhor preço de venda.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeUp" delay={200}>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Divulgação</h3>
                <p className="text-sm text-muted-foreground">
                  Fazemos fotos profissionais e anunciamos em todas as plataformas.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeUp" delay={300}>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Venda Realizada</h3>
                <p className="text-sm text-muted-foreground">
                  Cuidamos de toda negociação. Você só apresenta o carro quando houver interesse real.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 bg-zinc-50">
        <div className="container-custom">
          <AnimateOnScroll animation="fadeUp">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Por que escolher a StyleCars?</h2>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimateOnScroll animation="fadeUp" delay={0}>
              <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm">
                <div className="flex-shrink-0">
                  <Megaphone className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Divulgação Profissional</h3>
                  <p className="text-sm text-muted-foreground">
                    Anunciamos seu veículo nas principais plataformas e redes sociais com fotos profissionais.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeUp" delay={100}>
              <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm">
                <div className="flex-shrink-0">
                  <UserCheck className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Filtragem de Interessados</h3>
                  <p className="text-sm text-muted-foreground">
                    Só passamos contatos de compradores realmente interessados e qualificados.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeUp" delay={200}>
              <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm">
                <div className="flex-shrink-0">
                  <Handshake className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Negociação Completa</h3>
                  <p className="text-sm text-muted-foreground">
                    Nossa equipe cuida de toda a negociação para você conseguir o melhor valor.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeUp" delay={300}>
              <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm">
                <div className="flex-shrink-0">
                  <Car className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Carro Fica com Você</h3>
                  <p className="text-sm text-muted-foreground">
                    Seu veículo fica com você até o momento da venda. Sem precisar deixar conosco.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeUp" delay={400}>
              <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm">
                <div className="flex-shrink-0">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Segurança Total</h3>
                  <p className="text-sm text-muted-foreground">
                    Processo seguro e transparente do início ao fim da negociação.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeUp" delay={500}>
              <div className="flex gap-4 p-6 bg-white rounded-xl shadow-sm">
                <div className="flex-shrink-0">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Economia de Tempo</h3>
                  <p className="text-sm text-muted-foreground">
                    Você não perde tempo com curiosos. Só apresenta o carro quando houver interesse real.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#020202]">
        <div className="container-custom">
          <AnimateOnScroll animation="fadeUp">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Pronto para vender seu veículo?
              </h2>
              <p className="text-zinc-300 mb-8 max-w-2xl mx-auto">
                Entre em contato agora e descubra como podemos ajudar você a vender seu carro de forma rápida e segura.
              </p>
              <WhatsAppButton
                size="lg"
                className="text-base"
                message="Olá! Quero vender meu veículo em consignação."
              />
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
