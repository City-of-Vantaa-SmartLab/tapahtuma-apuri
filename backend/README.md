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

---

## Deployment

### General information

The API and the admin UI runs on an EC2 instance on port 3000 in the Frankfurt (eu-central-1) region, and it's delivered via a CloudFront distribution. All app secrets and parameters are stored in the Systems Manager Parameter Store of the same region. The (somewhat overspecced) database is an RDS Aurora PostgreSQL cluster running a single instance.

The application server is running on [pm2](https://pm2.keymetrics.io), and it's configured to restart automatically on reboot. See [this page](https://pm2.keymetrics.io/docs/usage/startup/#generating-a-startup-script) for more information.

### Initial deployment on a new EC2 instance

Run `./scripts/generateEnvFile.js` to fetch all the required environment variables and secrets used by the application and the deployment script. This needs to be run only once before deployment, or whenever some Tapahtuma-apuri parameters in the Systems Manager Parameter Store have been updated. Note, that this script requires your programmatic access keys to the vantaa-pwa AWS account. Using aws-vault for storing and using your programmatic access credentials is highly recommended.

Run `./scripts/bootstrap.sh` to apply the latest patches and install Node and Yarn to the EC2 instance. Note, that this script contains the username and the public IP address of the currently running instance. If you need to terminate the currently running instance and instantiate a new one, the IP address in the script (and the deployment script `./scripts/deploy.sh`) needs to be changed accordingly. Also change the origin of the [CloudFront distribution](https://console.aws.amazon.com/cloudfront/home?#distribution-settings:E47V4681BZ2AM) to match the public DNS of the new instance.

Once the secrets have been fetched and the instance has been bootstrapped, simply run `yarn deploy` to build and deploy the app to EC2.

### Subsequent deployments

Run `yarn deploy`. Be careful with this command, because it will delete the old version of the program from the remote. Deployment will also migrate the production database. Deployment causes a brief system outage.

---

## Troubleshooting

If the application doesn't respond, the first thing to do is to try to reboot the EC2 instance, as this should also restart the app server. If this doesn't happen for any reason, you can try to run `yarn deploy` to start with a clean slate.
