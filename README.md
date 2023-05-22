# NodeJS Basics 3

## Slides

https://www.canva.com/design/DAFinuFI7hw/dZHt2Nrg7YwJc_0du5lMLg/edit?utm_content=DAFinuFI7hw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebuttonutm_content=DAFinuFI7hw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

## Exercise
- Create a Nodejs Server, using Typescript, providing Rest APIs to interact with users data in a file.
- **Data:** The users data is stored in the **/src/_data/dummy.json** JSON file.
- APIs definitions:
    + **GET /users**: List all users in the file.
    + **GET /users/:id**: Get an user with a specific ID.
    + **POST /users**: Add a new user to the file.
    + **PUT /users/:id**: Update an user's data.
    + **DELETE /users**: Delete an user.
- Useful Libraries:
    + **fs-extra**: Extra methods to handle JSON files.
    + **express**: Provide methods to handle requests & responses.
- TODOs:
    + Use **fs-extra** methods (instead of **fs**) to read/write JSON files.
    + Try to use 1 middleware with many routes. (Try implementing `IdValidation` middleware for all `/users/:id` routes)