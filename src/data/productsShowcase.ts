export interface Productshowcase {
  id: number;
  img: string;
  alt: string;
  name: string;
  category: "bread" | "cake" | "pastry";
  unit: "Un" | "kg";
  price: number;
  description: string;
}

export const bakeryProductsShowcase: Productshowcase[] = [
  {
    id: 1,
    img: "./AboutIMG.jpeg",
    alt: "Pão Tradicional",
    name: "Forma de sementes",
    category: "bread",
    unit: "Un",
    price: 10.99,
    description: "pao bom",
  },
  {
    id: 2,
    img: "./paposseco.jpeg",
    alt: "Pão Seco",
    name: "Paposseco",
    category: "bread",
    unit: "Un",
    price: 10.99,
    description: "pao bom",
  },
  {
    id: 3,
    img: "./namorados.jpeg",
    alt: "Bolo de Namorados",
    name: "Namorados",
    category: "cake",
    unit: "Un",
    price: 10.99,
    description: "pao bom",
  },
  {
    id: 4,
    img: "./vincados.jpeg",
    alt: "Pão Vincado",
    name: "Vincados",
    category: "bread",
    unit: "Un",
    price: 10.99,
    description: "pao bom",
  },
  {
    id: 5,
    img: "./fibras.jpeg",
    alt: "Pão de Fibras",
    name: "Pão de Fibras",
    category: "bread",
    unit: "Un",
    price: 10.99,
    description: "pao bom",
  },
];
