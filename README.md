# React Forms and Testing

This project is an example solution for handling form state and queries or mutations in React. This code definitely does not aim for perfection. Neither does it aim to manoeuvre itself into a "Design Patterns" textbook that you tried to digest during tertiary education. Rather it aims to spike curiosity around user-value driven testing and ideally convince you to do the same in your next project. 

Within the Volkswagen group, we are often required to use one of two UX systems namely GroupUI and Design 6. These dependencies make use of the shadow dom which causes some unexpected unmet expectations during testing. To put more plainly, it means that doing `input.type` in your test doesn't cause anything to be typed in the input.

I would like to invite you into the deep waters of JavaScript, lean programming, test driven development and the ever evolving world of frontend. Get in touch if you have any suggestions on the code. I love a good React state management discussion!

# Getting Started

Start with a bootstrapped project from [Create React App](https://github.com/facebook/create-react-app).

`npx create-react-app my-app --template typescript`

Eject if you prefer having full control over your bundler and compiler. If the name webpack already gives you the creeps, better skip this step. Read more about [eject](https://create-react-app.dev/docs/available-scripts#npm-run-eject).

`npm run eject`


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
