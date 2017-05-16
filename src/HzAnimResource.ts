/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {$, EventEmitterFactory, Resource, ResourceController,ResourceSequence} from "@haztivity/core/index";
import * as velocity from "velocity-animate";
import * as velocityui from "velocity-animate/velocity.ui";
import {HzAnimSequence, IStepConfig} from "./HzAnimSequence";
velocity;
velocityui;
interface IOptions {
    on: string;
    do: string|Object;
    to?: string;
    with: any;
}
/**
 * @class HzAnimResource
 * @description Recurso de animación para Haztivity
 * @requires $
 * @requires EventEmitterFactory
 * @extends ResourceController
 */
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

    /**
     * @description Inicializa el objeto al inyectarse
     * @param {any}     options     Opciones
     * @param {any}     config      Configuración
     * @memberof HzAnimresource
     */
    public init(options: any, config?: any): any {
        this._id = new Date().getTime();
        this._namespace = HzAnimResource.NAMESPACE + this._id;
        this._options = options;
        this._options.to = this._options.to || this._$element;
        this._options.with = this._$.extend(true,{},HzAnimResource._DEFAULT_OPTIONS,this._options.with);
        this._config = config;
        this._assignEvents();
    }

    protected _onEventTriggered(e) {
        e.data.instance.run();
    }
    protected _getOptionsFor(seqIndex){
        let seq:IStepConfig = {
            toElement:this._options[`to-${seqIndex}`]||this._options.to,
            toDo:this._options[`do-${seqIndex}`],
            withConfig:this._options[`with-${seqIndex}`]||this._options.with
        };
        return seq.toDo != undefined ? seq : null;
    }
    protected _onSequenceStepCompleted(stepIndex,sequence:HzAnimSequence[]){
        if(sequence[stepIndex]) {
            this._runSequenceStep(stepIndex, sequence);
        }else{
            this._markAsCompleted();
        }
    }
    protected _runSequenceStep(stepIndex,sequence:HzAnimSequence[]){
        let step = sequence[stepIndex];
        if(step){
            let config:IStepConfig = step.getConfig();
            step.run().then(this._onSequenceStepCompleted.bind(this,stepIndex+1,sequence));
            if (config.withConfig && config.withConfig.loop) {
                this._markAsCompleted();
            }
        }

    }
    protected _runSequence(sequence){
        this._runSequenceStep(0,sequence);
    }
    public run() {
        if(!this.isDisabled()) {
            if(this._options.to) {
                let sequence = [this._sequenceFactory(this._options.to, this._options.do, this._options.with)];
                let next = true,
                    index = 1;
                do{
                    index++;
                    let config = this._getOptionsFor(index);
                    if(config != undefined){
                        sequence.push(this._sequenceFactory(config.toElement, config.toDo, config.withConfig));
                    }else{
                        next = false;
                    }
                }while(next);
                this._runSequence(sequence);
            }
        }
    }

    protected _sequenceFactory(to, toDo, config){
        let seq = new HzAnimSequence(this._$);
        seq.activate(
            {
                toElement:to,
                toDo:toDo,
                withConfig:config
            }
        );
        return seq;
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