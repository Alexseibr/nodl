import { CategoryModel } from '../../models/Category';

export async function seedCategories() {
  const baseCategories = [
    {
      slug: 'construction',
      name: { ru: 'Стройка', en: 'Construction', pl: 'Budowa' },
    },
    {
      slug: 'farm',
      name: { ru: 'Фермерство', en: 'Farming', pl: 'Rolnictwo' },
    },
    {
      slug: 'materials',
      name: { ru: 'Материалы', en: 'Materials', pl: 'Materiały' },
    },
    {
      slug: 'tenders',
      name: { ru: 'Тендеры', en: 'Tenders', pl: 'Przetargi' },
    },
  ];

  for (const category of baseCategories) {
    await CategoryModel.updateOne({ slug: category.slug }, category, { upsert: true });
  }
}
