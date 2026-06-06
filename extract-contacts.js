const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const resDir = path.join('C:', 'Users', 'Lenovo', 'Desktop', 'Verve Nova', 'ca');
const csvFile = path.join(resDir, 'contacts.csv');
const htmlFile = path.join(resDir, 'send-messages.html');

// Template message
const messageTemplate = `Hello {{candidate_full_name}},

Thank you for applying for the Campus Ambassador Program at Verve Nova Technologies. We love your enthusiasm to represent our brand!

While we have received your initial application, our official selection and onboarding process is exclusively conducted through our own careers portal.

What you need to do next: To move forward with your application and secure your spot, please submit your details directly on our official website.

Application Link: https://www.vervenovatech.com/careers/internships/campus-ambassador

(We have attached a quick PDF guide to this email that explains the step-by-step process of applying on our portal).

Pdf Link: https://drive.google.com/file/d/1sFXuFvmU651MsHPJsN9f34u9M-nLMvZo/view?usp=sharing

Our Selection Process: Once you apply on our website, your application will go through the following rounds:

Round 1: Profile & Leadership Screening (via Website).
Round 2: Final Telephonic / Virtual Interview.

Please complete this step as soon as possible so we can proceed with evaluating your profile and setting up your CA Dashboard.

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

      // Try to guess name from filename
      let name = file.replace('.pdf', '');
      name = name.replace(/^[0-9a-f]+_/i, ''); // remove hex prefix
      name = name.replace(/_resume|_cv|resume|cv/gi, ''); // remove resume/cv words
      name = name.replace(/[-_]/g, ' '); // replace dashes/underscores with spaces
      name = name.trim();
      if (name.length === 0) name = 'Candidate';
      // Capitalize first letters
      name = name.replace(/\b\w/g, l => l.toUpperCase());

      if (phone) {
        contacts.push({ name, phone, file });
      } else {
        console.log(`Could not find phone number in: ${file}`);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }

  // Generate CSV
  let csvContent = 'Name,Phone,Filename\n';
  contacts.forEach(c => {
    csvContent += `"${c.name}","${c.phone}","${c.file}"\n`;
  });
  fs.writeFileSync(csvFile, csvContent);

  // Generate HTML Dashboard
  let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verve Nova Bulk Messenger</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background: #f3f4f6; }
    h1 { color: #111827; }
    .card { background: white; padding: 15px; margin-bottom: 10px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .info strong { display: block; color: #374151; font-size: 16px; }
    .info span { color: #6b7280; font-size: 14px; }
    .btn { background: #25D366; color: white; padding: 8px 16px; text-decoration: none; border-radius: 6px; font-weight: bold; }
    .btn:hover { background: #128C7E; }
  </style>
</head>
<body>
  <h1>WhatsApp Messenger Dashboard</h1>
  <p>Total contacts found: ${contacts.length}</p>
  <div id="list">
`;

  contacts.forEach(c => {
    const customizedMessage = messageTemplate.replace('{{candidate_full_name}}', c.name);
    const encodedMessage = encodeURIComponent(customizedMessage);
    const whatsappLink = `https://wa.me/91${c.phone}?text=${encodedMessage}`;
    
    htmlContent += `
    <div class="card">
      <div class="info">
        <strong>${c.name}</strong>
        <span>+91 ${c.phone} | File: ${c.file}</span>
      </div>
      <a href="${whatsappLink}" target="_blank" class="btn">Send WhatsApp</a>
    </div>`;
  });

  htmlContent += `
  </div>
</body>
</html>`;

  fs.writeFileSync(htmlFile, htmlContent);

  console.log(`Successfully processed ${files.length} PDFs. Found ${contacts.length} phone numbers.`);
  console.log(`Saved CSV to ${csvFile}`);
  console.log(`Saved HTML Dashboard to ${htmlFile}`);
}

extractContacts();
