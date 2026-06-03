const Package = require("../models/Package");

const getPackages = async (req, res) => {
  try {
    const {
      search = "",
      category = "all",
      sort = "latest",
      featured,
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { destination: { $regex: search, $options: "i" } },
        { country: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "all") {
      query.category = category;
    }

    if (featured === "true") {
      query.isFeatured = true;
    }

    let sortOption = { createdAt: -1 };

    if (sort === "price-low") {
      sortOption = { price: 1 };
    }

    if (sort === "price-high") {
      sortOption = { price: -1 };
    }

    if (sort === "rating") {
      sortOption = { rating: -1 };
    }

    const packages = await Package.find(query).sort(sortOption);

    res.json({
      success: true,
      count: packages.length,
      packages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch packages",
      error: error.message,
    });
  }
};

const getPackageById = async (req, res) => {
  try {
    const travelPackage = await Package.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!travelPackage) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    res.json({
      success: true,
      package: travelPackage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch package",
      error: error.message,
    });
  }
};

const createPackage = async (req, res) => {
  try {
    const travelPackage = await Package.create({
      ...req.body,
      createdBy: req.user?._id,
    });

    res.status(201).json({
      success: true,
      package: travelPackage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create package",
      error: error.message,
    });
  }
};

const updatePackage = async (req, res) => {
  try {
    const travelPackage = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!travelPackage) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    res.json({
      success: true,
      package: travelPackage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update package",
      error: error.message,
    });
  }
};

const deletePackage = async (req, res) => {
  try {
    const travelPackage = await Package.findById(req.params.id);

    if (!travelPackage) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    await travelPackage.deleteOne();

    res.json({
      success: true,
      message: "Package deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete package",
      error: error.message,
    });
  }
};

module.exports = {
  getPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
};