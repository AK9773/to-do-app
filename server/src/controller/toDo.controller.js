import { ToDo } from "../models/toDo.model.js";
import { ApiError } from "../utils/apiError.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";

const addToDo = asyncHandler(async (req, res) => {
  const user = req.user;
  let { title, description, status } = req.body;
  if (!title || title?.trim() === "") {
    throw new ApiError(400, "Title is required");
  }
  if (!status || status.trim() === "") {
    status = "ToDo";
  }
  if (!["ToDo", "InProgress", "Done"].includes(status)) {
    throw new ApiError(400, "Invalid status");
  }
  const toDo = await ToDo.create({
    title,
    description,
    status,
    owner: user._id,
  });
  if (!toDo) {
    throw new ApiError(500, "Something went wrong while adding to-do");
  }
  res
    .status(201)
    .json(new ApiResponse(201, toDo, "Successfully Added To-do", "to-do"));
});

const getToDoList = asyncHandler(async (req, res) => {
  const user = req.user;
  const toDoList = await ToDo.find({ owner: user._id });
  if (!toDoList) {
    throw new ApiError(500, "Something went wrong while fetching to-do list");
  }
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        toDoList,
        "To-do list fetched successfully",
        "to-do-array"
      )
    );
});

const getToDo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const toDo = await ToDo.findById(id);
  if (!toDo) {
    throw new ApiError(400, `to-do doesn't exist with the id: ${id}`);
  }
  res
    .status(200)
    .json(new ApiResponse(200, toDo, "To-do fetched successfully", "to-do"));
});

const updateToDo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const toDo = await ToDo.findById(id);
  if (!toDo) {
    throw new ApiError(400, `to-do doesn't exist with the id: ${id}`);
  }
  const { title, description, status } = req.body;
  if (!title || title?.trim() === "") {
    throw new ApiError(400, "Title is required");
  }
  if (!["ToDo", "InProgress", "Done"].includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const updatedToDo = await ToDo.findByIdAndUpdate(
    id,
    { title, description, status },
    { new: true }
  );
  if (!toDo) {
    throw new ApiError(500, "Something went wrong while updating to-do");
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, updatedToDo, "To-do updated successfully", "to-do")
    );
});

const deleteToDo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const toDo = await ToDo.findById(id);
  if (!toDo) {
    throw new ApiError(400, `to-do doesn't exist with the id: ${id}`);
  }
  const deletedToDo = await ToDo.findByIdAndDelete(id);
  if (!deletedToDo) {
    throw new ApiError(500, "Something went wrong while deleting to-do");
  }
  res
    .status(200)
    .json(new ApiResponse(200, "", "To-do deleted successfully", ""));
});

export { addToDo, getToDoList, updateToDo, deleteToDo, getToDo };
