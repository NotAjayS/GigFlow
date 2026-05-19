import { Request, Response } from "express";
import Lead from "../models/Lead";

// CREATE LEAD
export const createLead = async (req: Request, res: Response) => {
  try {
    const { name, email, status, source } = req.body;

    const lead = await Lead.create({
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
  } catch (error: any) {
    console.log("CREATE LEAD ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET LEADS (pagination + filter + search + sort)
export const getLeads = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      source,
      search,
      sort,
    } = req.query;

    const query: any = {};

    // FILTER: status
    if (status) query.status = status;

    // FILTER: source
    if (source) query.source = source;

    // SEARCH (name/email)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // SORT
    let sortOption: any = { createdAt: -1 }; // latest first

    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const leads = await Lead.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Lead.countDocuments(query);

    res.status(200).json({
      success: true,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      totalLeads: total,
      leads,
    });
  } catch (error: any) {
    console.log("GET LEADS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteLead = async (req: Request, res: Response) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Lead deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
};

export const updateLead = async (req: Request, res: Response) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      lead: updatedLead,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
};