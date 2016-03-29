$(document).ready(function() {
  $('.button.js_buyBox').click(function() {
    return $('.js_buyBox').addClass('active');
  });
  $('.button.js_buyCloud').click(function() {
    return $('.js_buyCloud').addClass('active');
  });
  $('.button.js_buyIntegration').click(function() {
    return $('.js_buyIntegration').addClass('active');
  });
  $('.js_close').click(function() {
    return $('.active').removeClass('active');
  });
  $('.js_buyCloud .button').click(function() {
    $('.empty').removeClass('empty');
    return $('.js_buyCloud input[type="text"],.js_buyCloud input[type="tel"],.js_buyCloud textarea').each(function() {
      var classname;
      if (!$(this).val()) {
        $('.js_buyCloud .prices__modal__error-notice,.js_buyCloud .line--horizontal').addClass('empty');
        classname = '.' + this.className;
        return $('.js_buyCloud ' + classname).addClass('empty');
      }
    });
  });
  $('.js_buyBox .button').click(function() {
    $('.empty').removeClass('empty');
    return $('.js_buyBox input[type="text"],.js_buyBox input[type="tel"],.js_buyBox textarea').each(function() {
      var classname;
      if (!$(this).val()) {
        $('.js_buyBox .prices__modal__error-notice,.js_buyBox .line--horizontal').addClass('empty');
        classname = '.' + this.className;
        return $('.js_buyBox ' + classname).addClass('empty');
      }
    });
  });
  return $('.js_buyIntegration .button').click(function() {
    $('.empty').removeClass('empty');
    return $('.js_buyIntegration input[type="text"],.js_buyIntegration input[type="tel"],.js_buyIntegration textarea').each(function() {
      var classname;
      if (!$(this).val()) {
        $('.js_buyIntegration .prices__modal__error-notice,.js_buyIntegration .line--horizontal').addClass('empty');
        classname = '.' + this.className;
        return $('.js_buyIntegration ' + classname).addClass('empty');
      }
    });
  });
});
