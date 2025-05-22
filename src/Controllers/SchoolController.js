import School from '../Models/SchoolModel.js';

// Helper to validate coordinates
const isValidCoord = (val, min, max) =>
  Number.isFinite(val) && val >= min && val <= max;

// ────────────────────────────────────────────────────────────────
// POST /api/addSchool
const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    const lat = Number(latitude);
    const lng = Number(longitude);

    // Validate
    if (
      !name?.trim() ||
      !address?.trim() ||
      !isValidCoord(lat, -90, 90) ||
      !isValidCoord(lng, -180, 180)
    ) {
      return res
        .status(400)
        .json({ error: 'Invalid name, address, latitude or longitude.' });
    }

    // Promise-style create()
    const [result] = await School.create({ name, address, latitude: lat, longitude: lng });
    return res.status(201).json({ message: 'School added Successfully', id: result.insertId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// ────────────────────────────────────────────────────────────────
// GET /api/listSchools?latitude=..&longitude=..
const listSchools = async (req, res) => {
  try {
    const lat = Number(req.query.latitude);
    const lng = Number(req.query.longitude);

    if (!isValidCoord(lat, -90, 90) || !isValidCoord(lng, -180, 180)) {
      return res
        .status(400)
        .json({ error: 'Latitude and longitude must be valid numbers.' });
    }

    // Promise-style distance query
    const [rows] = await School.getAllSortedByDistance(lat, lng);
    return res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

export {
  addSchool,
  listSchools,
}