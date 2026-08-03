from pathlib import Path
import re

root = Path(r'.')
pattern = re.compile(r'(?s)<div class="footer-social">.*?</div>')
button = '<div class="footer-social">\n  <a href="https://ko-fi.com/hypnos23" target="_blank" style="display:inline-block; background-color:#FF5E5B; color:white; padding:8px 18px; border-radius:25px; text-decoration:none; font-size:13px; opacity:0.85;">\n    ☕ Buy me a coffee\n  </a>\n</div>'

updated = []
for path in sorted(root.rglob('*.html')):
    try:
        text = path.read_text(encoding='utf-8')
    except Exception:
        continue
    if 'ko-fi.com/hypnos23' in text:
        continue
    if '<div class="footer-social">' not in text:
        continue
    new_text = pattern.sub(button, text, count=1)
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        updated.append(str(path))

print(f'Updated {len(updated)} files')
for p in updated:
    print(p)
