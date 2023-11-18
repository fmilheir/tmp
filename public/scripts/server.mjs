import express from "express";
import cors from  'cors';
import userRoute from '../../routes/userRoute.mjs';
import Poirouter from "../../routes/poiRoute.mjs";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRoute);
app.use('/poi', Poirouter);
app.use(express.static("public"));
app.use("/public", express.static('./public/'));

///// sswagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Endpoints testing',
            description: 'API Information',
            contact: {
                name: 'Developer'
            },
            licence: {
                name: 'Apache 2.0',
                url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
            },
            servers: [
                {url: 'http://localhost:3000'}
            ]
        }
    },
    //apis: ['../../routes/*.js'] // files containing annotations as above#
    apis: ['routes/poiRoute.mjs', 'routes/userRoute.mjs']
    
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


app.get("/", (req, res) => {
    res.redirect( "/public/index.html"); // only this one works 
});

app.get("/login", (req, res) => {
    res.redirect( "/public/login.html"); 
})

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')

});



export default app;