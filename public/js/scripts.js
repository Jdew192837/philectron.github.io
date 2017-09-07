// do things when document is ready
$(function() {
  copyCode();
});

// create a copy code button
function copyCode() {
  $('.highlight').hover(
    // display copy code button when hover in
    function() {
      // append div
      $(this).prepend('<div class="copy-code-container"><div class="copy-code-button">Copy Code</div></div>');
      // on-click = copy the entire code snippet
      $('.copy-code-button').click(function() {
        copyToClipboard();
        $(this).html('Copied!');
      });
    },
    // remove copy code button when hover out
    function() {
      $(this).find('.copy-code-container').remove();
    }
  );
}

// copy text to clipboard
function copyToClipboard(element) {

}
