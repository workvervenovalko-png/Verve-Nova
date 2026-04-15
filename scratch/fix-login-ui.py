import os
import re

file_path = r"c:\Users\Lenovo\Desktop\Verve Nova\frontend\app\careers\auth\page.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add authError state
if 'const [authError,' not in content:
    content = content.replace(
        'const [isLoading, setIsLoading] = useState(false);',
        'const [isLoading, setIsLoading] = useState(false);\n  const [authError, setAuthError] = useState<string | null>(null);'
    )

# 2. Reset error in handleAuth
if 'setAuthError(null);' not in content:
    content = content.replace('e.preventDefault();', 'e.preventDefault();\n    setAuthError(null);')

# 3. Update catch block
catch_pattern = r'\} catch \(error: any\) \{\s*toast\.error\(error\.message \|\| "An authentication error occurred\."\);\s*\}'
new_catch = '} catch (error: any) {\n      console.error("AUTH_ERROR_LOG:", error.message);\n      setAuthError(error.message);\n      toast.error(error.message || "An authentication error occurred.");\n    }'
content = re.sub(catch_pattern, new_catch, content)

# 4. Add XCircle to imports
if 'XCircle' not in content:
    content = content.replace('X,', 'X, XCircle,')
    # If X, not found, try another
    if 'XCircle' not in content:
        content = content.replace('Clock,', 'Clock, XCircle,')

# 5. Insert Error Display Block
# We look for the closing of the form's input container
error_block = """
                        <AnimatePresence>
                          {authError && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 overflow-hidden mt-4"
                            >
                              <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-red-200 leading-none">{authError}</span>
                            </motion.div>
                          )}
                        </AnimatePresence>"""

if 'authError && (' not in content:
    # Anchor: insert before the Submit Button
    content = content.replace('<Button', error_block + '\n\n                        <Button')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Login UI fix applied via Python script.")
