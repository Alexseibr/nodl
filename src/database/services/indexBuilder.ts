import { connectDatabase } from "../connection";
import { UserModel } from "../models/User.model";
import { StoreModel } from "../models/Store.model";
import { AdModel } from "../models/Ad.model";
import { TenderModel } from "../models/Tender.model";
import { ReviewModel } from "../models/Review.model";

export async function buildIndexes() {
  await connectDatabase();

  await Promise.all([
    UserModel.syncIndexes(),
    StoreModel.syncIndexes(),
    AdModel.syncIndexes(),
    TenderModel.syncIndexes(),
    ReviewModel.syncIndexes(),
  ]);

  console.log("Indexes synced");
}

if (require.main === module) {
  buildIndexes()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

