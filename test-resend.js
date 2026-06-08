require('dotenv').config({ path: '.env.local' });
const { Resend } = require('resend');

const keys = (process.env.RESEND_API_KEY || '').split(',').map(k => k.trim());

async function test() {
  const resend = new Resend(keys[1]); // Second key
  const result = await resend.emails.send({
    from: 'Verve Nova <onboarding@vervenovatechcrm.online>',
    to: 'randomxyz123999@gmail.com',
    subject: 'Test',
    html: '<p>Test</p>'
  });
  console.log(result);
}

test();
