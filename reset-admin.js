import prisma from './server/prisma.js';
import bcrypt from 'bcryptjs';

async function resetAdmin() {
  const username = 'admin';
  const password = '1234';
  const hashed = await bcrypt.hash(password, 12);

  try {
    const user = await prisma.user.upsert({
      where: { username },
      update: {
        password: hashed,
        role: 'admin',
        isVerified: 1
      },
      create: {
        username,
        password: hashed,
        role: 'admin',
        isVerified: 1
      }
    });
    console.log(`✅ Admin user "${username}" reset/created successfully!`);
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

resetAdmin();
