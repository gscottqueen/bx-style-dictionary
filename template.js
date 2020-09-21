const StyleDictionary = require('style-dictionary').extend('./config.json');

// custom css variables output for storybook use
// we need to give our var sheets a custom comment for the presenation assingnment
function customSectionHeader(options) {
  let customHeader = '';

  customHeader += '\/**\n'
  customHeader += `* @tokens ${options.storyTokenName}\n`
  customHeader += `* @presenter ${options.storyTokenPresenter}\n`
  customHeader += '*\/\n'

  return customHeader;
}

// cloned from formats.js
function variablesWithPrefix(prefix, properties, commentStyle) {
  return properties.map(function (prop) {
    var to_ret_prop = prefix + prop.name + ': ' + (prop.attributes.category === 'asset' ? '"' + prop.value + '"' : prop.value) + ';';

    if (prop.comment) {
      if (commentStyle === 'short') {
        to_ret_prop = to_ret_prop.concat(' // ' + prop.comment);
      } else {
        to_ret_prop = to_ret_prop.concat(' /* ' + prop.comment + ' */');
      }
    }

    return to_ret_prop;
  })
    .filter(function (strVal) { return !!strVal })
    .join('\n');
}

StyleDictionary.registerFormat({
  name: 'storybook_tokens',
  formatter: function (dictionary, config) {
    return customSectionHeader(config.customSectionHeader) +
      ':root {\n' +
      variablesWithPrefix('  --', dictionary.allProperties) +
      '\n}\n';
  }
})

StyleDictionary.buildAllPlatforms();
