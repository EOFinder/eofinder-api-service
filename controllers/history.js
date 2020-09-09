const History = require('../models/history');

module.exports = {
    getAllHistory: async (req, res) => {
        const histories = await History.find({})
        .populate({path: 'id_events', select: 'title'})

        if(histories){
            res.status(200).json({
                message: 'success',
                histories
            })
        } else {
            res.status(400).json({
                message: 'error'
            })
        }
    },
    getHistoryByUser : async(req, res) => {
        const history = await History.findOne({id_users: req.params.id})
        .populate({path: 'id_events', select: 'title'})

        if(history !== null){
            res.status(200).json({
                message: 'success',
                history
            })
        }else {
            res.status(400).json({
                message: 'error'
            })
        }
    }
}