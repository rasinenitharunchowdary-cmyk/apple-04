"""Download the exact asset URLs supplied by Figma's design-context export."""
import concurrent.futures, json, pathlib, subprocess, hashlib
root=pathlib.Path(__file__).resolve().parent.parent
manifest=json.loads((root/'docs/asset-manifest.json').read_text())
jobs=[(section,key,url) for section,data in manifest.items() for key,url in data['assets'].items()]
def download(job):
 section,key,url=job
 dest=root/'assets'/f'{section}-{key}{pathlib.Path(url).suffix}'
 if not dest.exists() or dest.stat().st_size==0:
  subprocess.run(["curl","-fL","--retry","3","--silent","--show-error",url,"-o",str(dest)],check=True)
 if dest.stat().st_size==0: raise RuntimeError(str(dest))
 return {'key':f'{section}/{key}','file':dest.name,'bytes':dest.stat().st_size,'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()}
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool: result=list(pool.map(download,jobs))
(root/'docs/assets.json').write_text(json.dumps(result,indent=2))
(root/'shared/assets.ts').write_text('/* Original Figma assets, bundled locally. */\nexport const assets = '+json.dumps({x['key']:x['file'] for x in result},indent=2)+' as const;\nexport type AssetKey = keyof typeof assets;\n')
(root/'mobile/assets.ts').write_text('/* Static requires allow Metro to bundle every image offline. */\nexport const nativeAssets: Record<string, number> = {\n'+''.join(f'  {json.dumps(x["key"])}: require("../assets/{x["file"]}"),\n' for x in result if x['file'].endswith('.png'))+'};\n')
print(f'Downloaded and hashed {len(result)} assets, {sum(x["bytes"] for x in result):,} bytes')
