const fs = require('fs');

const name = process.argv[2].replace(/^\w/, function(chr) {
  return chr.toUpperCase();
});
const dir = `./app/components/${name}`;

const write = (path, content) => {
  fs.writeFileSync(
    path,
    content.replace(/^ {2}/gm, '').replace(/^ *\n/, ''),
    'utf-8'
  );
};

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const index = `
  import './${name}.scss';
  
  export * from './${name}';
  `;

const reactComponent = `
import React from 'react';
  
  export function ${name}() {
    return (
      <div className="${name
        .split(/(?=[A-Z])/)
        .map(str => str.toLocaleLowerCase())
        .join('-')}"></div>
    );
  }
  `;

const scss = '';

write(`${dir}/index.ts`, index);
write(`${dir}/${name}.tsx`, reactComponent);
write(`${dir}/${name}.scss`, scss);
