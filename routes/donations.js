var express = require('express');
var router = express.Router();
var Donation = require('../models/donation');
const mongoose = require('mongoose');
var _ = require('lodash');

router.use((req, res, next) => {
  // req.body = _.pick(req.body, ['name', 'type', 'recipientId'])
  next()
})
/* GET users */
router.get('/', (req, res, next) => {
  Donation.find({}, (err, donation) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(donation);
    }
  })
});

router.post('/', (req, res, next) => {
  const donation = new Donation(req.body)
  donation.donorId = req.user.sub
  donation.save((err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(donation);
    }
  })
})

router.get('/claimed', (req, res, next) => {
  Donation.find({
    recipientId: { $ne: null },
    donorId: req.user.sub
  }, (err, donation) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(donation);
    }
  })
});

router.get('/available', (req, res, next) => {
  Donation.find({ recipientId: { $exists: false} }, (err, donation) => {
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
});

router.get('/:donationId', (req, res, next) => {
  Donation.findById(req.params.userId, (err, donation) => {
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

router.put('/:donationId/claim', (req, res, next) => {
  Donation.findOne({
    recipientId: {$exists: false}
  },function (error, donation) {
      if (error) {
        res.status(500).send()
      } else {
        if (donation) {
            donation.recipientId = req.user.sub
            donation.save((err) => {
              if (err) {
                res.status(500).send(err);
              } else {
                res.json(donation);
              }
            })
        } else {
          res.status(404).send()
        }
      }
  })
})

router.delete('/:donationId', (req, res, next) => {
  Donation.findById(req.params.donationId).remove((err) => {
    if (err) {
      res.status(500).send()
    } else {
      res.status(204).send()
    }
  })
});



module.exports = router;
