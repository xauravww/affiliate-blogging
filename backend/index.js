import { createRequire } from "module";
import { job } from "./cron.js";
import sendEmail from "./sendEmail.js";

const require = createRequire(import.meta.url);

const express = require('express');
const { Client } = require('@notionhq/client');
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const port = process.env.PORT || 8000;

require('dotenv').config();

const app = express();
app.use(cors());
app.use(jsonParser);

const authToken = process.env.NOTION_INTEGRATION_TOKEN;
const notionDbID = process.env.NOTION_DATABASE_ID;
const notionQueriesDbID = process.env.NOTION_QUERIES_DATABASE_ID; // ID of the database for queries
const notion = new Client({ auth: authToken });

job.start();

app.get('/posts', async (req, res) => {
    try {
        const response = await notion.databases.query({
            database_id: notionDbID,
            sorts: [
                {
                    timestamp: 'created_time',
                    direction: 'descending',
                },
            ]
        });
        const outputArr = [];
        const { results } = response;
        response.results.forEach((item) => {
            const { properties, id } = item;
            const { CurrentPrice, PostDate, OldPrice, ProductTitle, DiscountRate, ProductAbout, Name, PostType, ProductUrl, Status } = properties;

            const obj = {
                id: id,
                CurrentPrice: CurrentPrice?.number,
                PostDate: PostDate?.date?.start,
                OldPrice: OldPrice?.number,
                ProductTitle: ProductTitle?.rich_text[0]?.plain_text,
                DiscountRate: DiscountRate?.formula?.string,
                ProductAbout: ProductAbout?.rich_text[0]?.plain_text,
                Name: Name.title[0]?.plain_text,
                blockId: id,
                imgUrl: item.cover?.type === 'external' ? item.cover?.external?.url : item.cover?.file?.url,
                ProductUrl: ProductUrl.rich_text[0]?.plain_text,
                Status: Status?.select?.name
            };
            outputArr.push(obj);
        });

        res.send({ success: true, data: outputArr });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
});

app.get('/block/:id', async (req, res) => {
    try {
        const blockId = req.params.id;
        const response = await notion.blocks.retrieve({
            block_id: blockId,
        });
        res.send({ data: response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
});

app.get('/blocks/:id', async (req, res) => {
    try {
        const blockId = req.params.id;
        const response = await notion.blocks.children.list({
            block_id: blockId,
            page_size: 50,
        });

        const data = response.results.map(item => {
            const typeData = item.type;
            return {
                type: typeData,
                value: item[typeData]?.rich_text[0]?.plain_text,
                annotations: item[typeData]?.rich_text[0]?.annotations,
                href: item[typeData]?.rich_text[0]?.href
            };
        });

        res.send({ data });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
});

app.get('/posts/:id', async (req, res) => {
    try {
        const postId = req.params.id;

        if (!postId) {
            return res.status(400).send({ success: false, message: 'Post ID is required' });
        }

        const response = await notion.pages.retrieve({
            page_id: postId,
        });

        const { properties, id, cover } = response;
        const { CurrentPrice, PostDate, OldPrice, ProductTitle, DiscountRate, ProductAbout, Name, ProductUrl, Status } = properties;

        const post = {
            id: id,
            CurrentPrice: CurrentPrice?.number,
            PostDate: PostDate?.date?.start,
            OldPrice: OldPrice?.number,
            ProductTitle: ProductTitle?.rich_text[0]?.plain_text,
            DiscountRate: DiscountRate?.formula?.string,
            ProductAbout: ProductAbout?.rich_text[0]?.plain_text,
            Name: Name.title[0]?.plain_text,
            blockId: id,
            imgUrl: cover?.type === 'external' ? cover?.external?.url : cover?.file?.url,
            ProductUrl: ProductUrl.rich_text[0]?.plain_text,
            Status: Status?.select?.name
        };

        res.send({ success: true, data: post });
    } catch (error) {
        console.log(error);
        if (error.statusCode === 404) {
            return res.status(404).send({ success: false, message: 'Post not found' });
        }
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
});

app.get('/top-posts', async (req, res) => {
    try {
        const response = await notion.databases.query({
            database_id: notionDbID,
            filter: {
                property: 'PostType',
                select: {
                    equals: 'TOP'
                }
            },
            sorts: [
                {
                    timestamp: 'created_time',
                    direction: 'descending',
                },
            ]
        });

        const outputArr = response.results.map(item => ({
            id: item.id,
            title: item.properties.ProductTitle?.rich_text[0]?.plain_text,
            Status: item?.properties?.Status?.select?.name
        }));

        res.send({ success: true, data: outputArr });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
});

// Endpoint to add a new query entry
app.post('/queries', async (req, res) => {
    try {
        const { name, query, email } = req.body;

        if (!name || !query || !email) {
            return res.status(400).send({ success: false, message: 'Name, query, and email are required' });
        }

        const response = await notion.pages.create({
            parent: { database_id: process.env.NOTION_QUERY_DATABASE_ID },
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: name
                            }
                        }
                    ]
                },
                Query: {
                    rich_text: [
                        {
                            text: {
                                content: query
                            }
                        }
                    ]
                },
                Email: {
                    rich_text: [
                        {
                            text: {
                                content: email
                            }
                        }
                    ]
                }
            }
        });
        const options = {
            email: email,
            subject: "Thank You for contacting RupaySavvy.in",
            message: `Dear ${name},
        
Thank you for reaching out to Rupay Savvy. We have received your query and our team is currently reviewing it.
        
Please be assured that we are working diligently to resolve your issue. You can expect a resolution within the next 2-3 days.
        
If you have any additional information or questions in the meantime, please feel free to reply to this email.
        
Thank you for your patience and understanding.
        
Best regards,
Rupay Savvy`
        };


        sendEmail(options)
        res.send({ success: true, data: response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
});

app.get("/", (req, res) => {
    res.send("Server is working");
});

app.listen(port, () => {
    console.log(`server listening on port ${port}!`);
});
