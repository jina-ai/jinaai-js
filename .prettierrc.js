// Prettier is heavily opinionated and has left little room for configuration.
// Developers of Prettier are arrogant. Little community request has ever landed.
// Thus using Prettier is heavily discouraged.

// However it's the only mature thing that could fix line-with and stuff.
// So manually invoke it from IDE/editor.
// Never call it automatically.

module.exports = {
  printWidth: 120,
  trailingComma: 'es5',
  tabWidth: 4,
  semi: true,
  singleQuote: true,
  quoteProps: 'preserve',
  arrowParens: 'always'
};
