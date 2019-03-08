"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const FB = require('fb');
FB.options({ version: 'v3.2' });
FB.extend({ appId: process.env.FB_APP_ID, appSecret: process.env.FB_APP_SECRET });
FB.setAccessToken(process.env.FB_ACCESS_TOKEN);
exports.default = FB;
//# sourceMappingURL=fbSetup.js.map