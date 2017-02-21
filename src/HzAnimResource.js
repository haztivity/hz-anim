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
        HzAnimResource.prototype._getOptionsFor = function (seqIndex) {
            var seq = {
                toElement: this._options["to-" + seqIndex] || this._options.to,
                toDo: this._options["do-" + seqIndex],
                withConfig: this._options["with-" + seqIndex] || this._options.with
            };
            return seq.toDo != undefined ? seq : null;
        };
        HzAnimResource.prototype._onSequenceStepCompleted = function (stepIndex, sequence) {
            if (sequence[stepIndex]) {
                this._runSequenceStep(stepIndex, sequence);
            }
            else {
                this._markAsCompleted();
            }
        };
        HzAnimResource.prototype._runSequenceStep = function (stepIndex, sequence) {
            var step = sequence[stepIndex];
            if (step) {
                var config = step.getConfig();
                step.run().then(this._onSequenceStepCompleted.bind(this, stepIndex + 1, sequence));
                if (config.withConfig && config.withConfig.loop) {
                    this._markAsCompleted();
                }
            }
        };
        HzAnimResource.prototype._runSequence = function (sequence) {
            this._runSequenceStep(0, sequence);
        };
        HzAnimResource.prototype.run = function () {
            if (!this.isDisabled()) {
                if (this._options.to) {
                    var sequence = [this._sequenceFactory(this._options.to, this._options.do, this._options.with)];
                    var next = true, index = 1;
                    do {
                        index++;
                        var config = this._getOptionsFor(index);
                        if (config != undefined) {
                            sequence.push(this._sequenceFactory(config.toElement, config.toDo, config.withConfig));
                        }
                        else {
                            next = false;
                        }
                    } while (next);
                    this._runSequence(sequence);
                }
            }
        };
        HzAnimResource.prototype._sequenceFactory = function (to, toDo, config) {
            var seq = new HzAnimSequence_1.HzAnimSequence(this._$);
            seq.activate({
                toElement: to,
                toDo: toDo,
                withConfig: config
            });
            return seq;
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
//# sourceMappingURL=HzAnimResource.js.map