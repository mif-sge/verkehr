const mappings = {
    "HOSPITAL": "Hospital",
    "SHOPPING_MALL": "Shop"
};

module.exports = (locationType) => mappings[locationType] ? mappings[locationType] : false;