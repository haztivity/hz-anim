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
    var index_1, velocity, velocityui, HzAnim, HzAnim_1;
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
            HzAnim = HzAnim_1 = (function (_super) {
                __extends(HzAnim, _super);
                function HzAnim() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                HzAnim.prototype.init = function (options, config) {
                    this._id = new Date().getTime();
                    this._namespace = HzAnim_1.NAMESPACE + this._id;
                    this._options = options;
                    this._options.to = this._options.to || this._$element;
                    this._options.with = this._$.extend(true, HzAnim_1._DEFAULT_OPTIONS, this._options.with);
                    this._config = config;
                    this._$element.on(this._options.on + "." + this._namespace, { instance: this }, this._onEventTriggered);
                };
                HzAnim.prototype._onEventTriggered = function (e) {
                    e.data.instance.run();
                };
                HzAnim.prototype.run = function () {
                    if (this._options.doBefore) {
                        this._$.Velocity.animate(this._$(this._options.to), this._options.doBefore, this._options.withBefore).then(this._onDoBefore.bind(this)).catch(this._onError.bind(this));
                    }
                    else {
                        this._onDoBefore();
                    }
                };
                HzAnim.prototype._onDoBefore = function () {
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
                };
                HzAnim.prototype._onEnd = function () {
                    this._markAsCompleted();
                };
                HzAnim.prototype._onError = function () {
                };
                HzAnim.prototype.getInstance = function () {
                    return this;
                };
                return HzAnim;
            }(index_1.ResourceController));
            HzAnim.NAMESPACE = "hzAnim";
            HzAnim._DEFAULT_OPTIONS = {
                duration: 500
            };
            HzAnim = HzAnim_1 = __decorate([
                index_1.Resource({
                    name: "HzAnim",
                    dependencies: [
                        index_1.$,
                        index_1.EventEmitterFactory
                    ]
                })
            ], HzAnim);
            exports_1("HzAnim", HzAnim);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHpBbmltLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiSHpBbmltLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFPQSxRQUFRLENBQUM7WUFDVCxVQUFVLENBQUM7WUFrQkUsTUFBTTtnQkFBUywwQkFBa0I7Z0JBQTlDOztnQkE2RUEsQ0FBQztnQkFyRVUscUJBQUksR0FBWCxVQUFZLE9BQVksRUFBRSxNQUFZO29CQUNsQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUM5QyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztvQkFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDdEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLFFBQU0sQ0FBQyxnQkFBZ0IsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNyRixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztvQkFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFNBQUksSUFBSSxDQUFDLFVBQVksRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDMUcsQ0FBQztnQkFFUyxrQ0FBaUIsR0FBM0IsVUFBNEIsQ0FBQztvQkFDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JB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