const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define(
    'user',
    {
        id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        email:{type: DataTypes.STRING, unique:true, allowNull:false},
        password:{type:DataTypes.STRING, allowNull: false},
    }
)

const Box = sequelize.define(
    'box',
    {
        id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        name:{type: DataTypes.STRING, unique:true, allowNull:false},
        price:{type:DataTypes.INTEGER, allowNull: false},
        img:{type:DataTypes.STRING, allowNull:true}

    }
)

const Order = sequelize.define(
    'order',
    {
        id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        status:{type:DataTypes.STRING, allowNull: false},
        payment_status:{type:DataTypes.STRING, allowNull: false},
        client_name:{type:DataTypes.STRING, allowNull: false},
        client_phone:{type:DataTypes.STRING, allowNull: true},
        date_to_send:{type:DataTypes.STRING, allowNull: true},
        comment:{type:DataTypes.STRING, allowNull: true},
        box_amount:{type:DataTypes.INTEGER, allowNull: true},
        city:{type:DataTypes.STRING, allowNull: true},
        department:{type:DataTypes.STRING, allowNull: true},
        post_card_text:{type:DataTypes.STRING, allowNull: true},
        price:{type:DataTypes.INTEGER, allowNull: false},

    }
)

const OrderAdd = sequelize.define(
    'order_add',
    {
        id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        name:{type:DataTypes.STRING,unique:true, allowNull: false},
        amount:{type:DataTypes.INTEGER, allowNull: false},
        price:{type:DataTypes.INTEGER, allowNull: false}
    }
)


const PostCard = sequelize.define(
    'post_card',
    {
        id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        name:{type:DataTypes.STRING,unique:true, allowNull: false},
        price:{type:DataTypes.INTEGER, allowNull: false},
        img:{type:DataTypes.STRING, allowNull:true}
    }
)

const OrderBox = sequelize.define(
    'order_box',
    {
        id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        amount:{type: DataTypes.INTEGER,allowNull: false}

    }
)

const BoxComposition = sequelize.define(
    'box_composition',
    {
        id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        name:{type:DataTypes.STRING,unique:false, allowNull: false},
        amount:{type:DataTypes.INTEGER, allowNull: false}
    }
)
const CBox = sequelize.define(
    'c_box',
    {
        id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        name:{type:DataTypes.STRING,unique:true, allowNull: false},
        price:{type:DataTypes.INTEGER, allowNull: false},
        img:{type:DataTypes.STRING, allowNull:true}
    }
)

const OrderPostCard = sequelize.define(
    'order_post_card',
    {
        id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        amount:{type: DataTypes.INTEGER,allowNull: false}

    }
)
const BoxCBox = sequelize.define(
    'box_c_box',
    {
            id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true}
    }
)


Order.hasMany(OrderAdd, {as:'orderAdd'})
OrderAdd.belongsTo(Order)

Order.belongsToMany(PostCard,{through:OrderPostCard})
PostCard.belongsToMany(Order,{through:OrderPostCard})

CBox.belongsToMany(Box,{through:BoxCBox})
Box.belongsToMany(CBox,{through:BoxCBox})

Box.hasMany(BoxComposition, {as:'composition'})
BoxComposition.belongsTo(Box)

Box.belongsToMany(Order,{through:OrderBox})
Order.belongsToMany(Box,{through:OrderBox})


module.exports = {
    Order,
    Box,
    OrderAdd,
    PostCard,
    OrderBox,
    CBox,
    BoxComposition,
    User,
    OrderPostCard

}

/*
DROP TABLE  box_c_boxes,box_compositions, boxes, c_boxes, order_adds,order_boxes,order_post_cards, orders, post_cards; */