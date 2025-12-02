import { CategoryModel } from '../models/Category.model';
import { LocalizedString } from '../schemas/common/localizedString.schema';

export const seedCategories = async (): Promise<void> => {
  const categories: { slug: string; title: LocalizedString }[] = [
    { slug: 'repairs', title: { ru: 'Ремонт', by: 'Рамонт', pl: 'Remont' } },
    { slug: 'construction', title: { ru: 'Строительство', by: 'Будаўніцтва', pl: 'Budownictwo' } },
    { slug: 'materials', title: { ru: 'Материалы', by: 'Матэрыялы', pl: 'Materiały' } },
  ];

  for (const category of categories) {
    await CategoryModel.updateOne({ slug: category.slug }, { $set: category }, { upsert: true });
  }
};
