import { CategoryModel } from '../models/Category.model';
import { seedCategories } from '../seed/seedCategories';

export const run003_init_categories = async (): Promise<void> => {
  await CategoryModel.createCollection();
  await CategoryModel.syncIndexes();

  await seedCategories();

  console.log('Migration 003_init_categories done');
};

export const up = run003_init_categories;
