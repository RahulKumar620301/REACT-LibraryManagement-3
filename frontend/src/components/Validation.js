export const validateForm = (data) => {
    const errors = {};

    if (!data.title.trim()) {
        errors.title = 'Title is required';
    }

    if (!data.author.trim()) {
        errors.author = 'Author is required';
    }
    
    if (!data.category.trim()) {
        errors.category = 'category is required';
    }
    if (!data.description.trim()) {
        errors.description = 'description is required';
    }
    
    if (data.price==0) {
        errors.price = 'Price is required';

    }else if (data.price<500) {
        errors.price = 'Minimum Price Limit is 500';
    }
    else if (data.price>2000) {
        errors.price = 'Maximum Price Limit is 2000';
    }
return errors;
};