const Favorite = require('./Favorite');

describe('favorite model', () => {
  it('requires a name', () => {
    const favorite = new Favorite();
    const { errors } = favorite.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('requires a why', () => {
    const favorite = new Favorite();
    const { errors } = favorite.validateSync();

    expect(errors.why.message).toEqual('Path `why` is required.');
  });
});
