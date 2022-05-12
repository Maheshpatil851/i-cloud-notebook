const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../modules/Notes')
const { body, validationResult } = require('express-validator');

// Route 1 : fetch all notes endpoint =/api/notes/fetchallnotes : Login required 
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('some error ocured ')
    }


});

// Route 2 : add notes endpoint =/api/notes/addnote :Login required 
router.post("/addnote", fetchuser, [
    body('title', "title must at least 5 character ").isLength({ min: 3 }),
    body('discription', "discription must at least 5 character ").isLength({ min: 5 })], async (req, res) => {
        try {
            // if there error occurs return the bad request 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { title, discription, tag } = req.body

            const note = new Notes({
                title, discription, tag, user: req.user.id
            })

            const savednote = await note.save();
            res.send(savednote);



        } catch (error) {
            console.error(error.message);
            res.status(500).send('some error ocured ')
        }


    });

// Route 3 : update the note endpoint  : using PUT=/api/notes/updatenote :Login required 
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, discription, tag } = req.body;

    //make a newnote object 
    const Newnote = {};
    if (title) { Newnote.title = title };
    if (discription) { Newnote.discription = discription };
    if (tag) { Newnote.tag = tag };

    //find the note and update it with updated note 

    let note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send("not found");
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("not allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: Newnote }, { new: true })
    res.json({ note })


});

// Route 4 : delete the note : using DELETE = endpoint =/api/notes/deletenote :Login required 
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    const { title, discription, tag } = req.body;

    //find the note which was delete and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send("not found");
    }
    // user does not delete othres notes 
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("not allowed");
    }

    note = await Notes.findByIdAndDelete (req.params.id);
    res.json({"Sucess": "Note has been deleted sucessfully", note:note} );


});


module.exports = router