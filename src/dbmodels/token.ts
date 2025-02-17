import {Schema, model} from 'mongoose';

export interface Token {
    name: string;
    symbol: string;
    image: string;
    description: string;
    token: string;
    bonding: string;
    creator: string;
    updated_date?:Date;
    created_date?:Date;
}
  

var tokenSchema = new Schema<Token>({
    name: {
        type: String,
    },
    symbol: {
        type: String,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    token: {
        type: String,
    },
    bonding: {
        type: String,
    },
    creator: {
        type: String,
    },
    updated_date: {
        type: Date,
        default: Date.now
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

export const token =  model<Token>('token', tokenSchema,"token");