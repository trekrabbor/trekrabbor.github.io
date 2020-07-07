window.cookieconsent.initialise({
  "palette": {
    "popup": {
      "background": "#000000"
    },
    "button": {
      "background": "#ffc658"
    }
  },
  "content": {
    "message": "This website uses cookies to ensure that we give you the best experience on our website. If you continue to use this site we assume that you are happy with it.",
    "dismiss": "OK",
    "link": "More Information",
    "href": "https://www.sinch.com/privacy-policy/"
  }
});

var loadCookies = function() {
  var script = document.createElement('script');
  script.innerHTML="(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-K598V5M');"
    $('body').prepend('<!-- Google Tag Manager (noscript) --> <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K598V5M" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> <!-- End Google Tag Manager (noscript) -->');
    document.head.prepend(script);
}

function cookiesAccepted(){
  if((document.cookie.match(/^(?:.*;)?\s*cookieconsent_status\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1] == 'dismiss'){
    return true;
  }else{
    return false;
  }
}

$(document).ready(function(){
  $(document).on('click', '.cc-btn.cc-dismiss', function(){
    if(!cookiesAccepted()) loadCookies();
  })
  $(window).scroll(function(){
    if($(this).scrollTop() >= 100){
      if(!cookiesAccepted()) loadCookies();
      document.cookie="cookieconsent_status=dismiss";
    }
  })
  if(cookiesAccepted()) loadCookies();
})
