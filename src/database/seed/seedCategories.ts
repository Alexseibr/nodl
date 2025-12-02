import { CategoryModel } from "../models/Category.model";

export async function seedCategories() {
  await CategoryModel.deleteMany({});

  const base = [
    {
      code: "construction",
      name: {
        ru: "Строительство",
        en: "Construction",
        pl: "Budownictwo",
      },
    },
    {
      code: "repair",
      name: {
        ru: "Ремонт",
        en: "Repair",
        pl: "Remont",
      },
    },
    {
      code: "materials",
      name: {
        ru: "Стройматериалы",
        en: "Materials",
        pl: "Materiały budowlane",
      },
    },
    {
      code: "farmer",
      name: {
        ru: "Фермерские продукты",
        en: "Farm products",
        pl: "Produkty rolne",
      },
    },
  ];

  for (let i = 0; i < base.length; i++) {
    await CategoryModel.create({
      ...base[i],
      order: i,
      isActive: true,
    });
  }
}

