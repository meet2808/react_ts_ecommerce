import express from "express";
// // import stateData from "../states.json" with { type : "json" }
import { states } from "../states.json";

const router = express.Router();

// // End point for get all states
router.route("/states").get((req, res) => {
    const statesList = states.map(state => state.state);
    res.send(statesList)
})

// // End point for get all district name
router.route("/district/:state").get((req, res) => {
    const { state } = req.params;
    const stateObj = states.find(s => s.state.toLowerCase() === state.toLowerCase());
    if (stateObj)
        res.status(200).json(stateObj.districts)
    else
        res.status(404).json({ message: "State not found" })
})

export default router;