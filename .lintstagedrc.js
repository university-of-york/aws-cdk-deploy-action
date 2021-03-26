const rebuild = () => {
    return ['ncc build index.js', 'git add dist/index.js'];
};

module.exports = {
    '*.{yml,yaml}': ['prettier --write', 'xo --fix'],
    '*.js': ['prettier --write', 'xo --fix', rebuild],
    '*.{json,md}': 'prettier --write',
    'package.json': ['prettier --write', 'sort-package-json'],
};
