'use strict';

const { stat } = require('fs');
const { resolve, join } = require('path');
const rimraf = require('rimraf');
const { run } = require('../../utils/test-utils');

describe('single entry flag index present', () => {
    beforeEach((done) => {
        rimraf(join(__dirname, './bin/*'), () => {
            done();
        });
    });

    it('finds default index file and compiles successfully', (done) => {
        const { stderr } = run(__dirname);

        expect(stderr).not.toContain('Module not found');
        stat(resolve(__dirname, './bin/main.js'), (err, stats) => {
            expect(err).toBe(null);
            expect(stats.isFile()).toBe(true);
            done();
        });
    });

    it('finds default index file, compiles and overrides with flags successfully', (done) => {
        const { stderr } = run(__dirname, ['--output-path', 'bin']);
        expect(stderr).toBeFalsy();

        stat(resolve(__dirname, './bin/main.js'), (err, stats) => {
            expect(err).toBe(null);
            expect(stats.isFile()).toBe(true);
            done();
        });
    });
});
