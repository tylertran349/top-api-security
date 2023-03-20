const { Router } = require('express');
const uuidv4 = require('uuid').v4;

const router = Router();

router.get('/', (req, res) => {
    return res.send(Object.values(req.context.models.messages));
});

router.get('/:messageId', (req, res) => {
    return res.send(req.context.models.messages[req.params.messageId]);
});

router.post('/', (req, res) => {
    const id = uuidv4(); // Generate custom ID using uuidv4() and store it in id
    const message = { // Create a new message key-value pair
        id, // Set the id attribute of the message to id (the variable created above)
        text: req.body.text, // Set the text attribute to the text attribute inside the request body
        userId: req.context.me.id, // Get the id of the user stored in the me property of the request object
    };
    req.context.models.messages[id] = message; // Set the value of the key messages[id] to the new message we just created
    return res.send(message); // Send a response to the client with the new message we just created 
});

router.delete('/:messageId', (req, res) => {
    const { [req.params.messageId]: message,...otherMessages } = req.context.models.messages; // Create a messages object named otherMessages that contains every message except for the one with the ID in the URL
    req.context.models.messages = otherMessages; // Set messages to the newly created otherMessages object
    return res.send(message); // Send a response with the now-deleted message to the client that made the request
});

module.exports = router;