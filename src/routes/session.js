const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    return res.send(req.context.models.users[req.context.me.id]); // Sends a response to the client with the user id of the me property of the request
});

module.exports = router;