const { getSession } = require('@/services/database');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const session = await getSession(token);
    if (!session) {
        return res.status(401).json({ error: 'Invalid token' });
    }
    next();
};
