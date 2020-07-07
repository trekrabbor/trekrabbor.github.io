const prodExpand = 'product-expanded';

$(window).on('pageLoad', function(e, state) {
  if (location.pathname.includes('/docs')) {
    setTimeout(function() {
      $('#hub-sidebar-content div[ng-show*="docs"] li.subnav-expanded').each(function() {
        if (!$(this).closest('ul').prev().hasClass(prodExpand)) {
          $(this).closest('ul').prev().trigger('click');
        }
      })
    }, 200)
  }
})

$(document).ready(function() {
  $('#hub-sidebar-content div[ng-show*="docs"] h3+ul').toggle();
  $('#hub-sidebar-content div[ng-show*="docs"] h3').append('<span class="fa fa-chevron-down"></span>');
  $('#hub-sidebar-content div[ng-show*="docs"] > ul li:has(ul) > a > span').remove();
  $('#hub-sidebar-content div[ng-show*="docs"] > ul li').has('ul').children('a').each(function(){
    $(this).append('<span class="fa fa-chevron-down"></span>');
  })
  $(document).on('click', '#hub-sidebar-content div[ng-show*="docs"] h3', function() {
    if ($(this).hasClass(prodExpand)) {
      $(this).removeClass(prodExpand);
      $(this).next('ul').toggle('fast', 'swing');
      return;
    }
    $('#hub-sidebar-content div[ng-show*="docs"] h3').each(function() {
      if ($(this).hasClass(prodExpand)) {
        $(this).removeClass(prodExpand);
        $(this).next('ul').toggle('fast', 'swing');
      }
    })
    $(this).addClass(prodExpand);
    $(this).next('ul').toggle('fast', 'swing');
  })
})
