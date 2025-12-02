import { connectDatabase } from "../connection";

// сюда будешь постепенно подключать файлы миграций
import { run001_init_users } from "../migrations/001_init_users";
import { run002_init_geo } from "../migrations/002_init_geo";
import { run003_init_categories } from "../migrations/003_init_categories";

export async function runMigrations() {
  await connectDatabase();

  await run001_init_users();
  await run002_init_geo();
  await run003_init_categories();

  // дальше добавишь остальные:
  // await run004_init_stores();
  // ...
  console.log("Migrations finished");
}

if (require.main === module) {
  runMigrations()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

