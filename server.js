require('dotenv').config()

const { ParseDashboard, ParseServer, ParseGraphQLServer, express, path, http } = require('./app');
const { env } = require('process')
var bodyParser = require('body-parser');
const databaseUri = env.DB_URL;

if (!databaseUri) {
    console.log('DATABASE_URI not specified, falling back to localhost.');
}

let host = env.HOST_SERVER;
let port = env.PORT;
let mountPath = env.PARSE_MOUNT || '/parse';
let mountPathDash = env.PARSE_MOUNT_DASH || '/dashboard'
let mountPathGraphQL = env.PARSE_MOUNT_GRAPHQL || '/graphql'

let hasSMTPInfo = env.EMAIL_USER && env.EMAIL_PASSWORD

var parseServer = new ParseServer({
    cloud: __dirname + '/cloud/main.js',
    databaseURI: databaseUri,
    appName: env.PARSE_APPNAME || 'NplBoost',
    appId: env.PARSE_APPID || 'NplBoostAppId',
    masterKey: env.PARSE_MASTERKEY || 'NplBoostMasterKey',
    clientKey: env.PARSE_CLIENTKEY || 'NplBoostClientKey',
    javascriptKey: env.PARSE_JAVASCRIPTKEY || 'NplBoostJavascriptKey',
    restApiKey: env.PARSE_RESTAPIKEY || 'NplBoostApiKey',
    fileKey: env.PARSE_FILEKEY || 'NplBoostFileKey',
    webhookKey: env.PARSE_WEBHOOKKEY || 'NplBoostWebhookKey',
    dotNetKey: env.PARSE_DOTNETKEY || 'NplBoostDotNetKey',
    serverURL: `${host}:${port}${mountPath}`,//
    publicServerURL: `${host}${mountPath}`,//:${port}
    verifyUserEmails: false, 
    emailVerifyTokenValidityDuration: 24 * 60 * 60,
    preventLoginWithUnverifiedEmail: false,
    emailAdapter: !hasSMTPInfo ? undefined : {
        module: 'parse-smtp-template',
        options: {
            port: env.EMAIL_PORT,
            host: env.EMAIL_HOST,
            user: env.EMAIL_USER,
            password: env.EMAIL_PASSWORD,
            fromAddress: env.EMAIL_FROMADDRESS,
            template: env.EMAIL_TEMPLATE,
            templatePath: env.EMAIL_TEMPLATEPATH
        }
    },
    accountLockout: {
        duration: 10, // threshold policy setting determines the number of failed sign-in attempts that will cause a user account to be locked. Set it to an integer value greater than 0 and less than 1000.
        threshold: 6, // duration policy setting determines the number of minutes that a locked-out account remains locked out before automatically becoming unlocked. Set it to a value greater than 0 and less than 100000.
    },
    passwordPolicy: {
        validatorPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, // enforce password with at least 8 char with at least 1 lower case, 1 upper case and 1 digit
        //validatorCallback: (password) => { return validatePassword(password) },
        validationError: 'Password must contain at least 8 chars, 1 lowercase, 1 lowercase and 1 digit.', // optional error message to be sent instead of the default "Password does not meet the Password Policy requirements." message.
        doNotAllowUsername: true, // optional setting to disallow username in passwords
        maxPasswordAge: 90, // optional setting in days for password expiry. Login fails if user does not reset the password within this period after signup/last reset.
        maxPasswordHistory: 5, // optional setting to prevent reuse of previous n passwords. Maximum value that can be specified is 20. Not specifying it or specifying 0 will not enforce history.
        resetTokenValidityDuration: 24 * 60 * 60, // expire after 24 hours
    },
    // customPages: {
    //     passwordResetSuccess: "http://localhost:1337/passwordResetSuccess",
    //     verifyEmailSuccess: "http://localhost:1337/verifyEmailSuccess",
    //     linkSendSuccess: "http://localhost:1337/linkSendSuccess",
    //     linkSendFail: "http://localhost:1337/linkSendFail",
    //     invalidLink: "http://localhost:1337/invalidLink",
    //     invalidVerificationLink: "http://localhost:1337/invalidVerificationLink",
    //     choosePassword: "http://localhost:1337/choosePassword",
    //     parseFrameURL: "http://localhost:1337/parseFrameURL",
    // },
    liveQuery: {
        classNames: ['_User', '_Offers']
    }
});


const parseGraphQLServer = new ParseGraphQLServer(
    parseServer,
    {
        graphQLPath: mountPathGraphQL,
        playgroundPath: '/playground'
    }
);



let dashboard = new ParseDashboard({
    apps: [
        {
            appName: env.PARSE_APPNAME || 'NplBoost',
            appId: env.PARSE_APPID || 'NplBoostAppId',
            masterKey: env.PARSE_MASTERKEY || 'NplBoostMasterKey',
            clientKey: env.PARSE_CLIENTKEY || 'NplBoostClientKey',
            javascriptKey: env.PARSE_JAVASCRIPTKEY || 'NplBoostJavascriptKey',
            restApiKey: env.PARSE_RESTAPIKEY || 'NplBoostApiKey',
            graphQLServerURL: `${host}:${port}${mountPathGraphQL}`,
            serverURL: `${host}:${port}${mountPath}`,
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

/*var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "85b717a3ce802f",
      pass: "71b7b214d1353b"
    }
});*/

let app = express();

app.use(mountPath, parseServer.app);
app.use(mountPathDash, dashboard);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static(path.join(__dirname, '/public')));
// app.get('/passwordResetSuccess', function (_, res) { res.sendFile(path.join(__dirname, '/public/password_reset_success.html')); });
// app.get('/verifyEmailSuccess', function (_, res) { res.sendFile(path.join(__dirname, '/public/verify_email_success.html')); });
// app.get('/linkSendSuccess', function (_, res) { res.sendFile(path.join(__dirname, '/public/link_send_success.html')); });
// app.get('/linkSendFail', function (_, res) { res.sendFile(path.join(__dirname, '/public/link_send_fail.html')); });
// app.get('/invalidLink', function (_, res) { res.sendFile(path.join(__dirname, '/public/invalid_link.html')); });
// app.get('/invalidVerificationLink', function (_, res) { res.sendFile(path.join(__dirname, '/public/invalid_verification_link.html')); });
// app.get('/choosePassword', function (_, res) { res.sendFile(path.join(__dirname, '/public/choose_password.html')); });

app.get('/', function (_, res) { res.json({res: 'I wish that I became a dashboard'}) })

parseGraphQLServer.applyGraphQL(app);
parseGraphQLServer.applyPlayground(app);

var server = http.createServer(app);

server.listen(port, function () {
    console.log('\nNLPBOOST server is now running on port ' + port + '.');
    console.log(`\nServer URL   : ${host}:${port}${mountPath}`);
    console.log(`GraphQL URL  : ${host}:${port}${mountPathGraphQL}`);
    console.log(`Dashboard URL: ${host}:${port}${mountPathDash}\n`);
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(server);
