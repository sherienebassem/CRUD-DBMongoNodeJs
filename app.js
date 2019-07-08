//#region // All imoprts Lib <dependencies> \\

const mongoose = require('mongoose');
const express = require('express');
const app = express();

//#endregion

//#region  //Connection-DB//
// connection database
mongoose.connect('mongodb://localhost/iSatApp', { useNewUrlParser: true })
.then(()=>{
    console.log("###############################");
    console.log("###### connected succsed ######");
    console.log("###############################");
})
.catch(()=>{
    console.log("##############################");
    console.log('###### connected failed ######');
    console.log("##############################");
});
//#endregion

 //#region // Create Schema

const mainCatSchema = new mongoose.Schema({

    label: String,
    logo: String,
    typePacket: String ,
    date:{type: Date, default:Date.now()},
    isPublished: Boolean,
    countInCat:Number
});

//#endregion

//#region   // Model : Compile Schema into model

const Mcat = mongoose.model('Mcat', mainCatSchema );

//#endregion

//#region // Take Object {definition => for Schema}
async function createMainCategory(){

const mc = new Mcat({
   label: "any",
   logo: "img-icon",
   typePacket:"any",
   isPublished: true,
   countInCat: 4005
});

const result = await mc.save();
console.log(result);
}
//createMainCategory();

//#endregion

//#region //Run A Function

//createMainCategory();

//#endregion

//#region //Get Query All Data From <NameOfModel.find()>\\

async function getCategories (){
    const catResult = await Mcat.find();
    console.log(catResult);
}

// getCategories();

//#endregion

//#region //Get Query Data From <NameOfModel.find(within {Filtration})>\\

async function getCategoriesFiltration (){
    const catResultFiltration = await Mcat
                    .find({ label:"Movies" })
                    .limit(1)
                    .sort({label:1})
                    .select({label:1, logo:1})
    console.log(catResultFiltration);
}

// getCategoriesFiltration();

//#endregion

//#region //Query Comparsion Operator
 /*
  * Equal = eq
  * Not Equal = ne
  * Greater Than = gt
  * Greater Than Or Equal = gte
  * Less Than = lt
  * Less Than Or Equal = lte
  * Between Range = in
  * Not Between Range = nin
  */

 async function getCategoriesComparsion (){
    const catResultComparsion= await Mcat
                   // .find({countInCat:{$eq: 4000} })
                   // .find({countInCat:{$gte: 3000, $lte: 6000} })
                   // .find({countInCat:{$in:[3000,4000,6000]} })
                    .find({countInCat:{$nin:[3000,4000,6000]} })
                    .limit(2)
                    .sort({label:1})
                    .select({_id:1, label:1, logo:1, countInCat:1})
    console.log(catResultComparsion);
}

 // getCategoriesComparsion();

//#endregion

//#region //Query Logical Operator
/*
 * and
 * or
 */
async function getCategoriesLogical (){
    const catResultLogical = await Mcat
                    .find()
                    //.or ([{ label:"Live" },{countInCat:500}])
                    .and ([{ label:"Live" },{countInCat:4000}])
                    .limit(2)
                    .sort({label:1})
                    .select({label:1, logo:1})
    console.log(catResultLogical);
}

 //getCategoriesLogical();

 //#endregion

 //#region //Regular Expression \\

 async function getCategoriesRegex (){
    const catResultRegex = await Mcat
                    //RegularExpression /^Movies/i Start With Movies
                    //RegularExpression /.*Movies.*/i Search Movies whith i
                    //RegularExpression /Movies$/i
                    //RegularExpression /^Movies$/i
                    .find({label:/Movies/i})
                    .limit(1)
                    .sort({label:1})
                    .select({label:1, logo:1})
                    //.count() => deprecated and will be removed in a future version
                    //.countDocuments() <= use this
                    //.estimatedDocumentCount() <= or this
    console.log(catResultRegex);
}

  //getCategoriesRegex();

 //#endregion

 //#region // I have two approaches working on one of them
 //Follow Next Down
 //#endregion

//#region //First Approache\\ Query First: findbyid --> Modify Properites -->Save

 async function dataBaseUpDateFirstApproche(id){
    const dbUpDate = await Mcat.findById(id)
    //dbUpDate.label='update';
    //dbUpDate.isPublished=false; 
    //OR Next
    dbUpDate.set({
        label:"update",
        isPublished:false
    })

    const result = await dbUpDate.save();
    console.log(result);
 }

 //dataBaseUpDateFirstApproche("5d1f8e2f72b9c95cec4fc276");
//#endregion

//#region Next Approche ||UpDate First : update direct --> option : Get update Document
  async function dataBaseUpDateSecondApproche(id){
       const result = await Mcat.updateOne({_id:id},{
            $set: {
                    label:"Live",
                    isPublished:true
            }
        })

        console.log(result);
  }

 // dataBaseUpDateSecondApproche("5d1f8e2f72b9c95cec4fc276");
//#endregion 

//#region //Delet From DataBase use Tow Approches the same update database
//   async function deletFromDb(id){
//       const result = await Mcat.deleteOne({_id:id})
//       console.log(result)
//   }
async function deletFromDb(id){
    const result = await Mcat.findByIdAndDelete({_id:id})
    console.log(result)
}

 // deletFromDb("5d230c1791f35f2d1c3d4459");
//#endregion