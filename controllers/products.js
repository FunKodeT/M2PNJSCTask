const {query} = require('express');
const Product = require('../models/product');
const getAllProductStatic = async (req, res) => {
	/* 
    throw new Error('testing async errors');
	const search = 'a';
	*/
	const products = await Product.find({
		/*
		featured:true,
        name:'vase table',
		page: '2',
		name: '2',
		name: 'albany sectional',
        nbHits:products.length,
        // Throws an error if placed here
		name: {$regex: search, $options: 'i'},
		*/
		price: {$gt: 30},
		/*
		}).sort('name');
		}).sort('-name price');
		}).select('name price');
		}).select('name price').limit(4);
		}).select('name price').limit(30);
		}).select('name price').limit(10);
		}).sort('name').select('name price').limit(10);
		}).sort('name').select('name price').limit(10).skip(1);
		}).sort('name').select('name price').limit(10).skip(5);
		}).sort('name').select('name price');
		*/
	})
		.sort('price')
		.select('name price');
	/*
    res.status(200).json({msg:'products testing route'});
    res.status(200).json({products});
    */
	res.status(200).json({products, nbHits: products.length});
};
const getAllProduct = async (req, res) => {
	/* 
    console.log(req.query);
	const {featured, company, search} = req.query;
	const {featured, company, name} = req.query;
	const {featured, company, name, sort} = req.query;
	const {featured, company, name, sort, fields} = req.query;
	*/
	const {featured, company, name, sort, fields, numericFilter} = req.query;
	const queryObject = {};
	if (featured) {
		queryObject.featured = featured === 'true' ? true : false;
	}
	if (company) {
		queryObject.company = company;
	}
	if (name) {
		/* 
		queryObject.name = name;
		 */
		queryObject.name = {$regex: name, $options: 'i'};
	}
	if (numericFilter) {
		const operatorMap = {
			'>': '$gt',
			'>=': '$gte',
			'=': '$eq',
			'<': '$lt',
			'<=': '$lte',
		};
		const regEx = /\b(>|>=|=|<|<=)\b/g;
		let filter = numericFilter.replace(
			regEx,
			(match) => `-${operatorMap[match]}-`
		);
		const options = ['price', 'rating'];
		filters = filter.split(',').forEach((item) => {
			const [field, operator, value] = item.split('-');
			if (options.includes(field)) {
				queryObject[field] = {[operator]: Number(value)};
			}
		});
		/* 
		console.log(numericFilter);
		console.log(filter);
		*/
	}
	console.log(queryObject);
	/*
	const products = await Product.find(req.query);
	const products = await Product.find(queryObject);
	const products = await Product.find(queryObject).sort();
	// This will encounter an error if a user was to not include a sortable term
	*/
	let result = Product.find(queryObject);

	// SORTING FUNCTIONS
	if (sort) {
		/* 
		products = products.sort();
		console.log(sort);
		 */
		const sortList = sort.split(',').join(' ');
		result = result.sort(sortList);
		/* 
	}
	 */
	} else {
		result = result.sort('createdAt');
	}
	if (fields) {
		const fieldsList = fields.split(',').join(' ');
		result = result.select(fieldsList);
	}
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;
	result = result.skip(skip).limit(limit);
	/* 
	EXAMPLE:
		- THERE ARE 23 TOTAL STORE ITEMS
		- IF RESPONSE IS LIMITED TO 7 TOTAL ITEMS:
		4 PAGES: 7 ITEMS, 7 ITEMS, 7 ITEMS, 2 ITEMS
		- THE LOGIC WILL WORK AS FOLLOWS:
			- IF page IS EQUAL TO 1, AND limit IS EQUAL TO 10, page WILL SUBTRACT 1 FROM SELF (0), THEN MULTIPLY THAT RESULT BY THE limit VALUE (0*10) WHICH WILL RESULT IN A DEFAULT API SETUP OF skip BEING EQUAL TO 0, THEREFORE skip WILL NOT SKIP ANY ITEMS. IF page IS EQUAL TO ANOTHER VALUE INPUT BY USER (2), THE LOGIC WILL HAVE THE USER NAVIGATED TO THE 2ND page AS DEFINED BY THE limit VALUE. TLDR: IF USER WANTS TO SEE ITEM #22, page WOULD BE EQUAL TO 3, RESULTING IN skip BEING EQUAL TO (3-1)*10=20
	 */
	const products = await result;
	/*
    res.status(200).json({msg:'products route'});
     */
	res.status(200).json({products, nbHits: products.length});
};

// MODULE EXPORT
module.exports = {
	getAllProduct,
	getAllProductStatic,
};
