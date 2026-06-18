import mongoose from 'mongoose';

const clickSchema = new mongoose.Schema({
  urlId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Url', 
    required: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
  device: { 
    type: String, 
    default: 'unknown' 
  },
  browser: { 
    type: String, 
    default: 'unknown' 
  },
  country: { 
    type: String, 
    default: 'unknown' 
  },
  referrer: { 
    type: String, 
    default: 'direct' 
  },
});

const Click = mongoose.model('Click', clickSchema);
export default Click;