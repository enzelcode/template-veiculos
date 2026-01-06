import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { Vehicle } from '@/lib/db/models';

// GET /api/vehicles - Listar veículos com filtros e paginação
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    // Paginação
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    // Ordenação
    const sortField = searchParams.get('sort') || 'createdAt';
    const sortOrder = searchParams.get('order') === 'asc' ? 1 : -1;

    // Filtros
    const query: Record<string, unknown> = {};

    const brand = searchParams.get('brand');
    if (brand) query.brand = brand;

    const fuel = searchParams.get('fuel');
    if (fuel) query.fuel = fuel;

    const transmission = searchParams.get('transmission');
    if (transmission) query.transmission = transmission;

    const status = searchParams.get('status');
    if (status) query.status = status;

    const featured = searchParams.get('featured');
    if (featured === 'true') query.featured = true;

    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) (query.price as Record<string, number>).$gte = parseInt(minPrice);
      if (maxPrice) (query.price as Record<string, number>).$lte = parseInt(maxPrice);
    }

    const minYear = searchParams.get('minYear');
    const maxYear = searchParams.get('maxYear');
    if (minYear || maxYear) {
      query.year = {};
      if (minYear) (query.year as Record<string, number>).$gte = parseInt(minYear);
      if (maxYear) (query.year as Record<string, number>).$lte = parseInt(maxYear);
    }

    const search = searchParams.get('search');
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } },
      ];
    }

    // Buscar veículos
    const [vehicles, total] = await Promise.all([
      Vehicle.find(query)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limit)
        .select('-description -features') // Não retorna campos pesados na listagem
        .lean(),
      Vehicle.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      vehicles,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar veículos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar veículos' },
      { status: 500 }
    );
  }
}

// Função para gerar slug
function generateSlug(brand: string, model: string, year: number): string {
  const baseSlug = `${brand}-${model}-${year}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return `${baseSlug}-${Date.now().toString(36)}`;
}

// POST /api/vehicles - Criar veículo
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Gerar título automaticamente se não fornecido
    if (!body.title) {
      body.title = `${body.brand} ${body.model} ${body.version || ''} ${body.year}`.trim();
    }

    // Gerar slug se não fornecido
    if (!body.slug) {
      body.slug = generateSlug(body.brand, body.model, body.year);
    }

    const vehicle = await Vehicle.create(body);

    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar veículo:', error);

    if ((error as { code?: number }).code === 11000) {
      return NextResponse.json(
        { error: 'Já existe um veículo com este slug' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Erro ao criar veículo' },
      { status: 500 }
    );
  }
}
