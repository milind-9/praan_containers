const device_model = require('../models/devices')

exports.createUser = async(req,res)=>{
try{
    const device = await device_model.create(req.body)
    return res.status(200).json({
        status: true,
        message: 'Device Added Successfully'
    })
}catch(err){
    console.log(err)
    return res.status(200).json({
        status: false,
        message: 'Something Went Wrong'
    })
}
    
}

exports.get_device = async(req,res)=>{
    if (!req.params.device_id) {
        return res.status(200).json({
            status: false,
            message: 'Please Select The Device To Get Details'
        })
      }
    try{
        const device = await device_model.findOne({
            _id: req.params.device_id
        })
        if(!device){
            return res.status(200).json({
                status: false,
                message: `Device Details Not Exist Having Id: ${req.params.device_id}`
            })
        }
        return res.status(200).json({
            status: true,
            device
        })
    }catch(err){
        console.log(err)
        return res.status(200).json({
            status: false,
            message: 'Something Went Wrong'
        })
    }
        
    }


    exports.get_all_device = async(req,res)=>{
        const options = {}
        if(req.query.from_date && req.query.to_date){
            options.$and= [
                { p: { $gt: req.query.from_date, $lt: req.query.to_date } }
              ]
        }
        try{
            const devices = await device_model.find(options)
            if(devices.length <= 0){
                return res.status(200).json({
                    status: false,
                    message: `Records Not Found`
                })
            }
            return res.status(200).json({
                status: true,
                devices
            })
        }catch(err){
            console.log(err)
            return res.status(200).json({
                status: false,
                message: 'Something Went Wrong'
            })
        }
            
}


exports.updateDevice = async(req,res)=>{
    try{
        const update = await device_model.updateOne( { _id: req.params.device_id },
            {
              $set: req.body
            },)
        return res.status(200).json({
            status: true,
            message: 'Device Updated Successfully'
        })
    }catch(err){
        console.log(err)
        return res.status(200).json({
            status: false,
            message: 'Something Went Wrong'
        })
    }
        
    }


    exports.delete_device =async(req,res)=>{
        if(!req.params.device_id){
            return res.status(200).json({
                success: false,
                message: 'Device Id Is Required'
            })
        }
        const device = await device_model.findOne({_id: req.params.device_id})
        if(!device){
            return res.status(200).json({
                success: false,
                message: 'Device Not Exist'
            })
        }
        try{
            device.remove()
            return res.status(200).json({
                success: true,
                message: "Device Deleted Successfully"
            })
        }catch(err){
            return res.status(200).json({
                success: false,
                message: 'Something Went Wrong'
            })
        }
        
        }