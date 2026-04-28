export interface Item {
  description: string;
  valor: number;
}

export interface Factura {
  id: number;
  tienda: string;
  fecha: string;
  total: number;
  subtotal: number;
  iva: number;
  metodo_pago: string;
  items: Item[];
}