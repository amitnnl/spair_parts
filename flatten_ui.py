import os
import re

directories_to_scan = [
    r"c:\xampp\htdocs\spairparts\src\views",
    r"c:\xampp\htdocs\spairparts"
]

files_to_process = []
for directory in directories_to_scan:
    if directory.endswith('views'):
        for filename in os.listdir(directory):
            if filename.endswith(".js"):
                files_to_process.append(os.path.join(directory, filename))
    else:
        files_to_process.append(os.path.join(directory, "index.html"))
        files_to_process.append(os.path.join(directory, "src", "main.js"))

# 1. Remove rounded corners
# Match rounded-sm, rounded-md, rounded-lg, rounded-xl, rounded-2xl, rounded-3xl, rounded-full, rounded
# But be careful not to match rounded-none since it's already correct.
rounded_pattern = re.compile(r'\brounded-(sm|md|lg|xl|2xl|3xl|full)\b')
rounded_bare_pattern = re.compile(r'\brounded\b(?!\-)')

# 2. Fix Input Fonts
# Replace text-xs font-black text-slate-700 (or similar tiny thick fonts inside inputs) with readable fonts
input_font_pattern = re.compile(r'\btext-xs\s+font-black\s+text-slate-700\b')

# 3. Lighten Dark Backgrounds on large containers
# Replace bg-bosch-blue on container divs. 
# We don't want to replace buttons! Buttons usually have 'bg-bosch-blue hover:'.
# A simple heuristic: if bg-bosch-blue is followed by text-white, it might be a button or a banner.
# Let's use a very careful approach for background colors manually if needed, but the user said "dont have the background color".
# Let's replace "bg-slate-900" with "bg-slate-50"
# "bg-bosch-blue" -> "bg-white" ONLY if it's not a button? The user's request: "the login or register page was dont have the background color".
# We already fixed login/register!
# Are there other pages with big bg-bosch-blue? 
# In dashboard.js, admin.js there might be headers. I'll just focus on rounded corners and fonts first in this script.

files_modified = 0

for filepath in files_to_process:
    if not os.path.exists(filepath): continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original_content = content
    
    # Apply rounded corner replacements
    content = rounded_pattern.sub('rounded-none', content)
    content = rounded_bare_pattern.sub('rounded-none', content)
    
    # Apply font replacements
    content = input_font_pattern.sub('text-sm font-medium text-slate-900 font-sans', content)
    
    # Change any text-xs font-black to text-sm font-bold globally if it's text-xs font-black text-slate-500 ?
    # Let's leave other text alone unless it's the specific input font.
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")
        files_modified += 1

print(f"Processed {len(files_to_process)} files. Modified {files_modified} files.")
