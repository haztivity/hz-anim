/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {$, EventEmitterFactory, Resource, ResourceController,ResourceSequence} from "@haztivity/core/index";
import * as velocity from "velocity-animate";
import * as velocityui from "velocity-animate/velocity.ui";
import {HzAnimSequence} from "./HzAnimSequence";
velocity;
velocityui;
interface IOptions {
    on: string;
    do: string|Object;
    to?: string;
    with: any;
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

export class HzAnimResource extends ResourceController {
    public static readonly NAMESPACE = "hzAnim";
    protected static readonly _DEFAULT_OPTIONS = {
        duration:500
    };
    protected _id: number;
    protected _namespace: string;
    public init(options: any, config?: any): any {
        this._id = new Date().getTime();
        this._namespace = HzAnimResource.NAMESPACE + this._id;
        this._options = options;
        this._options.to = this._options.to || this._$element;
        this._options.with = this._$.extend(true,HzAnimResource._DEFAULT_OPTIONS,this._options.with);
        this._config = config;
        this._assignEvents();
    }

    protected _onEventTriggered(e) {
        e.data.instance.run();
    }

    public run() {
        if(!this.isDisabled()) {º
            this._perform(this._options.to,this._options.do,this._options.with).then(this._onEnd.bind(this)).catch(this._onError.bind(this));
            if (this._options.with && this._options.with.loop) {
                this._markAsCompleted();
            }
        }
    }

    protected _perform(to,toDo,config){
        let seq = new HzAnimSequence(this._$);
        seq.activate(
            {
                toElement:to,
                toDo:toDo,
                withConfig:config
            }
        );
        return seq.run();
    }

    protected _assignEvents(){
        this._eventEmitter.off("."+HzAnimResource.NAMESPACE);
        this._$element.off("."+HzAnimResource.NAMESPACE);
        this._$element.on(`${this._options.on}.${this._namespace}`, {instance: this}, this._onEventTriggered);
        this._eventEmitter.on(ResourceSequence.ON_RESOURCE_STATE_CHANGE+"."+HzAnimResource.NAMESPACE,{instance:this},this._onSequenceStateChange);
    }
    protected _onEnd() {
        this._markAsCompleted();
    }

    protected _onError() {

    }
    protected _onSequenceStateChange(e,resource,state){
        let $triggers = resource._$(resource._options.to);
        $triggers.removeClass(`${ResourceSequence.CLASS_RUNNING} ${ResourceSequence.CLASS_COMPLETED} ${ResourceSequence.CLASS_WAITING}`);
        switch(state){
            case ResourceSequence.STATES.completed:
                $triggers.addClass(ResourceSequence.CLASS_COMPLETED);
                break;
            case ResourceSequence.STATES.running:
                $triggers.addClass(ResourceSequence.CLASS_RUNNING);
                break;
            case ResourceSequence.STATES.waiting:
                $triggers.addClass(ResourceSequence.CLASS_WAITING);
                break;
        }
    }
    public disable(){
        if(super.disable()){
            this._$element.attr("disabled","disabled")
                .addClass(ResourceController.CLASS_DISABLED);
            let $triggers = this._$(this._options.to);
            $triggers.attr("disabled","disabled")
                     .addClass(ResourceController.CLASS_DISABLED);
        }
    }
    public enable(){
        if(super.enable()){
            this._$element.removeAttr("disabled")
                .removeClass(ResourceController.CLASS_DISABLED);
            let $triggers = this._$(this._options.to);
            $triggers.removeAttr("disabled")
                     .removeClass(ResourceController.CLASS_DISABLED);
        }
    }
    public getInstance(): any {
        return this;
    }

}