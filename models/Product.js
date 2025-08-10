import mongoose from "mongoose";
import express from "express";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    category: { 
        type: String,
    },
    yearEnd: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

export default mongoose.model("Product", productSchema);
