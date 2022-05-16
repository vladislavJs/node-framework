module.exports = (req, res) => {
    req.bodyParse = (emitter, mask) => {
        let body = ''

        req.on('data', chunk => {
            body += chunk
        })

        req.on('end', () => {
            if(body){
                req.body = JSON.parse(body)
            }
            const event = emitter.emit(mask, req, res)

            if(!event) {
                res.end(`${mask} not found`)
            }
        })
    }



}