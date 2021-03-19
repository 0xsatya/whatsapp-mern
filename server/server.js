// importing
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from "pusher";
import cors from 'cors';
import path from 'path';
// app config
const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1174297",
    key: "0443d15258d76a74fda7",
    secret: "0d2acf65a481fd2c0708",
    cluster: "ap2",
    useTLS: true
  });

// middlewares
app.use(express.json())
app.use(cors());

const __dirname = path.resolve();
const buildPath = path.join(__dirname, '..','build');
app.use(express.static(buildPath));

app.get('/', (req, res) => {
  res.sendFile(buildPath+'/index.html');
});

//app.get('/', (req, res) => res.status(200).send('hello world'));

// DB config
const connection_url = 'mongodb+srv://admin:SS4Z24rDzaXke9iY@cluster0.bf3dc.mongodb.net/WHATSAPP-MERN-BACKEND?retryWrites=true&w=majority'
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.once("open", ()=> {
    console.log("DB connected");
    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        console.log(change);
        if (change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                id: messageDetails.id,
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            });
        } else {
            console.log("Error triggering Pusher");
        }
    });
});
// ????

// api routes


app.post('/messages/new', (req, res) => {
    const dbMessage = req.body
    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get('/messages/sync', (req, res) => {
    const dbMessage = req.body
    Messages.find(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

// listener
app.listen(port, ()=> console.log(`Listening on localhost: ${port}`));