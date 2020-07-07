var data, oasObj;
var converter = new showdown.Converter({
  headerLevelStart: '2',
  noHeaderId: true,
  tables: true
});
converter.setFlavor('github');

$(document).ready(function() {
  let p = new Promise((resolve, reject) => {
    var json = window.document.getElementById("readme-data-oasFiles").getAttribute("data-json");
    oasObj = JSON.parse(json);
    resolve(oasObj);
  }).then(function(obj) {
    data = [];
    getApiInfo(obj);
    putFirstHeader(data);
    setContent();
    wrapTables();
    styleImages();
    //styleBorders();
  }).catch((reason) => console.log('Handle rejected promise (' + reason + ') here.'));
});

$(window).on('pageLoad', function(e, state){
  if(location.pathname.includes('/reference')){
    setTimeout(function(){
      fullWidthTopNav();
    },200);
  }else(
    docWidthTopNav()
  )
});

function styleBorders(){
  $('#api-explorer .param-type-header, #api-explorer .hub-reference .hub-reference-left header, #api-explorer .api-definition-parent .api-definition, #api-explorer .hub-reference .hub-reference-left').css('border', 'none');
  $('#api-explorer .api-definition-parent .api-definition, #hub-reference .hub-api .api-definition .api-definition-container').css('box-shadow', 'none');
  $('#api-explorer .api-definition-parent').css('border-bottom', 'solid rgb(221, 221, 221) 1px');
}

function fullWidthTopNav(){
  let headerNav = $('#header-top .clearfix nav').first();
  let headerLogo = $('#header-logo');
  headerLogo.css('margin-left','12px');
  headerNav.css({
    'transition': 'all .2s linear',
    'width': '100%'
  })
}

function docWidthTopNav(){
  $('#header-top .clearfix nav').first().removeAttr('style');
  $('#header-logo').removeAttr('style');
}

function subCategory(){
  let subCategories = $('div[ng-show*="reference"] .hub-sidebar-category > ul li');
  let headings = $('#api-explorer .hub-reference-left h2');
  headings.each(function(){
    let heading = $(this);
    subCategories.each(function(){
      let sidebarHeading = $(this).first().find('.link-title');
      if(heading.text() == sidebarHeading.text()){
        heading.css({
          'font-size':'26px'
        });
      }
    })
  })
}

function wrapTables(){
  $('#api-explorer .hub-reference-left table').each(function(){
    if(!$(this).parent().hasClass('marked-table')){
      $(this).wrap('<div class="marked-table"></div>');
    }
  });
}

function styleCategoryName(){
  $('#api-explorer .hub-reference-left header.header-inserted-json h2').each(function(){
    $(this).css({
      'font-size':'2.25em'
    })
  })
}

function styleSubCategoryName(){
  $('#api-explorer .hub-reference-left header h2').each(function(){
    if(!$(this).parent().hasClass('header-inserted-json')){
      $(this).css({
        'font-size':'1.75em'
      });
    }
  });
}

function styleImages(){
  $('#api-explorer .hub-reference-left img').each(function(){
    if(!$(this).parent().is('li')){
      $(this).css({
        'width':'100%',
        'height':'auto'
      });
    }
  });
}

function setContent(){
  $('#api-explorer .hub-reference header > h2').each(function(){
    obj = $(this);
    header = obj.text().toLowerCase();
    Object.keys(data).forEach(function(key){
      if(header == data[key].firstHeader){
        obj.parent().parent().prepend('<header class="header-inserted-json">'
        +'<h2 class="ref-category-title">'+data[key].showTitle+'</h2>'
        +'<div class="excerpt">'+converter.makeHtml(data[key].description)+'</div>'
        +'</header>');
      }
    })
  })
}

function putFirstHeader(data){
  let tmp =[];
  $('#hub-sidebar-content > div[ng-show*="reference"] h3').each(function(){
    var header = $(this).text().toLowerCase();
    var firstChild = $(this).next('ul').children().first().find('a > .link-title').first().text().toLowerCase();
    Object.keys(data).forEach(function(key){
      if(header == data[key].title){
        data[key].firstHeader = firstChild;
      }
    })
  })
}

function getApiInfo(oas){
  Object.keys(oas).forEach(function(key) {
      var api = oas[key];
      data.push({
        title:api.info.title.toLowerCase(),
        showTitle:api.info.title,
        description:api.info.description
      });
  });
}
