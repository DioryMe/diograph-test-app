import { By, Builder, Capabilities, until } from 'selenium-webdriver';

describe('Diory Test App', function() {

    beforeEach(function(done) {
        this.driver = new Builder().
            withCapabilities(Capabilities.chrome()).
            build();

        this.driver.get('http://localhost:8080/app/index.html').then(done);
    });

    afterEach(function(done) {
        this.driver.quit().then(done);
    });

    it('Home page renders', function(done) {
        var element = this.driver.findElement(By.tagName('p'));
        element.getAttribute('innerHTML').then(function(html) {
            expect(html).toContain('No diories to show.');
            done();
        });
    });

    it('Successful login and diory shows up', function(done) {
        this.driver.findElement(By.id("diograph-token-input")).sendKeys("test-token");
        this.driver.findElement(By.id("diograph-save-button")).click();
        this.driver.wait(until.elementLocated(By.tagName('h1'))).then(element => {
            element.getAttribute('innerHTML').then(function(html) {
                expect(html).toContain('Test diory');
                done();
            });
        });
    });

    it('Successful logout and diory disappears', function(done) {
        /* Logs in */
        this.driver.findElement(By.id("diograph-token-input")).sendKeys("test-token");
        this.driver.findElement(By.id("diograph-save-button")).click();
        this.driver.wait(until.elementLocated(By.tagName('h1'))).then(element => {
            /* Finds diory */
            element.getAttribute('innerHTML').then(function(html) {
                expect(html).toContain('Test diory');
            });
            /* Clicks logout */
            this.driver.findElement(By.id("logout")).click();
            this.driver.wait(until.elementLocated(By.id("diograph-token-input"))).then(inputField => {
                /* Input field still has test-token */
                inputField.getAttribute('value').then(html => {
                    expect(html).toEqual("");
                    /* Diory is not shown anymore */
                    var element = this.driver.findElement(By.tagName('p'));
                    element.getAttribute('innerHTML').then(function(html) {
                        expect(html).toContain('No diories to show.');
                        done();
                    });
                });

            });
        });
    });

    it('Successful login with ?token=test-token, also after refresh', function(done) {
        let that = this;
        this.driver.get('http://localhost:8080/app/index.html?token=test-token').then(() => {
            this.driver.wait(until.elementLocated(By.tagName('h1'))).then(element => {
                /* Finds diory */
                element.getAttribute('innerHTML').then(function(html) {
                    expect(html).toContain('Test diory');
                });
                /* Shows logout button */
                that.driver.findElement(By.id('container2')).then(element => {
                    element.getAttribute('style').then(style => {
                        expect(style).toContain("block");
                        this.driver.get('http://localhost:8080/app/index.html?token=test-token').then(() => {
                            that.driver.findElement(By.id('container2')).then(element => {
                                element.getAttribute('style').then(style => {
                                    expect(style).toContain("block");
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    xit('User gets changed with ?token=test-token, although already logged in', function(done) {
        let that = this;
        this.driver.get('http://localhost:8080/app/index.html?token=test-token').then(() => {
            this.driver.get('http://localhost:8080/app/index.html?token=other-token').then(() => {
                this.driver.wait(until.elementLocated(By.tagName('h1'))).then(element => {
                    /* Finds diory */
                    element.getAttribute('innerHTML').then(function(html) {
                        expect(html).toContain('Other diory');
                    });
                });
            });
        });
    });

});
