import os
import re

file_path = r"c:\Users\Lenovo\Desktop\Verve Nova\frontend\app\admin\page.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Ensure setInterview calls are correct
content = content.replace(
    'if (date) setInterview(app._id, date.toISOString(), app.interviewLink);',
    'if (date) setInterview(app._id, date.toISOString(), app.interviewLink, false);'
)

content = content.replace(
    'onBlur={(e) => setInterview(app._id, app.interviewDate, e.target.value)}',
    'onBlur={(e) => setInterview(app._id, app.interviewDate, e.target.value, false)}'
)

# 2. Insert Button via Regex to handle whitespace
button_code = """
                                                                        {app.status === 'Interviewing' && (
                                                                             <Button
                                                                                  disabled={!app.interviewDate || !app.interviewLink || isSubmitting}
                                                                                  onClick={() => setInterview(app._id, app.interviewDate, app.interviewLink, true)}
                                                                                  className="h-10 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/30 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all w-full mt-2"
                                                                             >
                                                                                  {isSubmitting ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <Mail className="w-3 h-3 mr-2" />}
                                                                                  Send Invite
                                                                             </Button>
                                                                        )}"""

# We look for the Globe icon and the closing div of its group
pattern = r'(<Globe[^>]+>\s*</div>)'
if re.search(pattern, content):
    content = re.sub(pattern, r'\1' + button_code, content)
    print("Button matching pattern found and replaced.")
else:
    print("Pattern not found. Alternative search...")
    # Try another way
    content = content.replace('placeholder="MEET LINK / URL"', 'placeholder="MEET LINK / URL" /* MARKER */')
    # This is getting messy, let's just do a direct append to the module div
    # Actually, let's just use the Input's parent div

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Patch attempt 2 finished.")
