(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./HzAnimResource", "./HzAnimResource"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var HzAnimResource_1 = require("./HzAnimResource");
    exports.HzAnimResource = HzAnimResource_1.HzAnimResource;
    /**
     * @deprecated
     */
    var HzAnimResource_2 = require("./HzAnimResource");
    exports.HzAnim = HzAnimResource_2.HzAnimResource;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJIekFuaW0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTtcbiAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCIuL0h6QW5pbVJlc291cmNlXCIsIFwiLi9IekFuaW1SZXNvdXJjZVwiXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICAvKipcbiAgICAgKiBAbGljZW5zZVxuICAgICAqIENvcHlyaWdodCBEYXZpbmNoaS4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAgICAgKi9cbiAgICB2YXIgSHpBbmltUmVzb3VyY2VfMSA9IHJlcXVpcmUoXCIuL0h6QW5pbVJlc291cmNlXCIpO1xuICAgIGV4cG9ydHMuSHpBbmltUmVzb3VyY2UgPSBIekFuaW1SZXNvdXJjZV8xLkh6QW5pbVJlc291cmNlO1xuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICovXG4gICAgdmFyIEh6QW5pbVJlc291cmNlXzIgPSByZXF1aXJlKFwiLi9IekFuaW1SZXNvdXJjZVwiKTtcbiAgICBleHBvcnRzLkh6QW5pbSA9IEh6QW5pbVJlc291cmNlXzIuSHpBbmltUmVzb3VyY2U7XG59KTtcbiJdLCJmaWxlIjoiSHpBbmltLmpzIn0=
