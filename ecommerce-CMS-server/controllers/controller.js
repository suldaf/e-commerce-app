const { compare } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { User, Product, Cart } = require("../models");
const { Op } =require('sequelize');
const e = require("express");

class Controller {
  // USER
  static register(req,res,next) {
    const {email,password} = req.body
    User.create({email,password})
      .then(user =>{
        res.status(201).json({user: {
          id: user.id,
          email: user.email
        }})
      })
      .catch(err =>{
        next(err)
      })
  }
  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!email || !password) {
          throw {
            message: "Email or password must be filled",
            name: "Login",
            status: 400,
          };
        }
        if (!user) {
          throw {
            message: "Wrong email or password",
            name: "Login",
            status: 400,
          };
        }
        const compared = compare(password, user.password);
        if (!compared) {
          throw {
            message: "Wrong email or password",
            name: "Login",
            status: 400,
          };
        }
        if (user) {
          const token = generateToken({
            id: user.id,
            email: user.email,
            role: user.role,
          });
          return res.status(200).json({
            id: user.id,
            email: user.email,
            token
           });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  // PRODUCT
  static readAllProduct(req, res, next) {
    Product.findAll({order: [['id','ASC']]})
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((err) => {
        next(err);
      });
  }
  static readProductById(req,res,next) {
    const productId = +req.params.id
    Product.findOne({ where: { id: productId } })
      .then(product => {
        res.status(200).json(product)
      })
      .catch(err =>{
        next(err)
      })
  }
  static createProduct(req, res, next) {
    const { name, image_url, price, stock } = req.body;
    Product.create({
      name,
      image_url,
      price,
      stock,
    })
      .then((data) => {
        res
          .status(201)
          .json({ message: "Produect successfully created", product: data });
      })
      .catch((err) => {
        next(err);
      });
  }
  static updateProduct(req, res, next) {
    const productId = +req.params.id;
    const input = {
      newName: req.body.name,
      newImage_url: req.body.image_url,
      newPrice: req.body.price,
      newStock: req.body.stock,
    };
    Product.update(
      {
        name: input.newName,
        image_url: input.newImage_url,
        price: input.newPrice,
        stock: input.newStock,
      },
      { where: { id: productId }, returning: true }
    )
      .then((data) => {
        res.status(200).json({
          message: "Product successfully updated",
          product: data[1][0],
        });
      })
      .catch((err) => {
        next(err);
      });
  }
  static deleteProduct(req, res, next) {
    const productId = +req.params.id;
    Product.destroy({ where: { id: productId } })
      .then(() => {
        res
          .status(200)
          .json({
            message: `Success deleting a product with id: ${productId}`,
          });
      })
      .catch((err) => {
        next(err);
      });
  }

  // CART
  static readCart(req,res,next) {
    const userId = +req.currentUser.id
    Cart.findAll({where: {UserId: userId, status: 'Unpaid'}, include: [Product], order: [['id','ASC']]})
      .then(carts=>{
        res.status(200).json(carts)
      })
      .catch(err =>{
        next(err)
      })
  }
  static addCart(req,res,next) {
    const userId = +req.currentUser.id
    const productId = +req.body.ProductId
    let productById
    Product.findOne({where: {id: productId}})
      .then(product => {
        if (!product) throw {message: 'Product not found', status: 404, name: 'Custom'}
        productById = product
        return Cart.findOne({where: {ProductId: productId, UserId: userId, price: productById.price, status: 'Unpaid'}})
      })
      .then(cart => {
        if (productById.stock === 0) throw {message: 'Out of Stocks', status: 401, name:'Custom'}

        if (!cart) return Cart.create({ProductId: +productId, UserId: +userId, price: +productById.price})

        if (+productById.price !== +cart.price)return Cart.create({ProductId: +productId, UserId: +userId, price: +productById.price})

        if (productById.stock > cart.quantity && +productById.price === +cart.price && cart.status === 'Unpaid') {
          return Cart.increment('quantity',{where: {id: cart.id}, returning:true})
          .then(data => {
            return data[0][0][0]
          })
        } 
        if (cart.status === 'Paid') return Cart.create({ProductId:productId,UserId:userId, price: +productById.price})
       
        throw {message: 'Out of Stocks', status: 401, name:'Custom'}
        
        // return Cart.update({quantity: cart.quantity + 1},{where: {[Op.and]: [{ ProductId }, { UserId }]}, returning: true})
        
      })
      .then(data =>{
        res.status(201).json(data)
      })
      .catch(err =>{
        next(err)
      })
  }
  static changeQuantity(req,res,next) {
    const cartId = +req.params.id
    let status = req.body.status
    let productId = req.body.productId
    let productById
    if (status == 'plus') {
      status = true
    } else if (status == 'min') {
      status = false
    }
    Product.findOne({where: {id: productId}})
      .then(data => {
        productById = data
        
        return Cart.findOne({where: {id: cartId}})
      })
      .then(cart => {
        if (productById.stock > cart.quantity) {
          if (status) {
            return Cart.increment('quantity',{where: {id: cartId}, returning:true})
          } else {
            return Cart.decrement('quantity',{where: {id: cartId}, returning:true})
          }
        } else {
          throw {message: 'Out of Stocks', status: 401, name:'Custom'}
        }
      })
      .then(data => {
        res.status(200).json(data[0][0][0])
      })
      .catch(err => {
        next(err)
      })
  }
  static updateCart(req,res,next){
    const UserId = +req.currentUser.id
    Cart.update({status: 'Paid'},{where: {UserId, status: 'Unpaid'},returning:true})
      .then((cart) =>{
        cart[1].forEach(el => {
          return Product.decrement('stock',{where: {id: el.ProductId}, by: el.quantity})
          .then(() =>{
            console.log('Stock has decreased')
          })
          .catch(err =>{
            next(err)
          })
        })
        res.status(200).json(cart[1])
      })
      .catch(err =>{
        next(err)
      })
  }
  static deleteCart(req,res,next){
    const cartId = +req.params.id

    Cart.destroy({where:{id: cartId}})
      .then((data)=>{
        if (!data) throw {message: 'Cart not found', status: 404, name:'Custom'}
        res.status(200).json({message: 'Success delete a cart'})
      })
      .catch(err =>{
        next(err)
      })
  }
  static readCartHistory(req,res,nxt) {
    const userId = +req.currentUser.id
    Cart.findAll({where: {UserId: userId, status: 'Paid'}, include:[Product], order: [['id','ASC']]})
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = Controller;
