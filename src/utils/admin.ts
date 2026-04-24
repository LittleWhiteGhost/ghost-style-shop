const FALLBACK_ADMIN_EMAILS = ['otaevfarruhjon@gmail.com'];

function getAdminEmails(): string[] {
  const raw = import.meta.env.VITE_ADMIN_EMAIL as string | undefined;
  if (!raw) return FALLBACK_ADMIN_EMAILS;
  return raw.split(',').map(e => e.trim().toLowerCase()).filter(Boolean);
}

export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.toLowerCase());
}
