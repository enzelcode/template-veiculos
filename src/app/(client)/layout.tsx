import { Header, Footer } from '@/components/layout';
import { WhatsAppFloat } from '@/components/shared';
import { PageTracker } from '@/components/analytics/PageTracker';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <PageTracker />
    </div>
  );
}
