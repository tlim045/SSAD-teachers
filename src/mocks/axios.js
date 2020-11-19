export default{
    // get: jest.fn(() = Promise.resolve({data: {}}))
    get: jest.fn((url) => {
        if (url === '/allQuestions') {
            return Promise.resolve({
                data: 'data'
            });
        }
    }),

}

