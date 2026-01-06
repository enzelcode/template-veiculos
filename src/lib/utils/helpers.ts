/**
 * Funções auxiliares gerais
 */

/**
 * Gera slug a partir de string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim();
}

/**
 * Gera slug único para veículo
 */
export function generateVehicleSlug(
  brand: string,
  model: string,
  year: number
): string {
  const base = generateSlug(`${brand} ${model} ${year}`);
  const random = Math.random().toString(36).substring(2, 6);
  return `${base}-${random}`;
}

/**
 * Gera link do WhatsApp
 */
export function generateWhatsAppLink(
  phone: string,
  message?: string
): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const baseUrl = `https://wa.me/${cleanPhone}`;

  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }

  return baseUrl;
}

/**
 * Gera mensagem de interesse no veículo
 */
export function generateVehicleInterestMessage(
  vehicleTitle: string,
  vehicleUrl: string
): string {
  return `Olá! Tenho interesse no veículo *${vehicleTitle}*.\n\n${vehicleUrl}\n\nGostaria de mais informações.`;
}

/**
 * Delay/Sleep
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Debounce
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Capitaliza primeira letra
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Trunca texto com ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Verifica se está no servidor
 */
export function isServer(): boolean {
  return typeof window === 'undefined';
}

/**
 * Classnames condicionais (alternativa ao clsx)
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Obtém iniciais de um nome
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Valida email
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida telefone brasileiro
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 || cleaned.length === 11;
}
