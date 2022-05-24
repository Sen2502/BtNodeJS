const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const url = "mongodb+srv://lethimysen:lethimysen@cluster0.rk7ot.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('kết nối');
})
const schema = mongoose.Schema
const userSchema = new schema({
    name: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        trim: true
    },
    avatar: {
        type: String,
        trim: true,
        default: '123456789'
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        private: true
    }

},
    {
        collection: 'UserSchema'
    })
const UserSchema = mongoose.model('UserSchema', userSchema)
UserSchema.find({})
const product = new schema({
    name: {
        type: String,
        trim: true
    },
    price: {
        type: Number
    },
    imagePath: Array,
    categoryName: {
        type: String,
        trim: true
    },
    brandName: {
        type: String,
        trim: true
    },
    CPU: {
        type: String,
        trim: true
    },
    screenSize: {
        type: String,
        trim: true
    },
    RAM: {
        type: Number
    },
    maxRAM: {
        type: Number
    },
    GPU: {
        type: String,
        trim: true
    },
    graphicCard: {
        type: String,
        trim: true
    },
    OS: {
        type: String,
        trim: true
    }
},
    {
        collection: 'Products'
    }
)
const Product = mongoose.model('Products', product)
const receipts = new schema({
    buyerId: mongoose.Types.ObjectId,
    productId: mongoose.Types.ObjectId,
    payInMethod: {
        type: String,
        enum: ['cash', 'credit card', 'installment']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
},
{
    collection: 'Receipts'
})
const Receipts = mongoose.model('Receipts', receipts)

const buyer = new schema({
    firstName: String,
    lastName: String,
    gender: {
        type:String,
        enum: ['male', 'female', 'secret']
    },
    age: Number,
    boughtProductId: Array,
    phoneNumber: String,
    email: String
},{
    collection: 'Buyer'
})
const Buyer = mongoose.model('Buyer', buyer)

// lấy > 20 tuổi
Buyer.find({age:{$gt:20}})
.then(data => {
    console.log('lấy > 20 tuổi', data);
})
// Buyer.create({
//     firstName: "Cam",
//     lastName: "Lê",
//     gender: 'female',
//     age: 23,
//     boughtProductId: ['lenovo','asus'],
//     email: 'cam52809@donga.edu.vn',
//     phoneNumber: '123124'
// })
// lấy >= 23 tuổi
Buyer.find({age:{$gte:23}})
.then(data => {
    console.log('lấy >= 23 tuổi', data);
})
// Buyer.create({
//     firstName: "Huyền",
//     lastName: "Nguyễn",
//     gender: 'female',
//     age: 25,
//     boughtProductId: ['lenovo','asus'],
//     email: 'huyen112312@donga.edu.vn',
//     phoneNumber: '123124'
// })
// <= 20
Buyer.find({age:{$lte:20}})
.then(data => {
    console.log('<= 20', data);
})
// Buyer.create({
//     firstName: "Cam",
//     lastName: "Lê",
//     gender: 'female',
//     age: 20,
//     boughtProductId: ['lenovo','asus'],
//     email: 'test@gmail.com'
// })
// Buyer.create({
//     firstName: "Cam",
//     lastName: "Lê",
//     gender: 'female',
//     age: 18,
//     boughtProductId: ['lenovo','asus'],
//     email: 'test@gmail.com',
//     phoneNumber: '123124'
// })
// 20 hoặc 30
Buyer.find({$or:[{age:20},{age:30}]})
.then(data => {
    console.log('20 hoặc 30',data);
})
// Buyer.create({
//     firstName: "Cam",
//     lastName: "Lê",
//     gender: 'female',
//     age: 30,
//     boughtProductId: ['lenovo','asus'],
//     email: 'test@gmail.com',
//     phoneNumber: '123124'
// })
// email đuôi donga.edu.vn
Buyer.find({email:/donga.edu.vn/})
.then(data => {
    console.log('email đuôi donga.edu.vn',data);
})


// tên văn hoặc vân
Buyer.find({$or:[{firstName:'Văn'},{firstName:'Vân'}]})
.then(data => {
    console.log('tên văn hoặc vân',data);
})
// Buyer.create({
//     firstName: "Văn",
//     lastName: "Lê",
//     gender: 'male',
//     age: 23,
//     boughtProductId: ['lenovo','asus'],
//     email: 'van52809@donga.edu.vn',
//     phoneNumber: '123124'
// })
// Buyer.create({
//     firstName: "Vân",
//     lastName: "Lê",
//     gender: 'female',
//     age: 23,
//     boughtProductId: ['lenovo','asus'],
//     phoneNumber: '123124'
// })
// Ngọc nam
Buyer.find({$and:[{firstName:'Ngọc'},{gender:'male'}]})
.then(data => {
    console.log('tên Ngọc giới tính nam',data);
})
// Buyer.create({
//     firstName: "ngọc",
//     lastName: "Lê",
//     gender: 'male',
//     age: 23,
//     boughtProductId: ['lenovo','asus','hp','dell'],
//     email: 'van52809@donga.edu.vn',
//     phoneNumber: '034123123'
// })
// thiếu trường number
Buyer.find({phoneNumber:null})
.then(data => {
    console.log('thiếu trường number',data);
})


// thiếu trường email
Buyer.find({email:null})
.then(data => {
    console.log('thiếu trường email',data);
})

// có số điện thoại bắt đầu với 034
Buyer.find({phoneNumber:/^034/})
.then(data => {
    console.log('ó số điện thoại bắt đầu với 034',data);
})

//Hiển thị những buyer mua trên 3 món hàng.
Buyer.find({ "boughtProductId.3":{ "$exists": true }})
.then(data => {
    console.log('Hiển thị những buyer mua trên 3 món hàng.',data);
})

//Hiển thị những sản phẩm máy tính có RAM là 8Gb và không thể nâng cấp thêm. 
Product.find({})
.then(data => {
    console.log('Hiển thị những sản phẩm máy tính có RAM là 8Gb và không thể nâng cấp thêm. ');
    data.forEach(e=>{
        if(e.maxRAM - e.RAM === 0 ){
            console.log(e);
        }
    })
})
// Product.create({
//     name: 'ASUS',
//     RAM: 8,
//     maxRAM: 8
// })
// Product.create({
//     name: 'ASUS',
//     RAM: 8,
//     maxRAM: 16
// })
// Product.create({
//     name: 'LENOVO',
//     RAM: 8,
//     maxRAM: 8
// })
// Product.create({
//     name: 'LENOVO',
//     RAM: 8,
//     maxRAM: 16
// })

// Hiển thị những sản phẩm ASUS có 8Gb RAM hoặc LENOVO có 16Gb RAM.

Product.find({$or:[{$and:[{name:'ASUS'},{RAM:8}]},{$and:[{name:'LenOVO'},{RAM:16}]}]})
.then(data => {
    console.log('Hiển thị những sản phẩm ASUS có 8Gb RAM hoặc LENOVO có 16Gb RAM',data);
})
app.listen(PORT)