import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import {
  addToDo,
  deleteToDo,
  getToDoList,
  updateToDo,
  getToDo,
} from "../controller/toDo.controller.js";

const router = Router();

router.route("/add").post(verifyJwt, addToDo);
router.route("/getToDoList").get(verifyJwt, getToDoList);
router.route("/getToDo/:id").get(verifyJwt, getToDo);
router.route("/update/:id").patch(verifyJwt, updateToDo);
router.route("/delete/:id").delete(verifyJwt, deleteToDo);

export default router;
