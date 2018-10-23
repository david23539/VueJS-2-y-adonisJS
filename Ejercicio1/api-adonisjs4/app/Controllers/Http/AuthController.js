'use strict'

const User = use('App/Models/User');
class AuthController {
  async login({request, response, auth}) {
    const { user } = request.all();
    const logged = await auth.attempt(user.email, user.password, true);
    return response.json(logged);
  }

  async register ({req, res}) {
    const userInstance = new User();
    const { user } = req.all();

    userInstance.username = user.email;
    userInstance.email = user.email;
    userInstance.password = user.password;

    await userInstance.save();
    return res.json(userInstance);
  }

  async profile ( {req, res, auth}) {
    let user = await auth.getUser();
    const userInput = req.input('user');
    user.email = userInput['email'];
    user.username = userInput['username'];
    await user.save();

    const logged = await auth.generate(user, true);
    return res.json(logged);
  }

}

module.exports = AuthController
