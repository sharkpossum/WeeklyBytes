import express from "express";

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send("Hello WeeklyBytes!")
})

app.listen(port, ()=> {
    console.log(`WeeklyBytes Server listening on port ${port}`)
})