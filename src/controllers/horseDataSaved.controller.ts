import racingModel from '../models/racing.model';
import mongoose from 'mongoose';
export const horseDataSaved = async (data: any) => {
    if (!data) {
        return;
    }
    const race = new racingModel({
        _id: new mongoose.Types.ObjectId(),
        event: data?.race.event,
        horse: data?.race.horse,
        time: data?.race.time
    });
    const result = await race.save();
    return result;
};
