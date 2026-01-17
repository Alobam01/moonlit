export interface Kitten {
  id: string;
  name: string;
  breed: string;
  gender: "male" | "female";
  ageWeeks: number;
  price: number;
  description: string;
  mainImageUrl: string;
  extraImageUrls?: string[];
  isAvailable: boolean;
}

export interface Breed {
  id: string;
  name: string;
  description: string;
}

export const breeds: Breed[] = [
  {
    id: "1",
    name: "Ragdoll",
    description: "Known for their docile temperament and affectionate nature, Ragdolls are perfect family companions.",
  },
  {
    id: "2",
    name: "Persian",
    description: "Elegant and gentle, Persians are calm indoor cats with luxurious long coats.",
  },
  {
    id: "3",
    name: "British Shorthair",
    description: "Easygoing and loyal, British Shorthairs are known for their plush coats and round faces.",
  },
  {
    id: "4",
    name: "Maine Coon",
    description: "Gentle giants with friendly personalities and impressive size.",
  },
  {
    id: "5",
    name: "Scottish Fold",
    description: "Distinctive folded ears and sweet, owl-like appearance with a loving temperament.",
  },
];

export const kittens: Kitten[] = [
  {
    id: "1",
    name: "Luna",
    breed: "Ragdoll",
    gender: "female",
    ageWeeks: 12,
    price: 2500,
    description: "Luna is a sweet and gentle soul with stunning sapphire blue eyes. She loves to cuddle and follows her humans around the house. Perfect for families looking for a laid-back companion.",
    mainImageUrl: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=600&fit=crop",
    extraImageUrls: [
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600&h=600&fit=crop",
    ],
    isAvailable: true,
  },
  {
    id: "2",
    name: "Oliver",
    breed: "British Shorthair",
    gender: "male",
    ageWeeks: 10,
    price: 2200,
    description: "Oliver is a playful and curious boy with a gorgeous silver-blue coat. His round face and copper eyes will melt your heart. He's great with children and other pets.",
    mainImageUrl: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=600&fit=crop",
    extraImageUrls: [],
    isAvailable: true,
  },
  {
    id: "3",
    name: "Mochi",
    breed: "Persian",
    gender: "female",
    ageWeeks: 14,
    price: 2800,
    description: "Mochi is an elegant cream beauty with a calm and regal temperament. She enjoys lounging in sunny spots and being groomed. Perfect for a quieter household.",
    mainImageUrl: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&h=600&fit=crop",
    extraImageUrls: [],
    isAvailable: true,
  },
  {
    id: "4",
    name: "Max",
    breed: "Maine Coon",
    gender: "male",
    ageWeeks: 16,
    price: 3200,
    description: "Max is a majestic Maine Coon with impressive ear tufts and a bushy tail. Despite his large size, he's incredibly gentle and loves interactive play.",
    mainImageUrl: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600&h=600&fit=crop",
    extraImageUrls: [],
    isAvailable: true,
  },
  {
    id: "5",
    name: "Bella",
    breed: "Scottish Fold",
    gender: "female",
    ageWeeks: 11,
    price: 2600,
    description: "Bella has the most adorable folded ears and owl-like appearance. She's sweet-natured, loves to sit in funny positions, and gets along with everyone.",
    mainImageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600&h=600&fit=crop",
    extraImageUrls: [],
    isAvailable: true,
  },
  {
    id: "6",
    name: "Charlie",
    breed: "Ragdoll",
    gender: "male",
    ageWeeks: 13,
    price: 2400,
    description: "Charlie is a handsome seal point Ragdoll who goes limp when you pick him up – true to his breed! He's incredibly affectionate and loves belly rubs.",
    mainImageUrl: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=600&h=600&fit=crop",
    extraImageUrls: [],
    isAvailable: false,
  },
  {
    id: "7",
    name: "Cleo",
    breed: "Persian",
    gender: "female",
    ageWeeks: 12,
    price: 2700,
    description: "Cleo is a stunning silver-shaded Persian with expressive green eyes. She has a calm demeanor and enjoys being the center of attention.",
    mainImageUrl: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=600&h=600&fit=crop",
    extraImageUrls: [],
    isAvailable: true,
  },
  {
    id: "8",
    name: "Leo",
    breed: "British Shorthair",
    gender: "male",
    ageWeeks: 9,
    price: 2100,
    description: "Leo is a chunky golden boy with the sweetest temperament. He's playful but not hyperactive, making him perfect for apartment living.",
    mainImageUrl: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600&h=600&fit=crop",
    extraImageUrls: [],
    isAvailable: true,
  },
];
