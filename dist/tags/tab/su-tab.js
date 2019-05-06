function onMounted(props, state) {
  this.update();
}

function onUpdated(props, state) {
  if (state.active && !state.mounted) {
    state.mounted = true;
  }
}

var suTab = {
  'css': `su-tab.ui.segment,[is="su-tab"].ui.segment{
      margin-top: 0;
      margin-bottom: 0;
    } su-tab.ui.segment.top.attached,[is="su-tab"].ui.segment.top.attached{
      margin-top: 0
    } su-tab.ui.segment.bottom.attached,[is="su-tab"].ui.segment.bottom.attached{
      margin-bottom: 0
    }`,

  'exports': {
    state: {
      active: false,
      mounted: false,
    },

    onMounted,
    onUpdated
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<p expr32></p>', [{
      'expressions': [{
        'type': expressionTypes.ATTRIBUTE,
        'name': 'class',

        'evaluate': function(scope) {
          return ['ui ', scope.props.class, ' ', scope.state.active && 'active'].join('');
        }
      }]
    }, {
      'type': bindingTypes.IF,

      'evaluate': function(scope) {
        return scope.state.mounted;
      },

      'redundantAttribute': 'expr32',
      'selector': '[expr32]',
      'template': template('<slot></slot>', [])
    }]);
  },

  'name': 'su-tab'
};

export default suTab;
