var tocbotInit = false;
$(window).on('pageLoad', function(e, state){
  if(!location.pathname.includes('/docs')){
    return;
  }
  $(document).ready(function(){
    let promise = new Promise((resolve, reject) => {
      var tocNode = $('.content-toc div[class*="-toc"] > nav > div > .toc-list')[0];
      if(document.body.contains(tocNode)){
        var content = document.querySelector('#content-container > .content-body');
        var headings = content.querySelectorAll('h2, h3, h4, h5, h6, h7');
        var headingMap = {};
        console.log('Setting heading IDs')
        Array.prototype.forEach.call(headings, function (heading) {
          var id = heading.id ? heading.id : heading.textContent.trim().toLowerCase()
              .split(' ').join('-').replace(/[\!\@\#\$\%\^\&\*\(\)\:]/ig, '')
          headingMap[id] = !isNaN(headingMap[id]) ? ++headingMap[id] : 0
          if (headingMap[id]) {
            heading.id = id + '-' + headingMap[id]
          } else {
            heading.id = id
          }
        });
        $('.content-toc div > nav').children('div').first().remove();
        setTimeout(function(){ return resolve(); }, 250);
      }else{
        return reject();
      }
      })
    promise.then(function(val){
      tocbot.destroy();
      tocbot.init({
        // Where to render the table of contents.
        tocSelector: '.content-toc div[class*="-toc"] > nav',
        // Where to grab the headings to build the table of contents.
        contentSelector: '#content-container > .content-body',
        // Which headings to grab inside of the contentSelector element.
        headingSelector: 'h2.header-scroll, h3.header-scroll',
        headingsOffset: -300,
        scrollContainer: '#content-container > .content-body',
        // For headings inside relative or absolute positioned containers within content.
        hasInnerContainers: false,
        collapseDepth: 2,
        orderedList: false,
      });
      tocbotInit = true;
    }).catch((reason) => {
      console.log('No TOC available to remove: ' + reason);
    })
  });
});
