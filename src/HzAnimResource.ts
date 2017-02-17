/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {$, EventEmitterFactory, Resource, ResourceController,ResourceSequence} from "@haztivity/core/index";
import * as velocity from "velocity-animate";
import * as velocityui from "velocity-animate/velocity.ui";
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
        if(!this.isDisabled()) {
            this._perform(this._options.to,this._options.do,this._options.with).then(this._onEnd.bind(this)).catch(this._onError.bind(this));
            if (this._options.with && this._options.with.loop) {
                this._markAsCompleted();
            }
        }
    }
    protected _onStepComplete(config,defer?){
        if(config && config.toDo) {
            if (config.toDo.add) {
                let add = config.toDo.add;
                for(let key in add){
                    if(key == "class"){
                        config.to.addClass(add[key]);
                    }else{
                        config.to.attr(key,add[key]);
                    }
                }
            }
            if (config.toDo.remove) {
                let remove = config.toDo.remove;
                for(let key in remove){
                    if(key == "class"){
                        config.to.removeClass(remove[key]);
                    }else{
                        config.to.removeAttr(key,remove[key]);
                    }
                }
            }
        }
        if(defer){
            defer.resolveWith(this);
        }
    }
    protected _perform(to,toDo,config){
        let deferred = this._$.Deferred();
        to = $(to);
        if (Array.isArray(toDo)) {
            let seq = [],
                doConfig = toDo,
                withConfig = config || {duration: 500};
            for (let doIndex = 0, doLength = doConfig.length; doIndex < doLength; doIndex++) {
                let currentDo = doConfig[doIndex],
                    opts = $.extend(true,{},withConfig),
                    hzanim = {
                        to:to,
                        toDo:currentDo,
                        withConfig:withConfig
                    };
                if(currentDo.add || currentDo.remove){
                    opts.complete = this._onStepComplete.bind(this,hzanim,null);
                }
                seq.push(
                    {
                        e: to,
                        p: currentDo,
                        o: opts,
                        hzanim:hzanim
                    }
                );

            }
            let lastSeq = seq[seq.length - 1];
            lastSeq.o.complete = this._onStepComplete.bind(this,lastSeq.hzanim,deferred);
            this._$.Velocity.RunSequence(seq);

        } else {
            let hzanim = {
                to:to,
                toDo:toDo,
                withConfig:config
            };
            this._$.Velocity.animate(
                to,
                toDo,
                config
            ).then(this._onStepComplete.bind(this,hzanim,deferred));
        }
        return deferred.promise();
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