import express from 'express';
import Cart from '../models/cart.js';
import Order from '../models/order.js';

export const placeOrder = async (req,res)=>{
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

    if(!cart || cart.items,length === 0){
        return res.status(400).json({message: "Cart is empty "});
    }
    let totalAmount = 0;

    const orderItems = cart.items.map((item)=>{
        totalAmount += item.product.price * item.quantity;
        return{
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
        };
    });
    const order = await Order.create({
        user: req.user.id,
        items: orderItems,
        totalAmount,
    });
    cart.items = [];
    await cart.save();
    res.status(201).json(order);
};