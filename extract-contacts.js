const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const resDir = path.join('C:', 'Users', 'Lenovo', 'Desktop', 'Verve Nova', 'web');
const csvFile = path.join(resDir, 'contacts.csv');
const htmlFile = path.join(resDir, 'send-messages.html');

// Template message for Emails (Generic name)
const emailSubject = "Action Required: Next Step for Web Development Internship at Verve Nova Technologies";
const emailBody = `Hello Candidate,

Thank you for applying for the Web Development Internship at Verve Nova Technologies. We appreciate your interest in joining our team!

While we have received your initial application, our official hiring and evaluation process is exclusively conducted through our own careers portal.

What you need to do next: To move forward with your application, please submit your details directly on our official website.

Application Link: https://www.vervenovatech.com/careers/internships/web-development

(We have attached a quick PDF guide to this email that explains the step-by-step process of applying on our portal).

Pdf Link: https://drive.google.com/file/d/1sFXuFvmU651MsHPJsN9f34u9M-nLMvZo/view?usp=sharing

Our Selection Process: Once you apply on our website, your application will go through the following rounds:
Round 1: Resume & Profile Screening (via Website).
Round 2: Automated Skill Assessment
Round 3: Final HR / Technical Interview (Virtual).

Please complete this step as soon as possible so we can proceed with evaluating your profile.

Looking forward to seeing your application on our portal!

Best Regards,
HR Team
Verve Nova Technologies`;

