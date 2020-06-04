import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

import connection from '../../database/connection';

class UserController {
  async index(req, res) {
    const users = await connection('users').select('*');

    return res.json(users);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      username: Yup.string().required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { username, password } = req.body;

    const userExists = await connection('users')
      .where('username', username)
      .select('id')
      .first();

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    req.body.password = await bcrypt.hash(password, 8);

    await connection('users').insert(req.body);

    return res.json({ message: 'User successfully registered!' });
  }
}

export default new UserController();
