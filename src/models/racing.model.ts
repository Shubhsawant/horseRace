import mongoose, { Document, Schema } from 'mongoose';

export interface IRacing {
    event: string;
    horse: Object;
    time: string
}

export interface IRacingModel extends IRacing, Document {}

const Racingchema: Schema = new Schema(
    {
        event: { type: String, required: true },
        horse: { type: Object, required: true },
        time:  {type: String, required:true}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IRacing>('Racing', Racingchema);
