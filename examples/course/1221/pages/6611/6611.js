System.register(["@haztivity/core/index", "./6611.html!text", "../../../../../src/HzAnim"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var index_1, _6611_html_text_1, HzAnim_1, page;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (_6611_html_text_1_1) {
                _6611_html_text_1 = _6611_html_text_1_1;
            },
            function (HzAnim_1_1) {
                HzAnim_1 = HzAnim_1_1;
            }
        ],
        execute: function () {
            page = index_1.PageFactory.createPage({
                name: "6611",
                resources: [
                    HzAnim_1.HzAnim
                ],
                template: _6611_html_text_1.default
            });
            exports_1("page6611", page);
            page.on(index_1.PageController.ON_RENDERING, null, function (eventObject, template, pageController) {
                console.log(pageController.options.name + " rendering");
            });
            page.on(index_1.PageController.ON_RENDERED, null, function (eventObject, $page, pageController) {
                console.log(pageController.options.name + " rendered");
            });
            page.on(index_1.PageController.ON_SHOW, null, function (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) {
                console.log(pageController.options.name + " show start");
            });
            page.on(index_1.PageController.ON_SHOWN, null, function (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) {
                console.log(pageController.options.name + " show end");
            });
            page.on(index_1.PageController.ON_COMPLETE_CHANGE, null, function (eventObject, isCompleted, $page, pageController) {
                console.log(pageController.options.name + " complete change");
            });
            page.on(index_1.PageController.ON_DESTROY, null, function (eventObject, $page, pageController) {
                console.log(pageController.options.name + " destroy");
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNjYxMS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIjY2MTEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFPSSxJQUFJLEdBQWlCLG1CQUFXLENBQUMsVUFBVSxDQUMzQztnQkFDSSxJQUFJLEVBQUUsTUFBTTtnQkFDWixTQUFTLEVBQUU7b0JBQ1AsZUFBTTtpQkFDVDtnQkFDRCxRQUFRLEVBQUUseUJBQVE7YUFDckIsQ0FDSixDQUFDOztZQUNGLElBQUksQ0FBQyxFQUFFLENBQ0gsc0JBQWMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLFVBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxjQUFjO2dCQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxlQUFZLENBQUMsQ0FBQztZQUM1RCxDQUFDLENBQ0osQ0FBQztZQUNGLElBQUksQ0FBQyxFQUFFLENBQ0gsc0JBQWMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLFVBQUMsV0FBVyxFQUFFLEtBQWEsRUFBRSxjQUE4QjtnQkFDekYsT0FBTyxDQUFDLEdBQUcsQ0FBSSxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksY0FBVyxDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUNKLENBQUM7WUFDRixJQUFJLENBQUMsRUFBRSxDQUNILHNCQUFjLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFFLGNBQWM7Z0JBQ2hHLE9BQU8sQ0FBQyxHQUFHLENBQUksY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGdCQUFhLENBQUMsQ0FBQztZQUM3RCxDQUFDLENBQ0osQ0FBQztZQUNGLElBQUksQ0FBQyxFQUFFLENBQ0gsc0JBQWMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLFVBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsdUJBQXVCLEVBQUUsY0FBYztnQkFDakcsT0FBTyxDQUFDLEdBQUcsQ0FBSSxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksY0FBVyxDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUNKLENBQUM7WUFDRixJQUFJLENBQUMsRUFBRSxDQUNILHNCQUFjLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLFVBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsY0FBYztnQkFDckYsT0FBTyxDQUFDLEdBQUcsQ0FBSSxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUkscUJBQWtCLENBQUMsQ0FBQztZQUNsRSxDQUFDLENBQ0osQ0FBQztZQUNGLElBQUksQ0FBQyxFQUFFLENBQ0gsc0JBQWMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLFVBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxjQUFjO2dCQUNoRSxPQUFPLENBQUMsR0FBRyxDQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxhQUFVLENBQUMsQ0FBQztZQUMxRCxDQUFDLENBQ0osQ0FBQztRQUVGLENBQUMifQ==