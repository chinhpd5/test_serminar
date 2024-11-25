import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    
    permissionsId: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Permissions' 
        }
    ],
});

export default mongoose.model('Roles', RoleSchema);
