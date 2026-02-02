import { prisma } from "./client";

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "test@local.dev" },
    update: {},
    create: { email: "test@local.dev", name: "Test User", role: "user" }
  });

  console.log("Seeded user:", user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
