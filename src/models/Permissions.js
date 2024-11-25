import mongoose from "mongoose";


const PermissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
  });

export default mongoose.model('Permissions', PermissionSchema);