const express = require('express');
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// const mysql = require('mysql');
const userRouter = require('./modules/User/UserRoutes/UserRoutes');
const apartmentRouter = require('./modules/Apartment/ApartmentRoute/ApartmentRoute');
const neighborhoodRouter = require('./modules/Neighborhood/NeighborhoodRoute/NeighborhoodRoute');
const groupRouter = require('./modules/Group/GroupRoute/GroupRoute');
const permissionRouter = require('./modules/Permission/PermissionRoute/PermissionRoute');


app.use(userRouter);
app.use(apartmentRouter);
app.use(neighborhoodRouter);
app.use(groupRouter);
app.use(permissionRouter);


app.listen(3000, () => {
    console.log("The server is listening on port 3000:");
})