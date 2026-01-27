'use client';

import { useState } from 'react';
import { User, Phone, Car, Calendar, Gauge, Send, Lock, CheckCircle, X, DollarSign, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/constants/site';

export default function VendaSeuCarroPage() {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    marca: '',
    modelo: '',
    ano: '',
    km: '',
    valorDesejado: '',
    observacoes: '',
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15);
  };

  const formatNumber = (value: string) => {
    return value.replace(/\D/g, '');
  };

  const formatKm = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (!numbers) return '';
    return parseInt(numbers).toLocaleString('pt-BR') + ' km';
  };

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (!numbers) return '';
    const amount = parseInt(numbers) / 100;
    return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === 'whatsapp') {
      formattedValue = formatPhone(value);
    } else if (name === 'ano') {
      formattedValue = formatNumber(value).slice(0, 4);
    } else if (name === 'km') {
      formattedValue = formatKm(value);
    } else if (name === 'valorDesejado') {
      formattedValue = formatCurrency(value);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    setShowSuccess(true);
    setLoading(false);

    setFormData({
      nome: '',
      whatsapp: '',
      marca: '',
      modelo: '',
      ano: '',
      km: '',
      valorDesejado: '',
      observacoes: '',
    });
  };

  const inputClass = "w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";
  const labelClass = "flex items-center gap-2 text-sm font-semibold text-white mb-2";

  return (
    <div>
      {/* Modal de Sucesso */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>

            <h3 className="text-2xl font-bold text-zinc-900 mb-2">
              Proposta Enviada!
            </h3>

            <p className="text-zinc-600 mb-6">
              Recebemos as informações do seu veículo! Nossa equipe entrará em contato em breve para fazer uma avaliação.
            </p>

            <Button
              onClick={() => setShowSuccess(false)}
              className="w-full"
            >
              Fechar
            </Button>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative bg-zinc-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-zinc-900" />
        <div className="container-custom relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Venda seu Carro</h1>
          <p className="text-zinc-300 text-lg max-w-2xl">
            Quer vender seu veículo? Preencha o formulário abaixo e receba uma proposta justa.
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
                  <span className="text-white">VENDA SEU</span>{' '}
                  <span className="text-primary">VEÍCULO</span>
                </h2>
                <p className="text-zinc-400">
                  Preencha os dados abaixo e nossa equipe entrará em contato
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nome */}
                <div>
                  <label className={labelClass}>
                    <User className="h-4 w-4" />
                    NOME COMPLETO
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Digite seu nome"
                    required
                    className={inputClass}
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className={labelClass}>
                    <Phone className="h-4 w-4" />
                    WHATSAPP
                  </label>
                  <input
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="(19) 99999-9999"
                    required
                    className={inputClass}
                  />
                </div>

                {/* Marca e Modelo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      <Car className="h-4 w-4" />
                      MARCA
                    </label>
                    <input
                      type="text"
                      name="marca"
                      value={formData.marca}
                      onChange={handleChange}
                      placeholder="Ex: Toyota, Honda"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      <Car className="h-4 w-4" />
                      MODELO
                    </label>
                    <input
                      type="text"
                      name="modelo"
                      value={formData.modelo}
                      onChange={handleChange}
                      placeholder="Ex: Corolla XEi, Civic"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Ano e KM */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      <Calendar className="h-4 w-4" />
                      ANO
                    </label>
                    <input
                      type="text"
                      name="ano"
                      value={formData.ano}
                      onChange={handleChange}
                      placeholder="Ex: 2022"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      <Gauge className="h-4 w-4" />
                      QUILOMETRAGEM
                    </label>
                    <input
                      type="text"
                      name="km"
                      value={formData.km}
                      onChange={handleChange}
                      placeholder="Ex: 50.000 km"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Valor Desejado */}
                <div>
                  <label className={labelClass}>
                    <DollarSign className="h-4 w-4" />
                    VALOR DESEJADO (OPCIONAL)
                  </label>
                  <input
                    type="text"
                    name="valorDesejado"
                    value={formData.valorDesejado}
                    onChange={handleChange}
                    placeholder="R$ 0,00"
                    className={inputClass}
                  />
                </div>

                {/* Observações */}
                <div>
                  <label className={labelClass}>
                    <MessageSquare className="h-4 w-4" />
                    OBSERVAÇÕES (OPCIONAL)
                  </label>
                  <textarea
                    name="observacoes"
                    value={formData.observacoes}
                    onChange={handleChange}
                    placeholder="Descreva o estado do veículo, acessórios, etc."
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 text-lg font-bold"
                >
                  <Send className="h-5 w-5 mr-2" />
                  {loading ? 'ENVIANDO...' : 'ENVIAR PROPOSTA'}
                </Button>

                <p className="flex items-center justify-center gap-2 text-xs text-white/60">
                  <Lock className="h-3 w-3" />
                  Seus dados estão seguros e serão usados apenas para avaliação.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-zinc-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Por que vender para a {SITE_CONFIG.name}?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Oferecemos um processo simples, rápido e seguro para você vender seu veículo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Avaliação Justa</h3>
              <p className="text-muted-foreground text-sm">
                Avaliamos seu veículo de forma transparente e oferecemos um valor justo de mercado.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Pagamento Rápido</h3>
              <p className="text-muted-foreground text-sm">
                Após a avaliação, o pagamento é feito de forma ágil e segura.
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
                Cuidamos de toda a documentação e transferência para você.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
