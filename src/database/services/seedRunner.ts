import { connectDatabase } from "../connection";
import { seedGeo } from "../seed/seedGeo";
import { seedCategories } from "../seed/seedCategories";
import { seedSubscriptionPlans } from "../seed/seedSubscriptionPlans";
import { seedAdmin } from "../seed/seedAdmin";

export async function runSeed() {
  await connectDatabase();

  await seedGeo();
  await seedCategories();
  await seedSubscriptionPlans();
  await seedAdmin();

  console.log("Seed completed");
}

if (require.main === module) {
  runSeed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

