const User = require('../Models/userModel')
const Exercise = require('../Models/exerciseModel')

exports.createUser = async (req, res)=>{
    if(req.body){
        const user = await User.create(req.body);
    res.status(201).json({
       username:user.username,
       _id:user._id
      });
    }
    
}

exports.createExercise = async (req, res)=>{
  const _id = req.params._id
    if(req.body){
        const { description, duration, userId, date } = req.body;
             
        const user = await User.findById(_id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        console.log(date, duration, user)
        const exercise = await Exercise.create({userId:user._id,username:user.username,description, duration, date:date?new Date(date):new Date()})
        console.log(exercise)
        res.status(201).json({
            username: user.username,
            _id: user._id,
            date: new Date(exercise.date).toDateString(),
            description:exercise.description,
            duration: exercise.duration
        });
    }
}

exports.getLogs = async (req, res) => {
  const userId = req.params._id;
  const { from, to, limit } = req.query;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    let filter = { userId };

    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }

    let query = Exercise.find(filter).select('description duration date');
    if (limit) query = query.limit(parseInt(limit));

    const exercises = await query;

    const formattedLog = exercises.map(ex => ({
      description: ex.description,
      duration: ex.duration,
      date:ex.date.toDateString() 
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
};

exports.getAllUsers = async (req, res) =>{
    try {
        const users = await User.find({}, 'username _id');
        res.json(users);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}