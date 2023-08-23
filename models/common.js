// const getID = (field) => {
    
//     router.get('/files/:filename',(req,res,next)=>{
//         gfs.files.find({filename:req.params.filename}).toArray((err,files)=>{
//           if(!files[0]||files.length===0){
//             return res.status(200).json({
//               msg:"No files with that name"
//             });
//           }
//           res.status(200).json({
//             file:files[0]
//           })
//         })
//       })



//     return field
//   }
//   module.exports = {
//     getID
//   };