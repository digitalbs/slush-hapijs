export default {
    toDeepEqual() {
            return {
                compare(actual, expected) {
                    let result = {};
                    let actualKeys = Object.keys(actual);
                    let expectedKeys = Object.keys(expected);

                    //use Object.keys initially in case objects are of different types,
                    //since _.isEqual on two objects of different constructor types returns false
                    result.pass = actualKeys.every(key => {
                        return _.isEqual(actual[key], expected[key]);
                    }) && actualKeys.length === expectedKeys.length;

                    return result;
                }
            };
        },
        toDeepContain() {
            return {
                compare(expected, actual) {
                    let result = {};
                    actual = JSON.parse(JSON.stringify(actual));
                    expected = JSON.parse(JSON.stringify(expected));
                    result.pass = (function compareObject() {
                        function checkProperties(actual, expected) {
                            if (Array.isArray(expected)) {
                                let expectedLength = expected.length;
                                if (expectedLength > 0) {
                                    return expected.reduce((acc, val, idx) => {
                                        let arrayResult = checkProperties(actual[idx], val);

                                        return arrayResult ? acc : false;
                                    });
                                } else {
                                    return expectedLength === actual.length;
                                }

                            } else if (expected && typeof expected === 'object') {
                                return Object.keys(expected).reduce((acc, val) => {
                                    let objResult = checkProperties(actual[val], expected[val]);

                                    return objResult ? acc : false;
                                }, true);
                            } else {
                                return expected === actual;
                            }
                        }

                        return Object.keys(expected).reduce((acc, key) => {
                            let result = checkProperties(actual[key], expected[key]);

                            return result ? acc : false;
                        }, true);

                    })();

                    return result;
                }
            };
        },
        toHaveKeys() {
            return {
                compare(actual, expected) {
                    let result = {};
                    let expectedKeys = Object.keys(expected);
                    result.pass = Object.keys(actual).every(key => { // compare each item in actual array to expected array
                        return expectedKeys.indexOf(key) !== -1; // compare actual key to expected key
                    });
                    return result;
                }
            };
        },
        toJsonEqual() {
            return {
                compare(actual, expected) {
                    let result = {};
                    result.pass = angular.toJson(expected) === angular.toJson(actual);
                    return result;
                }
            };
        }
};
