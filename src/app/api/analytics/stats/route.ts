import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import connectDB from '@/lib/db/mongodb';
import { PageView } from '@/lib/db/models';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    await connectDB();

    // Data de hoje e 30 dias atrás
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    // Estatísticas agregadas
    const [totalViews, last7DaysViews, last30DaysViews, topPages] = await Promise.all([
      // Total de visualizações
      PageView.aggregate([{ $group: { _id: null, total: { $sum: '$count' } } }]),

      // Últimos 7 dias
      PageView.aggregate([
        { $match: { date: { $gte: sevenDaysAgo, $lte: today } } },
        { $group: { _id: null, total: { $sum: '$count' } } },
      ]),

      // Últimos 30 dias
      PageView.aggregate([
        { $match: { date: { $gte: thirtyDaysAgo, $lte: today } } },
        { $group: { _id: null, total: { $sum: '$count' } } },
      ]),

      // Top 5 páginas mais visitadas (últimos 30 dias)
      PageView.aggregate([
        { $match: { date: { $gte: thirtyDaysAgo, $lte: today } } },
        { $group: { _id: '$path', total: { $sum: '$count' } } },
        { $sort: { total: -1 } },
        { $limit: 5 },
      ]),
    ]);

    return NextResponse.json({
      totalViews: totalViews[0]?.total || 0,
      last7DaysViews: last7DaysViews[0]?.total || 0,
      last30DaysViews: last30DaysViews[0]?.total || 0,
      topPages: topPages.map((p) => ({ path: p._id, views: p.total })),
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar estatísticas' },
      { status: 500 }
    );
  }
}
