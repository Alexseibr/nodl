import { CategoryModel } from "../models/Category.model";
import { seedCategories } from "../seed/seedCategories";

export async function run003_init_categories() {
  await CategoryModel.createCollection();
  await seedCategories();
  console.log("Migration 003_init_categories done");
}

