import { AdModel } from '../models/Ad';
import { StoreProfileModel } from '../models/StoreProfile';
import { TenderModel } from '../models/Tender';
import { TenderResponseModel } from '../models/TenderResponse';
import { UserModel } from '../models/User';
import { HeatmapEventModel } from '../models/Analytics';
import { PaymentModel } from '../models/Payment';
import { CategoryModel } from '../models/Category';
import { SubscriptionModel } from '../models/Subscription';
import { CityModel } from '../models/Geo';

export async function ensureIndexes() {
  await Promise.all([
    AdModel.syncIndexes(),
    StoreProfileModel.syncIndexes(),
    TenderModel.syncIndexes(),
    TenderResponseModel.syncIndexes(),
    UserModel.syncIndexes(),
    HeatmapEventModel.syncIndexes(),
    PaymentModel.syncIndexes(),
    CategoryModel.syncIndexes(),
    SubscriptionModel.syncIndexes(),
    CityModel.syncIndexes(),
  ]);
}
