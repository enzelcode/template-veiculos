import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db/mongodb';
import { User } from '@/lib/db/models';
import { authOptions } from '@/lib/auth/auth';

// GET /api/users - Listar usuários
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    await connectDB();

    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 });

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar usuários' },
      { status: 500 }
    );
  }
}

// POST /api/users - Criar novo usuário
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();

    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: 'Nome, email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    if (body.password.length < 6) {
      return NextResponse.json(
        { error: 'Senha deve ter no mínimo 6 caracteres' },
        { status: 400 }
      );
    }

    const user = await User.create({
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role || 'admin',
      active: body.active !== undefined ? body.active : true,
    });

    return NextResponse.json(
      {
        message: 'Usuário criado com sucesso',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          active: user.active,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar usuário:', error);

    if ((error as { code?: number }).code === 11000) {
      return NextResponse.json(
        { error: 'Este email já está em uso' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Erro ao criar usuário' },
      { status: 500 }
    );
  }
}
