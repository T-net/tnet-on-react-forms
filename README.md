# React Forms and Testing

This project is an example solution for handling form state and queries or mutations in React. This code definitely does not aim for perfection. Neither does it aim to manoeuvre itself into a "Design Patterns" textbook that you tried to digest during tertiary education. Rather it aims to spike curiosity around user-value driven testing and ideally convince you to do the same in your next project.

Within the Volkswagen group, we are often required to use one of two UX systems namely GroupUI and Design 6. These dependencies make use of the shadow dom which causes some unexpected unmet expectations during testing. To put more plainly, it means that doing `input.type` in your test doesn't cause anything to be typed in the input.

I would like to invite you into the deep waters of JavaScript, lean programming, test driven development and the ever evolving world of frontend. Get in touch if you have any suggestions on the code. I love a good React state management discussion!

## Part 1: Scraping the Icing Off

Start with a bootstrapped project from [Create React App](https://github.com/facebook/create-react-app).

`npx create-react-app my-app --template typescript`

Eject if you prefer having full control over your bundler and compiler. If the name webpack already gives you the creeps, better skip this step. Read more about [eject](https://create-react-app.dev/docs/available-scripts#npm-run-eject).

`npm run eject`

Configure your compiler, linting and testing configurations according to your preference. By default, the configurations will be located in your package.json after ejecting. I prefer configuring jest, eslint, webpack and babel in the separate config files. I add these files separately and remove the react-scripts config and scripts files.

### Running Localhost

Run the app in the development mode at [http://localhost:3000](http://localhost:3000) to check it out:

`npm start`

### Testing

Runs all the jest tests:

`npm test`

When it comes to testing, I agree with [Kent C. Dodds](https://twitter.com/kentcdodds/status/977018512689455106): 
```
The more your tests resemble the way your software is used, the more confidence they can give you.
```

And so I use [React Testing Library](https://testing-library.com/) to test each page for the value that it brings to the user. This encourages accessibility and allows you to refactor the code without breaking the tests. Your tests get to do what they were meant to do originally, give you confidence that things work that way it will in the real world and without it being tied down to the implementation details. Read more about the [guiding principles](https://testing-library.com/docs/guiding-principles).

## Part 2: Routing 

Add `react-router-dom` and set up the routes and layout components.

- `app(.test).tsx`: The top level app is responsible to test whether the different routes render the expected pages as well as testing whether layout contexts are propagating to the pages (context consumers). Since each page is responsible for testing itself, the pages are mocked here.
- `pages/**/index(.test).tsx`: Each page tests all the expected functionality and use cases for that page. Only test the expected functionality and expected text that the user should see. It is not needed to test styling details or order of components unless those details carry a lot of weight towards the user value.
- `test/utils.tsx`: Helper function that wraps the rendered element in a memory router.

## Part 3: Testing Expected Behaviour

_Note: I added `styled-components` as a dependency for component specific styling. There are various ways of styling React components. I'm not bent on a specific approach; each have their advantages._

### User Events
With a real user, the browser interprets user events like typing and clicking and then dispatches the respective events needed. We need to use `user-event` to mock the UI layer to simulate user interactions.

Setting up the user should happen before the component is rendered, but not inside a `beforeEach` function (read more about [userEvent](https://testing-library.com/docs/user-event/intro#writing-tests-with-userevent)). Adjust the `test/utils.tsx` render function to set up and return the user.

### Form Fields

1. Write the tests for expected input label, placeholder, initial value, user action and changed value.
2. Write the least amount of code to make the tests pass.
3. Refactor the tests and implementation to improve the structure and style.

### Form Submit

1. Add the `process.env.API_URL` environment variable in the global jest config.
2. Add `msw` dependency to set up a mock server in your tests.
3. Mock a server that catches the `POST` expected from the form submission (do not mock a specific implementation e.g. mocking fetch or mocking axios).
4. Test that the request payload received in the mock server matches the expected one after clicking on save.
5. Write the least amount of code to make the tests pass. I have travelled along the milky way of state management options and have found `react-hook-form` to be the most powerful yet lean solution when it comes to React forms.
6. Refactor.

### Validation

1. Write a test that attempts to submit the form with empty values and check that validation messages are visible.
2. Implement the required rules for the fields and display the errors (I cover controlled components with the UI libraries in part 4).
3. Refactor.

### Notification

## Part 4: Tackling GroupUI

## Part 5: Tackling Design 6