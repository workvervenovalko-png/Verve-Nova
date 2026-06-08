const fs = require('fs');

const file = 'c:\\Users\\Lenovo\\Desktop\\Verve Nova\\frontend\\app\\admin\\page.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `{app.status === 'Interviewing' && (
                                                                               <Button
                                                                                    disabled={!app.interviewDate || isSubmitting}
                                                                                    onClick={() => {
                                                                                        const timeInput = document.getElementById(\`time-\${app._id}\`) as HTMLInputElement;
                                                                                        const linkInput = document.getElementById(\`link-\${app._id}\`) as HTMLInputElement;
                                                                                        const emailInput = document.getElementById(\`email-\${app._id}\`) as HTMLInputElement;
                                                                                        
                                                                                        const timeVal = timeInput?.value || app.interviewTime;
                                                                                        const linkVal = linkInput?.value || app.interviewLink;
                                                                                        const emailVal = emailInput?.value || app.interviewerEmails?.join(', ');

                                                                                        if (!linkVal || !timeVal) {
                                                                                            toast.error("Please provide both time and link.");
                                                                                            return;
                                                                                        }
                                                                                        
                                                                                        setInterview(app._id, app.interviewDate, timeVal, linkVal, emailVal, true);
                                                                                    }}
                                                                                    className="h-10 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/30 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all w-full mt-2"
                                                                               >
                                                                                    {isSubmitting ? <VNTLoader size="sm" /> : <Mail className="w-3 h-3 mr-2" />}
                                                                                    Send Invite
                                                                               </Button>
                                                                         )}`;

const replacement = `{app.status === 'Interviewing' && (
                                                                             <div className="flex flex-col gap-2 mt-2">
                                                                               <Button
                                                                                    disabled={!app.interviewDate || isSubmitting}
                                                                                    onClick={() => {
                                                                                        const timeInput = document.getElementById(\`time-\${app._id}\`) as HTMLInputElement;
                                                                                        const linkInput = document.getElementById(\`link-\${app._id}\`) as HTMLInputElement;
                                                                                        const emailInput = document.getElementById(\`email-\${app._id}\`) as HTMLInputElement;
                                                                                        
                                                                                        const timeVal = timeInput?.value || app.interviewTime;
                                                                                        const linkVal = linkInput?.value || app.interviewLink;
                                                                                        const emailVal = emailInput?.value || app.interviewerEmails?.join(', ');

                                                                                        if (!linkVal || !timeVal) {
                                                                                            toast.error("Please provide both time and link.");
                                                                                            return;
                                                                                        }
                                                                                        
                                                                                        setInterview(app._id, app.interviewDate, timeVal, linkVal, emailVal, true);
                                                                                    }}
                                                                                    className="h-10 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/30 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all w-full"
                                                                               >
                                                                                    {isSubmitting ? <VNTLoader size="sm" /> : <Mail className="w-3 h-3 mr-2" />}
                                                                                    Send Invite
                                                                               </Button>
                                                                               <Button
                                                                                   disabled={!app.interviewLink || !app.personal?.phone}
                                                                                   onClick={() => {
                                                                                       const timeInput = document.getElementById(\`time-\${app._id}\`) as HTMLInputElement;
                                                                                       const linkInput = document.getElementById(\`link-\${app._id}\`) as HTMLInputElement;
                                                                                       
                                                                                       const timeVal = timeInput?.value || app.interviewTime;
                                                                                       const linkVal = linkInput?.value || app.interviewLink;
                                                                                       
                                                                                       if (!app.personal?.phone) {
                                                                                           toast.error("Candidate phone number missing!");
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

content = content.replace(target, replacement);
fs.writeFileSync(file, content);
console.log("Done");
