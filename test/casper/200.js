casper.test.begin('Acceptance', 1, function suite (test) {

  casper.start('http://localhost:3000', function () {
    test.assertHttpStatus(200, 'Page exists');
  });

  casper.run(function () {
    test.done();
  });

});