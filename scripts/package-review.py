"""Create portable review archives without dependencies or temporary Figma URLs."""
from pathlib import Path
import hashlib
import json
import zipfile

root = Path(__file__).resolve().parents[1]
out = root / 'review'
source_dirs = ['assets', 'shared', 'web', 'mobile', 'tests']
source_files = ['README.md', 'package.json', 'package-lock.json', '.gitignore',
                'docs/assets.json', 'docs/figma-apple-04.png', 'docs/figma-structure.xml',
                'review/QA.md', 'review/responsive.json', 'scripts/package-review.py']


def files_under(folder):
    return [p for p in (root / folder).rglob('*') if p.is_file()
            and not any(part in {'node_modules', '.expo', '.git', '.DS_Store'} for part in p.parts)]


def archive(name, files, prefix, relative_to):
    target = out / name
    with zipfile.ZipFile(target, 'w', zipfile.ZIP_DEFLATED) as z:
        for path in sorted(set(files)):
            z.write(path, str(Path(prefix) / path.relative_to(relative_to)))
    with zipfile.ZipFile(target) as z:
        assert z.testzip() is None
    return {'file': name, 'bytes': target.stat().st_size,
            'sha256': hashlib.sha256(target.read_bytes()).hexdigest()}


all_source = [root / path for path in source_files]
for folder in source_dirs + ['review/screenshots', 'review/logs']:
    all_source.extend(files_under(folder))
results = [archive('Apple-04-Project.zip', all_source, 'apple-04', root),
           archive('Apple-04-Web-Build.zip', files_under('web/dist'), '', root / 'web/dist'),
           archive('Apple-04-Mobile-Export.zip', files_under('mobile/dist'), '', root / 'mobile/dist')]
(out / 'checksums.json').write_text(json.dumps(results, indent=2) + '\n')
print(json.dumps(results, indent=2))
