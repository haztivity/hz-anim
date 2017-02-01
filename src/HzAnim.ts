/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {$, EventEmitterFactory, Resource, ResourceController} from "@haztivity/core/index";
import * as velocity from "velocity-animate";
import * as velocityui from "velocity-animate/velocity.ui";
velocity;
velocityui;
interface IOptions {
    on: string;
    do: string|Object;
    to?: string;
    with: any;
    doBefore?: string|Object;
    withBefore?: any;
}
@Resource(
    {
        name: "HzAnim",
        dependencies: [
            $,
            EventEmitterFactory
        ]
    }
)
export class HzAnim extends ResourceController {
    public static readonly NAMESPACE = "hzAnim";
    protected static readonly _DEFAULT_OPTIONS = {
        duration:500
    };
    protected _id: number;
    protected _namespace: string;

    public init(options: any, config?: any): any {
        this._id = new Date().getTime();
        this._namespace = HzAnim.NAMESPACE + this._id;
        this._options = options;
        this._options.to = this._options.to || this._$element;
        this._options.with = this._$.extend(true,HzAnim._DEFAULT_OPTIONS,this._options.with);
        this._config = config;
        this._$element.on(`${this._options.on}.${this._namespace}`, {instance: this}, this._onEventTriggered);
    }

    protected _onEventTriggered(e) {
        e.data.instance.run();
    }

    public run() {
        if (this._options.doBefore) {
            this._$.Velocity.animate(
                this._$(<any>this._options.to),
                this._options.doBefore,
                this._options.withBefore
            ).then(this._onDoBefore.bind(this)).catch(this._onError.bind(this));
        } else {
            this._onDoBefore();
        }
    }

    protected _onDoBefore() {
        if (Array.isArray(this._options.do)) {
            let seq = [],
                doConfig = this._options.do,
                to = $(this._options.to),
                withConfig = this._options.with ||{duration:500};
            for (let doIndex = 0, doLength = doConfig.length; doIndex < doLength; doIndex++) {
                let currentDo = doConfig[doIndex];
                seq.push(
                    {
                        e: to,
                        p: currentDo,
                        o: withConfig
                    }
                );
            }
            seq[seq.length-1].o = $.extend(true,{complete:this._onEnd.bind(this)},seq[seq.length-1].o);
            this._$.Velocity.RunSequence(seq);

        } else {
            this._$.Velocity.animate(
                this._$(this._options.to),
                this._options.do,
                this._options.with
            ).then(this._onEnd.bind(this)).catch(this._onError.bind(this));
            if (this._options.with && this._options.with.loop) {
                this._markAsCompleted();
            }
        }
    }

    protected _onEnd() {
        this._markAsCompleted();
    }

    protected _onError() {

    }

    public getInstance(): any {
        return this;
    }

}