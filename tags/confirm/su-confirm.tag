<su-confirm>
  <su-modal class="tiny" modal="{ modal }" onok="{ onOk }" oncancel="{ onCancel }">
    <div class="ui icon message">
      <i class="question circle outline icon"></i>
      <div class="scrolling content">
        <div class="header" if="{ title }">
          { title }
        </div>
        <p each="{ messsage in messages }">{ messsage }</p>
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
    export default {
      state: {
      },
      modal: {
        closable: false,
        buttons: []
      },
      reverse: false,
      cancelButton: {
        action: 'negativeAction'
      },
      okButton: {
        action: 'positiveAction'
      },
      onMounted,
      onOk,
      onCancel
    }

    // ===================================================================================
    //                                                                           Lifecycle
    //                                                                           =========
    function onMounted(props, state) {
      let defaultOkButton = {}
      let defaultCancelButton = {}
      this.reverse = false
      if (this.suDefaultOptions && this.suDefaultOptions.confirm) {
        if (this.suDefaultOptions.confirm.reverse) {
          this.reverse = this.suDefaultOptions.confirm.reverse
        }
        if (this.suDefaultOptions.confirm.buttons) {
          if (this.suDefaultOptions.confirm.buttons.ok) {
            defaultOkButton = this.suDefaultOptions.confirm.buttons.ok
          }
          if (this.suDefaultOptions.confirm.buttons.cancel) {
            defaultCancelButton = this.suDefaultOptions.confirm.buttons.cancel
          }
        }
      }

      this.okButton.text = defaultOkButton.text || 'OK'
      this.okButton.type = typeof defaultOkButton.type !== 'undefined' ? defaultOkButton.type : 'primary'
      this.okButton.icon = typeof defaultOkButton.icon !== 'undefined' ? defaultOkButton.icon : 'check'
      this.cancelButton.text = defaultCancelButton.text || 'Cancel'
      this.cancelButton.type = defaultCancelButton.type || ''
      this.cancelButton.icon = defaultCancelButton.icon || ''

      if (defaultOkButton.default) {
        this.okButton.default = true
      } else if (defaultCancelButton.default) {
        this.cancelButton.default = true
      } else if (typeof defaultOkButton.default === 'undefined' && typeof defaultOkButton.default === 'undefined') {
        this.okButton.default = true
      }

      if (this.obs) {
        this.obs.on('su-confirm-show', option => {
          suConfirm(this, option)
        })
      }
    }

    // ===================================================================================
    //                                                                              Events
    //                                                                              ======
    function onOk() {
      this.obs.trigger('callbackConfirm', true)
    }

    function onCancel() {
      this.obs.trigger('callbackConfirm', false)
    }

    // ===================================================================================
    //                                                                               Logic
    //                                                                               =====
    function setButtons(tag, option) {
      const cancel = {
        text: option.buttons.cancel.text || tag.cancelButton.text,
        type: option.buttons.cancel.type !== null ? option.buttons.cancel.type : tag.cancelButton.type,
        icon: option.buttons.cancel.icon !== null ? option.buttons.cancel.icon : tag.cancelButton.icon,
        action: 'cancel',
      }
      const ok = {
        text: option.buttons.ok.text || tag.okButton.text,
        type: option.buttons.ok.type !== null ? option.buttons.ok.type : tag.okButton.type,
        icon: option.buttons.ok.icon !== null ? option.buttons.ok.icon : tag.okButton.icon,
        action: 'ok',
      }

      if (option.buttons.ok.default) {
        ok.default = true
      } else if (option.buttons.cancel.default) {
        cancel.default = true
      } else if (option.buttons.ok.default === null && option.buttons.cancel.default === null) {
        ok.default = okButton.default
        cancel.default = cancelButton.default
      }

      tag.modal.buttons.length = 0
      tag.modal.buttons.push((option.reverse || reverse) ? ok : cancel)
      tag.modal.buttons.push((option.reverse || reverse) ? cancel : ok)
    }

    function showConfirm(tag, option = {}) {
      tag.title = option.title
      tag.messages = Array.isArray(option.message) ? option.message : [option.message]
      setButtons(tag, option)
      tag.update()
      tag.suShowModal(tag.$('su-modal'))
    }

    function suConfirm(tag, param) {
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

      return new Promise((resolve, reject) => {
        showConfirm(tag, option)
        tag.observable.on('callbackConfirm', result => {
          tag.suHideModal(tag.$('su-modal'))
          return result ? resolve() : reject()
        })
      })
    }
  </script>
</su-confirm>