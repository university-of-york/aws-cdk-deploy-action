module.exports = {
    '*.{yml,yaml}': ['prettier --write', 'xo'],
    '!(*dist).js': ['prettier --write', 'xo'],
    '*.{json,md}': 'prettier --write',
    'package.json': ['prettier --write', 'sort-package-json'],
    './index.js': ['ncc build', 'git add dist/index.js'],
};
