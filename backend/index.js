import {createRequire} from "module"
const require = createRequire(import.meta.url);

const express = require('express');
const {Client} = require('@notionhq/client');
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const port = process.env.PORT || 8000;
require('dotenv').config();

const app = express();
app.use(cors());

const authToken = process.env.NOTION_INTEGRATION_TOKEN;
const notionDbID = process.env.NOTION_DATABASE_ID;
const notion = new Client ({auth: authToken});




app.get('/posts', async(req, res) => {
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
        const outputArr = []
        const {results} = response;
        console.log(response.results[1].cover)
        response.results.forEach(async (item)=>{
            const {properties ,id} = item
            const {ID,CurrentPrice,PostDate,OldPrice,ProductTitle,DiscountRate,ProductAbout,Name ,PostType,ProductUrl} = properties

            const blockId = id
console.log(PostType?.select?.name)
            const obj = {
                id: id,
                CurrentPrice:CurrentPrice?.number,
                PostDate:PostDate?.date?.start,
                OldPrice:OldPrice?.number,ProductTitle:ProductTitle?.rich_text[0]?.plain_text,DiscountRate:DiscountRate?.formula?.string,ProductAbout:ProductAbout?.rich_text[0]?.plain_text,
                Name:Name.title[0]?.plain_text,blockId:blockId,
                imgUrl:item.cover?.type === 'external' ? item.cover?.external?.url : item.cover?.file?.url,
                ProductUrl:ProductUrl.rich_text[0]?.plain_text,
            }
            outputArr.push(obj)
           
        })

        // console.log(results)
        res.send({success:true,data:outputArr});
    } catch (error) {
        console.log(error);
    }
});

//returns array of blocks
app.get('/block/:id', async(req, res) => {
    try { 
        const blockId = req.params.id
        const response = await notion.blocks.retrieve({
            block_id: blockId,
          });
          console.log(response);
         
       
          res.send({data:response})
    } catch (error) {
        console.log(error);
    }
});
//returns array of blocks
app.get('/blocks/:id', async(req, res) => {
    try { 
        const blockId = req.params.id
        const response = await notion.blocks.children.list({
            block_id: blockId,
            page_size: 50,
          });
         
          const data = response.results
          const dataArr = []
          data.forEach((item)=>{
                const typeData = item.type
                    const obj = {
                        type:typeData,
                        value:item[typeData]?.rich_text[0]?.plain_text,
                        annotations:item[typeData]?.rich_text[0]?.annotations,
                        href:item[typeData]?.rich_text[0]?.href
                    }
                    dataArr.push(obj)
             
          })
          console.log({data:dataArr})
          res.send({data:dataArr})
    } catch (error) {
        console.log(error);
    }
});


app.get('/posts/:id', async(req, res) => {
    try {
        const postId = req.params.id; // Get the ID from route parameters

        if (!postId) {
            return res.status(400).send({success: false, message: 'Post ID is required'});
        }

        const response = await notion.pages.retrieve({
            page_id: postId,
        });

        const {properties, id, cover} = response;
        const {ID, CurrentPrice, PostDate, OldPrice, ProductTitle, DiscountRate, ProductAbout, Name} = properties;

        const post = {
            id: id,
            CurrentPrice: CurrentPrice?.number,
            PostDate:PostDate?.date?.start,
            OldPrice: OldPrice?.number,
            ProductTitle: ProductTitle?.rich_text[0]?.plain_text,
            DiscountRate:DiscountRate?.formula?.string,
            ProductAbout: ProductAbout?.rich_text[0]?.plain_text,
            Name: Name.title[0]?.plain_text,
            blockId: id,
            imgUrl: cover?.type === 'external' ? cover?.external?.url : cover?.file?.url,
        };

        res.send({success: true, data: post});
    } catch (error) {
        console.log(error);
        if (error.statusCode === 404) {
            return res.status(404).send({success: false, message: 'Post not found'});
        }
        res.status(500).send({success: false, message: 'Internal server error'});
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
            title: item.properties.ProductTitle?.rich_text[0]?.plain_text
        }));

        res.send({success: true, data: outputArr});
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false, message: 'Internal server error'});
    }
});


app.listen(port, () => {
    console.log('server listening on port 8000!');
});