var express = require('express');
var router = express.Router();
var Profile = require('../models/profile');
var _ = require('lodash');

router.use((req, res, next) => {
  req.body = _.pick(req.body, ['fullName', 'businessType', 'address', 'phone', 'email'])
  next()
})

// router.get('/', (req, res, next) => {
//   Profile.find({}, (err, users) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.json(profiles);
//     }
//   })
// });

router.get('/me', (req, res, next) => {
  Profile.findOne({userId: req.user.sub}, (err, profile) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(profile);
    }
  })
});

router.post('/', (req, res, next) => {
  const profile = new Profile(req.body)
  profile.userId = req.user.sub
  profile.save((err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(profile);
    }

  })
})
router.get('/:userId', (req, res, next) => {

  Profile.findOne({userId: req.params.userId}, (err, profile) => {
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

// router.put('/:profileId', (req, res, next) => {
//   Profile.findByIdAndUpdate(req.params.profileId, {
//     $set: req.body }, (err, profile) => {
//     if (err) {
//       res.status(500).send()
//     } else {
//       if (todo) {
//         Profile.findById(req.params.profileId, (err, updatedProfile) => {
//           res.json(updatedProfile)
//         })
//       } else {
//         res.status(404).send()
//       }
//     }
//   })
// })
// router.delete('/:profileId', (req, res, next) => {
//   Profile.findById(req.params.profileId).remove((err) => {
//     if (err) {
//       res.status(500).send()
//     } else {
//       res.status(204).send()
//     }
//   })
// });

module.exports = router;
