"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
require("velocity-animate");
require("velocity-animate/velocity.ui");
var HzAnimSequence = (function () {
    function HzAnimSequence(_$) {
        this._$ = _$;
        this._complete = false;
    }
    HzAnimSequence.prototype._generateConfig = function (toElement, toDo, config) {
        toElement = this._$(toElement);
        var seq = [], doConfig = toDo, withConfig = config || { duration: 500 };
        for (var doIndex = 0, doLength = doConfig.length; doIndex < doLength; doIndex++) {
            var currentDo = doConfig[doIndex], opts = $.extend(true, {}, withConfig), stepConfig = {
                toElement: toElement,
                toDo: currentDo,
                withConfig: withConfig
            };
            if (currentDo.add || currentDo.remove) {
                opts.complete = this._onStepComplete.bind(this, stepConfig, false);
            }
            seq.push({
                e: toElement,
                p: currentDo,
                o: opts,
                stepConfig: stepConfig
            });
        }
        var lastSeq = seq[seq.length - 1];
        lastSeq.o.complete = this._onStepComplete.bind(this, lastSeq.stepConfig, true);
        return seq;
    };
    HzAnimSequence.prototype.activate = function (stepConfig, config) {
        if (config === void 0) { config = {}; }
        this._config = config;
        this._stepConfig = stepConfig;
        var toElement = stepConfig.toElement, toDo = stepConfig.toDo, withConfig = stepConfig.withConfig;
        if (!Array.isArray(toDo)) {
            toDo = [
                toDo
            ];
        }
        this._sequence = this._generateConfig(toElement, toDo, withConfig);
    };
    HzAnimSequence.prototype._onStepComplete = function (stepConfig, isLast) {
        if (stepConfig && stepConfig.toDo) {
            if (stepConfig.toDo.add) {
                var add = stepConfig.toDo.add;
                for (var key in add) {
                    if (key == "class") {
                        stepConfig.toElement.addClass(add[key]);
                    }
                    else {
                        stepConfig.toElement.attr(key, add[key]);
                    }
                }
            }
            if (stepConfig.toDo.remove) {
                var remove = stepConfig.toDo.remove;
                for (var key in remove) {
                    if (key == "class") {
                        stepConfig.toElement.removeClass(remove[key]);
                    }
                    else {
                        stepConfig.toElement.removeAttr(key);
                    }
                }
            }
        }
        if (isLast) {
            this._deferred.resolve();
        }
    };
    HzAnimSequence.prototype.run = function () {
        this._deferred = $.Deferred();
        if (this._config.multiple == true || this._complete == false) {
            this._$.Velocity.RunSequence(this._sequence);
        }
        else {
            this._deferred.reject();
        }
        return this._deferred.promise();
    };
    HzAnimSequence.prototype.getPromise = function () {
        return this._deferred.promise();
    };
    HzAnimSequence.prototype.getConfig = function () {
        return this._config;
    };
    return HzAnimSequence;
}());
exports.HzAnimSequence = HzAnimSequence;
//# sourceMappingURL=HzAnimSequence.js.map