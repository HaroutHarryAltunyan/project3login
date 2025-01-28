import Message from '../../models/Message.js';

export default {
    Mutation: {
        async createMessage(_, { messageInput: { text, username } }) { 
            const newMessage = new Message({
                text: text,
                createdBy: username,
                createdAt: new Date().toISOString()
            });

            const res = await newMessage.save();
            console.log(res);

            return {
                id: res.id,
                ...res._doc 
            };
        },
    },
    Query: {
        async message(_, { ID }) {
            const message = await Message.findById(ID);
            if (!message) {
                throw new Error('Message not found');
            }
            return message;
        },
    },
};


