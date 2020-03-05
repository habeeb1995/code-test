/* eslint-disable */
const organizeChildrenHandler = require('../controller/organizeElement/Element.controller');

const sampleInput = {
  0:
    [{
      id: 10,
      title: 'House',
      level: 0,
      children: [],
      parent_id: null
    }],
  1:
    [{
      id: 12,
      title: 'Red Roof',
      level: 1,
      children: [],
      parent_id: 10
    }]
};
const sampleSuccessResponse = [
  {
    id: 10,
    title: 'House',
    level: 0,
    children: [
      {
        id: 12,
        title: 'Red Roof',
        level: 1,
        children: [
        ],
        parent_id: 10
      }
    ],
    parent_id: null
  }
];

describe('organize_children', () => {
  it('Should return restrutured output when passing correct input', async () => {
    const successResponse = organizeChildrenHandler.organizingChildren({
      payload: sampleInput
    });
    expect(
      successResponse
    ).toMatchObject(sampleSuccessResponse);
  });

  it('Should throw error when wrong input is passed', async () => {
    jest.spyOn(organizeChildrenHandler, 'organizingChildren').mockImplementation(
      (req) => {
        organizeChildrenHandler.validate(req.payload);
        organizeChildrenHandler.start(req.payload);
        return this.result;
      }
    );
    try {
      organizeChildrenHandler.organizingChildren({
        payload: { ...sampleInput, ...{ 0: {} } }
      });
    } catch (errorResponse) {
      expect(
        errorResponse.message
      ).toBe('data must be array');
    }
  });
});
