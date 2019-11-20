let index = 0;

// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onMounted(props, state) {
  this.su_id = `su-modal-${index++}`;
  this.update();
  if (this.obs) {
    this.obs.on(`${this.su_id}-show`, () => {
      show(this);
    });
    this.obs.on(`${this.su_id}-hide`, () => {
      hide(this);
    });
  }
}

function onBeforeUpdate(props, state) {
  this.basic = this.root.classList.contains('basic');
  this.contentClass = getContentClass(this);

  if (props.modal) {
    this.closable = typeof props.modal.closable === 'undefined' || props.modal.closable;
    if (props.modal.header) {
      this.header = props.modal.header;
      this.headerClass = props.modal.header.icon ? 'icon' : '';
      this.title = props.modal.header.text ? props.modal.header.text : props.modal.header;
    }

    this.buttons = props.modal.buttons;
    this.buttons && this.buttons.forEach(button => {
      const classes = [];
      if (button.icon && button.text) classes.push('labeled');
      if (button.icon) classes.push('icon');
      if (this.basic) classes.push('inverted');
      if (button.disabled) classes.push('disabled');
      button.class = classes.join(' ');
    });
  }
}

// ===================================================================================
//                                                                              Events
//                                                                              ======
function onClickButton(item) {
  this.dispatch(item.action || item.text);
  if (typeof item.closable === 'undefined' || item.closable) {
    hide(this);
  }
}

function onClickDimmer() {
  if (this.closable && !this.basic) {
    hide(this);
  }
}

function onClickModal(event) {
  event.stopPropagation();
}

function onClickHide() {
  hide(this);
}

// ===================================================================================
//                                                                               Logic
//                                                                               =====
function show(tag) {
  if (tag.openning || tag.closing || tag.visible) {
    return
  }
  tag.openning = true;
  tag.state.transition = 'animating fade in visible';
  tag.dispatch('show');
  tag.update();
  setDefaultFocus(tag);

  setTimeout(() => {
    tag.openning = false;
    tag.visible = true;
    tag.update({
      transition: 'visible active'
    });
  }, 500);
}

function hide(tag) {
  if (tag.openning || tag.closing || !tag.visible) {
    return
  }
  tag.closing = true;
  tag.update({
    transition: 'animating fade out visible active'
  });
  tag.dispatch('hide');
  tag.update();

  setTimeout(() => {
    tag.closing = false;
    tag.visible = false;
    tag.update({
      transition: ''
    });
  }, 300);
}

function setDefaultFocus(tag) {
  if (!tag.buttons || tag.buttons.length == 0) {
    return
  }
  if (tag.buttons.some(button => button.default)) {
    const text = tag.buttons.filter(button => button.default)[0].text;
    tag.$(`[ref='button_${text}']`).focus();
  }
}

function getContentClass(tag) {
  const classes = [];
  if (tag.$('img')) {
    classes.push('image');
  }
  if (tag.root.classList.contains('scrolling')) {
    classes.push('scrolling');
  }
  return classes.join(' ')
}

