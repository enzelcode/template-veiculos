'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MultiImageUpload } from '@/components/admin';
import {
  VEHICLE_BRANDS,
  FUEL_TYPES,
  TRANSMISSION_TYPES,
  BODY_TYPES,
  VEHICLE_STATUS,
  VEHICLE_COLORS,
  VEHICLE_FEATURES,
} from '@/constants/vehicles';

interface VehicleFormData {
  brand: string;
  model: string;
  version: string;
  year: number;
  yearModel: number;
  price: number;
  mileage: number;
  color: string;
  fuel: string;
  transmission: string;
  doors: number;
  bodyType: string;
  featuredImage: string;
  images: string[];
  features: string[];
  description: string;
  status: string;
  featured: boolean;
}

interface VehicleFormProps {
  initialData?: Partial<VehicleFormData> & { _id?: string };
}

const currentYear = new Date().getFullYear();

export function VehicleForm({ initialData }: VehicleFormProps) {
  const router = useRouter();
  const isEditing = !!initialData?._id;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<VehicleFormData>({
    brand: initialData?.brand || '',
    model: initialData?.model || '',
    version: initialData?.version || '',
    year: initialData?.year || currentYear,
    yearModel: initialData?.yearModel || currentYear,
    price: initialData?.price || 0,
    mileage: initialData?.mileage || 0,
    color: initialData?.color || '',
    fuel: initialData?.fuel || 'flex',
    transmission: initialData?.transmission || 'automatic',
    doors: initialData?.doors || 4,
    bodyType: initialData?.bodyType || 'sedan',
    featuredImage: initialData?.featuredImage || '',
    images: initialData?.images || [],
    features: initialData?.features || [],
    description: initialData?.description || '',
    status: initialData?.status || 'available',
    featured: initialData?.featured || false,
  });

  const updateField = <K extends keyof VehicleFormData>(
    field: K,
    value: VehicleFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEditing
        ? `/api/vehicles/${initialData._id}`
        : '/api/vehicles';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erro ao salvar veículo');
      }

      router.push('/admin/veiculos');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar veículo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
          {error}
        </div>
      )}

      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="brand">Marca *</Label>
            <Select
              value={formData.brand}
              onValueChange={(value) => updateField('brand', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a marca" />
              </SelectTrigger>
              <SelectContent>
                {VEHICLE_BRANDS.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Modelo *</Label>
            <Input
              id="model"
              value={formData.model}
              onChange={(e) => updateField('model', e.target.value)}
              placeholder="Ex: Civic, Corolla, HB20"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="version">Versão</Label>
            <Input
              id="version"
              value={formData.version}
              onChange={(e) => updateField('version', e.target.value)}
              placeholder="Ex: LX, EXL, Turbo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Cor *</Label>
            <Select
              value={formData.color}
              onValueChange={(value) => updateField('color', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a cor" />
              </SelectTrigger>
              <SelectContent>
                {VEHICLE_COLORS.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="year">Ano Fabricação *</Label>
            <Input
              id="year"
              type="number"
              min={1990}
              max={currentYear + 1}
              value={formData.year}
              onChange={(e) => updateField('year', parseInt(e.target.value))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="yearModel">Ano Modelo *</Label>
            <Input
              id="yearModel"
              type="number"
              min={1990}
              max={currentYear + 1}
              value={formData.yearModel}
              onChange={(e) => updateField('yearModel', parseInt(e.target.value))}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Detalhes Técnicos */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhes Técnicos</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fuel">Combustível *</Label>
            <Select
              value={formData.fuel}
              onValueChange={(value) => updateField('fuel', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FUEL_TYPES.map((fuel) => (
                  <SelectItem key={fuel.value} value={fuel.value}>
                    {fuel.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transmission">Câmbio *</Label>
            <Select
              value={formData.transmission}
              onValueChange={(value) => updateField('transmission', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TRANSMISSION_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bodyType">Carroceria *</Label>
            <Select
              value={formData.bodyType}
              onValueChange={(value) => updateField('bodyType', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BODY_TYPES.map((b) => (
                  <SelectItem key={b.value} value={b.value}>
                    {b.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="doors">Portas</Label>
            <Select
              value={formData.doors.toString()}
              onValueChange={(value) => updateField('doors', parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 portas</SelectItem>
                <SelectItem value="4">4 portas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mileage">Quilometragem *</Label>
            <Input
              id="mileage"
              type="number"
              min={0}
              value={formData.mileage}
              onChange={(e) => updateField('mileage', parseInt(e.target.value))}
              placeholder="KM"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Preço (R$) *</Label>
            <Input
              id="price"
              type="number"
              min={0}
              step={100}
              value={formData.price}
              onChange={(e) => updateField('price', parseInt(e.target.value))}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Imagens */}
      <Card>
        <CardHeader>
          <CardTitle>Imagens</CardTitle>
        </CardHeader>
        <CardContent>
          <MultiImageUpload
            value={formData.featuredImage ? [formData.featuredImage, ...formData.images] : formData.images}
            onChange={(urls) => {
              if (urls.length > 0) {
                updateField('featuredImage', urls[0]);
                updateField('images', urls.slice(1));
              } else {
                updateField('featuredImage', '');
                updateField('images', []);
              }
            }}
            maxImages={10}
          />
        </CardContent>
      </Card>

      {/* Opcionais */}
      <Card>
        <CardHeader>
          <CardTitle>Opcionais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {VEHICLE_FEATURES.map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={feature}
                  checked={formData.features.includes(feature)}
                  onCheckedChange={() => toggleFeature(feature)}
                />
                <label
                  htmlFor={feature}
                  className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {feature}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Descrição e Status */}
      <Card>
        <CardHeader>
          <CardTitle>Descrição e Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Descrição detalhada do veículo..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => updateField('status', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {VEHICLE_STATUS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2 pt-8">
              <Checkbox
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) =>
                  updateField('featured', checked === true)
                }
              />
              <label htmlFor="featured" className="cursor-pointer">
                Destacar na página inicial
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botões */}
      <div className="flex items-center gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {isEditing ? 'Atualizar' : 'Cadastrar'}
            </>
          )}
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/veiculos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>
      </div>
    </form>
  );
}
