const rebuild = () => {
    return ['ncc build index.js', 'git add dist/index.js'];
};

module.exports = {
    '*.{yml,yaml}': ['xo --fix', 'prettier --write'],
    '*.js': ['xo --fix', 'prettier --write', rebuild],
    '*.{json,md}': 'prettier --write',
    'package.json': ['prettier --write', 'sort-package-json'],
};
