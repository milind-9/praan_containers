const csvParser = require('csv-parser');
const device_model = require('../models/devices')
exports.upload_data = async(req,res)=>{
    if (!req.file) {
        return res.status(200).json({ status: false,message: 'No file uploaded' });
      }
    try{
        const csvData = req.file.buffer.toString('utf8');

    const jsonArray = [];
     csvParser()
      .on('data', (row) => {
        // console.log(row)
        jsonArray.push(row);
      })
      .on('end', () => {
        console.log(jsonArray)
      })
      .write(csvData);
    //   console.log(jsonArray)
      if(jsonArray.length > 0){
        const add_devices = jsonArray.map(async (item) => {
            const device = await device_model.create(item)
        })
        await Promise.all(add_devices);
       
      }
      setTimeout(()=>{
        res.status(200).json({
            status: true,
            message: 'Data Uploaded Successfully'
        })
      },1000)
    }catch(err){
        console.log(err)
        return res.status(200).json({
            status: false,
            message: 'Something Went Wrong'
        })
    }
}