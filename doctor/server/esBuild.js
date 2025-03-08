require('esbuild')
  .build({
    entryPoints: ['./dist/index.js'],
    bundle: true,
    platform: 'node',
    outfile: './bundle/index.js',
    external: ['mock-aws-s3', 'nock', 'aws-sdk'],
    loader: {
      '.html': 'file'
    },
    sourcemap: true,
    minify: true,
    target: ['esnext']
  })
  .then(() => console.log('Build complete'))
  .catch(() => process.exit(1));
