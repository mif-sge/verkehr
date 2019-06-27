const enumeration = ["NONE", "LOW", "MEDIUM", "HIGH", "MAX"];

module.exports = (occupancy) => enumeration.indexOf(occupancy) !== -1;