const { execSync } = require('child_process');

function deployDatabase() {
  const dbUrl = process.env.DATABASE_URL;

  // If running locally without remote PostgreSQL, skip cleanly
  if (!dbUrl || dbUrl.startsWith('file:')) {
    console.log('[DB DEPLOY] Skipping remote migration (No remote PostgreSQL DATABASE_URL detected).');
    return;
  }

  console.log('[DB DEPLOY] Remote PostgreSQL connection detected. Synchronizing database tables...');

  // Step 1: Deploy migrations (or fallback to db push)
  let migrationSucceeded = false;
  try {
    console.log('[DB DEPLOY] Running: prisma migrate deploy');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    console.log('[DB DEPLOY] Prisma migrations applied successfully.');
    migrationSucceeded = true;
  } catch (migrateErr) {
    console.warn('[DB DEPLOY] prisma migrate deploy failed, falling back to prisma db push:', migrateErr.message);
  }

  if (!migrationSucceeded) {
    try {
      console.log('[DB DEPLOY] Running fallback: prisma db push');
      execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });
      console.log('[DB DEPLOY] prisma db push completed successfully.');
      migrationSucceeded = true;
    } catch (pushErr) {
      console.error('[DB DEPLOY ERROR] Database push failed:', pushErr.message);
      // Do not abort Next.js compilation
      return;
    }
  }

  // Step 2: Seed default studio content (categories, products, testimonials, FAQs, admin)
  if (migrationSucceeded) {
    try {
      console.log('[DB DEPLOY] Seeding default studio content...');
      execSync('node prisma/seed.js', { stdio: 'inherit' });
      console.log('[DB DEPLOY] Database seed completed successfully.');
    } catch (seedErr) {
      console.warn('[DB DEPLOY SEED NOTE]', seedErr.message);
    }
  }
}

deployDatabase();

