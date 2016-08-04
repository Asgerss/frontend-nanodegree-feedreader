/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
	/* This is our first test suite - a test suite just contains
	* a related set of tests. This suite is all about the RSS
	* feeds definitions, the allFeeds variable in our application.
	*/
	describe('RSS Feeds', function() {
		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});


		/* A test that loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */
		it('all have a defined a URL', function() {
			var hasURL = true;
			for (var i = 0; i < allFeeds.length; i++) {
				if (allFeeds[i].url == null) {
					hasURL = false;
				}
			}
			expect(hasURL).toBe(true);
		});


		/* A test that loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */
		it('all have a defined name', function() {
			var hasName = true;
			for (var i = 0; i < allFeeds.length; i++) {
				if (allFeeds[i].name == null) {
					hasName = false;
				}
			}
			expect(hasName).toBe(true);
		});
	});


	/* A test suite named "The menu" */
	describe('The menu', function() {
		/* A test that ensures the menu element is
		 * hidden by default.
		 */
		it('menu is hidden by default',function(){
			expect(document.body.className).toBe("menu-hidden");
		});

		 /* A test that ensures the menu changes
		  * visibility when the menu icon is clicked. This test
		  * should have two expectations: does the menu display when
		  * clicked and does it hide when clicked again.
		  */
		it('changes visibility when clicked', function(){
			$('.menu-icon-link').trigger('click');
			expect(document.body.className).not.toBe("menu-hidden");
			$('.menu-icon-link').trigger('click');
			expect(document.body.className).toBe("menu-hidden");
		});
	});

	/* A test suite named "Initial Entries" */
	describe('Initian Entries', function() {
		/* A test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 */
		beforeEach(function(done) {
			loadFeed(0, done);
		});
		it('loadFeed completes its work, and there is at least one entry', function(done){
			var entryCount = $('.entry').length;
			expect(entryCount).not.toBe(0);
			done();
		});
	});

	/* A new test suite named "New Feed Selection" */
	describe('New Feed Selection', function() {
		/* A test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 */
		var originalEntry
		beforeEach(function(done) {
			originalEntry = $('.entry').first().text();
			$('.feed').empty();
			loadFeed(1, done);
		});
		afterEach(function(done) {
			loadFeed(0, done);
		});
		it('new feed is loaded, and the content changed', function(done){
			var newEntry = $('.entry').first().text();
			expect(newEntry === originalEntry).toBe(false);
			done();
		});
	});
}());
