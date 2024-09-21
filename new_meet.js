var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var thenrequest = require("then-request");
var path = require("path");

// app initialization params
app.set("views", "./views");
app.set("view engine", "jade");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Your Api key-secret pair for Authentication
var zoom_key = "AKLYQK1ST2UDPr77L70ew";
var zoom_sec = "WN94XCHpCBTpk5CGBZeIncdfILy2mLMF";

//Set the routes
app.get("/", function (req, res) {
  res.render("home", { title: "Welcome" });
});

app.get("/createUser", function (req, res) {
  res.render("users", { title: "User Management" });
});

app.post("/createUser", function (req, res) {
  var options = {
    qs: {
      api_key: zoom_key,
      api_secret: zoom_sec,
      data_type: "JSON",
      email: "rmdwivedi@gmail.com",
      type: 2,
    },
  };

  // make an asynchronous request to zoom to create a User
  var asyncres = thenrequest(
    "POST",
    "https://dev.zoom.us/v1/user/create",
    options
  ).done(function (res) {
    // console.log(res.getBody("utf8"));
    console.log(res);
  });
  res.redirect("/");
});

app.get("/autoUser", function (req, res) {
  res.render("autoUsers", { title: "User Management" });
});

app.post("/autoUser", function (req, res) {
  console.log(req.body);
  console.log("email:", req.body.email);
  var options = {
    qs: {
      api_key: zoom_key,
      api_secret: zoom_sec,
      data_type: "JSON",
      email: req.body.email,
      password: req.body.pwd,
      type: 2,
    },
  };

  // make an asynchronous request to zoom to create a user without email verification
  var asyncres = thenrequest(
    "POST",
    "https://dev.zoom.us/v1/user/autocreate2",
    options
  ).done(function (res) {
    console.log(res);
  });
  // res.redirect("/");
});

app.get("/updateUser", function (req, res) {
  res.render("upUsers", { title: "User Management" });
});

app.post("/updateUser", function (req, res) {
  console.log(req.body);
  console.log("email:", req.body.id);

  var options = {
    qs: {
      api_key: zoom_key,
      api_secret: zoom_sec,
      data_type: "JSON",
      id: req.body.id,
      type: req.body.type,
    },
  };

  // make an asynchronous request to zoom to update a user
  var asyncres = thenrequest(
    "POST",
    "https://dev.zoom.us/v1/user/update",
    options
  ).done(function (res) {
    console.log(res.getBody("utf8"));
  });
  res.redirect("/");
});

app.get("/createMeeting", function (req, res) {
  res.render("Meetings", { title: "Manage Meetings" });
});

app.post("/createMeeting", function (req, res) {
  console.log(req.body);
  console.log("id:", req.body.id);

  console.log("topic:", req.body.topic);
  var Moptions = {
    qs: {
      api_key: zoom_key,
      api_secret: zoom_sec,
      data_type: "JSON",
      host_id: req.body.id,
      topic: req.body.topic,
      type: 3,
    },
  };

  // make an asynchronous request to zoom to create a meeting
  var asyncres = thenrequest(
    "POST",
    "https://dev.zoom.us/v1/meeting/create",
    Moptions
  ).done(function (res) {
    console.log(res.getBody("utf8"));
  });
  res.redirect("/");
});

app.get("/listMeeting", function (req, res) {
  res.render("listMeetings", { title: "Manage Meetings" });
});

app.post("/listMeeting", function (req, res) {
  console.log(req.body);
  console.log("id:", req.body.id);

  var Moptions = {
    qs: {
      api_key: zoom_key,
      api_secret: zoom_sec,
      data_type: "JSON",
      host_id: req.body.id,
    },
  };
  // make an asynchronous request to zoom to list all meetings
  var asyncres = thenrequest(
    "POST",
    "https://dev.zoom.us/v1/meeting/list",
    Moptions
  ).done(function (res) {
    console.log(res.getBody("utf8"));
  });
  res.redirect("/");
});

app.get("/updateMeeting", function (req, res) {
  res.render("upMeetings", { title: "Manage Meetings" });
});

app.post("/updateMeeting", function (req, res) {
  console.log(req.body);
  console.log("id:", req.body.id);

  console.log("topic:", req.body.topic);
  var Moptions = {
    qs: {
      api_key: zoom_key,
      api_secret: zoom_sec,
      data_type: "JSON",
      host_id: req.body.id,
      id: req.body.mId,
      type: req.body.type,
    },
  };
  // make an asynchronous request to zoom to update a meeting
  var asyncres = thenrequest(
    "POST",
    "https://dev.zoom.us/v1/meeting/update",
    Moptions
  ).done(function (res) {
    console.log(res.getBody("utf8"));
  });
  res.redirect("/");
});

app.listen(3003, () => {
  console.log("Node has started");
});
