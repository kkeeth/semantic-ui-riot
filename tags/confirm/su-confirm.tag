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
    const self = this
    this.mixin('semantic-ui')

    this.modal = {
      closable: false,
      buttons: []
    }
    let reverse = false
    const cancelButton = {
      action: 'negativeAction'
    }
    const okButton = {
      action: 'positiveAction'
    }

    this.on('mount', () => {
      let defaultOkButton = {}
      let defaultCancelButton = {}
      reverse = false
      if (this.defaultOptions && this.defaultOptions.confirm) {
        if (this.defaultOptions.confirm.reverse) {
          reverse = this.defaultOptions.confirm.reverse
        }
        if (this.defaultOptions.confirm.buttons) {
          if (this.defaultOptions.confirm.buttons.ok) {
            defaultOkButton = this.defaultOptions.confirm.buttons.ok
          }
          if (this.defaultOptions.confirm.buttons.cancel) {
            defaultCancelButton = this.defaultOptions.confirm.buttons.cancel
          }
        }
      }

      okButton.text = defaultOkButton.text || 'OK'
      okButton.type = defaultOkButton.type || 'primary'
      okButton.icon = defaultOkButton.icon || 'check'
      cancelButton.text = defaultCancelButton.text || 'Cancel'
      cancelButton.type = defaultCancelButton.type || ''
      cancelButton.icon = defaultCancelButton.icon || ''

      if (defaultOkButton.default) {
        okButton.default = true
      } else if (defaultCancelButton.default) {
        cancelButton.default = true
      } else if (typeof defaultOkButton.default === 'undefined' && typeof defaultOkButton.default === 'undefined') {
        okButton.default = true
      }

      this.refs.modal.on('positiveAction', () => {
        this.observable.trigger('callbackConfirm', true)
      })
      this.refs.modal.on('negativeAction', () => {
        this.observable.trigger('callbackConfirm', false)
      })
    })

    const setButtons = option => {
      const cancel = {
        text: option.buttons.cancel.text || cancelButton.text,
        type: option.buttons.cancel.type || cancelButton.type,
        icon: option.buttons.cancel.icon || cancelButton.icon,
        action: cancelButton.action,
      }
      const ok = {
        text: option.buttons.ok.text || okButton.text,
        type: option.buttons.ok.type || okButton.type,
        icon: option.buttons.ok.icon || okButton.icon,
        action: okButton.action,
      }

      if (option.buttons.ok.default) {
        ok.default = true
      } else if (option.buttons.cancel.default) {
        cancel.default = true
      } else if (option.buttons.ok.default === null && option.buttons.cancel.default === null) {
        ok.default = okButton.default
        cancel.default = cancelButton.default
      }

      this.modal.buttons.length = 0
      this.modal.buttons.push((option.reverse || reverse) ? ok : cancel)
      this.modal.buttons.push((option.reverse || reverse) ? cancel : ok)
    }

    // ===================================================================================
    //                                                                          Observable
    //                                                                          ==========
    this.observable.on('showConfirm', option => {
      this.title = option.title
      this.messages = Array.isArray(option.message) ? option.message : [option.message]
      setButtons(option)
      this.update()
      this.refs.modal.show()
    })

    riot.mixin({
      su_riot: {
        confirm(param) {
          const option = {
            title: null,
            message: null,
            reverse: null,
            buttons: {
              ok: {
                text: null,
                default: null,
                type: null,
                icon: null,
              },
              cancel: {
                text: null,
                default: null,
                type: null,
                icon: null,
              },
            },
          }
          if (typeof param === 'string') {
            option.message = param
          } else if (param) {
            if (param.title) {
              option.title = param.title
            }
            if (param.message) {
              option.message = param.message
            }
            if (param.reverse) {
              option.reverse = param.reverse
            }
            if (param.buttons) {
              if (param.buttons.ok) {
                option.buttons.ok = param.buttons.ok
              }
              if (param.buttons.cancel) {
                option.buttons.cancel = param.buttons.cancel
              }
            }
          }

          return self.Q.Promise((resolve, reject) => {
            self.observable.trigger('showConfirm', option)
            self.observable.on('callbackConfirm', result => {
              return result ? resolve() : reject()
            })
          })
        }
      }
    })
  </script>
</su-confirm>