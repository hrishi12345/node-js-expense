const { Sequelize } = require('sequelize');
const Expense = require('../models/expense');
const User=require('../models/users');
const sequelize = require('../util/database');
const addexpense = async (req, res) => {
    const { expenseamount, description, category } = req.body;
    const t = await sequelize.transaction();

    if (expenseamount == undefined || expenseamount.length === 0) {
        return res.status(400).json({ success: false, message: 'Parameters missing' });
    }
    
    try {
        const expense = await Expense.create({ expenseamount, description, category, userId: req.user.id }, { transaction: t });

        const totalexpense = req.user.totalExpense + parseInt(expenseamount, 10);
        console.log(totalexpense);

        await User.update({ totalExpense: totalexpense }, { where: { id: req.user.id }, transaction: t });

        await t.commit();

        return res.status(201).json({ expense, success: true });
    } catch (err) {
        await t.rollback();
        return res.status(500).json({ success: false, error: err });
    }
};


const getexpenses = (req, res)=> {
    
    Expense.findAll({ where : { userId: req.user.id}}).then(expenses => {
        return res.status(200).json({expenses, success: true})
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({ error: err, success: false})
    })
}

const deleteexpense = async (req, res) => {
    const expenseid = req.params.expenseid;
    if (expenseid == undefined || expenseid.length === 0) {
        return res.status(400).json({ success: false });
    }

    try {
        const expense = await Expense.findOne({ where: { id: expenseid, userId: req.user.id } });
        if (!expense) {
            return res.status(404).json({ success: false, message: 'Expense doesn\'t belong to the user' });
        }

        const totalexpense = req.user.totalExpense - expense.expenseamount;

        await User.update({ totalExpense: totalexpense }, { where: { id: req.user.id } });

        await Expense.destroy({ where: { id: expenseid, userId: req.user.id } });

        return res.status(200).json({ success: true, message: 'Deleted Successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'Failed' });
    }
};



module.exports = {
    deleteexpense,
    getexpenses,
    addexpense
}