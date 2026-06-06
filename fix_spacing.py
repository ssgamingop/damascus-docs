import os
import re

dirs = ['00-Vision', '01-Research', '02-Architecture', '03-Implementation']

for d in dirs:
    if not os.path.exists(d): continue
    for root, _, files in os.walk(d):
        for f in files:
            if f.endswith('.md'):
                filepath = os.path.join(root, f)
                with open(filepath, 'r') as file:
                    content = file.read()
                
                # Normalize newlines: limit consecutive newlines to exactly 2 (which means 1 blank line)
                new_content = re.sub(r'\n{3,}', '\n\n', content)
                
                if content != new_content:
                    with open(filepath, 'w') as file:
                        file.write(new_content)
                    print(f"Fixed spacing in {filepath}")
