function getHealthData(req, res, next) {
  res.status(200).json({
    message: `Formbot server up and running.`,
    time: new Date(),
  });
}

export default getHealthData;
