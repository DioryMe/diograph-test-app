import * as selenium from 'selenium-webdriver';

describe('Diory Test App', function() {

    beforeEach(function(done) {
        this.driver = new selenium.Builder().
            withCapabilities(selenium.Capabilities.chrome()).
            build();

        this.driver.get('http://localhost:8080/app/index.html').then(done);
    });

    afterEach(function(done) {
        this.driver.quit().then(done);
    });

    it('Should be on the home page', function(done) {
        let that = this;
        setTimeout(function() {
            var element = that.driver.findElement(selenium.By.tagName('h1'));

            element.getAttribute('innerHTML').then(function(html) {
                expect(html).toContain('Test diory');
                done();
            });
        }, 1000);
    });
})