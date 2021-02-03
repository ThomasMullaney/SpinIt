const User = require("../../models/User");
const UserSession = require("../../models/User.session");

module.exports = app => {
  app.get("/api/counters", (req, res, next) => {
    Counter.find()
      .exec()
      .then(counter => res.json(counter))
      .catch(err => next(err));
  });

  app.post("/api/counters", function(req, res, next) {
    const counter = new Counter();

    counter
      .save()
      .then(() => res.json(counter))
      .catch(err => next(err));
  });

  // Signup
  app.post("/api/account/signup", (req, res, next) => {
    const { body } = req;
    const { firstName, lastName, password } = body;
    let { email } = body;

    if (!firstName) {
      return res.send({
        success: false,
        message: "Error: first name cannot be blank"
      });
    }
    if (!lastName) {
      return res.send({
        success: false,
        message: "Error: last name cannot be blank"
      });
    }
    if (!email) {
      return res.send({
        success: false,
        message: "Error: email cannot be blank"
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Error: password cannot be blank"
      });
    }

    email = email.toLowerCase();
    // steps:
    // 1. Verify email doesn't exist already
    // 2. save email
    User.find(
      {
        email: email
      },
      (err, previousUsers) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error."
          });
        } else if (previousUsers.length > 0) {
          return res.send({
            success: false,
            message: "Error: Account already exists."
          });
        }
        // Save User
        const newUser = new User();

        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error: Server error."
            });
          }
          return res.send({
            success: true,
            message: "Signed Up"
          });
        });
      }
    );
  });

  // User Session SignIn
  app.post("/api/account/signin", (req, res, next) => {
    const { body } = req;
    const { password } = body;
    let { email } = body;

    if (!email) {
      return res.send({
        success: false,
        message: "Error: must enter email to signin"
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Error: password cannot be blank"
      });
    }

    email = email.toLowerCase();

    User.find(
      {
        email: email
      },
      (err, users) => {
        if (err) {
          console.log("err 2:", err);
          return res.send({
            success: false,
            message: "Error: Server error #0."
          });
        }
        if (users.length != 1) {
          return res.send({
            success: false,
            message: "Error: Invalid"
          });
        }

        const user = users[0];
        if (!user.validPassword(password)) {
          return res.send({
            success: false,
            message: "Error: Invalid Password"
          });
        }

        // Otherwise Create User Session
        let userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error: Server error #1."
            });
          }
          return res.send({
            success: true,
            message: "Valid sign in",
            token: doc._id
          });
        });
      }
    );
  });

  app.get("/api/account/verify", (req, res, next) => {
    // Get token
    const { query } = req;
    const { token } = query;
    // token test
    // verify the token is one of a kind
    UserSession.find(
      {
        _id: token,
        isDeleted: false
      },
      (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error #2."
          });
        }
        if (sessions.length != 1) {
          return res.send({
            success: false,
            message: "Error: Invalid"
          });
        } else {
          return res.send({
            success: true,
            message: "Success"
          });
        }
      }
    );
  });

  app.get("/api/account/logout", (req, res, next) => {
    // Get token
    const { query } = req;
    const { token } = query;
    // token test
    // verify the token is one of a kind
    UserSession.findOneAndUpdate(
      {
        _id: token,
        isDeleted: false
      },
      {
        $set: { isDeleted: true }
      },
      null,
      (err, sessions) => {  
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error."
          });
        }
        //  if there are'nt any documents found by that token
        if (sessions.length != 1) {
          return res.send({
            success: false,
            message: "Error: Invalid token."
          });
        }
        // otherwise success
        return res.send({
          success: true,
          message: "Success"
        });
      }
    );
  });
};
