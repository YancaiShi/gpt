
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import axios from 'axios';

const app = new Koa();
const router = new Router();

const apiUrl = "https://api.openai.com/v1/engines/davinci-codex/completions";
const apiKey = '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'

router.post('/chat', async (ctx: any, next) => {
    const prompt = `你好`;

    try {
        const axiosInstance = axios.create({
            proxy: {
                host: '75.89.101.60',
                port: 80,
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        const response = await axiosInstance.post(apiUrl, {
            prompt: prompt,
            max_tokens: 100,
            n: 1,
            stop: null,
            temperature: 1
        });

        const data = response.data;
        const result = data.choices[0].text.trim();
        ctx.body = { result };
    } catch (error: any) {
        console.error('Error:', error?.message);
        ctx.body = { error: error?.message };
    }
});

router.post('/test', async (ctx: any, next) => {
    ctx.body = { msg:'可以了老铁' };
});

// 添加 body-parser 中间件
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

// 启动服务器
const port = 3000;
app.listen(port, () => {
    console.log(`服务器已启动，正在监听端口 ${port}`);
});
