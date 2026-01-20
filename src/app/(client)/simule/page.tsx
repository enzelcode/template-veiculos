'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FinancingForm } from '@/components/shared';
import { SITE_CONFIG } from '@/constants/site';

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  modelYear: number;
}

export default function SimulePage() {
  const [vehicles, setVehicles] = useState<Array<{ id: string; name: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await fetch('/api/vehicles?status=available');
        const data = await response.json();
        const formattedVehicles = (data.vehicles || []).map((v: Vehicle) => ({
          id: v.id,
          name: v.modelYear
            ? `${v.brand} ${v.model} ${v.year}/${v.modelYear}`
            : `${v.brand} ${v.model} ${v.year}`,
        }));
        setVehicles(formattedVehicles);
      } catch (error) {
        console.error('Erro ao buscar veículos:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchVehicles();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-zinc-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxMQdtaaRcMOndX27uCVCoAvGcr-OkNBEqeB01doQhc-TQO1a6CwKpLjhrS6OsPanqukC0DJGVh3yLNNNNQr0t9GSwqlCgqSOpz2JBpMwOkQ1-iWSHQ-iTVtnWM_xeDfn13oPVtyhLZCfbh=s1360-w1360-h1020-rw"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="container-custom relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simule seu Financiamento</h1>
          <p className="text-zinc-300 text-lg max-w-2xl">
            Pré-análise rápida e sem compromisso. Realize seu sonho hoje.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-zinc-900">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="p-4 md:p-8 md:bg-zinc-800/50 md:rounded-2xl md:border md:border-white/10">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  <span className="text-white">SIMULAR</span>{' '}
                  <span className="text-primary">FINANCIAMENTO</span>
                </h2>
                <p className="text-zinc-400">
                  Preencha os dados abaixo e nossa equipe entrará em contato
                </p>
              </div>

              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <FinancingForm vehicles={vehicles} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-zinc-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Por que financiar com a {SITE_CONFIG.name}?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trabalhamos com os principais bancos para oferecer as melhores condições de financiamento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Taxas Competitivas</h3>
              <p className="text-muted-foreground text-sm">
                Parceria com diversos bancos para encontrar a melhor taxa para você.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Aprovação Rápida</h3>
              <p className="text-muted-foreground text-sm">
                Análise de crédito ágil. Resposta em até 24 horas.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Sem Burocracia</h3>
              <p className="text-muted-foreground text-sm">
                Processo simplificado. Cuidamos de toda a documentação.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
