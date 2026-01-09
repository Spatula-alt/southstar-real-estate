export interface Place {
  id: string;
  name: string;
  price: string;
  type: string;
  image?: string;
  map?: string | string[];
}

export const places: Place[] = [
  { id: 'puertogalera', name: 'Puerto Galera', price: '₱1,600/sqm', type: 'Municipality', image: 'https://www.travelorientalmindoro.ph/Content/img/uploads/3997051e-5e30-4aff-9f65-cc33f90d3b6b_thumb.jpg' },
  { id: 'santeodoro', name: 'San Teodoro', price: '₱1,100/sqm', type: 'Municipality', image: 'https://picsum.photos/seed/santeodoro/600/400' },
  { id: 'baco', name: 'Baco', price: '₱900/sqm', type: 'Municipality', image: 'https://lh3.ggpht.com/-VTVx0NXJeXg/U26xVAI8S3I/AAAAAAAAAuE/G9uLfwrQ1Oo/IMG_0004_thumb.jpg?imgmax=800' },
  { id: 'calapan', name: 'Calapan City', price: '₱5,000/sqm', type: 'City', image: 'https://media-cdn.tripadvisor.com/media/photo-s/02/f7/51/a2/only-at-calapan-orriental.jpg' },
  { id: 'naujan', name: 'Naujan', price: '₱1,300/sqm', type: 'Municipality', image: 'https://alchetron.com/cdn/naujan-oriental-mindoro-7f1b2edc-f2ac-49fc-8a1e-2053f454108-resize-750.jpeg' },
  { id: 'victoria', name: 'Victoria', price: '₱1,050/sqm', type: 'Municipality', image: 'https://i.ytimg.com/vi/jZPfSQz2nFU/hqdefault.jpg' },
  { id: 'socorro', name: 'Socorro', price: '₱1,000/sqm', type: 'Municipality', image: 'https://th.bing.com/th/id/OIP.-OfSmxtQLf1Twz3SJ2usQwHaFj' },
  { id: 'pola', name: 'Pola', price: '₱950/sqm', type: 'Municipality', image: 'https://i.ytimg.com/vi/zFMqrUzJhZU/hqdefault.jpg' },
  { id: 'pinamalayan', name: 'Pinamalayan', price: '₱1,200/sqm', type: 'Municipality', image: 'https://travelorientalmindoro.ph/Content/img/uploads/888ed3ef-1f02-4ee3-8f8d-560bf8fb3474.jpg' },
  { id: 'gloria', name: 'Gloria', price: '₱950/sqm', type: 'Municipality', image: 'https://travelorientalmindoro.ph/Content/img/uploads/3cf6e252-5281-4ba3-b494-2d087f0bae9e_thumb.jpg' },
  { id: 'bansud', name: 'Bansud', price: '₱1,500/sqm', type: 'Municipality', image: 'https://tse1.mm.bing.net/th/id/OIP.lwMdzkNCu7HTv5qYAy9tQQHaET' },
  { id: 'bongabong', name: 'Bongabong', price: '₱1,200/sqm', type: 'Municipality', image: 'https://i.ytimg.com/vi/kSSMAxHN2yA/hqdefault.jpg' },
  { id: 'roxas', name: 'Roxas', price: '₱1,100/sqm', type: 'Municipality', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Mindoro_Ferry_Port.jpg/500px-Mindoro_Ferry_Port.jpg' },
  { id: 'mansalay', name: 'Mansalay', price: '₱870/sqm', type: 'Municipality', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/59/49/fc/buktot-beach-mansalay.jpg' },
  { id: 'bulalacao', name: 'Bulalacao', price: '₱850/sqm', type: 'Municipality', image: 'https://i.ytimg.com/vi/FLC25tWhUD8/maxresdefault.jpg' }
];

export const propertyData: Record<string, { title: string; map: string | string[]; img: string }> = {
  puertogalera: { title: "Puerto Galera", map: "https://www.google.com/maps/d/u/1/embed?mid=1bNTJ1OV14-5_u0mL2T7JeLbpheefugI&ehbc=2E312F&noprof=1", img: "https://th.bing.com/th/id/OIP.uxLZdlqqDqprNzvxtE8JwgHaEK?w=308&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3" },
  santeodoro: { title: "San Teodoro", map: "https://www.google.com/maps?q=San+Teodoro+Oriental+Mindoro&z=12&output=embed", img: "https://picsum.photos/seed/santeodoro/1200/800" },
  baco: { title: "Baco", map: "https://www.google.com/maps?q=Baco+Oriental+Mindoro&z=12&output=embed", img: "https://picsum.photos/seed/baco/1200/800" },
  calapan: { title: "Calapan City", map: "https://www.google.com/maps?q=Calapan+City+Oriental+Mindoro&z=13&output=embed", img: "https://picsum.photos/seed/calapan/1200/800" },
  pinamalayan: { 
    title: "Pinamalayan", 
    map: [
      "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2602.742680028106!2d121.4877657871507!3d13.064531869953335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sph!4v1762056156250!5m2!1sen!2sph",
      "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1371.0260726590736!2d121.4770150364018!3d13.026267582805948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sph!4v1762056174058!5m2!1sen!2sph",
      "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d566.5682073601458!2d121.45971994847201!3d13.015019919470857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sph!4v1762056203795!5m2!1sen!2sph"
    ], 
    img: "https://travelorientalmindoro.ph/Content/img/uploads/888ed3ef-1f02-4ee3-8f8d-560bf8fb3474.jpg" 
  },
  gloria: { 
    title: "Gloria", 
    map: [
      "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d444.6305126874968!2d121.47694255367526!3d12.953473714142858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sph!4v1762056230966!5m2!1sen!2sph",
      "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d858.9738914187253!2d121.45223933992096!3d12.95220688867669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sph!4v1762056264619!5m2!1sen!2sph",
      "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d739.3554145398764!2d121.46170700461398!3d12.896762057737163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sph!4v1762056284636!5m2!1sen!2sph"
    ], 
    img: "https://travelorientalmindoro.ph/Content/img/uploads/3cf6e252-5281-4ba3-b494-2d087f0bae9e_thumb.jpg" 
  },
  naujan: { title: "Naujan", map: "https://www.google.com/maps?q=Naujan+Oriental+Mindoro&z=12&output=embed", img: "https://alchetron.com/cdn/naujan-oriental-mindoro-7f1b2edc-f2ac-49fc-8a1e-2053f454108-resize-750.jpeg" },
  victoria: { title: "Victoria", map: "https://www.google.com/maps?q=Victoria+Oriental+Mindoro&z=12&output=embed", img: "https://i.ytimg.com/vi/jZPfSQz2nFU/hqdefault.jpg" },
  socorro: { title: "Socorro", map: "https://www.google.com/maps?q=Socorro+Oriental+Mindoro&z=12&output=embed", img: "https://picsum.photos/seed/socorro/1200/800" },
  pola: { title: "Pola", map: "https://www.google.com/maps?q=Pola+Oriental+Mindoro&z=12&output=embed", img: "https://i.ytimg.com/vi/zFMqrUzJhZU/hqdefault.jpg" },
  bansud: { title: "Bansud", map: "https://www.google.com/maps?q=Bansud+Oriental+Mindoro&z=12&output=embed", img: "https://tse1.mm.bing.net/th/id/OIP.lwMdzkNCu7HTv5qYAy9tQQHaET" },
  bongabong: { title: "Bongabong", map: "https://www.google.com/maps?q=Bongabong+Oriental+Mindoro&z=12&output=embed", img: "https://i.ytimg.com/vi/kSSMAxHN2yA/hqdefault.jpg" },
  roxas: { title: "Roxas", map: "https://www.google.com/maps?q=Roxas+Oriental+Mindoro&z=12&output=embed", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Mindoro_Ferry_Port.jpg/500px-Mindoro_Ferry_Port.jpg" },
  mansalay: { title: "Mansalay", map: "https://www.google.com/maps?q=Mansalay+Oriental+Mindoro&z=12&output=embed", img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/59/49/fc/buktot-beach-mansalay.jpg" },
  bulalacao: { title: "Bulalacao", map: "https://www.google.com/maps?q=Bulalacao+Oriental+Mindoro&z=12&output=embed", img: "https://i.ytimg.com/vi/FLC25tWhUD8/maxresdefault.jpg" }
};
