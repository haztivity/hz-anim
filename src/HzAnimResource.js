System.register(["@haztivity/core/index", "velocity-animate", "velocity-animate/velocity.ui"], function (exports_1, context_1) {
    "use strict";
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
    var __moduleName = context_1 && context_1.id;
    var index_1, velocity, velocityui, HzAnimResource, HzAnimResource_1;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (velocity_1) {
                velocity = velocity_1;
            },
            function (velocityui_1) {
                velocityui = velocityui_1;
            }
        ],
        execute: function () {
            velocity;
            velocityui;
            HzAnimResource = HzAnimResource_1 = (function (_super) {
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
                        this._perform(this._options.to, this._options.do, this._options.with).then(this._onEnd.bind(this)).catch(this._onError.bind(this));
                        if (this._options.with && this._options.with.loop) {
                            this._markAsCompleted();
                        }
                    }
                };
                HzAnimResource.prototype._onStepComplete = function (config, defer) {
                    if (config && config.toDo) {
                        if (config.toDo.add) {
                            var add = config.toDo.add;
                            for (var key in add) {
                                if (key == "class") {
                                    config.to.addClass(add[key]);
                                }
                                else {
                                    config.to.attr(key, add[key]);
                                }
                            }
                        }
                        if (config.toDo.remove) {
                            var remove = config.toDo.remove;
                            for (var key in remove) {
                                if (key == "class") {
                                    config.to.removeClass(remove[key]);
                                }
                                else {
                                    config.to.removeAttr(key, remove[key]);
                                }
                            }
                        }
                    }
                    if (defer) {
                        defer.resolveWith(this);
                    }
                };
                HzAnimResource.prototype._perform = function (to, toDo, config) {
                    var deferred = this._$.Deferred();
                    to = index_1.$(to);
                    if (Array.isArray(toDo)) {
                        var seq = [], doConfig = toDo, withConfig = config || { duration: 500 };
                        for (var doIndex = 0, doLength = doConfig.length; doIndex < doLength; doIndex++) {
                            var currentDo = doConfig[doIndex], opts = index_1.$.extend(true, {}, withConfig), hzanim = {
                                to: to,
                                toDo: currentDo,
                                withConfig: withConfig
                            };
                            if (currentDo.add || currentDo.remove) {
                                opts.complete = this._onStepComplete.bind(this, hzanim, null);
                            }
                            seq.push({
                                e: to,
                                p: currentDo,
                                o: opts,
                                hzanim: hzanim
                            });
                        }
                        var lastSeq = seq[seq.length - 1];
                        lastSeq.o.complete = this._onStepComplete.bind(this, lastSeq.hzanim, deferred);
                        this._$.Velocity.RunSequence(seq);
                    }
                    else {
                        var hzanim = {
                            to: to,
                            toDo: toDo,
                            withConfig: config
                        };
                        this._$.Velocity.animate(to, toDo, config).then(this._onStepComplete.bind(this, hzanim, deferred));
                    }
                    return deferred.promise();
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
            exports_1("HzAnimResource", HzAnimResource);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHpBbmltUmVzb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJIekFuaW1SZXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBT0EsUUFBUSxDQUFDO1lBQ1QsVUFBVSxDQUFDO1lBZ0JFLGNBQWM7Z0JBQVMsa0NBQWtCO2dCQUF0RDs7Z0JBMEpBLENBQUM7Z0JBbEpVLDZCQUFJLEdBQVgsVUFBWSxPQUFZLEVBQUUsTUFBWTtvQkFDbEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLGdCQUFjLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQ3RELElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO29CQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsZ0JBQWMsQ0FBQyxnQkFBZ0IsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM3RixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztvQkFDdEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN6QixDQUFDO2dCQUVTLDBDQUFpQixHQUEzQixVQUE0QixDQUFDO29CQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDMUIsQ0FBQztnQkFFTSw0QkFBRyxHQUFWO29CQUNJLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDcEIs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