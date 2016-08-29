var express = require('express');
var router = express.Router();
var Profile = require('../models/profile');

/* GET users */
router.get('/', (req, res, next) => {
  Profile.find({}, (err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(profiles);
    }
  })
});

router.post('/', (req, res, next) => {
  const profile = new Profile(req.body.task)
  profile.save((err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(profile);
    }

  })
})
router.get('/:profileId', (req, res, next) => {
Profile.findById(req.params.profileId, (err, profile) => {
  if (err) {
    res.status(500).send(err);
  } else {
      if (profile) {
        res.json(profile);
      } else {
          res.status(404).send()
      }
    }
  })
})
router.put('/:profileId', (req, res, next) => {
  Profile.findByIdAndUpdate(req.params.profileId, {
    $set: req.body }, (err, profile) => {
    if (err) {
      res.status(500).send()
    } else {
      if (todo) {
        Profile.findById(req.params.profileId, (err, updatedProfile) => {
          res.json(updatedProfile)
        })
      } else {
        res.status(404).send()
      }
    }
  })
})
router.delete('/:profileId', (req, res, next) => {
  Profile.findById(req.params.profileId).remove((err) => {
    if (err) {
      res.status(500).send()
    } else {
      res.status(204).send()
    }
  })
});

module.exports = router;