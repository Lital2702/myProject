var PriorityTypes;
(function (PriorityTypes) {
    PriorityTypes[PriorityTypes["low"] = 0] = "low";
    PriorityTypes[PriorityTypes["medium"] = 1] = "medium";
    PriorityTypes[PriorityTypes["high"] = 2] = "high";
})(PriorityTypes || (PriorityTypes = {}));
var TaskManager = /** @class */ (function () {
    function TaskManager() {
        var _this = this;
        var _a;
        this.tasks = [
            {
                id: 3,
                title: 'משימה ראשונה',
                addedTime: '2023-07-11 11:11:22',
                description: 'לערוך רשימת קניות',
                isCompleted: false,
                priority: PriorityTypes.low,
            },
            {
                id: 8,
                title: 'משימה שנייה',
                addedTime: '2023-07-11 11:11:22',
                description: 'לסדר את הבית',
                isCompleted: false,
                priority: PriorityTypes.high,
            },
            {
                id: 15,
                title: 'משימה שלישית',
                addedTime: '2023-07-18 12:11:22',
                description: '',
                isCompleted: false,
                priority: PriorityTypes.medium,
            },
        ];
        this.showTasks();
        var elem = document.querySelector("header");
        (_a = elem === null || elem === void 0 ? void 0 : elem.querySelector("button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (ev) {
            var elemTitle = elem === null || elem === void 0 ? void 0 : elem.querySelector("input");
            var elemPriority = elem === null || elem === void 0 ? void 0 : elem.querySelector("select");
            var title = (elemTitle === null || elemTitle === void 0 ? void 0 : elemTitle.value) || '';
            var priority = (elemPriority === null || elemPriority === void 0 ? void 0 : elemPriority.value) || '';
            if (elemTitle) {
                elemTitle.value = "";
            }
            if (elemPriority) {
                elemPriority.value = "";
            }
            _this.addTask(title, +priority);
        });
    }
    TaskManager.prototype.addTask = function (title, priority) {
        var ids = this.tasks.map(function (x) { return x.id; });
        var max = Math.max.apply(Math, ids);
        var now = new Date();
        var y = now.getFullYear();
        var m = now.getMonth() + 1;
        var d = now.getDate();
        var h = now.getHours();
        var mn = now.getMinutes();
        var s = now.getSeconds();
        var addedTime = "".concat(y, "-").concat((m < 10 ? '0' + m : m), "-").concat(d, " ").concat(h, ":").concat(mn, ":").concat(s);
        this.tasks.push({
            id: max + 1,
            title: title,
            addedTime: addedTime,
            description: '',
            isCompleted: false,
            priority: priority || PriorityTypes.low,
        });
        this.showTasks();
    };
    TaskManager.prototype.editTask = function () {
    };
    TaskManager.prototype.removeTask = function (taskId) {
        var i = this.tasks.findIndex(function (x) { return x.id == taskId; });
        this.tasks.splice(i, 1);
        this.showTasks();
    };
    TaskManager.prototype.completeTask = function (taskId) {
        var item = this.tasks.find(function (x) { return x.id == taskId; });
        if (item) {
            item.isCompleted = true;
        }
        this.showTasks();
    };
    TaskManager.prototype.unCompleteTask = function (taskId) {
        var item = this.tasks.find(function (x) { return x.id == taskId; });
        if (item) {
            item.isCompleted = false;
        }
        this.showTasks();
    };
    TaskManager.prototype.showTasks = function () {
        var _this = this;
        var elem = document.querySelector("div.tasks");
        if (elem) {
            elem.innerHTML = "";
        }
        this.tasks.forEach(function (t) {
            var _a, _b, _c;
            var div = document.createElement("div");
            if (t.isCompleted) {
                div.classList.add('completed');
            }
            switch (t.priority) {
                case PriorityTypes.low:
                    div.classList.add('low');
                    break;
                case PriorityTypes.medium:
                    div.classList.add('medium');
                    break;
                case PriorityTypes.high:
                    div.classList.add('high');
                    break;
            }
            div.innerHTML = "\n                <h3>".concat(t.title, "</h3>\n                <p><b>\u05D6\u05DE\u05DF \u05D9\u05E6\u05D9\u05E8\u05D4:</b> ").concat(t.addedTime, "</p>\n                <p><b>\u05EA\u05D9\u05D0\u05D5\u05E8:</b> ").concat(t.description || '*אין הערה*', "</p>\n\n                <footer>\n                    <button class=\"remove\">\u05DE\u05D7\u05E7</button>\n                    ").concat(t.isCompleted ? '<button class="uncomplete">לא בוצע</button>' : '<button class="complete">בוצע</button>', "\n                </footer>\n            ");
            (_a = div.querySelector('.remove')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { return _this.removeTask(t.id); });
            (_b = div.querySelector('.complete')) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () { return _this.completeTask(t.id); });
            (_c = div.querySelector('.uncomplete')) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () { return _this.unCompleteTask(t.id); });
            elem === null || elem === void 0 ? void 0 : elem.appendChild(div);
        });
    };
    return TaskManager;
}());
var tasks = new TaskManager;
