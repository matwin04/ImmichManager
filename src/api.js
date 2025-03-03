const axios = require("axios");

const IMMICH_API_URL = "https://immich.mattwiner.org/api";
const API_TOKEN = "XeQpm8adE4ZexZjsbsJUMARcFNM94syx11YDKP95MUQ";

async function fetchImmichData(endpoint, res) {
    try {
        const response = await axios.get(`${IMMICH_API_URL}/${endpoint}`, {
            headers: { "x-api-key": API_TOKEN }
        });
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        res.status(500).json({ error: `Failed to fetch ${endpoint}` });
    }
}

module.exports = fetchImmichData;