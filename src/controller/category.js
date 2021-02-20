const slugify = require('slugify');
const Category = require('../models/category');

const createCategories = (categories, parentId = null) => {
    const categoriesList = [];
    let category;
    if (parentId == null) {
        category = categories.filter(cate => cate.parentId == undefined);
    } else {
        category = categories.filter(cate => cate.parentId == parentId);
    }
    for(let cate of category){
        categoriesList.push({
            _id: cate._id,
            name:cate.name,
            slug: cate.slug,
            children: createCategories(categories, cate._id)
        });
    }
    return categoriesList;
}

exports.addCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }

    if(req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }
    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if (error) return res.status(400).json({
            error
        })
        if (category) return res.status(200).json({ category });
    })
};

exports.getCategories = (req, res) => {
    Category.find({})
    .exec((err, categories) => {
        if (err) return res.status(400).json({err});
        if (categories) 
        {
            const categoryList = createCategories(categories);
            return res.status(200).json({categoryList});
        }
    })
}