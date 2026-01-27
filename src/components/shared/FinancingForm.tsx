'use client';

import { useState } from 'react';
import { User, Phone, CreditCard, Calendar, Car, DollarSign, CalendarDays, RefreshCw, Send, Lock, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FinancingFormProps {
  vehicle?: {
    name: string;
    id?: string;
  };
  vehicles?: Array<{
    id: string;
    name: string;
  }>;
}

const parcelasOptions = ['12x', '24x', '36x', '48x', '60x'];
const trocaOptions = ['Não, somente financiamento', 'Sim, tenho veículo na troca'];

export function FinancingForm({ vehicle, vehicles }: FinancingFormProps) {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    cpf: '',
    nascimento: '',
    veiculo: vehicle?.name || '',
    entrada: '',
    parcelas: '48x',
    troca: 'Não, somente financiamento',
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15);
  };

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (!numbers) return '';
    const amount = parseInt(numbers) / 100;
    return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const formatDate = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .slice(0, 10);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (name === 'whatsapp') {
      formattedValue = formatPhone(value);
    } else if (name === 'entrada') {
      formattedValue = formatCurrency(value);
    } else if (name === 'nascimento') {
      formattedValue = formatDate(value);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular envio (aqui você pode integrar com uma API real depois)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mostrar popup de sucesso
    setShowSuccess(true);
    setLoading(false);

    // Limpar formulário
    setFormData({
      nome: '',
      whatsapp: '',
      cpf: '',
      nascimento: '',
      veiculo: vehicle?.name || '',
      entrada: '',
      parcelas: '48x',
      troca: 'Não, somente financiamento',
    });
  };

  const inputClass = "w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";
  const selectClass = "w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none cursor-pointer";
  const labelClass = "flex items-center gap-2 text-sm font-semibold text-white mb-2";

  return (
    <>
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
              Solicitação Enviada!
            </h3>

            <p className="text-zinc-600 mb-6">
              Agradecemos o seu interesse! Nossa equipe entrará em contato em breve para dar continuidade à sua simulação de financiamento.
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

        {/* WhatsApp e CPF */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div>
            <label className={labelClass}>
              <CreditCard className="h-4 w-4" />
              CPF (SOMENTE NÚMEROS)
            </label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="000.000.000-00"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Data de Nascimento */}
        <div>
          <label className={labelClass}>
            <Calendar className="h-4 w-4" />
            DATA DE NASCIMENTO
          </label>
          <input
            type="text"
            name="nascimento"
            value={formData.nascimento}
            onChange={handleChange}
            placeholder="DD/MM/AAAA"
            required
            className={inputClass}
          />
        </div>

        {/* Veículo */}
        <div>
          <label className={labelClass}>
            <Car className="h-4 w-4" />
            VEÍCULO DE INTERESSE
          </label>
          {vehicle ? (
            <input
              type="text"
              name="veiculo"
              value={formData.veiculo}
              readOnly
              className={`${inputClass} cursor-not-allowed opacity-75`}
            />
          ) : vehicles && vehicles.length > 0 ? (
            <div className="relative">
              <select
                name="veiculo"
                value={formData.veiculo}
                onChange={handleChange}
                required
                className={selectClass}
              >
                <option value="" className="bg-zinc-900">Selecione um carro...</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.name} className="bg-zinc-900">
                    {v.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="h-4 w-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          ) : (
            <input
              type="text"
              name="veiculo"
              value={formData.veiculo}
              onChange={handleChange}
              placeholder="Digite o veículo de interesse"
              required
              className={inputClass}
            />
          )}
        </div>

        {/* Entrada e Parcelas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              <DollarSign className="h-4 w-4" />
              ENTRADA (R$)
            </label>
            <input
              type="text"
              name="entrada"
              value={formData.entrada}
              onChange={handleChange}
              placeholder="R$ 0,00"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              <CalendarDays className="h-4 w-4" />
              PARCELAS
            </label>
            <div className="relative">
              <select
                name="parcelas"
                value={formData.parcelas}
                onChange={handleChange}
                className={selectClass}
              >
                {parcelasOptions.map((p) => (
                  <option key={p} value={p} className="bg-zinc-900">
                    {p}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="h-4 w-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Troca */}
        <div>
          <label className={labelClass}>
            <RefreshCw className="h-4 w-4" />
            TEM VEÍCULO NA TROCA?
          </label>
          <div className="relative">
            <select
              name="troca"
              value={formData.troca}
              onChange={handleChange}
              className={selectClass}
            >
              {trocaOptions.map((t) => (
                <option key={t} value={t} className="bg-zinc-900">
                  {t}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="h-4 w-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full py-6 text-lg font-bold"
        >
          <Send className="h-5 w-5 mr-2" />
          {loading ? 'ENVIANDO...' : 'ENVIAR PARA ANÁLISE'}
        </Button>

        <p className="flex items-center justify-center gap-2 text-xs text-white/60">
          <Lock className="h-3 w-3" />
          Seus dados estão seguros e serão usados apenas para esta simulação.
        </p>
      </form>
    </>
  );
}
