const express = require('express');
const mainDB = require('../model/mainDB')
const path = require('path');
const fs = require('fs');
const { where } = require('sequelize');
const imagesRouter = express.Router();


imagesRouter.route('/get')
  .get(async (req, res) => {
    try {
      const dir = path.join(__dirname, `../${req.query.dir}`);
      fs.readFile(dir, (err, data) => {
        if (err) {
          return res.status(500).json({ error: 'File not found or cannot be read' });
        }
        res.writeHead(200, {
          'Content-Type': 'image/jpeg',
          'Content-Length': data.length
        });
      //  console.log(data)
        res.end(data);
      });
    } catch (error) {
      console.log(`${req.baseUrl}: ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  imagesRouter.route('/list/:desId')
    .get(async (req, res) => {
      try {
        const data = await mainDB.findAll({where:{desId:req.params.desId}})
        res.json({data})
      } catch (error) {
        console.log(error)
        res.json({error: error})
      }
    })


module.exports = imagesRouter;
