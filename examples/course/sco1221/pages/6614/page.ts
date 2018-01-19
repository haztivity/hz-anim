/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {PageFactory, PageRegister, PageController} from "@haztivity/core";
import template from "./page.pug";
import * as Prism "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-pug";
/**
 * use import {HzAnimResource} from "@haztivity/hz-anim"
 */
import {HzAnimResource} from "../../../resources/hzanim/HzAnim";
export let page: PageRegister = PageFactory.createPage(
    {
        name: "6614",
        title:"Loop",
        resources: [
            HzAnimResource
        ],
        template: template,
        autoSequence:false
    }
);
page.on(
    PageController.ON_SHOW, null, (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) => {
        Prism.highlightAll(false);
    }
);