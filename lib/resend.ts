import { Resend } from 'resend';

// Allow multiple keys separated by commas in .env:
// RESEND_API_KEY=re_1234,re_5678
const apiKeys = (process.env.RESEND_API_KEY || '').split(',').map(k => k.trim()).filter(Boolean);

if (apiKeys.length === 0) {
  throw new Error('Missing RESEND_API_KEY environment variable');
}

const clients = apiKeys.map(key => new Resend(key));

export const resend = {
  emails: {
    send: async (options: any) => {
      let lastError: any = null;
      
      for (let i = 0; i < clients.length; i++) {
        try {
          const result = await clients[i].emails.send(options);
          
          // Resend sometimes returns the error in the result object
          if (result.error && (result.error.message.toLowerCase().includes('quota') || result.error.message.toLowerCase().includes('rate limit'))) {
             console.log(`Resend Key ${i+1} exhausted, falling back to next key...`);
             lastError = result.error;
             continue; // try next key
          }
          
          return result; // Success or non-quota error!
        } catch (error: any) {
           if (error.message && (error.message.toLowerCase().includes('quota') || error.message.toLowerCase().includes('rate limit'))) {
             console.log(`Resend Key ${i+1} threw quota error, falling back to next key...`);
             lastError = error;
             continue;
           }
           // Not a quota error, just throw/return it
           throw error;
        }
      }
      
      // If we exhausted all keys
      console.error("ALL RESEND KEYS EXHAUSTED THEIR QUOTA!");
      return { error: lastError || new Error("All Resend keys exhausted their daily quota.") };
    }
  }
} as unknown as Resend;
