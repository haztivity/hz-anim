"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
var core_1 = require("@haztivity/core");
var velocity = require("velocity-animate");
var velocityui = require("velocity-animate/velocity.ui");
var HzAnimSequence_1 = require("./HzAnimSequence");
velocity;
velocityui;
/**
 * @class HzAnimResource
 * @description Recurso de animación para Haztivity
 * @requires $
 * @requires EventEmitterFactory
 * @extends ResourceController
 */
var HzAnimResource = /** @class */ (function (_super) {
    __extends(HzAnimResource, _super);
    function HzAnimResource() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.running = false;
        return _this;
    }
    HzAnimResource_1 = HzAnimResource;
    /**
     * @description Inicializa el objeto al inyectarse
     * @param {any}     options     Opciones
     * @param {any}     config      Configuración
     * @memberof HzAnimresource
     */
    HzAnimResource.prototype.init = function (options, config) {
        this._id = new Date().getTime();
        this._namespace = HzAnimResource_1.NAMESPACE + this._id;
        this._options = this._$.extend(true, {}, HzAnimResource_1._DEFAULT_OPTIONS, options);
        this._options.to = this._options.to || this._$element;
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
            this.running = false;
        }
    };
    HzAnimResource.prototype._runSequenceStep = function (stepIndex, sequence) {
        var step = sequence[stepIndex];
        if (step) {
            var config = step.getConfig();
            step.run().then(this._onSequenceStepCompleted.bind(this, stepIndex + 1, sequence));
            if (config.withConfig && config.withConfig.loop === true) {
                this._markAsCompleted();
            }
        }
    };
    HzAnimResource.prototype._runSequence = function (sequence) {
        this._runSequenceStep(0, sequence);
    };
    HzAnimResource.prototype.run = function () {
        if (!this.isDisabled() && !this.running && (this.isCompleted() == false || this._options.repeatable)) {
            if (this._options.to) {
                this.running = true;
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
        this._eventEmitter.on(core_1.ResourceSequence.ON_RESOURCE_STATE_CHANGE + "." + HzAnimResource_1.NAMESPACE, { instance: this }, this._onSequenceStateChange);
    };
    HzAnimResource.prototype._onError = function () {
    };
    HzAnimResource.prototype._onSequenceStateChange = function (e, resource, state) {
        var $triggers = resource._$(resource._options.to);
        $triggers.removeClass(core_1.ResourceSequence.CLASS_RUNNING + " " + core_1.ResourceSequence.CLASS_COMPLETED + " " + core_1.ResourceSequence.CLASS_WAITING);
        switch (state) {
            case core_1.ResourceSequence.STATES.completed:
                $triggers.addClass(core_1.ResourceSequence.CLASS_COMPLETED);
                break;
            case core_1.ResourceSequence.STATES.running:
                $triggers.addClass(core_1.ResourceSequence.CLASS_RUNNING);
                break;
            case core_1.ResourceSequence.STATES.waiting:
                $triggers.addClass(core_1.ResourceSequence.CLASS_WAITING);
                break;
        }
    };
    HzAnimResource.prototype.disable = function () {
        if (_super.prototype.disable.call(this)) {
            this._$element.attr("disabled", "disabled")
                .addClass(core_1.ResourceController.CLASS_DISABLED);
            var $triggers = this._$(this._options.to);
            $triggers.attr("disabled", "disabled")
                .addClass(core_1.ResourceController.CLASS_DISABLED);
        }
    };
    HzAnimResource.prototype.enable = function () {
        if (_super.prototype.enable.call(this)) {
            this._$element.removeAttr("disabled")
                .removeClass(core_1.ResourceController.CLASS_DISABLED);
            var $triggers = this._$(this._options.to);
            $triggers.removeAttr("disabled")
                .removeClass(core_1.ResourceController.CLASS_DISABLED);
        }
    };
    HzAnimResource.prototype.getInstance = function () {
        return this;
    };
    HzAnimResource.NAMESPACE = "hzAnim";
    HzAnimResource._DEFAULT_OPTIONS = {
        repeatable: true,
        with: {
            duration: 500
        }
    };
    HzAnimResource = HzAnimResource_1 = __decorate([
        core_1.Resource({
            name: "HzAnim",
            dependencies: [
                core_1.$,
                core_1.EventEmitterFactory
            ]
        })
    ], HzAnimResource);
    return HzAnimResource;
    var HzAnimResource_1;
}(core_1.ResourceController));
exports.HzAnimResource = HzAnimResource;
//# sourceMappingURL=HzAnimResource.js.map