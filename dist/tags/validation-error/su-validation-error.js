function onMounted(props, state) {
  this.update();
}

function onBeforeUpdate(props, state) {
  state.errors = props.errors || {};
  state.blockMessage = Object.keys(state.errors).length > 0 && !props.name;
}

var suValidationError = {
  'css': `su-validation-error.ui.error.message,[is="su-validation-error"].ui.error.message{ display: block !important; }`,

  'exports': {
    state: {
      errors: {}
    },

    onMounted,
    onBeforeUpdate
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<div expr97="expr97" class="ui basic pointing prompt label transition visible"></div><ul expr99="expr99" class="list"></ul>',
      [{
        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return scope.state.blockMessage ? 'ui error message' : '';
          }
        }]
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return scope.state.errors[scope.props.name];
        },

        'redundantAttribute': 'expr97',
        'selector': '[expr97]',

        'template': template('<div expr98="expr98"></div>', [{
          'type': bindingTypes.EACH,
          'getKey': null,
          'condition': null,

          'template': template(' ', [{
            'expressions': [{
              'type': expressionTypes.TEXT,
              'childNodeIndex': 0,

              'evaluate': function(scope) {
                return scope.message;
              }
            }]
          }]),

          'redundantAttribute': 'expr98',
          'selector': '[expr98]',
          'itemName': 'message',
          'indexName': null,

          'evaluate': function(scope) {
            return scope.state.errors[scope.props.name];
          }
        }])
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return scope.state.blockMessage;
        },

        'redundantAttribute': 'expr99',
        'selector': '[expr99]',

        'template': template('<template expr100="expr100"></template>', [{
          'type': bindingTypes.EACH,
          'getKey': null,
          'condition': null,

          'template': template('<li expr101="expr101"></li>', [{
            'type': bindingTypes.EACH,
            'getKey': null,
            'condition': null,

            'template': template(' ', [{
              'expressions': [{
                'type': expressionTypes.TEXT,
                'childNodeIndex': 0,

                'evaluate': function(scope) {
                  return scope.message;
                }
              }]
            }]),

            'redundantAttribute': 'expr101',
            'selector': '[expr101]',
            'itemName': 'message',
            'indexName': null,

            'evaluate': function(scope) {
              return scope.errors;
            }
          }]),

          'redundantAttribute': 'expr100',
          'selector': '[expr100]',
          'itemName': 'errors',
          'indexName': null,

          'evaluate': function(scope) {
            return Object.values(scope.state.errors);
          }
        }])
      }]
    );
  },

  'name': 'su-validation-error'
};

export default suValidationError;
