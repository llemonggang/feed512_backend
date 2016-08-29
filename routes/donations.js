var express = require('express');
var router = express.Router();
var Donation = require('../models/donation');
var _ = require('lodash');

router.use((req, res, next) => {
  req.body = _.pick(req.body, ['name', 'type', 'recipientId'])
  next()
})
/* GET users */
router.get('/', (req, res, next) => {
  Donation.find({}, (err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(donations);
    }
  })
});

router.post('/', (req, res, next) => {
  const donation = new Donation(req.body)
  //req.body.task will have to change
  donation.save((err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(donation);
    }

  })
})
router.get('/:donationId', (req, res, next) => {
Donation.findById(req.params.donationId, (err, donation) => {
  if (err) {
    res.status(500).send(err);
  } else {
      if (donation) {
        res.json(donation);
      } else {
          res.status(404).send()
      }
    }
  })
})
router.put('/:donationId', (req, res, next) => {
  Donation.findByIdAndUpdate(req.params.donationId, {
    $set: req.body }, (err, donation) => {
    if (err) {
      res.status(500).send()
    } else {
      if (donation) {
        Donation.findById(req.params.donationsId, (err, updatedDonation) => {
          res.json(updatedDonation)
        })
      } else {
        res.status(404).send()
      }
    }
  })
})
router.delete('/:donationId', (req, res, next) => {
  Donation.findById(req.params.feedId).remove((err) => {
    if (err) {
      res.status(500).send()
    } else {
      res.status(204).send()
    }
  })
});

module.exports = router;
