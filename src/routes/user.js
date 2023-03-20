const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    return res.send(Object.values(req.context.models.users));
});

router.get('/:userId', (req, res) => {
    return res.send(req.context.models.users[req.params.userId]);
});

router.put('/:userId', (req, res) => {
    return res.send(`PUT HTTP method on users/${req.params.userId} resource`);
})

router.delete('/:userId', (req, res) => {
    return res.send(`DELETE HTTP method on users/${req.params.userId} resource`);
});

module.exports = router;