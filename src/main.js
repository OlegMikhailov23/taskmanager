import {createMenuTemplate} from "./components/site-menu.js";
import {createSortTemplate} from "./components/sorting.js";
import {createFilterTemplate} from "./components/filter.js";
import {createBoardTemplate} from "./components/board.js";
import {createLoadmoreTemplate} from "./components/load-more-btn.js";
import {createTaskTemplate} from "./components/task.js";
import {createTaskEditTemplate} from "./components/task-edit.js";
import {generateFilters} from "./mock/filter.js";
import {generateTasks} from "./mock/task.js";

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;


const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

render(siteHeaderElement, createMenuTemplate());

render(siteMainElement, createFilterTemplate(filters));

render(siteMainElement, createBoardTemplate());

const siteBoardContainer = document.querySelector(`.board`);

render(siteBoardContainer, createSortTemplate(), `afterbegin`);

const siteBoardElement = document.querySelector(`.board__tasks`);

render(siteBoardElement, createTaskEditTemplate(tasks[0]));

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

for (let i = 1; i < showingTasksCount; i++) {
  render(siteBoardElement, createTaskTemplate(tasks[i]));
}

render(siteBoardContainer, createLoadmoreTemplate(), `beforeend`);

const loadMoreButton = siteBoardContainer.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
       .forEach((task) => render(siteBoardElement, createTaskTemplate(task), `beforeend`));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});

