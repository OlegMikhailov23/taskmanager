import {createMenuTemplate} from "./components/site-menu.js";
import {createSortTemplate} from "./components/sorting.js";
import {createFilterTemplate} from "./components/filter.js";
import {createBoardTemplate} from "./components/board.js";
import {createTaskTemplate} from "./components/task.js";
import {createTaskEditTemplate} from "./components/task-edit.js";
import {createLoadmoreTemplate} from "./components/load-more-btn.js";

const TASK_COUNT = 33;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createMenuTemplate());

render(siteMainElement, createFilterTemplate());

render(siteMainElement, createBoardTemplate());

const siteBoardContainer = document.querySelector(`.board`);

render(siteBoardContainer, createSortTemplate(), `afterbegin`);

const siteBoardElement = document.querySelector(`.board__tasks`);

render(siteBoardElement, createTaskEditTemplate());

for (let i = 0; i <= TASK_COUNT; i++) {
  render(siteBoardElement, createTaskTemplate());
}

render(siteBoardElement, createLoadmoreTemplate());
