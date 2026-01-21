import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/db/mongodb';
import { User } from '@/lib/db/models';
import { authOptions } from '@/lib/auth/auth';

// DELETE /api/users/:id - Deletar usuário
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    await connectDB();

    // Não permite deletar a si mesmo
    const currentUser = await User.findOne({ email: session.user.email });
    if (currentUser?._id.toString() === params.id) {
      return NextResponse.json(
        { error: 'Você não pode deletar seu próprio usuário' },
        { status: 400 }
      );
    }

    const user = await User.findByIdAndDelete(params.id);

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Usuário deletado com sucesso',
    });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar usuário' },
      { status: 500 }
    );
  }
}

// PUT /api/users/:id - Atualizar usuário
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();

    const updateData: {
      name?: string;
      email?: string;
      active?: boolean;
    } = {};

    if (body.name) updateData.name = body.name;
    if (body.email) updateData.email = body.email;
    if (body.active !== undefined) updateData.active = body.active;

    const user = await User.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    ).select('-password');

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Usuário atualizado com sucesso',
      user,
    });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);

    if ((error as { code?: number }).code === 11000) {
      return NextResponse.json(
        { error: 'Este email já está em uso' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Erro ao atualizar usuário' },
      { status: 500 }
    );
  }
}
