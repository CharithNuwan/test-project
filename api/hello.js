// Simple test — no database, no libraries!
// If this works = Vercel is fine
// If this crashes = routing problem

module.exports = function handler(req, res) {
  res.status(200).json({
    status:  'ok',
    message: 'Vercel is working!',
    time:    new Date().toISOString(),
    url:     req.url
  });
};
