const workboxBuild = require('workbox-build');
// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () =>
  // This will return a Promise
  workboxBuild
    .injectManifest({
      swSrc: 'src/sw-template.js',
      swDest: 'build/sw.js',
      globDirectory: 'build',
      globPatterns: ['**/*.{js,css,html,png}']
    })
    .then(({ count, size, warnings }) => {
      // Optionally, log any warnings and details.
      // eslint-disable-next-line no-console
      warnings.forEach(console.warn);
      // eslint-disable-next-line no-console
      console.log(`${count} files will be precached, totaling ${size} bytes.`);
    });
buildSW();
