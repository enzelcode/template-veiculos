import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '@/constants/site';
import { WhatsAppIcon } from '@/components/shared';

function FooterComponent() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 text-zinc-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Image
              src="/logostarmotors.webp"
              alt="Star Motors SJC"
              width={150}
              height={80}
              className="h-26 w-auto object-contain mb-4"
            />
            <p className="text-sm text-zinc-400 mb-4">Seminovos selecionados em São José dos Campos.</p>
            <div className="flex gap-3">
              {SITE_CONFIG.whatsapp && (
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                </a>
              )}
              {SITE_CONFIG.social.instagram && (
                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {SITE_CONFIG.social.facebook && (
                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {SITE_CONFIG.social.youtube && (
                <a
                  href={SITE_CONFIG.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-2">
              {SITE_CONFIG.navigation.main.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-zinc-500" />
                <a href={`tel:${SITE_CONFIG.phone.replace(/\D/g, '')}`} className="hover:text-white transition-colors">
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <WhatsAppIcon className="h-4 w-4 text-zinc-500" />
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-zinc-500" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-white transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-zinc-500 mt-0.5" />
                <span>{SITE_CONFIG.address.full}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Horário
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-zinc-500">Seg - Sex:</span> {SITE_CONFIG.businessHours.weekdays}
              </li>
              <li>
                <span className="text-zinc-500">Sábado:</span> {SITE_CONFIG.businessHours.saturday}
              </li>
              <li>
                <span className="text-zinc-500">Domingo:</span> {SITE_CONFIG.businessHours.sunday}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-zinc-500">
            <p>&copy; {currentYear} {SITE_CONFIG.name}. Todos os direitos reservados.</p>
            <div className="flex gap-4">
              {SITE_CONFIG.navigation.footer.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-zinc-300 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export const Footer = memo(FooterComponent);
