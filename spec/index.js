require("harmonize")(); // metalsmith 2.x use harmony features, enable them programatically.

var path = require('path');
var expect = require('chai').expect;
var Metalsmith = require('metalsmith');
var equal = require('assert-dir-equal');

var headingsIdentifier = require('..');

describe('metalsmith-headings-identifier', function() {
  it('preexisting ids should remain untouched', function(done) {
    Metalsmith('spec/fixture')
      .use(headingsIdentifier())
      .build(function(err) {
        if (err) return done(err);
        equal('spec/fixture/expected/headingWithID.html', 'spec/fixture/build/headingWithID.html');
        done();
      });
  });
  it('ids get auto appended', function(done) {
    Metalsmith('spec/fixture')
      .use(headingsIdentifier())
      .build(function(err) {
        if (err) return done(err);
        equal('spec/fixture/expected/headingWithoutID.html', 'spec/fixture/build/headingWithoutID.html');
        done();
      });
  });
  it('anchor template can be changed', function(done) {
    Metalsmith('spec/fixture')
      .use(headingsIdentifier({
        linkTemplate: '<a class="myCustomHeadingsAnchorClass" href="#%s"><span></span></a>'
      }))
      .build(function(err) {
        if (err) return done(err);
        equal('spec/fixture/expected/customTemplate.html', 'spec/fixture/build/customTemplate.html');
        done();
      });
  });
  it('allow metafield can be used to specify key that disables auto headings', function(done) {
    Metalsmith('spec/fixture')
      .use(headingsIdentifier({
        allow: 'appendHeadingAuto'
      }))
      .build(function(err) {
        if (err) return done(err);
        equal('spec/fixture/expected/remainsUntouched.html', 'spec/fixture/build/remainsUntouched.html');
        done();
      });
  });
  it('custom classes can be added to headings', function(done) {
    Metalsmith('spec/fixture')
      .use(headingsIdentifier({
        headingClass: 'headingClass'
      }))
      .build(function(err) {
        if (err) return done(err);
        equal('spec/fixture/expected/headingClasses.html', 'spec/fixture/build/headingClasses.html');
        done();
      })
  });
  it('allows scoping heading links according to a context', function(done) {
    Metalsmith('spec/fixture')
      .use(headingsIdentifier({
        context: '.to-link'
      }))
      .build(function(err) {
        if (err) return done(err);
        equal('spec/fixture/expected/context.html', 'spec/fixture/build/context.html');
        done();
      });
  });
  it('allows scoping heading links according to a selector', function(done) {
    Metalsmith('spec/fixture')
      .use(headingsIdentifier({
        selector: 'h2'
      }))
      .build(function(err) {
        if (err) return done(err);
        equal('spec/fixture/expected/selector.html', 'spec/fixture/build/selector.html');
        done();
      });
  });
  it('allows custom positioning of the anchor', function(done) {
    Metalsmith('spec/fixture')
      .use(headingsIdentifier({
        headingClass: 'headingClass',
        position: 'right'
      }))
      .build(function(err) {
        if (err) return done(err);
        equal('spec/fixture/expected/positioning.html', 'spec/fixture/build/positioning.html');
        done();
      });
  });
  it('works from the CLI', function(done) {
    // The CLI sets an expectation that `"lib": true` works correctly, with
    // all defaults.
    Metalsmith('spec/fixture')
      .use(headingsIdentifier(true))
      .build(function(err) {
        if (err) return done(err);
        equal('spec/fixture/expected/headingWithoutID.html', 'spec/fixture/build/headingWithoutID.html');
        done();
      });
  });
  it('should handle duplicates (and forcefully overwrite existing duplicate ids)', function(done) {
    Metalsmith('spec/fixture')
      .use(headingsIdentifier())
      .build(function(err) {
        if (err) return done(err);
        equal('spec/fixture/expected/duplicateHeadings.html', 'spec/fixture/build/duplicateHeadings.html');
        done();
      });
  });
  it('should scope duplicates properly based on first occurance', function(done) {
    Metalsmith('spec/fixture')
      .use(headingsIdentifier())
      .build(function(err) {
        if (err) return done(err);
        equal('spec/fixture/expected/scopedNonDuplicateIds.html', 'spec/fixture/build/scopedNonDuplicateIds.html');
        done();
      });
  });
});
