/* Fastrr Studio: site settings.
   Fill in the two Supabase values to switch on accounts and the leads database.
   Both are public by design (Row Level Security in supabase/schema.sql protects the data).
   Setup steps: docs/LEADS-AND-ACCOUNTS.md */
window.FASTRR_CONFIG = {
  supabaseUrl: '',          /* e.g. https://abcdefgh.supabase.co */
  supabaseAnonKey: '',      /* Project settings > API > anon public key */
  googleSignIn: false,      /* true once Google is enabled under Authentication > Providers */
  salesEmail: 'studio@fastrr.com',
  whatsapp: '',             /* optional, digits only with country code, e.g. 919876543210 */
  replyPromise: 'within one working day'
};
