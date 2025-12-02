import { HeatmapEventModel } from '../../models/Analytics';

export async function up() {
  await HeatmapEventModel.createCollection();
}

export async function down() {
  await HeatmapEventModel.collection.drop();
}
