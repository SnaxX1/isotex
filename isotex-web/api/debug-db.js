import { db } from './db.js';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

async function debug() {
  console.log('🔍 Debugging Database Connection...');
  
  try {
    const users = await db.user.findMany();
    console.log('👥 Total users in DB:', users.length);
    
    const admin = await db.user.findUnique({ where: { username: 'admin' } });
    
    if (admin) {
      console.log('✅ Admin user found!');
      console.log('   Username:', admin.username);
      console.log('   Is Verified:', admin.is_verified);
      console.log('   Role:', admin.role);
      
      const testPass = process.env.ADMIN_PASSWORD || '1234';
      const match = await bcrypt.compare(testPass, admin.password);
      
      if (match) {
        console.log('✅ Password "'+testPass+'" matches perfectly!');
      } else {
        console.log('❌ Password "'+testPass+'" DOES NOT match the hash in the DB.');
        console.log('   Try running "node server/seed.js" again.');
      }
    } else {
      console.log('❌ Admin user NOT found in the database.');
    }
  } catch (error) {
    console.error('❌ Database error:', error.message);
  } finally {
    process.exit();
  }
}

debug();
