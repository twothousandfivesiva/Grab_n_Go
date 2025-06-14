class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }
  //  filter() {
  //   const queryCopy = { ...this.queryStr };
  //   //   Removing some fields for category
  //   const removeFields = ["keyword", "page", "limit"];

  //   removeFields.forEach((key) => delete queryCopy[key]);
  // //    // Filter For Price and Rating
  // //   if (queryCopy.price) {
  // //   for (const key in queryCopy.price) {
  // //     queryCopy.price[key] = Number(queryCopy.price[key]);
  // //   }
  // // }

  // // if (queryCopy.rating) {
  // //   for (const key in queryCopy.rating) {
  // //     queryCopy.rating[key] = Number(queryCopy.rating[key]);
  // //   }
  // // }
  //   let queryStr = JSON.stringify(queryCopy);
  //   queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

  //   // this.query = this.query.find(JSON.parse(queryStr));
  //   //  return this;
  //   try {
  //   this.query = this.query.find(JSON.parse(queryStr));
  // } catch (error) {
  //   console.error("Error in filter() parsing:", error);
  //   this.query = this.query.find({});
  // }

  // return this;
    

  //  }
  filter() {
  const queryCopy = { ...this.queryStr };

  // Remove unwanted fields
  const removeFields = ["keyword", "page", "limit"];
  removeFields.forEach((key) => delete queryCopy[key]);

  // // ✅ Convert price filter values to numbers
  // if (queryCopy.price) {
  //   for (const key in queryCopy.price) {
  //     queryCopy.price[key] = Number(queryCopy.price[key]);
  //   }
  // }
  if (queryCopy["price[gte]"] || queryCopy["price[lte]"]) {
    queryCopy.price = {};
    if (queryCopy["price[gte]"]) {
      queryCopy.price.gte = Number(queryCopy["price[gte]"]);
    }
    if (queryCopy["price[lte]"]) {
      queryCopy.price.lte = Number(queryCopy["price[lte]"]);
    }

    // remove original flat keys
    delete queryCopy["price[gte]"];
    delete queryCopy["price[lte]"];
  }
  if (queryCopy["ratings[gte]"]) {
    queryCopy.ratings = {};
    queryCopy.ratings.gte = Number(queryCopy["ratings[gte]"]);
    delete queryCopy["ratings[gte]"];
  }

   // ✅ Category filter (case-insensitive)
  if (queryCopy.category) {
    queryCopy.category = {
      $regex: queryCopy.category,
      $options: "i"
    };
  }


  // Convert operators (gte, lte) to MongoDB format ($gte, $lte)
  let queryStr = JSON.stringify(queryCopy);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

  try {
    this.query = this.query.find(JSON.parse(queryStr));
  } catch (error) {
    console.error("Error in filter():", error);
    this.query = this.query.find({});
  }

  return this;
}

   pagination(resultPerPage){
    const currentPage = Number(this.queryStr.page) || 1;//wrapped in Number for javascript to convert it to number

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
   }
};
module.exports = ApiFeatures;