var suModal = {
  'css': `su-modal .ui.dimmer.visible.transition,[is="su-modal"] .ui.dimmer.visible.transition{ display: flex !important; align-items: center; justify-content: center; } su-modal .ui.modal,[is="su-modal"] .ui.modal{ top: auto; left: auto; position: relative; margin: 0 !important; } su-modal .ui.fullscreen.modal,[is="su-modal"] .ui.fullscreen.modal{ left: 0 !important; } @media only screen and (min-width: 768px) { su-modal .ui.modal>.close,[is="su-modal"] .ui.modal>.close{ display: none; } su-modal .ui.fullscreen.modal>.close,[is="su-modal"] .ui.fullscreen.modal>.close{ display: inline; } }`,

  'exports': {
    state: {
      transition: '',
    },

    image_content: false,
    openning: false,
    closing: false,
    closable: true,
    visible: false,
    onMounted,
    onBeforeUpdate,
    onClickModal,
    onClickButton,
    onClickHide,
    onClickDimmer
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<div expr20="expr20"><div expr21="expr21"><i expr22="expr22" class="close icon"></i><div expr23="expr23"></div><div expr25="expr25"><slot expr26="expr26"></slot></div><div class="actions"><button expr27="expr27" type="button"></button></div></div></div>',
      [{
        'expressions': [{
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return scope.onClickDimmer;
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'id',

          'evaluate': function(scope) {
            return scope.su_id;
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return scope.props.class;
          }
        }]
      }, {
        'redundantAttribute': 'expr20',
        'selector': '[expr20]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['ui dimmer modals page transition ', scope.state.transition].join('');
          }
        }]
      }, {
        'redundantAttribute': 'expr21',
        'selector': '[expr21]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['ui modal transition visible active ', scope.props.class].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return scope.onClickModal;
          }
        }]
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return scope.closable && !scope.basic;
        },

        'redundantAttribute': 'expr22',
        'selector': '[expr22]',

        'template': template(null, [{
          'expressions': [{
            'type': expressionTypes.ATTRIBUTE,
            'name': 'class',

            'evaluate': function(scope) {
              return 'close icon';
            }
          }, {
            'type': expressionTypes.EVENT,
            'name': 'onclick',

            'evaluate': function(scope) {
              return scope.onClickHide;
            }
          }]
        }])
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return scope.header;
        },

        'redundantAttribute': 'expr23',
        'selector': '[expr23]',

        'template': template('<i expr24="expr24"></i> ', [{
          'expressions': [{
            'type': expressionTypes.TEXT,
            'childNodeIndex': 1,

            'evaluate': function(scope) {
              return [scope.title].join('');
            }
          }, {
            'type': expressionTypes.ATTRIBUTE,
            'name': 'class',

            'evaluate': function(scope) {
              return ['ui header ', scope.headerClass].join('');
            }
          }]
        }, {
          'type': bindingTypes.IF,

          'evaluate': function(scope) {
            return scope.header.icon;
          },

          'redundantAttribute': 'expr24',
          'selector': '[expr24]',

          'template': template(null, [{
            'expressions': [{
              'type': expressionTypes.ATTRIBUTE,
              'name': 'class',

              'evaluate': function(scope) {
                return ['icon ', scope.header.icon].join('');
              }
            }]
          }])
        }])
      }, {
        'redundantAttribute': 'expr25',
        'selector': '[expr25]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['content ', scope.contentClass].join('');
          }
        }]
      }, {
        'type': bindingTypes.SLOT,
        'attributes': [],
        'name': 'default',
        'redundantAttribute': 'expr26',
        'selector': '[expr26]'
      }, {
        'type': bindingTypes.EACH,
        'getKey': null,
        'condition': null,

        'template': template(' <i expr28="expr28"></i>', [{
          'expressions': [{
            'type': expressionTypes.TEXT,
            'childNodeIndex': 0,

            'evaluate': function(scope) {
              return [scope.button.text].join('');
            }
          }, {
            'type': expressionTypes.EVENT,
            'name': 'onclick',

            'evaluate': function(scope) {
              return () => scope.onClickButton(scope.button);
            }
          }, {
            'type': expressionTypes.ATTRIBUTE,
            'name': 'ref',

            'evaluate': function(scope) {
              return ['button_', scope.button.text].join('');
            }
          }, {
            'type': expressionTypes.ATTRIBUTE,
            'name': 'type',

            'evaluate': function(scope) {
              return 'button';
            }
          }, {
            'type': expressionTypes.ATTRIBUTE,
            'name': 'class',

            'evaluate': function(scope) {
              return ['ui button ', scope.button.type, ' ', scope.button.class].join('');
            }
          }]
        }, {
          'type': bindingTypes.IF,

          'evaluate': function(scope) {
            return scope.button.icon;
          },

          'redundantAttribute': 'expr28',
          'selector': '[expr28]',

          'template': template(null, [{
            'expressions': [{
              'type': expressionTypes.ATTRIBUTE,
              'name': 'class',

              'evaluate': function(scope) {
                return ['icon ', scope.button.icon].join('');
              }
            }]
          }])
        }]),

        'redundantAttribute': 'expr27',
        'selector': '[expr27]',
        'itemName': 'button',
        'indexName': null,

        'evaluate': function(scope) {
          return scope.buttons;
        }
      }]
    );
  },

  'name': 'su-modal'
};

export default suModal;
