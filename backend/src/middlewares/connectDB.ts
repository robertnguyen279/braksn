import connectToDatabase from '@src/services/mongoose';

const connectToMongo = (): any => ({
  before: (handler, next) => {
    handler.context.callbackWaitsForEmptyEventLoop = false;
    connectToDatabase().then(next());
  },
});

export default connectToMongo;
