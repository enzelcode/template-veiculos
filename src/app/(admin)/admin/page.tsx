import Link from 'next/link';
import { Car, DollarSign, Plus, Package, Eye, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import connectDB from '@/lib/db/mongodb';
import { Vehicle, PageView } from '@/lib/db/models';

async function getStats() {
  await connectDB();

  // Datas para analytics
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const [
    totalVehicles,
    availableVehicles,
    reservedVehicles,
    avgPriceResult,
    totalViews,
    last7DaysViews,
    topPages,
  ] = await Promise.all([
    Vehicle.countDocuments({}),
    Vehicle.countDocuments({ status: 'available' }),
    Vehicle.countDocuments({ status: 'reserved' }),
    Vehicle.aggregate([
      { $match: { status: 'available' } },
      { $group: { _id: null, avg: { $avg: '$price' } } },
    ]),
    // Total de visualizações
    PageView.aggregate([{ $group: { _id: null, total: { $sum: '$count' } } }]),
    // Últimos 7 dias
    PageView.aggregate([
      { $match: { date: { $gte: sevenDaysAgo, $lte: today } } },
      { $group: { _id: null, total: { $sum: '$count' } } },
    ]),
    // Top 5 veículos mais vistos (apenas páginas de veículos)
    PageView.aggregate([
      {
        $match: {
          date: { $gte: sevenDaysAgo, $lte: today },
          path: { $regex: '^/veiculos/.+' },
        },
      },
      { $group: { _id: '$path', total: { $sum: '$count' } } },
      { $sort: { total: -1 } },
      { $limit: 5 },
    ]),
  ]);

  // Extrair títulos dos veículos a partir dos slugs
  const vehicleSlugs = topPages.map((p: { _id: string }) =>
    p._id.replace('/veiculos/', '')
  );
  const vehiclesData = await Vehicle.find(
    { slug: { $in: vehicleSlugs } },
    { slug: 1, title: 1 }
  ).lean();

  const vehicleMap = new Map(
    vehiclesData.map((v: { slug: string; title: string }) => [v.slug, v.title])
  );

  return {
    totalVehicles,
    availableVehicles,
    reservedVehicles,
    averagePrice: avgPriceResult[0]?.avg || 0,
    totalViews: totalViews[0]?.total || 0,
    last7DaysViews: last7DaysViews[0]?.total || 0,
    topVehicles: topPages.map((p: { _id: string; total: number }) => {
      const slug = p._id.replace('/veiculos/', '');
      return {
        slug,
        title: vehicleMap.get(slug) || slug,
        views: p.total,
      };
    }),
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const vehicleCards = [
    {
      title: 'Total de Veículos',
      value: stats.totalVehicles,
      description: 'Cadastrados no sistema',
      icon: Car,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Disponíveis',
      value: stats.availableVehicles,
      description: 'Prontos para venda',
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Reservados',
      value: stats.reservedVehicles,
      description: 'Em negociação',
      icon: Car,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Preço Médio',
      value: stats.averagePrice.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0,
      }),
      description: 'Veículos disponíveis',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const analyticsCards = [
    {
      title: 'Visitas Totais',
      value: stats.totalViews.toLocaleString('pt-BR'),
      description: 'Desde o início',
      icon: Eye,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      title: 'Últimos 7 dias',
      value: stats.last7DaysViews.toLocaleString('pt-BR'),
      description: 'Visitas na semana',
      icon: TrendingUp,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do estoque</p>
        </div>
        <Button asChild>
          <Link href="/admin/veiculos/novo">
            <Plus className="mr-2 h-4 w-4" />
            Novo Veículo
          </Link>
        </Button>
      </div>

      {/* Cards de Veículos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {vehicleCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cards de Analytics */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Visitas do Site</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsCards.map((card) => (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}

          {/* Top Veículos */}
          <Card className="sm:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Veículos Mais Vistos (7 dias)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.topVehicles.length > 0 ? (
                <ul className="space-y-2">
                  {stats.topVehicles.map(
                    (
                      vehicle: { slug: string; title: string; views: number },
                      index: number
                    ) => (
                      <li
                        key={vehicle.slug}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="truncate flex-1 mr-2">
                          <span className="text-muted-foreground mr-2">
                            {index + 1}.
                          </span>
                          {vehicle.title}
                        </span>
                        <span className="font-medium">
                          {vehicle.views.toLocaleString('pt-BR')}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Nenhuma visita em veículos ainda
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button variant="outline" asChild>
            <Link href="/admin/veiculos">Ver todos os veículos</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/veiculos/novo">Cadastrar veículo</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/" target="_blank">Ver site</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
