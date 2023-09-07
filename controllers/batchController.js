const Batch = require('../models/batch');

module.exports.batchList = async function (req, res) {
  const batches = await Batch.find({});
  return res.render('batch', {
    title: 'Student Record App',
    batches: batches,
  });
};

module.exports.addBatch = async function (req, res) {
  return res.render('addBatch', {
    title: 'Student Record App',
  });
};

module.exports.createBatch = async function (req, res) {
  const newBatch = new Batch({
    name: req.body.batchName,
  });

  await newBatch.save();
  res.redirect('/batch');
};
