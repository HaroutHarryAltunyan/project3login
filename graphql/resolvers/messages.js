const Message = require('../../models/Message'); // Fixed typo in 'Messgae'

module.exports = {
    Mutation: {
        async createMessage(_, { messageInput:  { text, username }  }) { // Corrected syntax for destructuring messageInput
         // Destructure text and username from messageInput

            const newMessage = new Message({
                text: text,
                createdBy: username,
                createdAt: new Date().toISOString()
            });

            const res = await newMessage.save(); // Save the message to the database
            console.log(res);

            return {
                id: res.id,
                ...res._doc // Spread the _doc property to include all document fields
            }
        }
    },
    Query: {
        message: (_, { ID }) => Message.findById(ID) // Ensure proper casing and method call
    }
};
