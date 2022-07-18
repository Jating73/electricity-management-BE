## Open the hosted URL to check the website in working way.
## Because of less time some things might get missed so for demo you can check the hosted url as 
## because of some environment variables it might not be opening and work like mine in your localhost
HOSTED_URL= https://jatin-electricity.netlify.app/

### Use this command in this folder to install all node_modules to run the Backend of the project
npm i

### Use this command client folder to install all node_modules to run the Client Side of the project
npm i

## Deployment Process-
1. OPEN CLI
2. Type this command - heroku create
This will create your app on Heroku (which prepares Heroku to receive your source code) and generates two links:

The first link is the URL where you’ll see your app live. The second link is the GitHub repo provided by Heroku you’ll need to push your app to in order to deploy it.

3. heroku config:set NPM_CONFIG_PRODUCTION=false
This command will tell Heroku to install the devDependencies. More precisely, this skips the pruning step and accesses the packages declared under devDependencies at runtime. This enables Heroku to launch npm run build.

4. heroku config:set HOST=0.0.0.0
5. heroku config:set NODE_ENV=production
6. web: npm run start

As you can see, by default, Heroku deploys your app on a domain of its own in the form of [name of app].herokuapp.com. But you can definitely make your app available at a nonHeroku domain. All you need to do is add a custom domain to it, with no extra cost.