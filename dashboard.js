require('dotenv').config()

const { ParseDashboard, express, http } = require('./app');
const { env } = require('process')

let host = env.HOST_SERVER;
let port = env.PORT;
let mountPath = env.PARSE_MOUNT || '/parse';
let mountPathDash = env.PARSE_MOUNT_DASH || '/dashboard'
let mountPathGraphQL = env.PARSE_MOUNT_GRAPHQL || '/graphql'

let app = express();
let dashboard = new ParseDashboard({
    apps: [
        {
            appName: env.PARSE_APPNAME || 'NplBoost',
            appId: env.PARSE_APPID || 'NplBoostAppId',
            masterKey: env.PARSE_MASTERKEY || 'NplBoostMasterKey',
            clientKey: env.PARSE_CLIENTKEY || 'NplBoostClientKey',
            javascriptKey: env.PARSE_JAVASCRIPTKEY || 'NplBoostJavascriptKey',
            restApiKey: env.PARSE_RESTAPIKEY || 'NplBoostApiKey',
            graphQLServerURL: `${host}:${port}${mountPathGraphQL}`,//
            serverURL: `${host}:${port}${mountPath}`,//
            iconName: env.DASH_ICON || "logo.png"
        },
    ],
    iconsFolder: "icons",
    users: [
        {
            user: env.DASH_USER || 'admin',
            pass: env.DASH_PASS || 'admin'
        }
    ]
}, { allowInsecureHTTP: true });

app.use(mountPathDash, dashboard);

let server = http.createServer(app);
server.listen(port, function () {
    console.log('\nTunavTaxi  Dashboard is now running on port ' + port + '.\n');
    console.log(`-------------> http://localhost:${port}${mountPathDash}\n`);
});