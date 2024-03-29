interface Task {
    id: number;
    title: string;
    description: string;
    addedTime: string;
    priority: PriorityTypes;
    isCompleted: boolean;
}

enum PriorityTypes {
    low,
    medium,
    high,
}

class TaskManager {
    tasks: Task[] = [
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

    constructor() {
        this.showTasks();

        const elem = document.querySelector("header");

        elem?.querySelector("button")?.addEventListener("click", ev => {
            const elemTitle = elem?.querySelector("input");
            const elemPriority = elem?.querySelector("select");

            const title = elemTitle?.value || '';
            const priority = elemPriority?.value || '';

            if (elemTitle) {
                elemTitle.value = "";
            }

            if (elemPriority) {
                elemPriority.value = "";
            }

            this.addTask(title, +priority);
        });
    }

    addTask(title: string, priority?: PriorityTypes) {
        const ids = this.tasks.map(x => x.id);
        const max = Math.max(...ids);

        const now = new Date();
        const y = now.getFullYear();
        const m = now.getMonth() + 1;
        const d = now.getDate();

        const h = now.getHours();
        const mn = now.getMinutes();
        const s = now.getSeconds();

        const addedTime = `${y}-${(m < 10 ? '0' + m : m)}-${d} ${h}:${mn}:${s}`;

        this.tasks.push({
            id: max + 1,
            title,
            addedTime,
            description: '',
            isCompleted: false,
            priority: priority || PriorityTypes.low,
        });

        this.showTasks();
    }

    editTask() {

    }

    removeTask(taskId: number) {
        const i = this.tasks.findIndex(x => x.id == taskId);
        this.tasks.splice(i, 1);

        this.showTasks();
    }

    completeTask(taskId: number) {
        const item = this.tasks.find(x => x.id == taskId);

        if (item) {
            item.isCompleted = true;
        }

        this.showTasks();
    }

    unCompleteTask(taskId: number) {
        const item = this.tasks.find(x => x.id == taskId);

        if (item) {
            item.isCompleted = false;
        }

        this.showTasks();
    }

    showTasks() {
        const elem = document.querySelector("div.tasks");
        
        if (elem) {
            elem.innerHTML = "";
        }

        this.tasks.forEach(t => {
            const div = document.createElement("div");

            if (t.isCompleted) {
                div.classList.add('completed');
            }

            switch (t.priority) {
                case PriorityTypes.low : div.classList.add('low'); break;
                case PriorityTypes.medium : div.classList.add('medium'); break;
                case PriorityTypes.high : div.classList.add('high'); break;
            }

            div.innerHTML = `
                <h3>${t.title}</h3>
                <p><b>זמן יצירה:</b> ${t.addedTime}</p>
                <p><b>תיאור:</b> ${t.description || '*אין הערה*'}</p>

                <footer>
                    <button class="remove">מחק</button>
                    ${t.isCompleted ? '<button class="uncomplete">לא בוצע</button>' : '<button class="complete">בוצע</button>'}
                </footer>
            `;

            div.querySelector('.remove')?.addEventListener("click", () => this.removeTask(t.id));
            div.querySelector('.complete')?.addEventListener("click", () => this.completeTask(t.id));
            div.querySelector('.uncomplete')?.addEventListener("click", () => this.unCompleteTask(t.id));

            elem?.appendChild(div);
        });
    }
}

const tasks = new TaskManager;