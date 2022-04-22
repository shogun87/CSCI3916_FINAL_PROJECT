

  let product_details = [
    {
        name: 'Thumb Tacks',
        quantity: 100, 
        price: 4.99
    },
    {
        name: 'Red Yarn',
        quantity: 1,
        price: 6.89
    },
    {
        name: 'Glue Stick',
        quantity: 1,
        price: 0.99
    },
    {
        name: 'Double Sided Tape',
        quantity: 2,
        price: 7.99
    },
    {
        name: 'Scissors',
        quantity: 1,
        price: 5.00
    },
    {
        name: 'Poster Board', 
        quanity: 1,
        price: 5.79
    },
    {
        name: 'CUrPlan Subscription',
        quantity: 1,
        price: 500000.00
    },
    {
        name: 'Monitor',
        quantity: 1,
        price: 99.99
    }

];


(new Product(product_details[1])).save();
(new Product(product_details[2])).save();
(new Product(product_details[3])).save();
(new Product(product_details[4])).save();
(new Product(product_details[5])).save();
(new Product(product_details[6])).save();
(new Product(product_details[7])).save();