async function extractContacts() {
  const manualOverrides = {
    '69ac329dec3c5_inbound3339291309370983326.pdf': '7793994326',
    '69d407dac2a7b_vasudevkansal_resume.pdf': '7009956615',
    '6a0b0fca32b5a_ayush_new_resume.pdf': '7715941535',
    '6a0dbc013f16b_ERIKALA_LOKESH_Resume.pdf': '8121114148',
    '6a225bcb3cf5f_unnamed.pdf': '9849390411',
    '6a2265f53ded4_hardik_goel_cv_1.pdf': '9599454787',
    'Naveen_N_6a22aa3664150.pdf': '8925748986'
  };

  const files = fs.readdirSync(resDir).filter(file => file.toLowerCase().endsWith('.pdf'));
  const contacts = [];

  for (const file of files) {
    const filePath = path.join(resDir, file);
    try {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);
      const text = data.text;

      // Extract phone number: look for 10 digits, possibly with +91 or 91
      const phoneRegex = /(?:\+91|91)?[-.\s]?([6-9]\d{9})/g;
      let match;
      let phone = null;
      while ((match = phoneRegex.exec(text)) !== null) {
        if (!phone) {
          phone = match[1]; // Get the first 10 digit match
        }
      }

      if (!phone && manualOverrides[file]) {
        phone = manualOverrides[file];
      }

      // Extract email
      const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
      let emailMatch;
      let email = null;
      while ((emailMatch = emailRegex.exec(text)) !== null) {
        if (!email) {
          email = emailMatch[1];
        }
      }

      // Try to guess name from filename
      let name = file.replace('.pdf', '');
      name = name.replace(/^[0-9a-f]+_/i, ''); // remove hex prefix
      name = name.replace(/_resume|_cv|resume|cv/gi, ''); // remove resume/cv words
      name = name.replace(/[-_]/g, ' '); // replace dashes/underscores with spaces
      name = name.trim();
      if (name.length === 0) name = 'Candidate';
      // Capitalize first letters
      name = name.replace(/\b\w/g, l => l.toUpperCase());

      if (phone || email) {
        contacts.push({ name, phone: phone || 'N/A', email: email || 'N/A', file });
      } else {
        console.log(`Could not find phone or email in: ${file}`);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }

  // Generate CSV
  let csvContent = 'Name,Phone,Email,Filename\n';
  contacts.forEach(c => {
    csvContent += `"${c.name}","${c.phone}","${c.email}","${c.file}"\n`;
  });
  fs.writeFileSync(csvFile, csvContent);

  const validEmails = contacts.filter(c => c.email !== 'N/A').map(c => c.email);
  
  // Create batches of 20 emails
  const batches = [];
  for (let i = 0; i < validEmails.length; i += 20) {
    batches.push(validEmails.slice(i, i + 20));
  }

  // Generate HTML Dashboard
  let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hostinger Bulk Mail Dashboard</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background: #f3f4f6; }
    h1 { color: #111827; }
    .card { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .section { margin-bottom: 15px; }
    label { font-weight: bold; color: #374151; display: block; margin-bottom: 5px; }
    textarea, input { width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 4px; font-family: monospace; margin-bottom: 10px; box-sizing: border-box; }
    .btn-copy { background: #6366f1; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-weight: bold; }
    .btn-copy:hover { background: #4f46e5; }
    .instructions { background: #e0e7ff; padding: 15px; border-radius: 8px; margin-bottom: 20px; color: #3730a3; border-left: 4px solid #4338ca; }
  </style>
  <script>
    function copyText(id, btn) {
      const text = document.getElementById(id).value;
      navigator.clipboard.writeText(text);
      const oldText = btn.innerText;
      btn.innerText = "Copied! ✅";
      setTimeout(() => btn.innerText = oldText, 2000);
    }
  </script>
</head>
<body>
  <h1>Hostinger Webmail / Outlook Web Dashboard</h1>
  <div class="instructions">
    <strong>How to use this for Hostinger Webmail:</strong>
    <ol>
      <li>Open your Hostinger Webmail and click <strong>Compose</strong>.</li>
      <li>Put <code>hr@vervenovatech.com</code> in the <strong>To</strong> field.</li>
      <li>Copy the BCC list from a Batch below and paste it into the <strong>BCC</strong> field. (Max 20 per batch to avoid spam limits!)</li>
      <li>Copy the Subject and Message Body and click Send. Repeat for the next batch.</li>
    </ol>
  </div>
  
  <div class="card">
    <h3>✉️ Email Content (Same for all batches)</h3>
    <div class="section">
      <label>Subject Line</label>
      <input type="text" id="subject-text" value="${emailSubject}" readonly>
      <button class="btn-copy" onclick="copyText('subject-text', this)">Copy Subject</button>
    </div>
    <div class="section">
      <label>Message Body</label>
      <textarea id="body-text" rows="22" readonly>${emailBody}</textarea>
      <button class="btn-copy" onclick="copyText('body-text', this)">Copy Message Body</button>
    </div>
  </div>

  <h2>📦 Batched Candidates (${validEmails.length} total)</h2>
`;

  batches.forEach((batch, index) => {
    const bccString = batch.join(',');
    htmlContent += `
  <div class="card">
    <h3>Batch ${index + 1} (${batch.length} Candidates)</h3>
    <div class="section">
      <label>BCC Emails</label>
      <textarea id="batch-${index}" rows="3" readonly>${bccString}</textarea>
      <button class="btn-copy" onclick="copyText('batch-${index}', this)">Copy BCC List</button>
    </div>
  </div>`;
  });

  htmlContent += `
  <h2>📱 WhatsApp Candidates (Girls Only)</h2>
  <div id="whatsapp-list">
  `;

  // Smarter guess for girls
  const hardcodedFemaleNames = /arunthathi|aarna|akalya|amruta|anushka|arpita|asiya|bebee|benasir|chanchal|dhiviya|damini|darshini|dipanshi|divya|jagni|janhavi|jayasri|kaveri|kirti|katha|manasa|rajeshwari|pinki|poorvika|prachi|rahini|rani|reshu|rayeesa|rimjhim|saisree|sanjana|swati|sarada|shabnam|sharmila|shifnal|shravani|shreya|shruti|sreedarshini/i;

  let whatsappCount = 0;
  contacts.forEach(c => {
    const firstName = c.name.split(' ')[0].toLowerCase();
    const isGirl = hardcodedFemaleNames.test(firstName) || 
                   firstName.endsWith('a') || 
                   firstName.endsWith('i') || 
                   firstName.endsWith('y') || 
                   firstName.endsWith('ee');

    if (isGirl && c.phone !== 'N/A') {
      whatsappCount++;
      const whatsappMessage = emailBody.replace('Hello Candidate', `Hello ${c.name}`);
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappLink = `https://wa.me/91${c.phone}?text=${encodedMessage}`;
      
      htmlContent += `
      <div class="card" style="display:flex; justify-content:space-between; align-items:center;">
        <div class="info">
          <strong style="display:block; color:#374151; font-size:16px;">${c.name}</strong>
          <span style="color:#6b7280; font-size:14px;">+91 ${c.phone} | File: ${c.file}</span>
        </div>
        <a href="${whatsappLink}" target="_blank" class="btn-copy" style="background:#25D366; text-decoration:none;">Send WhatsApp</a>
      </div>`;
    }
  });

  if (whatsappCount === 0) {
    htmlContent += `<p>No female candidates matched for WhatsApp.</p>`;
  }

  htmlContent += `
  </div>
</body>
</html>`;

  fs.writeFileSync(htmlFile, htmlContent);

  console.log(`Successfully processed ${files.length} PDFs. Found ${contacts.length} phone numbers.`);
  console.log(`Potential female candidates for WhatsApp: ${whatsappCount}`);
  console.log(`Saved CSV to ${csvFile}`);
  console.log(`Saved HTML Dashboard to ${htmlFile}`);
}

extractContacts();
