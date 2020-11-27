# Tapahtuma-apuri Backend

## Getting dev environment going

Start by cloning the repo from GitHub with:

```sh
git clone git@github.com:City-of-Vantaa-SmartLab/tapahtuma-apuri.git
```

Then navigate to directory with:

```sh
cd tapahtuma-apuri/backend
```

Next you need to install all the dependencies using yarn:

```sh
yarn install
```

Next thing is to get local development database working. Make sure you have docker installed and if so, run the following command:

```sh
yarn start-db
```

This will start a postgreSQL database in docker container, then run schema migrations and then add some test data for development. You can shut off the database with comman `yarn stop-db`. _Please note, that you need to rerun the database after every restart_.

Now everthing should be ready for the server. You can crank the development server app with command `yarn start`. If everthing went as expected, you should see message saying `server is runninh on port 3000`. Graz!

## Deployment

First you need to generate private-key for the ec2 instance. This done on AWS side of things. When you get the `.pem` file, you need to rename it to `private-key.pem` and place it into the Scripts folder. This will authenticate you.

After _You_ have gotten green light for your new feature, it's time to take it to production. Tapahtuma-apuri will be deployed to EC2 instance on Vantaa's AWS. This has been made easy with command `yarn deploy`. Be careful with this command, because it will delete the old version of the program from the remote. Deployment will also migrate the production database.

## Other useful commands

`yarn connect` = opens SSH -session to the EC2 production instance
`yarn getlog` = fetches the server log from EC2
