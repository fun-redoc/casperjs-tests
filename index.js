//var casper = require('casper').create();


casper.test.begin("Google Search Test", 1, function suite(test) {
  var inputs = null;
  casper.start("https://www.google.com", function() {
//    this.debugHTML();
  });

  casper.then(function checkeIfExpectedElementsArePresent() {
    test.assertTitle("Google", "expect google title to be Google");
    test.assertExists("input[name='q']", "expect search field to be there");
    test.assertExists("input[type='submit']", "expect search button to be there");
    test.assertExists("input[value='Google-Suche']", "expect search button to be there");
    test.assertExists("input[name='btnG']", "expect search button to be there");
  });

  casper.then(function fillSearchField() {
    this.sendKeys("input[name='q']", "Lambda");
    this.click("input[type='submit']");
    this.waitFor(function checkIfPageAlreadyLoaded() {
      return this.getTitle() === "Lambda - Google-Suche";
    }, function ifSuccess() {
      test.assertTitle("Lambda - Google-Suche", "expect google title");
    });
  });

  casper.then(function shouldNavigateToResultPage() {
    test.assertTitle("Lambda - Google-Suche", "expect google title");
  });

  casper.then(shouldHaveWikipediaLinkAsFirstEntry.bind(casper,test));


  casper.then( function openTheWikipediaLink() {
    this.click("div.g a");
  });

  casper.then(function shouldLandOnWikipediaPage() {
    test.assertHttpStatus(200, "expect http status 200");
    test.assertUrlMatch(/^https:\/\/de\.wikipedia\.org\/wiki\/Lambda/, "expect correct wikipedia ulr");
  });

  casper.then(function goBackToGoogle() {
    this.back();
  });

  casper.then(shouldHaveWikipediaLinkAsFirstEntry.bind(casper,test));

  casper.run(function() {
    test.done();
  });
});


function shouldHaveWikipediaLinkAsFirstEntry(test) {
//    test.assertExists("div[data-async-context='query:Lambda']", "expext element");
    test.assertExists("div#ires", "expect div element enclosing all results");
    test.assertExists("div.g", "expect div.g");
    test.assertExists("div.g a", "expect ancer element");
    test.assertEvalEquals(function titleOfTheFirstElementFound() {
                  return __utils__.findOne('div.g a').textContent;
                          }, 'Lambda – Wikipedia');
}
