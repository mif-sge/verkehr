const con = require('./database/connection');

/**
 * A test class.
 */
class Data {

    /**
     * Tries to connect to a running instance of neo4j as defined in the environment file and return all records.
     * If the database can't be reached, the request will be termined after the globally set timeout.
     * @returns {Promise<StatementResult>} A promise to all records.
     */
    async demo() {

        await con.cypher('MATCH (n) DETACH DELETE n;');

        let street = await con.create('Street', { name: 'Max-Mustermann-Straße' });
        let hospital = await con.create('Location', { name: 'Krankenhaus' });
        let junction = await con.create('Location', { name: 'Kreuzung' });

        await hospital.relateTo(junction, 'roadTo', { length: 100, speedLimit: 50, directed: false });
        await hospital.relateTo(street, 'belongsTo');
        await junction.relateTo(street, 'belongsTo');

        return con.cypher('MATCH (n) RETURN n;');
    }
};

module.exports = Data;