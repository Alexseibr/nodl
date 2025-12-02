import * as migrations from '../migrations';

export const runMigrations = async (): Promise<void> => {
  const ordered = Object.keys(migrations)
    .filter((key) => key.startsWith('migration_') === false)
    .sort();

  for (const key of ordered) {
    const migration = (migrations as Record<string, () => Promise<void>>)[key];
    if (typeof migration === 'function') {
      await migration();
    }
  }
};
