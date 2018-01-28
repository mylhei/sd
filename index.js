/**
 * Created by leiyao on 18/1/27.
 */

const koa = require('koa');
const app = new koa();
const router = require('./router');
const logger = require('./middleware/logger');
const requestFilter = require('./middleware/requestFilter');
const axiosInject = require('./middleware/axiosInject');

// $http injector
app.use(axiosInject);

// logger
app.use(logger);

// requestFilter
app.use(requestFilter);

app.use(router.routes());

app.listen(process.env.PORT || 3000);