'use strict';

module.exports = function () {

    this.task('benchmark', ['unit'], function (done) {
        /*eslint no-console: 0*/
        var Benchmark = require('benchmark').Benchmark;
        var Suite = Benchmark.Suite;
        var Obus = require('../../');
        var suite = new Suite();

        Benchmark.options.minSamples = 100;

        suite.add('Obus.get', function () {
            var root = {a: {b: {c: {d: {}}}}};
            Obus.get(root, 'a.b.c.d');
            Obus.get(root, 'a.b.c.d.e');
            Obus.get(root, 'a.b.c.d.e.f');
        });

        suite.add('Obus.has', function () {
            var root = {a: {b: {c: {d: {}}}}};
            Obus.has(root, 'a.b.c.d.e');
            Obus.has(root, 'a.b.c.d.e.f');
            Obus.has(root, 'a.b.c.d.e.f.g');
        });

        suite.add('Obus.set', function () {
            var root = {};
            Obus.set(root, 'a.b.c.x.e', 42);
            Obus.set(root, 'a.b.c.y.e', 42);
            Obus.set(root, 'a.b.c.z.e', 42);
        });

        suite.add('Obus.extend', function () {
            var root = {_: {a: {b: {c: {}}}}};
            Obus.extend(root, '_.a.b.c.x.e', 42);
            Obus.extend(root, '_.a.b.c.y.e', 42);
            Obus.extend(root, '_.a.b.c.z.e', 42);
        });

        suite.add('Obus.push', function () {
            var root = {$: {a: {b: {c: {}}}}};
            Obus.push(root, '$.a.b.c.x.e', 42);
            Obus.push(root, '$.a.b.c.y.e', 42);
            Obus.push(root, '$.a.b.c.z.e', 42);
        });

        suite.on('cycle', function (event) {
            console.log(String(event.target));
        });

        suite.on('complete', function () {
            console.log();
            done();
        });

        suite.run({
            queued: true,
            async: true
        });
    });
};
