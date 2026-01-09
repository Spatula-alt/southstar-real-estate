export interface Place {
  id: string;
  name: string;
  price: string;
  type: string;
}

export const places: Place[] = [
  { id: 'puertogalera', name: 'Puerto Galera', price: '₱1,600/sqm', type: 'Municipality' },
  { id: 'santeodoro', name: 'San Teodoro', price: '₱1,100/sqm', type: 'Municipality' },
  { id: 'baco', name: 'Baco', price: '₱900/sqm', type: 'Municipality' },
  { id: 'calapan', name: 'Calapan City', price: '₱5,000/sqm', type: 'City' },
  { id: 'naujan', name: 'Naujan', price: '₱1,300/sqm', type: 'Municipality' },
  { id: 'victoria', name: 'Victoria', price: '₱1,050/sqm', type: 'Municipality' },
  { id: 'socorro', name: 'Socorro', price: '₱1,000/sqm', type: 'Municipality' },
  { id: 'pola', name: 'Pola', price: '₱950/sqm', type: 'Municipality' },
  { id: 'pinamalayan', name: 'Pinamalayan', price: '₱1,200/sqm', type: 'Municipality' },
  { id: 'gloria', name: 'Gloria', price: '₱950/sqm', type: 'Municipality' },
  { id: 'bansud', name: 'Bansud', price: '₱1,500/sqm', type: 'Municipality' },
  { id: 'bongabong', name: 'Bongabong', price: '₱1,200/sqm', type: 'Municipality' },
  { id: 'roxas', name: 'Roxas', price: '₱1,100/sqm', type: 'Municipality' },
  { id: 'mansalay', name: 'Mansalay', price: '₱870/sqm', type: 'Municipality' },
  { id: 'bulalacao', name: 'Bulalacao', price: '₱850/sqm', type: 'Municipality' }
];
