const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const root = path.resolve(__dirname, '..');
const manifests = {};
function attr(n,k){const a=n.openingElement.attributes.find(a=>a.name?.name===k);return a?.value?.value||a?.value?.expression?.name;}
function content(n){if(!n)return '';if(n.type==='JSXText')return n.value.trim();if(n.type==='StringLiteral')return n.value;if(n.type==='TemplateLiteral')return n.quasis.map(q=>q.value.cooked).join('');if(n.type==='JSXExpressionContainer')return content(n.expression);return (n.children||[]).map(content).filter(Boolean).join(' ');}
for(const name of fs.readdirSync(root+'/docs/design-context')){
 const code=fs.readFileSync(root+'/docs/design-context/'+name,'utf8').split('\nSUPER CRITICAL:')[0];
 const ast=parser.parse(code,{sourceType:'module',plugins:['jsx']});const section=name.replace('.txt','');const assets={};const slots=[];const texts=[];
 traverse(ast,{VariableDeclarator(p){if(p.node.init?.type==='StringLiteral' && p.node.init.value.startsWith('https://'))assets[p.node.id.name]=p.node.init.value;},JSXElement(p){const n=p.node;const id=attr(n,'data-node-id');if(n.openingElement.name.name==='img'){let a=p.parentPath;let owner;while(a){if(a.node.type==='JSXElement'&&attr(a.node,'data-node-id')){owner=a.node;break;}a=a.parentPath;}slots.push({asset:attr(n,'src'),node:id||attr(owner,'data-node-id'),className:attr(n,'className'),slot:attr(owner,'className')});}if(id&&attr(n,'className')?.includes('font-['))texts.push({id,text:content(n),className:attr(n,'className')});}});
 manifests[section]={assets,slots,texts};
}
fs.writeFileSync(root+'/docs/asset-manifest.json',JSON.stringify(manifests,null,2));
console.log(Object.fromEntries(Object.entries(manifests).map(([s,x])=>[s,{assets:Object.keys(x.assets).length,texts:x.texts.length}])));
