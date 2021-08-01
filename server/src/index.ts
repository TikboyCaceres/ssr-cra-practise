import express, {Request, Response} from "express";
import fs from 'fs';
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";

import App from '../../client/src/App';

//Simple express configuration
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Static Files

app.use(express.static(path.resolve(__dirname, 'client-build')));

app.get("/", (req:Request, res:Response) => {
  const context = {};
  const component = ReactDOMServer.renderToString(React.createElement(App));

  fs.readFile(path.resolve("./dist/client-build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Some error happened");
    }
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${component}</div>`
      )
    );
  });
});

app.listen(5000);