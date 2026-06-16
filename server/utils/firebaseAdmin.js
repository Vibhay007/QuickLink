import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync } from 'fs';
import { join } from 'path';

if (!getApps().length) {
  try {
    let serviceAccount;

    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      // Option 1: env variable
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      console.log("Firebase Admin: using env variable 🌐");
    } else if (process.env.RENDER) {
      // Option 2: Render secret file
      serviceAccount = JSON.parse(readFileSync('/etc/secrets/firebase-service-account.json', 'utf8'));
      console.log("Firebase Admin: using Render secret file 🔐");
    } else {
      // Option 3: local JSON file
      const serviceAccountPath = join(process.cwd(), 'firebase-service-account.json');
      serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
      console.log("Firebase Admin: using local JSON file 💻");
    }

    initializeApp({
      credential: cert(serviceAccount),
    });

    console.log("Firebase Admin initialized successfully! 🎉");
  } catch (error) {
    console.error("Failed to initialize Firebase Admin:", error);
  }
}

export const adminAuth = getAuth();