import express from "express";
import {
  createClaim,
  deleteClaim,
  getClaim,
  getClaims,
} from "../controllers/claim.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const claimRouter = express.Router();

claimRouter.get("/", protect, getClaims);
claimRouter.post("/", protect, createClaim);
claimRouter.delete("/:id", protect, deleteClaim);
claimRouter.get("/:id", protect, getClaim);

export default claimRouter;
