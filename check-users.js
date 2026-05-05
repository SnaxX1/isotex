import prisma from './server/prisma.js';

async function checkUsers() {
  try {
    const users = await prisma.user.findMany();
    console.log(`Found ${users.length} users in database.`);
    users.forEach(u => {
      console.log(`- ${u.username} (Role: ${u.role}, Verified: ${u.is_verified})`);
    });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkUsers();
