<su-confirm>
  <su-modal class="tiny" ref="modal" modal="{ modal }">
    <div class="ui icon message">
      <i class="question circle outline icon"></i>
      <div class="content">
        <div class="header" if="{ parent.title }">
          { parent.title }
        </div>
        <p each="{ messsage in parent.messages }">{ messsage }</p>
      </div>
    </div>
  </su-modal>

  <style>
    .ui.dimmer {
      z-index: 1010;
    }

    .ui.modal {
      z-index: 1011;
    }

    .ui.message {
      background: none;
      box-shadow: none;
    }
  </style>

  <script>
    import Q from 'q'
    const self = this
    this.mixin('semantic-ui')

    this.modal = {
      closable: false,
      buttons: [{
        default: true,
        text: opts.ok ||
          (this.defaultOptions && this.defaultOptions.confirm && this.defaultOptions.confirm.ok) ||
          'OK',
        action: 'positiveAction',
        type: 'primary',
        icon: 'checkmark'
      }, {
        text: opts.cancel ||
          (this.defaultOptions && this.defaultOptions.confirm && this.defaultOptions.confirm.cancel) ||
          'Cancel',
        action: 'negativeAction',
      }]
    }

    this.on('mount', () => {
      this.refs.modal.on('positiveAction', () => {
        this.observable.trigger('callbackConfirm', true)
      })
      this.refs.modal.on('negativeAction', () => {
        this.observable.trigger('callbackConfirm', false)
      })
    })

    // ===================================================================================
    //                                                                          Observable
    //                                                                          ==========
    this.observable.on('showConfirm', option => {
      this.title = option.title
      this.messages = Array.isArray(option.message) ? option.message : [option.message]
      this.update()
      this.refs.modal.show()
    })

    riot.mixin({
      confirm(param) {
        const option = {
          title: null,
          message: null,
        }
        if (typeof param === 'string') {
          option.message = param
        } else {
          option.title = param.title
          option.message = param.message
        }

        return Q.Promise((resolve, reject) => {
          self.observable.trigger('showConfirm', option)
          self.observable.on('callbackConfirm', result => {
            return result ? resolve() : reject()
          })
        })
      }
    })
  </script>
</su-confirm>