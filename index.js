const express = require('express');
// const mysql = require('mysql');
const bodyParser = require('body-parser');
const userRouter = require('./modules/User/UserRoutes/UserRoutes');
const apartmentRouter = require('./modules/Apartment/ApartmentRoute/ApartmentRoute');
const neighborhoodRouter = require('./modules/Neighborhood/NeighborhoodRoute/NeighborhoodRoute');
const groupRouter = require('./modules/Group/GroupRoute/GroupRoute');
const permissionRouter = require('./modules/Permission/PermissionRoute/PermissionRoute');

const app = express()
app.use(userRouter);
app.use(apartmentRouter);
app.use(neighborhoodRouter);
app.use(groupRouter);
app.use(permissionRouter);
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("The server is listening on port 3000:");
})