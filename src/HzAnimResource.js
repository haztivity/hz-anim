System.register(["@haztivity/core/index", "velocity-animate", "velocity-animate/velocity.ui", "./HzAnimSequence"], function (exports_1, context_1) {
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
    var index_1, velocity, velocityui, HzAnimSequence_1, HzAnimResource, HzAnimResource_1;
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
            },
            function (HzAnimSequence_1_1) {
                HzAnimSequence_1 = HzAnimSequence_1_1;
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
                        º;
                        this._perform(this._options.to, this._options.do, this._options.with).then(this._onEnd.bind(this)).catch(this._onError.bind(this));
                        if (this._options.with && this._options.with.loop) {
                            this._markAsCompleted();
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
            exports_1("HzAnimResource", HzAnimResource);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHpBbmltUmVzb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJIekFuaW1SZXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBUUEsUUFBUSxDQUFDO1lBQ1QsVUFBVSxDQUFDO1lBaUJFLGNBQWM7Z0JBQVMsa0NBQWtCO2dCQUF0RDs7Z0JBNEZBLENBQUM7Z0JBckZVLDZCQUFJLEdBQVgsVUFBWSxPQUFZLEVBQUUsTUFBWTtvQkFDbEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLGdCQUFjLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQ3RELElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO29CQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsZ0JBQWMsQ0FBQyxnQkFBZ0IsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM3RixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztvQkFDdEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN6QixDQUFDO2dCQUVTLDBDQUFpQixHQUEzQixVQUE0QixDQUFDO29CQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDMUIsQ0FBQztnQkFFTSw0QkFBRyxHQUFWO29CQUNJLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFB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