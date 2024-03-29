import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const productSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	  },
	  description: {
		type: String,
		required: true,
	  },
	  code: {
		type: String,
		required: true,
	  },
	  price: {
		type: Number,
		required: true,
	  },
	  status: {
		type: Boolean,
		default: true,
	  },
	  stock: {
		type: Number,
		required: true,
	  },
	  category: {
		type: String,
		enum: ["Mascaras", "Serums", "Vitaminas", "Cremas_y_Geles"],
		default: "Cremas_y_Geles",
	  },
	  thumbnails: {
		type: Array,
		default: [],
	  },
	  
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productCollection, productSchema);

export default productModel ;