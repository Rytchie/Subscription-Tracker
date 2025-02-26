import mongoose from 'mongoose';
import express from 'express.js';

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: 0,
        max: 1000000,
    },
    currency: {
        type: String,
        required: [true, 'Subscription currency is required'],
        enum: ['USD', 'EUR', 'GBP'],
        default: 'USD'
    },
    frequency: {
        type: String,
        enum: ['daily','weekly', 'monthly', 'yearly'],
        default: 'monthly',
    },
    category:{
        type: String,
        enum: ['sports', 'entertainment', 'education', 'business', 'free', 'sports', 'technology', 'health', 'gaming', 'music', 'other'],
        required: [true, 'Subscription category is required']
    },
    paymentMethod: {
        type: String,
        required: [true, 'Subscription payment method is required'],
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: [true, 'Subscription start date is required'],
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Subscription start date must be in the past'
        }
    },
    renewalDate: {
        type: Date,
        required: [true, 'Subscription start date is required'],
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: 'Renewal must be after the start date'
            }
        },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Subscription must belong to a user'],
        index: true,
    }
}, {timestamps: true});

subscriptionSchema.pre('save', function (next) {
    if(!this.renewalDate){
        const renewalPeriods = {
            'daily': 1,
            'weekly': 7,
            'monthly': 30,enum: ['sports', 'entertainment', 'education', 'business', 'free', 'technology', 'health', 'gaming', 'music', 'other'],
            'yearly': 365
        };
        this.renewalDate = new Date(this.this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if(this.renewalDate < new Date()){
        this.status = 'expired';
    }

    next();
})

export const Subscription = mongoose.model('Subscription', subscriptionSchema);