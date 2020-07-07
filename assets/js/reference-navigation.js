$(document).ready(function() {
  $('#hub-sidebar-content .hub-sidebar-category > ul li > a').removeAttr('target');
  $('#hub-sidebar-content .hub-sidebar-category > ul li > a > span').removeClass('fa-chevron-right');
  $('#hub-sidebar-content div[ng-show*="reference"] h3+ul').toggle();
  $('#hub-sidebar-content div[ng-show*="reference"] h3').append('<span class="fa fa-chevron-down"></span>');
})

$(document).ready(function() {
  var target = $('div[ng-show*="reference"] .hub-sidebar-category');
  for (var i = 0; i < target.length; i++) {
    // Create observer instance
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        const el = mutation.target;
        var newNodes = mutation.addedNodes;
        if ((!mutation.oldValue || !mutation.oldValue.match(/\bactive\b/)) &&
          mutation.target.classList &&
          mutation.target.classList.contains('active')) {
          target.each(function() {
            var isActive = $(this).hasClass('active');
            var isExpanded = $(this).children('h3').first().hasClass(prodExpand);
            var isVisible = $(this).children('ul').first().is(':visible');
            if (isActive && !isExpanded && !isVisible) {
              $(this).children('h3').first().trigger('click');
            } else if (!isActive && isExpanded && isVisible) {
              $(this).children('h3').first().trigger('click');
            }
          })
        }
      });
    });

    // Observer config
    var config = {
      attributes: true,
      childList: false,
      attributeOldValue: true,
      attributeFilter: ['class'],
      subtree: false
    };

    // Pass in the target node and the observer options
    observer.observe(target[i], config);
  }
})

$(window).on('pageLoad', function(e, state) {
  if (location.pathname.includes('/reference')) {
    $(document).ready(function() {
      setTimeout(function() {
        $('#hub-sidebar-content div[ng-show*="reference"] .hub-sidebar-category').each(function() {
          if ($(this).hasClass('active') && !$(this).children('h3').first().hasClass(prodExpand)) {
            $(this).children('h3').first().trigger('click');
          }
        })
      }, 500)
    })
  }
})

$(document).ready(function() {
  $(document).on('click', '#hub-sidebar-content div[ng-show*="reference"] h3', function() {
    if ($(this).hasClass(prodExpand)) {
      $(this).removeClass(prodExpand);
      $(this).next('ul').toggle('fast', 'swing');
      return;
    }
    $('#hub-sidebar-content div[ng-show*="reference"] h3').each(function() {
      if ($(this).hasClass(prodExpand)) {
        $(this).removeClass(prodExpand);
        $(this).next('ul').toggle('fast', 'swing');
      }
    })
    $(this).addClass(prodExpand);
    var subExpanded = $(this).next('ul').children('li.subnav-expanded');
    console.log(subExpanded);
    if($(this).hasClass(prodExpand) && (subExpanded.length == 0)){
      var firstAnchor = $(this).next('ul').children('li').first().children('a').first();
      firstAnchor.trigger('click');
    }
    $(this).next('ul').toggle('fast', 'swing');
  })
})
