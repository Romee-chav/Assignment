import connectDB from '../DB/connection.js';

const School = {
  create: async (data) => {
    const connection = await connectDB();
    return connection.query(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [data.name, data.address, data.latitude, data.longitude]
    );
  },

  getAllSortedByDistance: async (userLat, userLng) => {
    const connection = await connectDB();
    return connection.query(
      `SELECT id, name, address, latitude, longitude,
              (6371 * ACOS(
                  COS(RADIANS(?)) * COS(RADIANS(latitude)) *
                  COS(RADIANS(longitude) - RADIANS(?)) +
                  SIN(RADIANS(?)) * SIN(RADIANS(latitude))
              )) AS distance
       FROM schools
       ORDER BY distance ASC`,
      [userLat, userLng, userLat]
    );
  }
};

export default School;
