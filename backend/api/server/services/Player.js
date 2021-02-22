const sequelize = require('sequelize');
const db = require('../src/models');

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
        const cleaned = curr.startsWith('-') ? curr.substring(1) : curr;
        acc.push([cleaned, currOrder]);
        return acc;
      }, []);

      query.order = order;
    }

    return db.Player.findAndCountAll(query).then((result) => {
      return {
        count: result.count, players: result.rows
      };
    });
  }
}

module.exports = Player;
