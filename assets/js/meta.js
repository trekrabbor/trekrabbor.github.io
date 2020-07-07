$(window).on('pageLoad', function(e, state){
  $(document).ready(function(){
      $('meta[name="description"]').remove();
      let content = $('#content-head .excerpt p').text();
      let meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = content;
      $('head').append(meta);
  });
});
