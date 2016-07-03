var page = require("webpage").create();
page.open("https://www.google.com", function() {
  console.log(arguments);
  phantom.exit();
});
