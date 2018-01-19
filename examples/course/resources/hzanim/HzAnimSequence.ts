/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import "velocity-animate";
import "velocity-animate/velocity.ui";
export interface IStepConfig{
    toElement:JQuery;
    toDo:any;
    withConfig:any;
}
export class HzAnimSequence{
    protected _complete:boolean = false;
    protected _sequence:any;
    protected _config:any;
    protected _deferred:JQueryDeferred<any>;
    protected _stepConfig:IStepConfig;
    constructor(protected _$:JQueryStatic){

    }
    _generateConfig(toElement,toDo,config){
        toElement = this._$(toElement);
        let seq = [],
            doConfig = toDo,
            withConfig = config || {duration: 500};
        for (let doIndex = 0, doLength = doConfig.length; doIndex < doLength; doIndex++) {
            let currentDo = doConfig[doIndex],
                opts = $.extend(true, {}, withConfig),
                stepConfig:IStepConfig = {
                    toElement: toElement,
                    toDo: currentDo,
                    withConfig: withConfig
                };
            if (currentDo.add || currentDo.remove) {
                opts.complete = this._onStepComplete.bind(this, stepConfig,false);
            }
            seq.push(
                {
                    e: toElement,
                    p: currentDo,
                    o: opts,
                    stepConfig: stepConfig
                }
            );

        }
        let lastSeq = seq[seq.length - 1];
        lastSeq.o.complete = this._onStepComplete.bind(this, lastSeq.stepConfig,true);
        return seq;
    }
    activate(stepConfig:IStepConfig,config={}){
        this._config = config;
        this._stepConfig = stepConfig;
        let {toElement,toDo,withConfig} = stepConfig;
        if (!Array.isArray(toDo)) {
            toDo = [
                toDo
            ];

        }
        this._sequence = this._generateConfig(toElement,toDo,withConfig);
    }
    _onStepComplete(stepConfig:IStepConfig,isLast){
        if(stepConfig && stepConfig.toDo) {
            if (stepConfig.toDo.add) {
                let add = stepConfig.toDo.add;
                for(let key in add){
                    if(key == "class"){
                        stepConfig.toElement.addClass(add[key]);
                    }else{
                        stepConfig.toElement.attr(key,add[key]);
                    }
                }
            }
            if (stepConfig.toDo.remove) {
                let remove = stepConfig.toDo.remove;
                for(let key in remove){
                    if(key == "class"){
                        stepConfig.toElement.removeClass(remove[key]);
                    }else{
                        stepConfig.toElement.removeAttr(key);
                    }
                }
            }
        }
        if(isLast){
            this._deferred.resolve();
        }
    }
    run(){
        this._deferred = $.Deferred();
        if(this._config.multiple == true || this._complete == false){
            this._$.Velocity.RunSequence(this._sequence);
        }else{
            this._deferred.reject();
        }
        return this._deferred.promise();
    }
    getPromise(){
        return this._deferred.promise();
    }
    getConfig():IStepConfig{
        return this._stepConfig;
    }
}