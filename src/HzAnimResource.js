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
                        if (this._options.doBefore) {
                            this._$.Velocity.animate(this._$(this._options.to), this._options.doBefore, this._options.withBefore).then(this._onDoBefore.bind(this)).catch(this._onError.bind(this));
                        }
                        else {
                            this._onDoBefore();
                        }
                    }
                };
                HzAnimResource.prototype._onDoBefore = function () {
                    if (!this.isDisabled()) {
                        if (Array.isArray(this._options.do)) {
                            var seq = [], doConfig = this._options.do, to = index_1.$(this._options.to), withConfig = this._options.with || { duration: 500 };
                            for (var doIndex = 0, doLength = doConfig.length; doIndex < doLength; doIndex++) {
                                var currentDo = doConfig[doIndex];
                                seq.push({
                                    e: to,
                                    p: currentDo,
                                    o: withConfig
                                });
                            }
                            seq[seq.length - 1].o = index_1.$.extend(true, { complete: this._onEnd.bind(this) }, seq[seq.length - 1].o);
                            this._$.Velocity.RunSequence(seq);
                        }
                        else {
                            this._$.Velocity.animate(this._$(this._options.to), this._options.do, this._options.with).then(this._onEnd.bind(this)).catch(this._onError.bind(this));
                            if (this._options.with && this._options.with.loop) {
                                this._markAsCompleted();
                            }
                        }
                    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHpBbmltUmVzb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJIekFuaW1SZXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBT0EsUUFBUSxDQUFDO1lBQ1QsVUFBVSxDQUFDO1lBa0JFLGNBQWM7Z0JBQVMsa0NBQWtCO2dCQUF0RDs7Z0JBc0hBLENBQUM7Z0JBOUdVLDZCQUFJLEdBQVgsVUFBWSxPQUFZLEVBQUUsTUFBWTtvQkFDbEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLGdCQUFjLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQ3RELElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO29CQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsZ0JBQWMsQ0FBQyxnQkFBZ0IsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM3RixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztvQkFDdEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN6QixDQUFDO2dCQUVTLDBDQUFpQixHQUEzQixVQUE0QixDQUFDO29CQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDMUIsQ0FBQztnQkFFTSw0QkFBRyxHQUFWO29CQUNJLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDcEIs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