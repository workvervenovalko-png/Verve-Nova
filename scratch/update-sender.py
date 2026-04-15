import os
import glob

# Path to search for .ts, .tsx files
search_dir = r"c:\Users\Lenovo\Desktop\Verve Nova\frontend\app\**\*.ts*"
files = glob.glob(search_dir, recursive=True)

# Also check other potential folders
search_dir_api = r"c:\Users\Lenovo\Desktop\Verve Nova\frontend\app\api\**\*.ts*"
files.extend(glob.glob(search_dir_api, recursive=True))

search_dir_actions = r"c:\Users\Lenovo\Desktop\Verve Nova\frontend\app\actions\**\*.ts"
files.extend(glob.glob(search_dir_actions, recursive=True))

# Make sure we don't duplicate files
files = list(set(files))

count = 0
for file_path in files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        modified = False
        if "from: 'Verve Nova <" in content:
            content = content.replace("from: 'Verve Nova <", "from: 'Verve Nova Tech <")
            modified = True
        if 'from: "Verve Nova <' in content:
            content = content.replace('from: "Verve Nova <', 'from: "Verve Nova Tech <')
            modified = True
            
        if modified:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated sender name in: {file_path}")
            count += 1
    except Exception as e:
        print(f"Error reading {file_path}: {e}")

print(f"Total files updated: {count}")
