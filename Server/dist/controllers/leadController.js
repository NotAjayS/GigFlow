"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLead = exports.deleteLead = exports.getLeads = exports.createLead = void 0;
const Lead_1 = __importDefault(require("../models/Lead"));
// CREATE LEAD
const createLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, status, source } = req.body;
        const lead = yield Lead_1.default.create({
            name,
            email,
            status,
            source,
        });
        res.status(201).json({
            success: true,
            message: "Lead created successfully",
            lead,
        });
    }
    catch (error) {
        console.log("CREATE LEAD ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createLead = createLead;
// GET LEADS (pagination + filter + search + sort)
const getLeads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, status, source, search, sort, } = req.query;
        const query = {};
        // FILTER: status
        if (status)
            query.status = status;
        // FILTER: source
        if (source)
            query.source = source;
        // SEARCH (name/email)
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ];
        }
        // SORT
        let sortOption = { createdAt: -1 }; // latest first
        if (sort === "oldest") {
            sortOption = { createdAt: 1 };
        }
        const skip = (Number(page) - 1) * Number(limit);
        const leads = yield Lead_1.default.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit));
        const total = yield Lead_1.default.countDocuments(query);
        res.status(200).json({
            success: true,
            page: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
            totalLeads: total,
            leads,
        });
    }
    catch (error) {
        console.log("GET LEADS ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getLeads = getLeads;
const deleteLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Lead_1.default.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            message: "Lead deleted",
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
        });
    }
});
exports.deleteLead = deleteLead;
const updateLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedLead = yield Lead_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({
            success: true,
            lead: updatedLead,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Update failed",
        });
    }
});
exports.updateLead = updateLead;
