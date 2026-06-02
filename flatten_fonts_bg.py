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

files_modified = 0

# Replace text-xs font-black with text-sm font-medium text-slate-900 font-sans specifically on inputs, textareas, and selects
def replace_inputs(match):
    tag_content = match.group(0)
    # If it has class="...", we modify the class attribute
    if 'class="' in tag_content:
        # replace text-xs with text-sm, font-black with font-medium, text-slate-700 with text-slate-900
        new_tag = re.sub(r'\btext-[a-z0-9]+\b', 'text-sm', tag_content)
        new_tag = re.sub(r'\bfont-(black|bold|semibold)\b', 'font-medium', new_tag)
        new_tag = re.sub(r'\btext-slate-[0-9]+\b', 'text-slate-900', new_tag)
        if 'font-sans' not in new_tag:
            new_tag = new_tag.replace('class="', 'class="font-sans ')
        return new_tag
    return tag_content

# Regex to match whole input/select/textarea tags
tag_pattern = re.compile(r'<(input|select|textarea)[^>]*>')

# Lighten backgrounds for sections, divs
# We don't want to replace buttons, so we only replace bg-slate-900 if it's on a section or div without text-white (or if we remove text-white).
# Actually, the user asked to lighten the backgrounds.
# Let's replace class="... bg-slate-900 ... text-white ..." with class="... bg-slate-50 ... text-slate-900 ..." 
# ONLY if the tag is <section or <div and not a button.
bg_div_pattern = re.compile(r'<(section|div)[^>]*class="[^"]*bg-slate-900[^"]*"[^>]*>')

def replace_bg(match):
    tag_content = match.group(0)
    # Check if it has an opacity modifier like bg-slate-900/40 or bg-slate-900/60 (modal backdrops)
    if re.search(r'bg-slate-900/\d+', tag_content):
        return tag_content # Don't touch modals!
        
    # Replace bg-slate-900 with bg-slate-50
    tag_content = tag_content.replace('bg-slate-900', 'bg-slate-50')
    # Replace text-white with text-slate-900 so it's readable
    tag_content = tag_content.replace('text-white', 'text-slate-900')
    return tag_content

for filepath in files_to_process:
    if not os.path.exists(filepath): continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original_content = content
    
    content = tag_pattern.sub(replace_inputs, content)
    content = bg_div_pattern.sub(replace_bg, content)
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")
        files_modified += 1

print(f"Processed {len(files_to_process)} files. Modified {files_modified} files.")
