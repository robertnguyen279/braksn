import createError from 'http-errors';

const authMiddleware = (): any => ({
  before: (handler, next) => {
    const { authUser } = JSON.parse(handler.event.body);
    if (authUser.role === 0) {
      throw new createError.Unauthorized(
        JSON.stringify({ message: 'You are unauthorized.' }),
      );
    }

    next();
  },
});

export default authMiddleware;
