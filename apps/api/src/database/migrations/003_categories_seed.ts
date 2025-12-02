import { CategoryModel } from '../../models/Category';
import { seedCategories } from '../seed/seedCategories';

export async function up() {
  await CategoryModel.createCollection();
  await seedCategories();
}

export async function down() {
  await CategoryModel.collection.drop();
}
