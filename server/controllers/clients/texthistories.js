import e from "express";
import TextHistoryModel from "../../models/TextHistoryModel.js";

export const setHistory = async (req, res) => {
  try {
    let isNew = req.body.is_new;
    let pattern_id = req.body.model_id;
    let subject_id = req.body.subject_id;
    let subject_title = req.body.subject_title;
    let content = req.body.content;
    let user_id = req.body.user_id;
    let result = "";
    if( !isNew ) {
      result = await TextHistoryModel.findOneAndUpdate({subject_id: subject_id}, {
        user: user_id,
        pattern: pattern_id,
        subject_id: subject_id,
        subject_title: subject_title,
        content: content
      });
    } else {
      result = await TextHistoryModel.create({
        user: user_id,
        pattern: pattern_id,
        subject_id: subject_id,
        subject_title: subject_title,
        content: content
      });
    }
    
    res.status(200).json({ result: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: err });
  }
};

export const getHistory = async (req, res) => {
  try {
    let pattern_id = req.body.model_id;
    let user_id = req.body.user_id;
    const result = await TextHistoryModel.find({
      user: user_id,
      pattern: pattern_id
    }).populate("pattern").sort({created_at: 1}).exec();
    res.status(200).json({ result: result });
  } catch (err) {
    res.status(500).json({ result: err });
  }
}

export const getOneTextHistory = async (req, res) => {
  try {
    let session_id = req.body.session_id;
    const result = await TextHistoryModel.findOne({
      session_id: session_id,
    }).exec();
    res.status(200).json({ result: result });
  } catch (err) {
    res.status(500).json({ result: err });
  }
}
