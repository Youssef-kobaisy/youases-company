import {
  addDoc,
  collection,
  getDocs,
  initializeFirestore,
  limit,
  query,
  serverTimestamp,
  where,
  type DocumentData,
} from "firebase/firestore";
import { getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ??
    "AIzaSyDQ5bxMakYqyraD7vToxgkMrpWtoOVWsX0",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ??
    "youases-website.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "youases-website",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ??
    "youases-website.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "445503036368",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ??
    "1:445503036368:web:94e86eb4dfb7a7c52337d5",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export type JournalDocument = {
  slug: string;
  category: string;
  number: string;
  title: string;
  excerpt: string;
  intro: string;
  published?: boolean;
  publishedAt?: unknown;
  sections: Array<{ heading: string; copy: string }>;
};

function toJournalDocument(data: DocumentData, fallbackSlug: string) {
  return {
    slug: data.slug ?? fallbackSlug,
    category: data.category ?? "Studio note",
    number: data.number ?? "—",
    title: data.title ?? "A new YouAses signal.",
    excerpt: data.excerpt ?? "",
    intro: data.intro ?? data.excerpt ?? "",
    published: data.published === true,
    publishedAt: data.publishedAt,
    sections: Array.isArray(data.sections) ? data.sections : [],
  } satisfies JournalDocument;
}

export async function saveSubscriber(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const endpoint = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/subscribers?documentId=subscriber-${Date.now()}&key=${firebaseConfig.apiKey}`;
  const document = {
    fields: {
      email: { stringValue: normalizedEmail },
      source: { stringValue: "youases.work" },
      createdAt: { timestampValue: new Date().toISOString() },
    },
  };
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(document),
    });
    if (!response.ok) {
      throw new Error(`Firestore REST request failed: ${response.status}`);
    }
  } catch (restError) {
    try {
      await addDoc(collection(db, "subscribers"), {
        email: normalizedEmail,
        source: "youases.work",
        createdAt: serverTimestamp(),
      });
    } catch (sdkError) {
      throw new Error("Unable to save subscriber in Firestore.", {
        cause: sdkError ?? restError,
      });
    }
  }
}

export async function getPublishedJournalEntries() {
  const entries = await getDocs(
    query(collection(db, "journal"), where("published", "==", true)),
  );
  return entries.docs
    .map((entry) => toJournalDocument(entry.data(), entry.id))
    .sort((a, b) =>
      String(b.publishedAt ?? "").localeCompare(String(a.publishedAt ?? "")),
    );
}

export async function getPublishedJournalEntry(slug: string) {
  const entries = await getDocs(
    query(
      collection(db, "journal"),
      where("published", "==", true),
      where("slug", "==", slug),
      limit(1),
    ),
  );
  const entry = entries.docs[0];
  return entry ? toJournalDocument(entry.data(), entry.id) : null;
}
