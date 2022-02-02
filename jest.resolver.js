/**
CODE FROM: https://github.com/k-g-a/jest-node-exports-resolver/blob/master/index.js
Custom resolver to fix: https://github.com/facebook/jest/issues/9771
Looks to be not needed in Jest 28:  https://github.com/facebook/jest/issues/9771#issuecomment-944045526
*/

const fs = require('fs');
const path = require('path');
const nrwlResolver = require('@nrwl/jest/plugins/resolver');

function findMainPackageJson(entryPath, packageName) {
  entryPath = entryPath.replace(/\//g, path.sep);

  let directoryName = path.dirname(entryPath);
  while (directoryName && !directoryName.endsWith(packageName)) {
    const parentDirectoryName = path.resolve(directoryName, '..');

    if (parentDirectoryName === directoryName) break;

    directoryName = parentDirectoryName;
  }

  const suspect = path.resolve(directoryName, 'package.json');
  if (fs.existsSync(suspect)) {
    return JSON.parse(fs.readFileSync(suspect).toString());
  }

  return null;
}

function getSelfReferencePath(packageName) {
  let parentDirectoryName = __dirname;
  let directoryName;

  while (directoryName !== parentDirectoryName) {
    directoryName = parentDirectoryName;

    try {
      const { name } = require(path.resolve(directoryName, 'package.json'));

      if (name === packageName) return directoryName;
    } catch {}

    parentDirectoryName = path.resolve(directoryName, '..');
  }
}

function getPackageJson(packageName) {
  // Require `package.json` from the package, both from exported `exports` field
  // in ESM packages, or directly from the file itself in CommonJS packages.
  try {
    return require(`${packageName}/package.json`);
  } catch (requireError) {
    if (requireError.code !== 'ERR_PACKAGE_PATH_NOT_EXPORTED') {
      return; // This error appears with NX libs that are in a parent folder under the ./libs main folder. Silencing for now.
      return console.error(
        `Unexpected error while requiring ${packageName}:`,
        requireError
      );
    }
  }

  // modules's `package.json` does not provide the "./package.json" path at it's
  // "exports" field. Get package level export or main field and try to resolve
  // the package.json from it.
  try {
    const requestPath = require.resolve(packageName);

    return requestPath && findMainPackageJson(requestPath, packageName);
  } catch (resolveError) {
    if (resolveError.code !== 'ERR_PACKAGE_PATH_NOT_EXPORTED') {
      console.log(
        `Unexpected error while performing require.resolve(${packageName}):`
      );

      return console.error(resolveError);
    }
  }

  // modules's `package.json` does not provide a package level export nor main
  // field. Try to find the package manually from `node_modules` folder.
  const suspect = path.resolve(__dirname, '..', packageName, 'package.json');
  if (fs.existsSync(suspect)) {
    return JSON.parse(fs.readFileSync(suspect).toString());
  }

  // In a nrwl/nx (possibly all Typescript) projects, this error will fire off for all path aliases.
  // Silencing for now.

  // console.warn(
  //   'Could not retrieve package.json neither through require (package.json ' +
  //     'itself is not within "exports" field), nor through require.resolve ' +
  //     '(package.json does not specify "main" field) - falling back to default ' +
  //     'resolver logic' +
  //     '\n' +
  //     'packageName: ' +
  //     packageName +
  //     '\n' +
  //     'suspect: ' +
  //     suspect +
  //     '\n' +
  //     '__dirname: ' +
  //     __dirname +
  //     '\n'
  // );
}

function jestNodeExportsResolver(request, options) {
  let packageName = '';
  let submoduleName = '';

  // NOTE: jest-sequencer is a special prefixed jest request
  const isNodeModuleRequest = !(
    request.startsWith('.') ||
    request.startsWith('/') ||
    request.startsWith('jest-sequencer')
  );

  if (isNodeModuleRequest) {
    const pkgPathParts = request.split('/');
    const { length } = pkgPathParts;

    if (!request.startsWith('@')) {
      if (length > 1) {
        packageName = pkgPathParts[0];
        submoduleName = `./${pkgPathParts.slice(1).join('/')}`;
      }
    } else if (length > 2) {
      packageName = pkgPathParts.slice(0, 2).join('/');
      submoduleName = `./${pkgPathParts.slice(2).join('/')}`;
    }
  }

  if (packageName && submoduleName) {
    const selfReferencePath = getSelfReferencePath(packageName);
    if (selfReferencePath) packageName = selfReferencePath;

    const packageJson = getPackageJson(packageName);

    // Silencing error, as will fire for nrwl/nx projects. (possibly all typescript imports)
    // if (!packageJson) {
    //   console.error(`Failed to find package.json for ${packageName}`);
    // }

    const { exports } = packageJson || {};
    if (exports) {
      let targetFilePath;

      if (typeof exports === 'string') targetFilePath = exports;
      else if (Object.keys(exports).every((k) => k.startsWith('.'))) {
        const exportValue = exports[submoduleName];

        if (typeof exportValue === 'string') targetFilePath = exportValue;
        else if (exportValue !== null && typeof exportValue === 'object')
          for (const [key, value] of Object.entries(exportValue)) {
            if (key === 'import' || key === 'require') {
              if (typeof value === 'string') targetFilePath = value;
              else
                for (const [key2, value2] of Object.entries(value)) {
                  if (
                    key2 === 'node' ||
                    key2 === 'node-addons' ||
                    key2 === 'default'
                  ) {
                    targetFilePath = value2;
                    break;
                  }
                }

              break;
            }

            if (key === 'node') {
              if (typeof value === 'string') targetFilePath = value;
              else
                for (const [key2, value2] of Object.entries(value)) {
                  if (
                    key2 === 'import' ||
                    key2 === 'require' ||
                    key2 === 'node-addons' ||
                    key2 === 'default'
                  ) {
                    targetFilePath = value2;
                    break;
                  }
                }

              break;
            }

            if (key === 'node-addons') {
              if (typeof value === 'string') targetFilePath = value;
              else
                for (const [key2, value2] of Object.entries(value)) {
                  if (
                    key2 === 'import' ||
                    key2 === 'require' ||
                    key2 === 'node' ||
                    key2 === 'default'
                  ) {
                    targetFilePath = value2;
                    break;
                  }
                }

              break;
            }

            if (key === 'default') {
              if (typeof value === 'string') targetFilePath = value;
              else
                for (const [key2, value2] of Object.entries(value))
                  if (
                    key2 === 'import' ||
                    key2 === 'require' ||
                    key2 === 'node' ||
                    key2 === 'node-addons'
                  ) {
                    targetFilePath = value2;
                    break;
                  }

              break;
            }
          }
      }

      if (targetFilePath) {
        request = targetFilePath.replace('./', `${packageName}/`);
      }
    }
  }

  // return options.defaultResolver(request, options);  // Resolver to use not using nrwl/nx monorepo tooling
  return nrwlResolver(request, options);
}

module.exports = jestNodeExportsResolver;
