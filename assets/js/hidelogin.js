$(document).ready(function() {
  $('#header-nav-right li').each(function(){
    let aTag = $(this).find('a');
    let content = aTag.text();
    aTag.attr('target', '_blank');
    if(content.includes('Login')){
      $(this).remove();
    }
  })
})
