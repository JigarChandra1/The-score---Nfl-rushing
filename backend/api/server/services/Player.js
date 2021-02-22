const sequelize = require('sequelize');
const db = require('../src/models');

const FIELDS = Object.keys(db.Player.rawAttributes);
class Player {
  static get(playerNameFilter, limit, offset, sortParams) {
    const query = {
      raw: true
    };

    if (playerNameFilter) {
      query.where = {
        Player: {
          [sequelize.Op.like]: `%${playerNameFilter}%`
        }
      };
    }

    if (limit) {
      query.limit = limit;
    }

    if (offset) {
      query.offset = offset;
    }

    if (sortParams) {
      const order = sortParams.reduce((acc, curr) => {
        const currOrder = curr.startsWith('-') ? 'DESC' : 'ASC';
        let cleaned = curr.startsWith('-') ? curr.substring(1) : curr;
        // sanitize Lng column
        if (cleaned === 'Lng') {
          query.attributes = [
            [
              sequelize.literal('CAST (REPLACE("Player".\'Lng\', \'T\', \'\') as INTEGER)'),
              'cleaned_Lng'
            ]
          ];
          cleaned = sequelize.literal(`cleaned_Lng ${currOrder}`);
          acc.push([cleaned]);
        } else {
          acc.push([cleaned, currOrder]);
        }
        return acc;
      }, []);

      query.order = order;
    }

    if (query.attributes) {
      query.attributes.push(...FIELDS);
    }

    return db.Player.findAndCountAll(query).then((result) => {
      return {
        count: result.count, players: result.rows
      };
    });
  }
}

module.exports = Player;
