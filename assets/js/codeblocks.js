const copyBtn = '<button class="copy-code-btn" data-clipboard-action="copy"><i class="fa fa-clipboard"></i><span>Copy</span></button>'

//Code-blocks docs

$(window).on('pageLoad', function(e, state) {
  $(document).ready(function() {
    $('div.magic-block-textarea pre').prepend(copyBtn);
    var clipboard = new ClipboardJS('button.copy-code-btn', {
      target: function(trigger) {
        return trigger.nextElementSibling;
      }
    });
  });
});


$(document).ready(function() {
  $(document).on('click', 'button.copy-code-btn', function() {
    event.preventDefault();
    $('span', this).first().text('Copied!');
    $('span', this).first().css('transition', 'all 0.5s ease-out');
  })
  $(document).on('mouseleave', 'button.copy-code-btn', function() {
    $('span', this).first().text('Copy');
    $('span', this).first().css('transition', 'all 0.5s ease-out');
  })
});

//Code-blocks API explorer
$(window).on('pageLoad', function(e, state) {
  $(document).ready(function() {
    $('#api-explorer .block-code-code button.copy-code-button').remove();
    $('#api-explorer .block-code-code pre').first().prepend(copyBtn);
  });
});
