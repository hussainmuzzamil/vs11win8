/// <reference path="//Microsoft.WinJS.0.6/js/base.js" />
/// <reference path="//Microsoft.WinJS.0.6/js/ui.js" />

(function () {
    "use strict";

    WinJS.Namespace.define("UI.List", {
        displayListItems: function () {

            var templateElement = document.getElementById("itemTemplate");
            var targetElement = document.getElementById("itemBody");

            WinJS.Utilities.empty(targetElement);

            var list = ViewModel.UserData.getItems();

            for (var i = 0; i < list.length; i++) {
                templateElement.winControl.render(list.getAt(i), targetElement);
            }

            WinJS.Utilities.children(targetElement).listen("click", function (e) {
                ViewModel.State.selectedItemIndex = this.rowIndex - 1;
                WinJS.Utilities.children(targetElement).removeClass("selected");
                WinJS.Utilities.addClass(this, "selected");
            });
        },

        setupListEvents: function () {
            var eventTypes = ["itemchanged", "iteminserted", "itemmoved", "itemremoved"];
            var itemsList = ViewModel.UserData.getItems();
            eventTypes.forEach(function (type) {
                itemsList.addEventListener(type, UI.List.displayListItems);
            });
        },
    });
})();
