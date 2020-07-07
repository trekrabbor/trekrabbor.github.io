$(window).on('pageLoad', function(e, state){
  if(location.pathname.includes('/docs')){
    $('link[href*="side-nav-docs.css"]').prop('disabled', false);
  }else if(location.pathname.includes('/reference')){
    $('link[href*="side-nav-docs.css"]').prop('disabled', true);
  }
})
