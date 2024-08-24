import mongoose, {Schema} from "mongoose";


const NoteSchema = new Schema({
    idUser: {type: String, require: true},
    data: {type: String, require: true},
    nameNote: {type: String, require: true},
    anotacao: {type: String, require: true}
})

export const NoteModel = (mongoose.models.notes || mongoose.model("notes", NoteSchema))