const Joi = require('joi');
const { isEmpty, toLower } = require('lodash');
const { Op } = require('sequelize');
const {
  models: { contacts },
} = require('../models');
const { findData } = require('../../shared/utils');

exports.create = async (req, res) => {
  try {
    const {
      body,
      user: { userId },
    } = req;
    const schema = Joi.object({
      firstName: Joi.string().alphanum().required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'in'] },
      }),
      password: Joi.string().required(),
      phone: Joi.string().required(),
    });
    const { firstName, email, password, phone } = body;
    const validatedParams = await schema.validateAsync({
      firstName,
      email,
      password,
      phone,
    });
    const contact = await contacts.findAll({
      attributes: ['contactId', 'email', 'phone'],
      where: {
        [Op.and]: {
          [Op.or]: {
            email,
            phone,
          },
        },
      },
      raw: true,
    });
    if (!isEmpty(contact)) {
      const checkEmail = findData(contact, email, 'email', toLower);
      if (!isEmpty(checkEmail)) {
        return res.status(200).send({
          success: true,
          message: 'Email Id Already Exists.',
        });
      }
      const checkPhone = findData(contact, phone, 'phone');
      if (!isEmpty(checkPhone)) {
        return res.status(200).send({
          success: true,
          message: 'Phone Number Already Exists.',
        });
      }
    }
    const data = await contacts.create({
      ...body,
      ...validatedParams,
      createBy: userId,
    });
    return res.status(200).send({
      success: true,
      data,
      message: 'Inserted Successfully.',
    });
  } catch (err) {
    res.status(401).send({
      success: false,
      error: err.message || 'Something went to wrong',
    });
  }
  return '';
};

exports.update = async (req, res) => {
  try {
    const {
      params: { id },
      body,
      user: { userId },
    } = req;
    const schema = Joi.object({
      firstName: Joi.string().alphanum().required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'in'] },
      }),
      password: Joi.string().required(),
      phone: Joi.string().required(),
    });
    const { firstName, email, password, phone } = body;
    const validatedParams = await schema.validateAsync({
      firstName,
      email,
      password,
      phone,
    });
    const contact = await contacts.findAll({
      attributes: ['contactId', 'email', 'phone'],
      where: {
        contactId: { [Op.ne]: id },
        [Op.and]: {
          [Op.or]: {
            email,
            phone,
          },
        },
      },
      raw: true,
    });
    if (!isEmpty(contact)) {
      const checkEmail = findData(contact, email, 'email', toLower);
      if (!isEmpty(checkEmail)) {
        return res.status(200).send({
          success: true,
          message: 'Email Id Already Exists.',
        });
      }
      const checkPhone = findData(contact, phone, 'phone', toLower);
      if (!isEmpty(checkPhone)) {
        return res.status(200).send({
          success: true,
          message: 'Phone Number Already Exists.',
        });
      }
    }
    const data = await contacts.update(
      { ...body, ...validatedParams, updateBy: userId },
      { where: { contactId: id } }
    );
    res.status(200).send({
      success: true,
      data,
      message: 'Updated Successfully.',
    });
  } catch (err) {
    res.status(401).send({
      success: false,
      error: err.message || 'Something went to wrong',
    });
  }
  return '';
};

exports.get = (req, res) => {
  const {
    params: { id },
  } = req;
  contacts
    .findOne({
      attributes: [
        'contactId',
        'firstName',
        'middleName',
        'lastName',
        'dob',
        'email',
        'password',
        'phone',
        'occupation',
        'company',
      ],
      where: {
        contactId: id,
      },
    })
    .then((data) => {
      res.status(200).send({ success: true, data });
    })
    .catch((error) => {
      res.status(401).send({
        success: false,
        error: error.message || 'Something went to wrong',
      });
    });
};

exports.getAll = (req, res) => {
  const {
    user: { userId },
  } = req;
  contacts
    .findAll({
      attributes: [
        'contactId',
        'firstName',
        'middleName',
        'lastName',
        'dob',
        'email',
        'password',
        'phone',
        'occupation',
        'company',
      ],
      where: {
        createBy: userId,
      },
    })
    .then((data) => {
      res.status(200).send({ success: true, data });
    })
    .catch((error) => {
      res.status(401).send({
        success: false,
        error: error.message || 'Something went to wrong',
      });
    });
};

exports.delete = (req, res) => {
  const {
    params: { id },
  } = req;
  contacts
    .destroy({ where: { contactId: id } })
    .then(() => {
      res.status(200).send({
        success: true,
        message: 'Deleted Successfully.',
      });
    })
    .catch((error) => {
      res.status(401).send({
        success: false,
        error: error.message || 'Something went to wrong',
      });
    });
};
