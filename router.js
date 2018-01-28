/**
 * Created by leiyao on 18/1/27.
 * @usage 路由
 */

const Router = require('koa-router');
const router = new Router();
const show = require('./action/show');
const tracking = require('./action/tracking');

router.get('/s', show);
router.get('/t', tracking);

module.exports = router;