const http = require('http')
const Emitter = require('events')

module.exports = class Application {
    constructor() {
        this.emitter = new Emitter
        this.server = this.#createServer()
        this.middlewares = []
    }

    use(middleware) {
        this.middlewares.push(middleware)
    }

    listen(port, callback) {
        this.server.listen(port, callback)
    }

    addRouter(router) {
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path]

            Object.keys(endpoint).forEach(method => {
                const handler = endpoint[method]
                this.emitter.on(this.#getRouteMask(method, path), (req, res) => {
                    handler(req, res)
                })
            })
        })
    }

    #createServer() {
        return http.createServer((req, res) => {

            this.middlewares.forEach(middleware => middleware(req, res))
            req.bodyParse(this.emitter, this.#getRouteMask(req.method, req.pathname))
        })
    }

    #getRouteMask(method, path) {
        return `${method}:${path}`
    }
}