const User = require('../Models/userModel')
const Exercise = require('../Models/exerciseModel')

exports.createUser = async (req, res)=>{
    if(req.body){
        const user = req.body
        console.log(user)
    await User.create(user);
    res.status(201).json({
        status: 'success',
        data: {
          data: user,
        },
      });
    }
    
}

exports.createExercise = async (req, res)=>{
    if(req.body){
        const exercise = req.body;
        await Exercise.create(exercise)
        res.status(201).json({
            status: 'success',
            data: {
              data: exercise,
            },
          });
    }
}

exports.getLogs = async (req, res)=>{
    const userId = req.params._id;
    const { from, to, limit } = req.query;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
    
        let query = { userId };
    
        if (from || to) {
          query.date = {};
          if (from) query.date.$gte = new Date(from);
          if (to) query.date.$lte = new Date(to);
        }
    
        let exercises = Exercise.find(query).select('description duration date');
        if (limit) exercises = exercises.limit(parseInt(limit));
    
        const log = await exercises.lean();
    
        const formattedLog = log.map(ex => ({
          description: ex.description,
          duration: ex.duration,
          date: new Date(ex.date).toDateString() // "Mon Jan 01 1990"
        }));
    
        res.json({
          _id: user._id,
          username: user.username,
          count: formattedLog.length,
          log: formattedLog
        });
    
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}