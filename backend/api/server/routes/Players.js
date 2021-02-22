const router = require('express').Router();
const playerService = require('../services/Player');

const LIMIT = 10;
const SORTABLE_FIELDS = ['Yds', 'TD', 'Lng'];
const HEADERS = ['Player', 'Team', 'Pos', 'Att', 'Att/G', 'Yds',
  'Avg', 'Yds/G', 'TD', 'Lng', '1st', '1st%', '20+',
  '40+', 'FUM'
];
const csvUtil = require('./util');

router.get('/', (req, res, next) => {
  const page = req.query.page;

  // validate page number
  if (parseInt(req.query.page, 10) < 1) {
    res.status(422).send({
      success: false,
      message: 'Page number must be greater than 0'
    });
    return;
  }

  // validate sort
  let sort;
  if (req.query.sort) {
    sort = typeof req.query.sort === 'string' ? [req.query.sort] : req.query.sort;

    if (sort.some((param) => {
      const cleaned = param.startsWith('-') ? param.substring(1) : param;
      return !SORTABLE_FIELDS.includes(cleaned);
    })) {
      res.status(422).send({
        success: false,
        message: 'Invalid sort params'
      });
      return;
    }
  }

  const offset = (page - 1) * LIMIT;
  const playerNameFilter = req.query.search;

  playerService.get(playerNameFilter, LIMIT, offset, sort).then((result) => {
    const nextPage = page * LIMIT < result.count;
    const prevPage = (page - 1) * LIMIT !== 0;

    res.json(
      {
        data: result.players,
        success: true,
        next_page: nextPage,
        prev_page: prevPage
      }
    );
  })
    .catch((err) => next(err));
});

router.get('/all', (req, res, next) => {
  playerService.get().then((result) => {
    res.json(
      {
        data: result.players,
        success: true
      }
    );
  })
    .catch((err) => next(err));
});

router.get('/download', (req, res, next) => {
  let sort;
  // validate sort
  if (req.query.sort) {
    sort = typeof req.query.sort === 'string' ? [req.query.sort] : req.query.sort;

    if (sort.some((param) => {
      const cleaned = param.startsWith('-') ? param.substring(1) : param;
      return !SORTABLE_FIELDS.includes(cleaned);
    })) {
      res.status(422).send({
        success: false,
        message: 'Invalid sort params'
      });
      return;
    }
  }

  const playerNameFilter = req.query.search;

  playerService.get(playerNameFilter, null, null, sort).then((result) => {
    const fields = HEADERS.map((h) => (
      {
        label: h,
        value: h
      }));

    const csv = csvUtil.toCsv(fields, result.players);
    res.header('Content-Type', 'text/csv');
    res.attachment('players.csv');
    res.send(csv);
  })
    .catch((err) => next(err));
});

module.exports = router;
