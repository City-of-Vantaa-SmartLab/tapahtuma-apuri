# Tapahtuma-apuri Frontend

## Getting dev environment going

Start by cloning the repo from GitHub with:

```sh
git clone git@github.com:City-of-Vantaa-SmartLab/tapahtuma-apuri.git
```

Then navigate to the directory with:

```sh
cd tapahtuma-apuri/frontend
```

Next make sure you have yarn installed and get the project dependencies:

```sh
yarn install
```

This project relies on Tapahtuma Apuri backend and as such doesn't have its own database. You can start the application with `yarn start`.

## Deployment

Prerequisite:

- make sure you have access to the appropriate amazon s3 bucket
- create aws security credentials
- install and configure aws-cli

The application can be deployed by simply running `yarn deploy`. This will run the test suite once, make a optimized build and sync the created build folder to the tapahtuma apuri s3 bucket.
