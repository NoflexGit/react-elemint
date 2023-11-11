import Handlebars from 'handlebars';

Handlebars.registerHelper('className', function (useCssModules, cssClass) {
  if (useCssModules) {
    return `styles.${cssClass}`;
  }
  return `"${cssClass}"`;
});

Handlebars.registerHelper(
  'includeStyles',
  function (useCssModules, cssExtension) {
    if (useCssModules) {
      return `import styles from './${this.name}.${cssExtension}';`;
    }

    return `import './${this.name}.${cssExtension}';`;
  },
);
