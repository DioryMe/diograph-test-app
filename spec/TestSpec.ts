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

    it('Home page renders', function(done) {
        var element = this.driver.findElement(selenium.By.tagName('p'));
        element.getAttribute('innerHTML').then(function(html) {
            expect(html).toContain('No diories to show.');
            done();
        });
    });

    it('Successful login and diory shows up', function(done) {
        let that = this;
        this.driver.findElement(selenium.By.id("diograph-token-input")).sendKeys("test-token");
        this.driver.findElement(selenium.By.id("diograph-save-button")).click();
        setTimeout(function() {
            var element = that.driver.findElement(selenium.By.tagName('h1'));
            element.getAttribute('innerHTML').then(function(html) {
                expect(html).toContain('Test diory');
                done();
            });
        }, 1500);
    });

    it('Successful logout and diory disappears', function(done) {
        let that = this;
        /* Logs in */
        this.driver.findElement(selenium.By.id("diograph-token-input")).sendKeys("test-token");
        this.driver.findElement(selenium.By.id("diograph-save-button")).click();
        setTimeout(function() {
            /* Finds diory */
            var element = that.driver.findElement(selenium.By.tagName('h1'));
            element.getAttribute('innerHTML').then(function(html) {
                expect(html).toContain('Test diory');
            });
            /* Clicks logout */
            that.driver.findElement(selenium.By.id("logout")).click();
            setTimeout(function() {
                /* Input field still has test-token */
                let inputField = that.driver.findElement(selenium.By.id("diograph-token-input"));
                inputField.getAttribute('value').then(html => {
                    expect(html).toContain("test-token");
                    /* Diory is not shown anymore */
                    var element = that.driver.findElement(selenium.By.tagName('p'));
                    element.getAttribute('innerHTML').then(function(html) {
                        expect(html).toContain('No diories to show.');
                        done();
                    });
                });

            }, 1500);
        }, 1500);
    });

})