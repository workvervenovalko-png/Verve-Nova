const fs = require('fs');

const file = 'c:\\Users\\Lenovo\\Desktop\\Verve Nova\\frontend\\app\\admin\\page.tsx';
let content = fs.readFileSync(file, 'utf8');

// The exact string we want to replace:
const targetStart = `{app.status === 'Interviewing' && (
                                                                               <Button`;

// We will replace this start to wrap it in the div container:
const replacementStart = `{app.status === 'Interviewing' && (
                                                                             <div className="flex flex-col gap-2 mt-2">
                                                                               <Button`;

content = content.replace(targetStart, replacementStart);

// Now find the end of the button
const targetEnd = `Send Invite
                                                                               </Button>
                                                                         )}`;

const replacementEnd = `Send Invite
                                                                               </Button>
                                                                               <Button
                                                                                   disabled={!app.interviewLink || !app.personal?.phone}
                                                                                   onClick={() => {
                                                                                       const timeInput = document.getElementById(\`time-\${app._id}\`) as HTMLInputElement;
                                                                                       const linkInput = document.getElementById(\`link-\${app._id}\`) as HTMLInputElement;
                                                                                       
                                                                                       const timeVal = timeInput?.value || app.interviewTime;
                                                                                       const linkVal = linkInput?.value || app.interviewLink;
                                                                                       
                                                                                       if (!app.personal?.phone) {
                                                                                           import("sonner").then(m => m.toast.error("Candidate phone number missing!"));
                                                                                           return;
                                                                                       }
                                                                                       
                                                                                       const phoneStr = app.personal.phone.replace(/\\D/g, '');
                                                                                       const formattedPhone = phoneStr.length === 10 ? \`91\${phoneStr}\` : phoneStr;
                                                                                       
                                                                                       const text = \`Hi \${app.personal.fullName || 'there'},\\n\\nThis is a reminder from Verve Nova Technologies regarding your \${app.roleSlug === 'campus-ambassador' ? 'Campus Ambassador' : 'Internship'} interview scheduled at \${timeVal}.\\n\\nPlease join 5 minutes early using the following link:\\n\${linkVal}\\n\\nBest of luck!\`;
                                                                                       
                                                                                       const waUrl = \`https://wa.me/\${formattedPhone}?text=\${encodeURIComponent(text)}\`;
                                                                                       window.open(waUrl, '_blank');
                                                                                   }}
                                                                                   className="h-10 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all w-full"
                                                                               >
                                                                                   <MessageCircle className="w-3 h-3 mr-2" />
                                                                                   WhatsApp Reminder
                                                                               </Button>
                                                                             </div>
                                                                         )}`;

content = content.replace(targetEnd, replacementEnd);

fs.writeFileSync(file, content);
console.log("Success! Button Injected.");
