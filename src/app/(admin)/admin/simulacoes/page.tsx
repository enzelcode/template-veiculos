'use client';

import { useState, useEffect } from 'react';
import { Trash2, Loader2, MessageCircle, Phone, Calendar, CreditCard, Car, DollarSign, CalendarDays, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/utils/formatters';

interface Simulation {
  _id: string;
  name: string;
  email: string;
  phone: string;
  cpf?: string;
  birthDate?: string;
  vehicleInterest?: string;
  hasTrade?: string;
  vehicleValue: number;
  downPayment: number;
  installments: number;
  status: 'pending' | 'contacted' | 'closed';
  notes?: string;
  createdAt: string;
}

const statusLabels: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' }> = {
  pending: { label: 'Pendente', variant: 'default' },
  contacted: { label: 'Contatado', variant: 'secondary' },
  closed: { label: 'Fechado', variant: 'destructive' },
};

export default function SimulacoesPage() {
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSimulation, setSelectedSimulation] = useState<Simulation | null>(null);
  const [deleteSimulationId, setDeleteSimulationId] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const [editData, setEditData] = useState({
    status: 'pending',
    notes: '',
  });

  useEffect(() => {
    fetchSimulations();
  }, []);

  useEffect(() => {
    if (selectedSimulation) {
      setEditData({
        status: selectedSimulation.status,
        notes: selectedSimulation.notes || '',
      });
    }
  }, [selectedSimulation]);

  const fetchSimulations = async () => {
    try {
      const response = await fetch('/api/simulations');
      const data = await response.json();
      setSimulations(data.simulations || []);
    } catch (error) {
      console.error('Erro ao buscar simulações:', error);
      toast.error('Erro ao carregar simulações');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedSimulation) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/simulations/${selectedSimulation._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao atualizar simulação');
      }

      toast.success('Simulação atualizada com sucesso');
      setSelectedSimulation(null);
      fetchSimulations();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao atualizar simulação');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteSimulationId) return;

    try {
      const response = await fetch(`/api/simulations/${deleteSimulationId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao deletar simulação');
      }

      toast.success('Simulação deletada com sucesso');
      setDeleteSimulationId(null);
      fetchSimulations();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao deletar simulação');
    }
  };

  const openWhatsApp = (phone: string, name: string) => {
    const message = encodeURIComponent(`Olá ${name}! Vi sua solicitação de simulação de financiamento e gostaria de conversar com você.`);
    window.open(`https://wa.me/55${phone}?text=${message}`, '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Simulações de Financiamento</h1>
          <p className="text-muted-foreground mt-1">
            {simulations.length} {simulations.length === 1 ? 'solicitação recebida' : 'solicitações recebidas'}
          </p>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Veículo de Interesse</TableHead>
              <TableHead>Entrada</TableHead>
              <TableHead>Parcelas</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {simulations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <DollarSign className="h-12 w-12 text-muted-foreground/50" />
                    <p className="text-lg font-medium">Nenhuma simulação encontrada</p>
                    <p className="text-sm">As solicitações aparecerão aqui quando clientes preencherem o formulário</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              simulations.map((simulation) => {
                const status = statusLabels[simulation.status] || statusLabels.pending;
                return (
                  <TableRow key={simulation._id} className="hover:bg-zinc-50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <UserIcon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">{simulation.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{simulation.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 max-w-[250px]">
                        <Car className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="truncate">{simulation.vehicleInterest || '-'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-green-600">
                        {formatCurrency(simulation.downPayment)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{simulation.installments}x</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(simulation.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openWhatsApp(simulation.phone, simulation.name)}
                          className="h-8 w-8 p-0 hover:bg-green-50"
                          title="Contatar no WhatsApp"
                        >
                          <MessageCircle className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedSimulation(simulation)}
                          className="h-8 px-3"
                          title="Ver detalhes e editar"
                        >
                          Ver detalhes
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteSimulationId(simulation._id)}
                          className="h-8 w-8 p-0 hover:bg-red-50"
                          title="Deletar simulação"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* View/Edit Dialog */}
      <Dialog open={!!selectedSimulation} onOpenChange={() => setSelectedSimulation(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Detalhes da Simulação</DialogTitle>
            <DialogDescription>
              Informações completas da solicitação de financiamento
            </DialogDescription>
          </DialogHeader>

          {selectedSimulation && (
            <div className="space-y-6">
              {/* Informações do Cliente */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                  <UserIcon className="h-5 w-5 text-primary" />
                  Dados do Cliente
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Nome Completo</Label>
                    <p className="text-base font-medium">{selectedSimulation.name}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Telefone / WhatsApp</Label>
                    <div className="flex items-center gap-2">
                      <p className="text-base font-medium">{selectedSimulation.phone}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openWhatsApp(selectedSimulation.phone, selectedSimulation.name)}
                        className="h-7 px-2"
                      >
                        <MessageCircle className="h-3 w-3 text-green-600 mr-1" />
                        <span className="text-xs">Abrir WhatsApp</span>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground flex items-center gap-1">
                      <CreditCard className="h-3 w-3" />
                      CPF
                    </Label>
                    <p className="text-base font-medium">{selectedSimulation.cpf || '-'}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Data de Nascimento
                    </Label>
                    <p className="text-base font-medium">{selectedSimulation.birthDate || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Informações do Financiamento */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Detalhes do Financiamento
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 col-span-2">
                    <Label className="text-xs text-muted-foreground flex items-center gap-1">
                      <Car className="h-3 w-3" />
                      Veículo de Interesse
                    </Label>
                    <p className="text-base font-medium">{selectedSimulation.vehicleInterest || '-'}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      Entrada
                    </Label>
                    <p className="text-lg font-bold text-green-600">
                      {formatCurrency(selectedSimulation.downPayment)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" />
                      Parcelas
                    </Label>
                    <p className="text-lg font-bold">{selectedSimulation.installments}x</p>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <Label className="text-xs text-muted-foreground">Tem Veículo na Troca?</Label>
                    <p className="text-base font-medium">{selectedSimulation.hasTrade || '-'}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Data da Solicitação
                    </Label>
                    <p className="text-base font-medium">
                      {new Date(selectedSimulation.createdAt).toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status e Observações */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">
                  Gestão da Simulação
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Status do Atendimento</Label>
                    <Select
                      value={editData.status}
                      onValueChange={(value) => setEditData({ ...editData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            Pendente
                          </div>
                        </SelectItem>
                        <SelectItem value="contacted">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                            Contatado
                          </div>
                        </SelectItem>
                        <SelectItem value="closed">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            Fechado
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Observações Internas</Label>
                    <Textarea
                      value={editData.notes}
                      onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                      placeholder="Adicione observações sobre esta simulação (não visível para o cliente)..."
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedSimulation(null)}
                  disabled={isUpdating}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className="flex-1"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    'Salvar Alterações'
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteSimulationId} onOpenChange={() => setDeleteSimulationId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar esta simulação? Esta ação não pode ser desfeita e todos os dados serão permanentemente removidos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Deletar Simulação
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
