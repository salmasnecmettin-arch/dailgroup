/**
 * Supabase Auth requires an email, but the admin panel logs in with a plain
 * username. We map username -> a fixed pseudo-email under this internal
 * domain (never actually sent to). Keep this in sync with whatever email is
 * used when creating the user in the Supabase dashboard.
 */
export const ADMIN_AUTH_DOMAIN = "dailgroup.local";

export function usernameToEmail(username: string) {
  return `${username.trim().toLowerCase()}@${ADMIN_AUTH_DOMAIN}`;
}
