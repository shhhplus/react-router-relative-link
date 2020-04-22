const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const { rollup } = require('rollup');
const { entryFolder, packageFolder } = require('./paths');
const config = require('./rollup.config.js');
const originalPackageInfo = require(path.join(process.cwd(), 'package.json'));

const removePackageFolder = async () => {
  await new Promise((resolve, reject) => {
    rimraf(packageFolder, err => {
      err ? reject() : resolve();
    });
  });
};

const bundle = async () => {
  const bundle = await rollup(config);
  await bundle.write({
    file: path.join(packageFolder, 'index.js'),
    format: 'cjs',
    sourcemap: true,
  });
};

const createPackageDotJson = async () => {
  const filePath = path.join(packageFolder, 'package.json');
  const obj = [
    'name',
    'version',
    'description',
    'homepage',
    'main',
    'license',
    'keywords',
    'author',
    'bugs',
    'repository',
    'dependencies',
  ].reduce((acc, cur) => {
    let value = originalPackageInfo[cur];
    if (cur === 'name') {
      value = `@shhhplus/${value}`;
    }
    return {
      ...acc,
      [cur]: value,
    };
  }, {});
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2));
};

const createReadme = async () => {
  const src = path.join(process.cwd(), 'README.md');
  const dest = path.join(packageFolder, 'README.md');
  fs.copyFileSync(src, dest);
};

const createType = async () => {
  const src = path.join(entryFolder, 'index.d.ts');
  const dest = path.join(packageFolder, 'index.d.ts');
  fs.copyFileSync(src, dest);
};

(async () => {
  console.log('begin');
  await removePackageFolder();
  await bundle();
  await createPackageDotJson();
  await createReadme();
  await createType();
  console.log('end');
})();
