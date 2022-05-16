const Application = require('./framework/Application')
const router = require('./src/user-router')
const jsonParser = require('./framework/midlewares/jsonParser')
const bodyParser = require('./framework/midlewares/bodyParser')
const pathParser = require('./framework/midlewares/pathParser')
const mongoose = require('mongoose')


const app = new Application()
app.use(bodyParser)
app.use(jsonParser)
app.use(pathParser('http://localhost'))

app.addRouter(router)

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://user:123@cluster0.ghzmo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

        app.listen(80, () => console.log('started'))
    } catch (e) {
        console.log(e)
    }
}

start()




