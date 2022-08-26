const mongoose = require("mongoose");

exports.Movies = async(req,res,next) =>{
    let data = [
        {
          Id: "0",
          imgSrc: "assets/images/et00098735-uydsvrdktl-portrait",
          review:"Laal Singh Chaddha, starring Aamir Khan & Kareena Kapoor is a story set in India that unfolds through several historical events as a beautiful journey of love, adventure, hope and wonder.",
          name: "Laal Singh Chaddha",
        },
        {
          Id: "1",
          imgSrc: "assets/images/et00136643-drxbugxtfx-portrait",
          review:"Raksha Bandhan is a story that celebrates family values, togetherness, love, even sacrifice_but most importantly, it is a story that celebrates one of the most precious and unique kind of familial bond - relationship between a brother and his sisters!",
          name: "Raksha Bandhan",
        },
        {
          Id: "2",
          imgSrc: "assets/images/et00304943-sebfpfepqd-portrait",
          review:"Liger is a multilingual movie starring Vijay Deverakonda and Ananya Panday in prominent roles. It is directed by Puri Jagannadh with Karan Johar, Charmy Kaur, Apoorva Mehta and Hiroo Johar as producers.",
          name: "Liger",
        },
        {
          Id: "3",
          imgSrc: "assets/images/et00328501-nmgcnvgdax-portrait",
          review:"26 years. One unsolved mystery. And countless unanswered questions. In this timeless thriller, experience a rollercoaster of emotions, and brace yourself for the most mind-bending theories of time.",
          name: "Do Barra",
        },
      ];
   try{
    res.status(200).json({
        message:"data send",
        data : data,
    })
   }catch(error)
   {
    next(error);
   }
}