const Joi = require('joi');
const { isEmpty } = require('lodash');
const jwt = require('jsonwebtoken');
const {
  models: { contacts },
} = require('../models');

exports.login = async (req, res) => {
  try {
    const { body } = req;
    const schema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'in'] },
      }),
      password: Joi.string().required(),
    });
    const { email, password } = body;
    await schema.validateAsync({
      email,
      password,
    });
    const contact = await contacts.findOne({
      attributes: ['contactId', 'email', 'password'],
      where: {
        email,
        password,
      },
      raw: true,
    });

    if (!isEmpty(contact)) {
      const { contactId } = contact;
      const token = jwt.sign({ userId: contactId }, 'the-way-of-water', {});
      return res.status(200).send({
        success: true,
        token,
        contact,
      });
    }
    return res.status(200).send({
      success: true,
      message: 'You have entered an invalid email or password',
    });
  } catch (err) {
    return res.status(200).send({
      success: false,
      error: err.message || 'Something went to wrong',
    });
  }
};
