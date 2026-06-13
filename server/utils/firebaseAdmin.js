import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync } from 'fs';
import { join } from 'path';

if (!getApps().length) {
  try {
    // 1. Locate the file in your project's root directory
    const serviceAccountPath = join(process.cwd(), 'firebase-service-account.json');
    
    // 2. Read and parse the JSON file contents
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

    // 3. Initialize Firebase Admin using the parsed object
    initializeApp({
      credential: cert(serviceAccount),
    });
    
    console.log("Firebase Admin initialized successfully using Secret File! 🎉");
  } catch (error) {
    console.error("Failed to initialize Firebase Admin:", error);
  }
}

export const adminAuth = getAuth();