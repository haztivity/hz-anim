var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@haztivity/core/index", "velocity-animate", "velocity-animate/velocity.ui", "./HzAnimSequence"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var index_1 = require("@haztivity/core/index");
    var velocity = require("velocity-animate");
    var velocityui = require("velocity-animate/velocity.ui");
    var HzAnimSequence_1 = require("./HzAnimSequence");
    velocity;
    velocityui;
    var HzAnimResource = HzAnimResource_1 = (function (_super) {
        __extends(HzAnimResource, _super);
        function HzAnimResource() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HzAnimResource.prototype.init = function (options, config) {
            this._id = new Date().getTime();
            this._namespace = HzAnimResource_1.NAMESPACE + this._id;
            this._options = options;
            this._options.to = this._options.to || this._$element;
            this._options.with = this._$.extend(true, HzAnimResource_1._DEFAULT_OPTIONS, this._options.with);
            this._config = config;
            this._assignEvents();
        };
        HzAnimResource.prototype._onEventTriggered = function (e) {
            e.data.instance.run();
        };
        HzAnimResource.prototype.run = function () {
            if (!this.isDisabled()) {
                if (this._options.to) {
                    this._perform(this._options.to, this._options.do, this._options.with)
                        .then(this._onEnd.bind(this))
                        .catch(this._onError.bind(this));
                    if (this._options.with && this._options.with.loop) {
                        this._markAsCompleted();
                    }
                }
                else {
                    var next = true, index = 1;
                    do {
                        var toDo = this._options["to-" + index];
                        if (toDo) {
                        }
                        else {
                            next = false;
                        }
                    } while (next);
                }
            }
        };
        HzAnimResource.prototype._perform = function (to, toDo, config) {
            var seq = new HzAnimSequence_1.HzAnimSequence(this._$);
            seq.activate({
                toElement: to,
                toDo: toDo,
                withConfig: config
            });
            return seq.run();
        };
        HzAnimResource.prototype._assignEvents = function () {
            this._eventEmitter.off("." + HzAnimResource_1.NAMESPACE);
            this._$element.off("." + HzAnimResource_1.NAMESPACE);
            this._$element.on(this._options.on + "." + this._namespace, { instance: this }, this._onEventTriggered);
            this._eventEmitter.on(index_1.ResourceSequence.ON_RESOURCE_STATE_CHANGE + "." + HzAnimResource_1.NAMESPACE, { instance: this }, this._onSequenceStateChange);
        };
        HzAnimResource.prototype._onEnd = function () {
            this._markAsCompleted();
        };
        HzAnimResource.prototype._onError = function () {
        };
        HzAnimResource.prototype._onSequenceStateChange = function (e, resource, state) {
            var $triggers = resource._$(resource._options.to);
            $triggers.removeClass(index_1.ResourceSequence.CLASS_RUNNING + " " + index_1.ResourceSequence.CLASS_COMPLETED + " " + index_1.ResourceSequence.CLASS_WAITING);
            switch (state) {
                case index_1.ResourceSequence.STATES.completed:
                    $triggers.addClass(index_1.ResourceSequence.CLASS_COMPLETED);
                    break;
                case index_1.ResourceSequence.STATES.running:
                    $triggers.addClass(index_1.ResourceSequence.CLASS_RUNNING);
                    break;
                case index_1.ResourceSequence.STATES.waiting:
                    $triggers.addClass(index_1.ResourceSequence.CLASS_WAITING);
                    break;
            }
        };
        HzAnimResource.prototype.disable = function () {
            if (_super.prototype.disable.call(this)) {
                this._$element.attr("disabled", "disabled")
                    .addClass(index_1.ResourceController.CLASS_DISABLED);
                var $triggers = this._$(this._options.to);
                $triggers.attr("disabled", "disabled")
                    .addClass(index_1.ResourceController.CLASS_DISABLED);
            }
        };
        HzAnimResource.prototype.enable = function () {
            if (_super.prototype.enable.call(this)) {
                this._$element.removeAttr("disabled")
                    .removeClass(index_1.ResourceController.CLASS_DISABLED);
                var $triggers = this._$(this._options.to);
                $triggers.removeAttr("disabled")
                    .removeClass(index_1.ResourceController.CLASS_DISABLED);
            }
        };
        HzAnimResource.prototype.getInstance = function () {
            return this;
        };
        return HzAnimResource;
    }(index_1.ResourceController));
    HzAnimResource.NAMESPACE = "hzAnim";
    HzAnimResource._DEFAULT_OPTIONS = {
        duration: 500
    };
    HzAnimResource = HzAnimResource_1 = __decorate([
        index_1.Resource({
            name: "HzAnim",
            dependencies: [
                index_1.$,
                index_1.EventEmitterFactory
            ]
        })
    ], HzAnimResource);
    exports.HzAnimResource = HzAnimResource;
    var HzAnimResource_1;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJIekFuaW1SZXNvdXJjZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7XG4gICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwiQGhhenRpdml0eS9jb3JlL2luZGV4XCIsIFwidmVsb2NpdHktYW5pbWF0ZVwiLCBcInZlbG9jaXR5LWFuaW1hdGUvdmVsb2NpdHkudWlcIiwgXCIuL0h6QW5pbVNlcXVlbmNlXCJdLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIC8qKlxuICAgICAqIEBsaWNlbnNlXG4gICAgICogQ29weXJpZ2h0IERhdmluY2hpLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICAgICAqL1xuICAgIHZhciBpbmRleF8xID0gcmVxdWlyZShcIkBoYXp0aXZpdHkvY29yZS9pbmRleFwiKTtcbiAgICB2YXIgdmVsb2NpdHkgPSByZXF1aXJlKFwidmVsb2NpdHktYW5pbWF0ZVwiKTtcbiAgICB2YXIgdmVsb2NpdHl1aSA9IHJlcXVpcmUoXCJ2ZWxvY2l0eS1hbmltYXRlL3ZlbG9jaXR5LnVpXCIpO1xuICAgIHZhciBIekFuaW1TZXF1ZW5jZV8xID0gcmVxdWlyZShcIi4vSHpBbmltU2VxdWVuY2VcIik7XG4gICAgdmVsb2NpdHk7XG4gICAgdmVsb2NpdHl1aTtcbiAgICB2YXIgSHpBbmltUmVzb3VyY2UgPSBIekFuaW1SZXNvdXJjZV8xID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKEh6QW5pbVJlc291cmNlLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBIekFuaW1SZXNvdXJjZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICAgICAgfVxuICAgICAgICBIekFuaW1SZXNvdXJjZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zLCBjb25maWcpIHtcbiAgICAgICAgICAgIHRoaXMuX2lkID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICB0aGlzLl9uYW1lc3BhY2UgPSBIekFuaW1SZXNvdXJjZV8xLk5BTUVTUEFDRSArIHRoaXMuX2lkO1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLnRvID0gdGhpcy5fb3B0aW9ucy50byB8fCB0aGlzLl8kZWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMud2l0aCA9IHRoaXMuXyQuZXh0ZW5kKHRydWUsIEh6QW5pbVJlc291cmNlXzEuX0RFRkFVTFRfT1BUSU9OUywgdGhpcy5fb3B0aW9ucy53aXRoKTtcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgICAgIHRoaXMuX2Fzc2lnbkV2ZW50cygpO1xuICAgICAgICB9O1xuICAgICAgICBIekFuaW1SZXNvdXJjZS5wcm90b3R5cGUuX29uRXZlbnRUcmlnZ2VyZWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5kYXRhLmluc3RhbmNlLnJ1bigpO1xuICAgICAgICB9O1xuICAgICAgICBIekFuaW1SZXNvdXJjZS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzRGlzYWJsZWQoKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnRvKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BlcmZvcm0odGhpcy5fb3B0aW9ucy50bywgdGhpcy5fb3B0aW9ucy5kbywgdGhpcy5fb3B0aW9ucy53aXRoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4odGhpcy5fb25FbmQuYmluZCh0aGlzKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCh0aGlzLl9vbkVycm9yLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fb3B0aW9ucy53aXRoICYmIHRoaXMuX29wdGlvbnMud2l0aC5sb29wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXJrQXNDb21wbGV0ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5leHQgPSB0cnVlLCBpbmRleCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b0RvID0gdGhpcy5fb3B0aW9uc1tcInRvLVwiICsgaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRvRG8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSB3aGlsZSAobmV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBIekFuaW1SZXNvdXJjZS5wcm90b3R5cGUuX3BlcmZvcm0gPSBmdW5jdGlvbiAodG8sIHRvRG8sIGNvbmZpZykge1xuICAgICAgICAgICAgdmFyIHNlcSA9IG5ldyBIekFuaW1TZXF1ZW5jZV8xLkh6QW5pbVNlcXVlbmNlKHRoaXMuXyQpO1xuICAgICAgICAgICAgc2VxLmFjdGl2YXRlKHtcbiAgICAgICAgICAgICAgICB0b0VsZW1lbnQ6IHRvLFxuICAgICAgICAgICAgICAgIHRvRG86IHRvRG8sXG4gICAgICAgICAgICAgICAgd2l0aENvbmZpZzogY29uZmlnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBzZXEucnVuKCk7XG4gICAgICAgIH07XG4gICAgICAgIEh6QW5pbVJlc291cmNlLnByb3RvdHlwZS5fYXNzaWduRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLm9mZihcIi5cIiArIEh6QW5pbVJlc291cmNlXzEuTkFNRVNQQUNFKTtcbiAgICAgICAgICAgIHRoaXMuXyRlbGVtZW50Lm9mZihcIi5cIiArIEh6QW5pbVJlc291cmNlXzEuTkFNRVNQQUNFKTtcbiAgICAgICAgICAgIHRoaXMuXyRlbGVtZW50Lm9uKHRoaXMuX29wdGlvbnMub24gKyBcIi5cIiArIHRoaXMuX25hbWVzcGFjZSwgeyBpbnN0YW5jZTogdGhpcyB9LCB0aGlzLl9vbkV2ZW50VHJpZ2dlcmVkKTtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50RW1pdHRlci5vbihpbmRleF8xLlJlc291cmNlU2VxdWVuY2UuT05fUkVTT1VSQ0VfU1RBVEVfQ0hBTkdFICsgXCIuXCIgKyBIekFuaW1SZXNvdXJjZV8xLk5BTUVTUEFDRSwgeyBpbnN0YW5jZTogdGhpcyB9LCB0aGlzLl9vblNlcXVlbmNlU3RhdGVDaGFuZ2UpO1xuICAgICAgICB9O1xuICAgICAgICBIekFuaW1SZXNvdXJjZS5wcm90b3R5cGUuX29uRW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fbWFya0FzQ29tcGxldGVkKCk7XG4gICAgICAgIH07XG4gICAgICAgIEh6QW5pbVJlc291cmNlLnByb3RvdHlwZS5fb25FcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfTtcbiAgICAgICAgSHpBbmltUmVzb3VyY2UucHJvdG90eXBlLl9vblNlcXVlbmNlU3RhdGVDaGFuZ2UgPSBmdW5jdGlvbiAoZSwgcmVzb3VyY2UsIHN0YXRlKSB7XG4gICAgICAgICAgICB2YXIgJHRyaWdnZXJzID0gcmVzb3VyY2UuXyQocmVzb3VyY2UuX29wdGlvbnMudG8pO1xuICAgICAgICAgICAgJHRyaWdnZXJzLnJlbW92ZUNsYXNzKGluZGV4XzEuUmVzb3VyY2VTZXF1ZW5jZS5DTEFTU19SVU5OSU5HICsgXCIgXCIgKyBpbmRleF8xLlJlc291cmNlU2VxdWVuY2UuQ0xBU1NfQ09NUExFVEVEICsgXCIgXCIgKyBpbmRleF8xLlJlc291cmNlU2VxdWVuY2UuQ0xBU1NfV0FJVElORyk7XG4gICAgICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBpbmRleF8xLlJlc291cmNlU2VxdWVuY2UuU1RBVEVTLmNvbXBsZXRlZDpcbiAgICAgICAgICAgICAgICAgICAgJHRyaWdnZXJzLmFkZENsYXNzKGluZGV4XzEuUmVzb3VyY2VTZXF1ZW5jZS5DTEFTU19DT01QTEVURUQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGluZGV4XzEuUmVzb3VyY2VTZXF1ZW5jZS5TVEFURVMucnVubmluZzpcbiAgICAgICAgICAgICAgICAgICAgJHRyaWdnZXJzLmFkZENsYXNzKGluZGV4XzEuUmVzb3VyY2VTZXF1ZW5jZS5DTEFTU19SVU5OSU5HKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBpbmRleF8xLlJlc291cmNlU2VxdWVuY2UuU1RBVEVTLndhaXRpbmc6XG4gICAgICAgICAgICAgICAgICAgICR0cmlnZ2Vycy5hZGRDbGFzcyhpbmRleF8xLlJlc291cmNlU2VxdWVuY2UuQ0xBU1NfV0FJVElORyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBIekFuaW1SZXNvdXJjZS5wcm90b3R5cGUuZGlzYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChfc3VwZXIucHJvdG90eXBlLmRpc2FibGUuY2FsbCh0aGlzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuXyRlbGVtZW50LmF0dHIoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhpbmRleF8xLlJlc291cmNlQ29udHJvbGxlci5DTEFTU19ESVNBQkxFRCk7XG4gICAgICAgICAgICAgICAgdmFyICR0cmlnZ2VycyA9IHRoaXMuXyQodGhpcy5fb3B0aW9ucy50byk7XG4gICAgICAgICAgICAgICAgJHRyaWdnZXJzLmF0dHIoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhpbmRleF8xLlJlc291cmNlQ29udHJvbGxlci5DTEFTU19ESVNBQkxFRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIEh6QW5pbVJlc291cmNlLnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoX3N1cGVyLnByb3RvdHlwZS5lbmFibGUuY2FsbCh0aGlzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuXyRlbGVtZW50LnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoaW5kZXhfMS5SZXNvdXJjZUNvbnRyb2xsZXIuQ0xBU1NfRElTQUJMRUQpO1xuICAgICAgICAgICAgICAgIHZhciAkdHJpZ2dlcnMgPSB0aGlzLl8kKHRoaXMuX29wdGlvbnMudG8pO1xuICAgICAgICAgICAgICAgICR0cmlnZ2Vycy5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIilcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGluZGV4XzEuUmVzb3VyY2VDb250cm9sbGVyLkNMQVNTX0RJU0FCTEVEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgSHpBbmltUmVzb3VyY2UucHJvdG90eXBlLmdldEluc3RhbmNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBIekFuaW1SZXNvdXJjZTtcbiAgICB9KGluZGV4XzEuUmVzb3VyY2VDb250cm9sbGVyKSk7XG4gICAgSHpBbmltUmVzb3VyY2UuTkFNRVNQQUNFID0gXCJoekFuaW1cIjtcbiAgICBIekFuaW1SZXNvdXJjZS5fREVGQVVMVF9PUFRJT05TID0ge1xuICAgICAgICBkdXJhdGlvbjogNTAwXG4gICAgfTtcbiAgICBIekFuaW1SZXNvdXJjZSA9IEh6QW5pbVJlc291cmNlXzEgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgaW5kZXhfMS5SZXNvdXJjZSh7XG4gICAgICAgICAgICBuYW1lOiBcIkh6QW5pbVwiLFxuICAgICAgICAgICAgZGVwZW5kZW5jaWVzOiBbXG4gICAgICAgICAgICAgICAgaW5kZXhfMS4kLFxuICAgICAgICAgICAgICAgIGluZGV4XzEuRXZlbnRFbWl0dGVyRmFjdG9yeVxuICAgICAgICAgICAgXVxuICAgICAgICB9KVxuICAgIF0sIEh6QW5pbVJlc291cmNlKTtcbiAgICBleHBvcnRzLkh6QW5pbVJlc291cmNlID0gSHpBbmltUmVzb3VyY2U7XG4gICAgdmFyIEh6QW5pbVJlc291cmNlXzE7XG59KTtcbiJdLCJmaWxlIjoiSHpBbmltUmVzb3VyY2UuanMifQ==
