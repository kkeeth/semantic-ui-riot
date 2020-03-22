// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onMounted() {
  this.update({
    pages: []
  });
}

function onUpdated(props, state) {
  let needsRegenerate = false;
  if (props.activePage != this.lastpropsActivePage) {
    state.activePage = parseInt(props.activePage || 1);
    this.lastpropsActivePage = state.activePage;
    needsRegenerate = true;
  }
  if (state.activePage != this.lastActivePage) {
    this.lastActivePage = state.activePage;
    needsRegenerate = true;
  }
  if (props.totalPage != this.lastpropsTotalPage) {
    state.totalPage = parseInt(props.totalPage || 1);
    this.lastpropsTotalPage = state.totalPage;
    needsRegenerate = true;
  }

  if (needsRegenerate) {
    generatePagination(this);
  }
}

// ===================================================================================
//                                                                               Event
//                                                                               =====
function onClickPage(e, pageNum) {
  e.preventDefault();
  if (pageNum < 1 || pageNum > this.state.totalPage) {
    return
  }
  this.update({
    activePage: pageNum
  });
  this.dispatch('change', pageNum);
}

// ===================================================================================
//                                                                               Logic
//                                                                               =====
function generatePagination(tag) {
  tag.state.pages = [];
  const activePage = tag.state.activePage;
  const totalPage = tag.state.totalPage;
  const pageSize = calcPageSize(tag.props.pageSize, totalPage);
  const index = calcIndex(activePage, totalPage, pageSize);

  if (pageSize < 1) {
    tag.update();
    return
  }

  for (let i = 0; i < pageSize; i++) {
    tag.state.pages.push({
      number: i + index,
      active: i + index == activePage,
    });
  }
  tag.state.pages[0].number = 1;
  tag.state.pages[pageSize - 1].number = totalPage;
  if (pageSize > 1) {
    tag.state.pages[1].disabled = index != 1;
  }
  if (pageSize > 2) {
    tag.state.pages[pageSize - 2].disabled = index != totalPage - pageSize + 1;
  }

  tag.update();
}

function calcPageSize(pageSize = 7, totalPage = 1) {
  pageSize = parseInt(pageSize);
  return pageSize < totalPage ? pageSize : totalPage
}

function calcIndex(activePage, totalPage, pageSize) {
  const prevPageSize = (pageSize - pageSize % 2) / 2;
  if (activePage + prevPageSize > totalPage) {
    return totalPage - pageSize + 1
  }
  if (activePage > prevPageSize) {
    return activePage - prevPageSize
  }
  return 1
}

var suPagination = {
  'css': null,

  'exports': {
    state: {
      activePage: 1,
      pages: [],
      totalPage: 1,
    },

    lastpropsTotalPage: null,
    lastpropsActivePage: null,
    lastActivePage: null,
    onMounted,
    onUpdated,
    onClickPage
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<div expr65="expr65"><a expr66="expr66"><i aria-hidden="true" class="angle double left icon"></i></a><a expr67="expr67"><i class="angle left icon"></i></a><template expr68="expr68"></template><a expr72="expr72"><i class="angle right icon"></i></a><a expr73="expr73"><i aria-hidden="true" class="angle double right icon"></i></a></div>',
      [{
        'redundantAttribute': 'expr65',
        'selector': '[expr65]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['ui pagination menu ', scope.props.class].join('');
          }
        }]
      }, {
        'redundantAttribute': 'expr66',
        'selector': '[expr66]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['angle icon item ', scope.state.activePage <= 1 ? 'disabled' : ''].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return event => scope.onClickPage(event,1);
          }
        }]
      }, {
        'redundantAttribute': 'expr67',
        'selector': '[expr67]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['angle icon item ', scope.state.activePage <= 1 ? 'disabled' : ''].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return event => scope.onClickPage(event,scope.state.activePage - 1);
          }
        }]
      }, {
        'type': bindingTypes.EACH,
        'getKey': null,
        'condition': null,

        'template': template(
          '<a expr69="expr69" class="item"></a><a expr70="expr70" class="active item"></a><div expr71="expr71" class="disabled icon item"></div>',
          [{
            'type': bindingTypes.IF,

            'evaluate': function(scope) {
              return !scope.page.active && !scope.page.disabled;
            },

            'redundantAttribute': 'expr69',
            'selector': '[expr69]',

            'template': template(' ', [{
              'expressions': [{
                'type': expressionTypes.TEXT,
                'childNodeIndex': 0,

                'evaluate': function(scope) {
                  return [scope.page.number].join('');
                }
              }, {
                'type': expressionTypes.EVENT,
                'name': 'onclick',

                'evaluate': function(scope) {
                  return event => scope.onClickPage(event,scope.page.number);
                }
              }]
            }])
          }, {
            'type': bindingTypes.IF,

            'evaluate': function(scope) {
              return scope.page.active;
            },

            'redundantAttribute': 'expr70',
            'selector': '[expr70]',

            'template': template(' ', [{
              'expressions': [{
                'type': expressionTypes.TEXT,
                'childNodeIndex': 0,

                'evaluate': function(scope) {
                  return scope.page.number;
                }
              }]
            }])
          }, {
            'type': bindingTypes.IF,

            'evaluate': function(scope) {
              return scope.page.disabled;
            },

            'redundantAttribute': 'expr71',
            'selector': '[expr71]',
            'template': template('<i class="ellipsis horizontal icon"></i>', [])
          }]
        ),

        'redundantAttribute': 'expr68',
        'selector': '[expr68]',
        'itemName': 'page',
        'indexName': null,

        'evaluate': function(scope) {
          return scope.state.pages;
        }
      }, {
        'redundantAttribute': 'expr72',
        'selector': '[expr72]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return [
              'angle icon item ',
              scope.state.activePage >= scope.state.totalPage ? 'disabled' : ''
            ].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return event => scope.onClickPage(event,scope.state.activePage + 1);
          }
        }]
      }, {
        'redundantAttribute': 'expr73',
        'selector': '[expr73]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return [
              'angle icon item ',
              scope.state.activePage >= scope.state.totalPage ? 'disabled' : ''
            ].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return event => scope.onClickPage(event,scope.state.totalPage );
          }
        }]
      }]
    );
  },

  'name': 'su-pagination'
};

export default suPagination;
