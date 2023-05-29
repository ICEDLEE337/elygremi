#! /usr/bin/env node

const folderName = 'people-user-v3-batch-get-users';
const path = `../dist/packages/lambda/${folderName}/main.js`;
const { handler } = require(path);

handler(
  {
    pathParameters: { id: 'ecf86f75-7d0d-491c-be1a-d3121f38c02e' },
    body: {
      userIds: [
        'ecf86f75-7d0d-491c-be1a-d3121f38c02e',
        '4c7160b9-5471-42f7-8c45-c518868fa670',
      ],
    },
  },
  {},
  (e, d) => console.log(e, d)
);
