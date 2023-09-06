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
        const page = parseInt(req.query.page) || 1;
const perPage = parseInt(req.query.perPage) || 10;
if (req.query.from_time && req.query.to_time) {
  const fromTime = new Date(req.query.from_time);
  const toTime = new Date(req.query.to_time);

  // Check if fromTime and toTime are valid Date objects
  if (!isNaN(fromTime.getTime()) && !isNaN(toTime.getTime())) {
    options.$and = [
      { p: { $gte: fromTime, $lte: toTime } }
    ];
  } else {
    return res.status(400).json({
      status: false,
      message: 'Invalid date format for from_time or to_time'
    });
  }
}
        try{
          const totalCount = await device_model.countDocuments(options);
            const devices = await device_model.find(options)
            .skip((page - 1) * perPage)
            .limit(perPage); 
            if(devices.length <= 0){
                return res.status(200).json({
                    status: false,
                    message: `Records Not Found`
                })
            }
            return res.status(200).json({
                status: true,
                devices,
                totalCount
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

 exports.get_chart = async(req,res)=>{
          try{
        
              const device = await device_model.aggregate([
                {
                  $group: {
                    _id: "$device",
                    time: { $first: "$p" },
                    pm1: { $sum: { $toInt: "$p1" } },
                    pm25: { $sum: { $toInt: "$p25" } },
                    pm10: { $sum: { $toInt: "$p10" } },
                  },
                },
              ])
              console.log(device)
            const transformedData = [];
            const hourlyData =device
            
      // Iterate through the 'deviceAggregation' result
      device.forEach((item) => {
        // Extract relevant fields from 'item'
        const { _id, p1, p25, p10 } = item;
      
        // Create a new location object
        const location = {
          name: _id, 
          data: [], 
        };
      
        hourlyData.forEach((hourlyItem) => {
          const { time, pm1, pm25, pm10 } = hourlyItem;
          location.data.push({
            time,
            pm1,
            pm25,
            pm10,
          });
        });
      
        transformedData.push(location);
      });
      
      // Create the final output object
      const output = {
        locations: transformedData,
      };
        
              return res.status(200).json({
                  status: true,
                  output
              })
          }catch(err){
              console.log(err)
              return res.status(200).json({
                  status: false,
                  message: 'Something Went Wrong'
              })
          }
              
          }
