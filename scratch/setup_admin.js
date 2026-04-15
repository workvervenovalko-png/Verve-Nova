const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupAdmin() {
  const email = 'work.vervenova.lko@gmail.com';
  const password = '123123';
  const fullName = 'Verve Nova Admin';

  console.log('Initiating Admin Deployment...');

  // 1. Create User in Auth
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName }
  });

  if (authError) {
    if (authError.message.includes('already registered')) {
      console.log('User already exists in Auth. Proceeding to elevate profile...');
    } else {
      console.error('Auth Error:', authError.message);
      return;
    }
  }

  const userId = authData?.user?.id || (await supabase.from('profiles').select('id').eq('email', email).single()).data?.id;

  if (!userId) {
     const { data: userData } = await supabase.auth.admin.listUsers();
     const existingUser = userData.users.find(u => u.email === email);
     if (existingUser) {
        // User exists but maybe no profile yet
        console.log('User found in Auth list. ID:', existingUser.id);
        const { error: profErr } = await supabase.from('profiles').upsert({
            id: existingUser.id,
            email,
            full_name: fullName,
            vn_id: 'VN-2026-MASTER-001',
            role: 'ADMIN'
        });
        if (profErr) console.error('Profile Upsert Error:', profErr.message);
        else console.log('Admin Profile Elevated successfully.');
     }
     return;
  }

  // 2. Create/Update Profile with ADMIN role
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      vn_id: 'VN-2026-MASTER-001',
      full_name: fullName,
      email: email,
      role: 'ADMIN'
    });

  if (profileError) {
    console.error('Profile Error:', profileError.message);
  } else {
    console.log('Admin Clearance Level 05 Granted.');
    console.log(`Email: ${email}`);
    console.log(`Access Keys: ${password}`);
  }
}

setupAdmin();
