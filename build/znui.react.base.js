"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

module.exports = {
  confirmRequest: function confirmRequest(content, request, success, error) {
    if (!content || !request) {
      return zr.popup.notifier.error('缺失参数!'), false;
    }

    zr.popup.confirm(content, '请确认', function () {
      zr.popup.loader.loading('提交中...');
      zn.data.request(request).then(function (data) {
        zr.popup.loader.close();

        if (data.code == 200) {
          var _return = success && success(data.result);

          if (_return !== false) {
            zr.popup.notifier.success('提交成功!');
          }
        } else {
          error && error(data);
        }
      });
    }, error, {
      cancel: '取消',
      confirm: '确定'
    });
    return this;
  },
  alertRequest: function alertRequest(args) {
    if (!args.request) {
      return zr.popup.notifier.error('无request参数!'), false;
    }

    zr.popup.confirm(args.content || '无', args.title || '警告', function () {
      zr.popup.loader.loading(args.loading || '提交中...');
      zn.data.request(args.request).then(function (data) {
        zr.popup.loader.close();

        if (data.code == 200) {
          var _return = args.success && args.success(data.result);

          if (_return !== false) {
            zr.popup.notifier.success('提交成功!');
          }
        } else {
          args.error && args.error(data);
        }
      });
    }, args.error, {
      cancel: '取消',
      confirm: '确定'
    });
    return this;
  },
  dialogForm: function dialogForm(dialogProps, formProps) {
    var _formProps = zn.deepAssign({
      buttons: [{
        value: dialogProps.title || '提交',
        status: 'info',
        focus: true,
        type: 'submit'
      }]
    }, formProps);

    var _dialog = zr.popup.dialog(zn.deepAssign({
      style: {
        width: 640
      },
      closeable: true,
      focus: false,
      content: React.createElement(zr.form.AjaxForm, _extends({}, _formProps, {
        onSubmitSuccess: function onSubmitSuccess(data, form) {
          var _return = _formProps.onSubmitSuccess && _formProps.onSubmitSuccess(data, form);

          if (_return !== false) {
            _dialog.close();

            zr.popup.notifier.success('提交成功!');
          }
        }
      }))
    }, dialogProps));

    return _dialog;
  }
};