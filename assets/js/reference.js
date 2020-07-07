$(document).ready(function(){
  let pname = location.pathname;
  if(pname.includes('/reference/')){
    $('#hub-sidebar-content .hub-sidebar-category > ul li > a').removeAttr('target');
  };
})
