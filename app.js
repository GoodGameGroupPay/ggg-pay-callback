'use strict';

// import 
import http from 'http';
import Koa from 'koa';
import Router from 'koa-router';
import koaBodyparser from 'koa-bodyparser';
import * as gggpaySdk from './gggpaySdk.js'

// create app
const app = new Koa({ proxy: true, env: process.env, proxyIpHeader: 'X-Real-IP' });
app.use(koaBodyparser({ jsonLimit: '10mb', enableTypes: ['json', 'form', 'text'], }));

// create router
const router = new Router();

// create controller : paymentCallback and payoutCallback
// Developer Control Center : crul -> https://{{domain name}}/api/paymentCallback
router.post('/api/paymentCallback', (ctx) => {
    const appId = ctx.request.body?.appId;
    const encryptedData = ctx.request.body?.encryptedData;
    const data = gggpaySdk.symDecrypt(encryptedData);
    console.log(appId, data);
});

// Developer Control Center : wdcurl -> https://{{domain name}}/api/paymentCallback
router.post('/api/payoutCallback', (ctx) => {
    const appId = ctx.request.body?.appId;
    const encryptedData = ctx.request.body?.encryptedData;
    const data = gggpaySdk.symDecrypt(encryptedData);
    console.log(appId, data);
});
app.use(router.routes());

// start
http.createServer(app.callback()).listen(8080);
console.log(`http server runing : 8080`);