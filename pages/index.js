import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const AddTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = AddTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = AddTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const AddTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: () => {},
});
AddTodoPopup.setEventListeners();
const section = new Section({
  items: [],
  renderer: (item) => {
    renderTodo(item);
  },
  containerSelector: ".todos__list",
});

section.renderItems(); //calling renderItems method from Section.js

// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
// };

// const closeModal = (modal) => {
//   modal.classList.remove("popup_visible");
// };

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
};

function handleEscapeClose(evt) {
  if (evt.key === "Escape") {
    AddTodoPopup.close();
    // this._popupElement.classList.remove("popup_visible");
  }
}

addTodoButton.addEventListener("click", () => {
  AddTodoPopup.open();
});

// addTodoCloseBtn.addEventListener("click", () => {
//   AddTodoPopup.close();
// });

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.name.value;
//   const dateInput = evt.target.date.value;

//   // Create a date object and adjust for timezone
//   const date = new Date(dateInput);
//   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

//   const id = uuidv4();
//   const values = { name, date, id };
//   renderTodo(values);
//   newTodoValidator.resetValidation();

//   AddTodoPopup.close();
// });

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);

newTodoValidator.enableValidation();
