/**
 * Skipped minification because the original files appears to be already minified.
 * Original file: /npm/@provide/nats.ws@1.0.6/dist/umd/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.nats = e() : t.nats = e()
}(this, (function() {
    return function(t) {
        var e = {};
        function r(n) {
            if (e[n])
                return e[n].exports;
            var i = e[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return t[n].call(i.exports, i, i.exports, r),
            i.l = !0,
            i.exports
        }
        return r.m = t,
        r.c = e,
        r.d = function(t, e, n) {
            r.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: n
            })
        }
        ,
        r.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }
        ,
        r.t = function(t, e) {
            if (1 & e && (t = r(t)),
            8 & e)
                return t;
            if (4 & e && "object" == typeof t && t && t.__esModule)
                return t;
            var n = Object.create(null);
            if (r.r(n),
            Object.defineProperty(n, "default", {
                enumerable: !0,
                value: t
            }),
            2 & e && "string" != typeof t)
                for (var i in t)
                    r.d(n, i, function(e) {
                        return t[e]
                    }
                    .bind(null, i));
            return n
        }
        ,
        r.n = function(t) {
            var e = t && t.__esModule ? function() {
                return t.default
            }
            : function() {
                return t
            }
            ;
            return r.d(e, "a", e),
            e
        }
        ,
        r.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }
        ,
        r.p = "",
        r(r.s = 12)
    }([function(t, e, r) {
        "use strict";
        var n;
        r.d(e, "a", (function() {
            return n
        }
        )),
        r.d(e, "b", (function() {
            return i
        }
        )),
        r.d(e, "c", (function() {
            return s
        }
        )),
        function(t) {
            t.BAD_AUTHENTICATION = "BAD_AUTHENTICATION",
            t.BAD_SUBJECT = "BAD_SUBJECT",
            t.CONNECTION_CLOSED = "CONNECTION_CLOSED",
            t.CONNECTION_DRAINING = "CONNECTION_DRAINING",
            t.CONNECTION_REFUSED = "CONNECTION_REFUSED",
            t.CONNECTION_TIMEOUT = "CONNECTION_TIMEOUT",
            t.INVALID_PAYLOAD_TYPE = "INVALID_PAYLOAD",
            t.UNKNOWN = "UNKNOWN_ERROR",
            t.WSS_REQUIRED = "WSS_REQUIRED",
            t.SUB_CLOSED = "SUB_CLOSED",
            t.SUB_DRAINING = "SUB_DRAINING",
            t.PERMISSIONS_VIOLATION = "PERMISSIONS_VIOLATION",
            t.AUTHORIZATION_VIOLATION = "AUTHORIZATION_VIOLATION",
            t.NATS_PROTOCOL_ERR = "NATS_PROTOCOL_ERR"
        }(n || (n = {}));
        class i {
            constructor() {
                this.messages = {},
                this.messages[n.BAD_AUTHENTICATION] = "User and Token can not both be provided",
                this.messages[n.BAD_SUBJECT] = "Subject must be supplied",
                this.messages[n.CONNECTION_CLOSED] = "Connection closed",
                this.messages[n.CONNECTION_CLOSED] = "Connection closed",
                this.messages[n.CONNECTION_REFUSED] = "Connection refused",
                this.messages[n.CONNECTION_TIMEOUT] = "Connection timeout",
                this.messages[n.CONNECTION_DRAINING] = "Connection draining",
                this.messages[n.INVALID_PAYLOAD_TYPE] = "Invalid payload type - payloads can be 'binary', 'string', or 'json'",
                this.messages[n.SUB_CLOSED] = "Subscription closed",
                this.messages[n.SUB_DRAINING] = "Subscription draining",
                this.messages[n.WSS_REQUIRED] = "TLS is required, therefore a secure websocket connection is also required"
            }
            static getMessage(t) {
                return i.messages.getMessage(t)
            }
            getMessage(t) {
                let e = this.messages[t];
                return e || (e = t),
                e
            }
        }
        i.messages = new i;
        class s extends Error {
            constructor(t, e, r) {
                super(t),
                this.name = "NatsError",
                this.message = t,
                this.code = e,
                this.chainedError = r
            }
            static errorForCode(t, e) {
                let r = i.getMessage(t);
                return new s(r,t,e)
            }
        }
    }
    , function(t, e, r) {
        "use strict";
        r.d(e, "d", (function() {
            return u
        }
        )),
        r.d(e, "b", (function() {
            return a
        }
        )),
        r.d(e, "c", (function() {
            return h
        }
        )),
        r.d(e, "a", (function() {
            return c
        }
        )),
        r.d(e, "e", (function() {
            return f
        }
        )),
        r.d(e, "f", (function() {
            return l
        }
        ));
        var n = r(2);
        let i = n.a.fromAscii("\r\n")
          , s = new Uint8Array(i)[0]
          , o = new Uint8Array(i)[1];
        function u(t) {
            return t instanceof ArrayBuffer
        }
        function a(t, ...e) {
            for (let r = 0; r < e.length; r++) {
                let n = e[r];
                Object.keys(n).forEach((function(e) {
                    t[e] = n[e]
                }
                ))
            }
            return t
        }
        function h(t) {
            let e = function(t) {
                let e = new Uint8Array(t);
                for (let t = 0; t < e.byteLength; t++) {
                    let r = t + 1;
                    if (e.byteLength > r && e[t] === s && e[r] === o)
                        return r + 1
                }
                return -1
            }(t);
            if (e) {
                let r = new Uint8Array(t).slice(0, e);
                return String.fromCharCode.apply(null, r)
            }
            return ""
        }
        function c(t, e) {
            let r = n.a.fromAscii(t);
            return e && (r = n.a.concat(r, e, i)),
            r
        }
        function f(t) {
            return Array.isArray(t) ? Promise.resolve(t).then(d) : Promise.reject(new TypeError("argument requires an array of promises"))
        }
        function l(t) {
            const e = t.split("")
              , r = [];
            for (var n = 0; n < e.length; n++)
                r.push(e[n].charCodeAt(0));
            return new Uint8Array(r)
        }
        function d(t) {
            return Promise.all(t.map(t=>Promise.resolve(t).then(p, p)))
        }
        function p(t) {
            return t
        }
    }
    , function(t, e, r) {
        "use strict";
        r.d(e, "a", (function() {
            return n
        }
        ));
        class n {
            constructor() {
                this.buffers = [],
                this.byteLength = 0
            }
            static concat(...t) {
                let e = 0;
                for (let r = 0; r < t.length; r++)
                    e += t[r].byteLength;
                let r = new Uint8Array(e)
                  , n = 0;
                for (let e = 0; e < t.length; e++)
                    r.set(new Uint8Array(t[e]), n),
                    n += t[e].byteLength;
                return r.buffer
            }
            static fromAscii(t) {
                t || (t = "");
                let e = new ArrayBuffer(t.length)
                  , r = new Uint8Array(e);
                for (let e = 0; e < t.length; e++)
                    r[e] = t.charCodeAt(e);
                return e
            }
            static toAscii(t) {
                return String.fromCharCode.apply(null, new Uint8Array(t))
            }
            pack() {
                if (this.buffers.length > 1) {
                    let t = this.buffers.splice(0, this.buffers.length);
                    this.buffers.push(n.concat(...t))
                }
            }
            drain(t) {
                if (this.buffers.length) {
                    this.pack();
                    let e = this.buffers.pop();
                    if (e) {
                        let r = this.byteLength;
                        (void 0 === t || t > r) && (t = r);
                        let n = e.slice(0, t);
                        return r > t && this.buffers.push(e.slice(t)),
                        this.byteLength = r - t,
                        n
                    }
                }
                return new Uint8Array(0).buffer
            }
            fill(t) {
                t && (this.buffers.push(t),
                this.byteLength += t.byteLength)
            }
            peek() {
                return this.buffers.length ? (this.pack(),
                this.buffers[0]) : new Uint8Array(0).buffer
            }
            size() {
                return this.byteLength
            }
            length() {
                return this.buffers.length
            }
        }
    }
    , function(t, e, r) {
        "use strict";
        var n;
        r.d(e, "a", (function() {
            return n
        }
        )),
        function(t) {
            t.STRING = "string",
            t.JSON = "json",
            t.BINARY = "binary"
        }(n || (n = {}))
    }
    , function(t, e, r) {
        "use strict";
        (function(t) {
            r.d(e, "d", (function() {
                return c
            }
            )),
            r.d(e, "i", (function() {
                return m
            }
            )),
            r.d(e, "a", (function() {
                return w
            }
            )),
            r.d(e, "k", (function() {
                return A
            }
            )),
            r.d(e, "j", (function() {
                return E
            }
            )),
            r.d(e, "f", (function() {
                return O
            }
            )),
            r.d(e, "g", (function() {
                return N
            }
            )),
            r.d(e, "c", (function() {
                return C
            }
            )),
            r.d(e, "h", (function() {
                return T
            }
            )),
            r.d(e, "b", (function() {
                return S
            }
            )),
            r.d(e, "e", (function() {
                return I
            }
            ));
            var n = r(3)
              , i = r(5)
              , s = r(0)
              , o = r(1)
              , u = r(6)
              , a = r(2);
            let h;
            var c;
            !function(t) {
                t[t.CLOSED = -1] = "CLOSED",
                t[t.AWAITING_CONTROL = 0] = "AWAITING_CONTROL",
                t[t.AWAITING_MSG_PAYLOAD = 1] = "AWAITING_MSG_PAYLOAD"
            }(c || (c = {}));
            const f = /^MSG\s+([^\s\r\n]+)\s+([^\s\r\n]+)\s+(([^\s\r\n]+)[^\S\r\n]+)?(\d+)\r\n/i
              , l = /^\+OK\s*\r\n/i
              , d = /^-ERR\s+('.+')?\r\n/i
              , p = /^PING\r\n/i
              , g = /^PONG\r\n/i
              , b = /^INFO\s+([^\r\n]+)\r\n/i
              , y = "\r\n".length;
            function m() {
                return h || (h = new u.a),
                `_INBOX.${h.next()}`
            }
            class w {
                constructor(t) {
                    this.lang = "javascript",
                    this.pedantic = !1,
                    this.protocol = 1,
                    this.verbose = !1,
                    (t = t || {}).token && (this.auth_token = t.token),
                    t.noEcho && (this.echo = !1),
                    t.userJWT && ("function" == typeof t.userJWT ? this.jwt = t.userJWT() : this.jwt = t.userJWT),
                    Object(o.b)(this, t)
                }
            }
            function A() {
                return {
                    sid: 0,
                    subject: "",
                    received: 0
                }
            }
            function E() {
                return {
                    token: "",
                    subject: "",
                    received: 0,
                    max: 1
                }
            }
            class O {
                constructor(t, e) {
                    this.token = t.token,
                    this.protocol = e
                }
                cancel() {
                    this.protocol.cancelRequest(this.token, 0)
                }
            }
            class N {
                constructor(t, e) {
                    this.sid = t.sid,
                    this.protocol = e
                }
                unsubscribe(t) {
                    this.protocol.unsubscribe(this.sid, t)
                }
                hasTimeout() {
                    let t = this.protocol.subscriptions.get(this.sid);
                    return null !== t && null !== t.timeout
                }
                cancelTimeout() {
                    let t = this.protocol.subscriptions.get(this.sid);
                    null !== t && null !== t.timeout && (clearTimeout(t.timeout),
                    t.timeout = null)
                }
                setTimeout(t, e) {
                    let r = this.protocol.subscriptions.get(this.sid);
                    return null !== r && (r.timeout && (clearTimeout(r.timeout),
                    r.timeout = null),
                    r.timeout = setTimeout(e, t),
                    !0)
                }
                getReceived() {
                    let t = this.protocol.subscriptions.get(this.sid);
                    return t ? t.received : 0
                }
                drain() {
                    return this.protocol.drainSubscription(this.sid)
                }
                isDraining() {
                    let t = this.protocol.subscriptions.get(this.sid);
                    return !!t && t.draining
                }
                isCancelled() {
                    return null === this.protocol.subscriptions.get(this.sid)
                }
            }
            class C {
                constructor() {
                    this.reqs = {},
                    this.length = 0
                }
                init() {
                    return this.baseInbox = `${m()}.`,
                    this.baseInbox
                }
                add(t) {
                    isNaN(t.received) || (t.received = 0),
                    this.length++,
                    this.reqs[t.token] = t
                }
                get(t) {
                    return t in this.reqs ? this.reqs[t] : null
                }
                cancel(t) {
                    t && t.timeout && (clearTimeout(t.timeout),
                    t.timeout = null),
                    t.token in this.reqs && (delete this.reqs[t.token],
                    this.length--)
                }
                getToken(t) {
                    let e = t.subject || "";
                    return 0 === e.indexOf(this.baseInbox) ? e.substring(this.baseInbox.length) : null
                }
                dispatcher() {
                    let t = this;
                    return function(e) {
                        let r = t.getToken(e);
                        if (r) {
                            let n = t.get(r);
                            n && (n.received++,
                            n.callback(e),
                            n.max && n.received >= n.max && t.cancel(n))
                        }
                    }
                }
            }
            class T {
                constructor() {
                    this.subs = {},
                    this.sidCounter = 0,
                    this.length = 0
                }
                add(t) {
                    return this.sidCounter++,
                    this.length++,
                    t.sid = this.sidCounter,
                    this.subs[t.sid] = t,
                    t
                }
                setMux(t) {
                    return this.mux = t,
                    t
                }
                getMux() {
                    return this.mux
                }
                get(t) {
                    return t in this.subs ? this.subs[t] : null
                }
                all() {
                    let t = [];
                    for (let e in this.subs) {
                        let r = this.subs[e];
                        t.push(r)
                    }
                    return t
                }
                cancel(t) {
                    t && t.timeout && (clearTimeout(t.timeout),
                    t.timeout = null),
                    t.sid in this.subs && (delete this.subs[t.sid],
                    this.length--)
                }
            }
            class S {
                constructor(t, e="string") {
                    this.msg = {},
                    this.msg.subject = t[1],
                    this.msg.sid = parseInt(t[2], 10),
                    this.msg.reply = t[4],
                    this.msg.size = parseInt(t[5], 10),
                    this.length = this.msg.size + y,
                    this.payload = e
                }
                fill(e) {
                    if (this.buf ? this.buf = a.a.concat(this.buf, e) : this.buf = e,
                    this.length -= e.byteLength,
                    0 === this.length) {
                        switch (this.msg.data = this.buf.slice(0, this.buf.byteLength - 2),
                        this.payload) {
                        case n.a.JSON:
                            this.msg.data = t.from(this.msg.data).toString("utf8"),
                            this.msg.data = JSON.parse(this.msg.data);
                            break;
                        case n.a.STRING:
                            this.msg.data = t.from(this.msg.data).toString("utf8");
                            break;
                        case n.a.BINARY:
                        }
                        this.buf = null
                    }
                }
            }
            class I {
                constructor(t, e) {
                    this.infoReceived = !1,
                    this.payload = null,
                    this.pongs = [],
                    this.pout = 0,
                    this.state = c.AWAITING_CONTROL,
                    this.noMorePublishing = !1,
                    this.options = t,
                    this.clientHandlers = e,
                    this.subscriptions = new T,
                    this.muxSubscriptions = new C,
                    this.inbound = new a.a,
                    this.outbound = new a.a
                }
                static connect(t, e) {
                    return new Promise((r,n)=>{
                        let o = new I(t,e);
                        o.connectError = n;
                        let u = t.connectTimeout || 1e4
                          , a = new Promise((t,e)=>{
                            let r = setTimeout(()=>{
                                e(s.c.errorForCode(s.a.CONNECTION_TIMEOUT))
                            }
                            , u);
                            o.pongs.push(()=>{
                                clearTimeout(r),
                                t(!0)
                            }
                            )
                        }
                        );
                        i.a.connect(t, o, t.debug).then(t=>{
                            o.transport = t
                        }
                        ).catch(t=>{
                            o.connectError = null,
                            n(t)
                        }
                        ),
                        a.then(()=>{
                            o.connectError = null,
                            r(o)
                        }
                        ).catch(t=>{
                            o.connectError = null,
                            n(t)
                        }
                        )
                    }
                    )
                }
                static toError(t) {
                    let e = t ? t.toLowerCase() : "";
                    return -1 !== e.indexOf("permissions violation") ? new s.c(t,s.a.PERMISSIONS_VIOLATION) : -1 !== e.indexOf("authorization violation") ? new s.c(t,s.a.AUTHORIZATION_VIOLATION) : new s.c(t,s.a.NATS_PROTOCOL_ERR)
                }
                processInbound() {
                    let t = null;
                    for (; this.inbound.size(); ) {
                        switch (this.state) {
                        case c.CLOSED:
                            return;
                        case c.AWAITING_CONTROL:
                            let e = this.inbound.peek()
                              , r = Object(o.c)(e);
                            if (t = f.exec(r))
                                this.payload = new S(t,this.options.payload),
                                this.state = c.AWAITING_MSG_PAYLOAD;
                            else if (t = l.exec(r))
                                ;
                            else {
                                if (t = d.exec(r))
                                    return void this.processError(t[1]);
                                if (t = g.exec(r)) {
                                    this.pout = 0;
                                    let t = this.pongs.shift();
                                    t && t()
                                } else if (t = p.exec(r))
                                    this.transport.write(Object(o.a)("PONG \r\n"));
                                else {
                                    if (!(t = b.exec(r)))
                                        return;
                                    if (!this.infoReceived) {
                                        if (JSON.parse(t[1]).tls_required && !this.transport.isSecure())
                                            return void this.handleError(s.c.errorForCode(s.a.WSS_REQUIRED));
                                        let e = JSON.stringify(new w(this.options));
                                        this.transport.write(Object(o.a)(`CONNECT ${e}\r\n`)),
                                        this.sendSubscriptions(),
                                        this.transport.write(Object(o.a)("PING \r\n")),
                                        this.infoReceived = !0,
                                        this.flushPending()
                                    }
                                }
                            }
                            break;
                        case c.AWAITING_MSG_PAYLOAD:
                            if (!this.payload)
                                break;
                            if (this.inbound.size() < this.payload.length) {
                                let t = this.inbound.drain();
                                return void this.payload.fill(t)
                            }
                            let n = this.inbound.drain(this.payload.length);
                            this.payload.fill(n);
                            try {
                                this.processMsg()
                            } catch (t) {}
                            this.state = c.AWAITING_CONTROL,
                            this.payload = null
                        }
                        if (t) {
                            let e = t[0].length;
                            e >= this.inbound.size() ? this.inbound.drain() : this.inbound.drain(e),
                            t = null
                        }
                    }
                }
                processMsg() {
                    if (!this.payload || !this.subscriptions.sidCounter)
                        return;
                    let t = this.payload
                      , e = this.subscriptions.get(t.msg.sid);
                    e && (e.received += 1,
                    e.timeout && void 0 === e.max && (clearTimeout(e.timeout),
                    e.timeout = null),
                    e.callback && e.callback(t.msg),
                    void 0 !== e.max && e.received >= e.max && this.unsubscribe(e.sid))
                }
                sendCommand(t) {
                    let e;
                    e = "string" == typeof t ? Object(o.f)(t) : t,
                    t && this.outbound.fill(e),
                    1 === this.outbound.length() ? setTimeout(()=>{
                        this.flushPending()
                    }
                    ) : this.outbound.size() > 8192 && this.flushPending()
                }
                publish(e, r, n) {
                    if (this.isClosed())
                        throw s.c.errorForCode(s.a.CONNECTION_CLOSED);
                    if (this.noMorePublishing)
                        throw s.c.errorForCode(s.a.CONNECTION_DRAINING);
                    let i, u = t.byteLength(r);
                    i = (n = n || "") ? `PUB ${e} ${n} ${u}\r\n` : `PUB ${e} ${u}\r\n`,
                    this.sendCommand(Object(o.a)(i, r))
                }
                request(t) {
                    return this.initMux(),
                    this.muxSubscriptions.add(t),
                    new O(t,this)
                }
                subscribe(t) {
                    let e = this.subscriptions.add(t);
                    return e.queue ? this.sendCommand(`SUB ${e.subject} ${e.queue} ${e.sid}\r\n`) : this.sendCommand(`SUB ${e.subject} ${e.sid}\r\n`),
                    new N(e,this)
                }
                unsubscribe(t, e) {
                    if (!t || this.isClosed())
                        return;
                    let r = this.subscriptions.get(t);
                    r && (e ? this.sendCommand(`UNSUB ${t} ${e}\r\n`) : this.sendCommand(`UNSUB ${t}\r\n`),
                    r.max = e,
                    (void 0 === r.max || r.received >= r.max) && this.subscriptions.cancel(r))
                }
                cancelRequest(t, e) {
                    if (!t || this.isClosed())
                        return;
                    let r = this.muxSubscriptions.get(t);
                    r && (r.max = e,
                    (void 0 === r.max || r.received >= r.max) && this.muxSubscriptions.cancel(r))
                }
                flush(t) {
                    this.pongs.push(t),
                    this.sendCommand("PING \r\n")
                }
                processError(t) {
                    let e = {
                        error: I.toError(t)
                    };
                    this.errorHandler(e)
                }
                sendSubscriptions() {
                    let t = [];
                    this.subscriptions.all().forEach(e=>{
                        e.queue ? t.push(`SUB ${e.subject} ${e.queue} ${e.sid} \r\n`) : t.push(`SUB ${e.subject} ${e.sid} \r\n`)
                    }
                    ),
                    t.length && this.transport.write(Object(o.a)(t.join("")))
                }
                openHandler(t) {}
                closeHandler(t) {
                    this.close(),
                    this.clientHandlers.closeHandler()
                }
                errorHandler(t) {
                    let e;
                    t && (e = t.error),
                    this.handleError(e)
                }
                messageHandler(t) {
                    this.inbound.fill(t.data),
                    this.processInbound()
                }
                close() {
                    this.transport.close(),
                    this.state = c.CLOSED
                }
                isClosed() {
                    return this.transport.isClosed()
                }
                drain() {
                    let t = this.subscriptions.all()
                      , e = [];
                    return t.forEach(t=>{
                        let r = this.drainSubscription(t.sid);
                        e.push(r)
                    }
                    ),
                    new Promise(t=>{
                        Object(o.e)(e).then(e=>{
                            this.noMorePublishing = !0,
                            setTimeout(()=>{
                                this.close(),
                                t(e)
                            }
                            )
                        }
                        ).catch(()=>{}
                        )
                    }
                    )
                }
                drainSubscription(t) {
                    if (this.isClosed())
                        return Promise.reject(s.c.errorForCode(s.a.CONNECTION_CLOSED));
                    if (!t)
                        return Promise.reject(s.c.errorForCode(s.a.SUB_CLOSED));
                    let e = this.subscriptions.get(t);
                    if (!e)
                        return Promise.reject(s.c.errorForCode(s.a.SUB_CLOSED));
                    if (e.draining)
                        return Promise.reject(s.c.errorForCode(s.a.SUB_DRAINING));
                    let r = e;
                    return new Promise(t=>{
                        r.draining = !0,
                        this.sendCommand(`UNSUB ${r.sid}\r\n`),
                        this.flush(()=>{
                            this.subscriptions.cancel(r),
                            t(r)
                        }
                        )
                    }
                    )
                }
                flushPending() {
                    if (this.infoReceived && this.outbound.size()) {
                        let t = this.outbound.drain();
                        this.transport.write(t)
                    }
                }
                initMux() {
                    if (!this.subscriptions.getMux()) {
                        let t = this.muxSubscriptions.init()
                          , e = {
                            sid: 0,
                            subject: "",
                            received: 0
                        };
                        e.subject = `${t}*`,
                        e.callback = this.muxSubscriptions.dispatcher(),
                        this.subscriptions.setMux(e),
                        this.subscribe(e)
                    }
                }
                handleError(t) {
                    this.connectError && (this.connectError(t),
                    this.connectError = null),
                    this.close(),
                    this.clientHandlers.errorHandler(t)
                }
            }
        }
        ).call(this, r(7).Buffer)
    }
    , function(t, e, r) {
        "use strict";
        r.d(e, "a", (function() {
            return i
        }
        ));
        var n = r(0);
        class i {
            constructor(t) {
                this.stream = null,
                this.closed = !1,
                this.debug = !1,
                this.listeners = {},
                this.handlers = t
            }
            static connect(t, e, r=!1) {
                return new Promise((s,o)=>{
                    let u, a = new i(e);
                    a.debug = r,
                    a.stream = new WebSocket(t.url),
                    a.stream.binaryType = "arraybuffer",
                    a.listeners = {},
                    a.stream.onclose = function(t) {
                        a.trace("ws closed", t),
                        a.closed || (u ? (a.handlers.closeHandler(t),
                        a.close()) : (clearTimeout(void 0),
                        o(n.c.errorForCode(n.a.CONNECTION_CLOSED))))
                    }
                    ,
                    a.stream.onerror = function(t) {
                        let e;
                        if (t && (e = t.error,
                        !e)) {
                            let r = t.message;
                            e = r ? new n.c(r,n.a.UNKNOWN) : u ? n.c.errorForCode(n.a.UNKNOWN) : n.c.errorForCode(n.a.CONNECTION_REFUSED)
                        }
                        a.trace("ws error", e),
                        a.closed || (a && a.close(),
                        u ? a.handlers.errorHandler(t) : o(e))
                    }
                    ,
                    a.stream.onopen = function() {
                        a.trace("ws open")
                    }
                    ,
                    a.stream.onmessage = function(t) {
                        a.trace(">", [t.data]),
                        u ? a.handlers.messageHandler(t) : (u = !0,
                        s(a),
                        setTimeout((function() {
                            a.handlers.messageHandler(t)
                        }
                        ), 100))
                    }
                }
                )
            }
            isClosed() {
                return this.closed
            }
            isConnected() {
                return null !== this.stream && this.stream.readyState === WebSocket.OPEN
            }
            write(t) {
                this.stream && this.isConnected() && (this.trace("<", [t]),
                this.stream.send(t))
            }
            destroy() {
                this.stream && (this.closed && (this.stream.onclose = null,
                this.stream.onerror = null,
                this.stream.onopen = null,
                this.stream.onmessage = null),
                this.stream.readyState !== WebSocket.CLOSED && this.stream.readyState !== WebSocket.CLOSING && this.stream.close(1e3),
                this.stream = null)
            }
            close() {
                this.closed = !0,
                this.stream && this.stream.bufferedAmount > 0 ? setTimeout(this.close.bind(this), 100) : this.destroy()
            }
            trace(...t) {
                this.debug && console.log(t)
            }
            isSecure() {
                if (this.stream) {
                    return "wss:" === new URL(this.stream.url).protocol.toLowerCase()
                }
                return !1
            }
        }
    }
    , function(t, e, r) {
        "use strict";
        r.d(e, "a", (function() {
            return s
        }
        ));
        const n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let i;
        class s {
            constructor() {
                this.buf = new Uint8Array(22),
                this.init()
            }
            init() {
                "crypto"in Object({}) && Object({}).crypto.getRandomValues ? i = Object({}).crypto : "msCrypto"in Object({}) && Object({}).msCrypto.getRandomValues && (i = Object({}).msCrypto),
                i || (i = {
                    getRandomValues: function(t) {
                        for (let e = 0; e < t.length; e++)
                            t[e] = Math.floor(255 * Math.random())
                    }
                }),
                this.setPre(),
                this.initSeqAndInc(),
                this.fillSeq()
            }
            initSeqAndInc() {
                this.seq = Math.floor(0xcfd41b9100000 * Math.random()),
                this.inc = Math.floor(300 * Math.random() + 33)
            }
            setPre() {
                let t = new Uint8Array(12);
                i.getRandomValues(t);
                for (let e = 0; e < 12; e++) {
                    let r = t[e] % 36;
                    this.buf[e] = n.charCodeAt(r)
                }
            }
            fillSeq() {
                let t = this.seq;
                for (let e = 21; e >= 12; e--)
                    this.buf[e] = n.charCodeAt(t % 36),
                    t = Math.floor(t / 36)
            }
            next() {
                return this.seq += this.inc,
                this.seq > 0xcfd41b9100000 && (this.setPre(),
                this.initSeqAndInc()),
                this.fillSeq(),
                String.fromCharCode.apply(String, this.buf)
            }
            reset() {
                this.init()
            }
        }
    }
    , function(t, e, r) {
        "use strict";
        (function(t) {
            /*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <http://feross.org>
     * @license  MIT
     */
            var n = r(9)
              , i = r(10)
              , s = r(11);
            function o() {
                return a.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
            }
            function u(t, e) {
                if (o() < e)
                    throw new RangeError("Invalid typed array length");
                return a.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = a.prototype : (null === t && (t = new a(e)),
                t.length = e),
                t
            }
            function a(t, e, r) {
                if (!(a.TYPED_ARRAY_SUPPORT || this instanceof a))
                    return new a(t,e,r);
                if ("number" == typeof t) {
                    if ("string" == typeof e)
                        throw new Error("If encoding is specified then the first argument must be a string");
                    return f(this, t)
                }
                return h(this, t, e, r)
            }
            function h(t, e, r, n) {
                if ("number" == typeof e)
                    throw new TypeError('"value" argument must not be a number');
                return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function(t, e, r, n) {
                    if (e.byteLength,
                    r < 0 || e.byteLength < r)
                        throw new RangeError("'offset' is out of bounds");
                    if (e.byteLength < r + (n || 0))
                        throw new RangeError("'length' is out of bounds");
                    e = void 0 === r && void 0 === n ? new Uint8Array(e) : void 0 === n ? new Uint8Array(e,r) : new Uint8Array(e,r,n);
                    a.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = a.prototype : t = l(t, e);
                    return t
                }(t, e, r, n) : "string" == typeof e ? function(t, e, r) {
                    "string" == typeof r && "" !== r || (r = "utf8");
                    if (!a.isEncoding(r))
                        throw new TypeError('"encoding" must be a valid string encoding');
                    var n = 0 | p(e, r)
                      , i = (t = u(t, n)).write(e, r);
                    i !== n && (t = t.slice(0, i));
                    return t
                }(t, e, r) : function(t, e) {
                    if (a.isBuffer(e)) {
                        var r = 0 | d(e.length);
                        return 0 === (t = u(t, r)).length ? t : (e.copy(t, 0, 0, r),
                        t)
                    }
                    if (e) {
                        if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length"in e)
                            return "number" != typeof e.length || (n = e.length) != n ? u(t, 0) : l(t, e);
                        if ("Buffer" === e.type && s(e.data))
                            return l(t, e.data)
                    }
                    var n;
                    throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
                }(t, e)
            }
            function c(t) {
                if ("number" != typeof t)
                    throw new TypeError('"size" argument must be a number');
                if (t < 0)
                    throw new RangeError('"size" argument must not be negative')
            }
            function f(t, e) {
                if (c(e),
                t = u(t, e < 0 ? 0 : 0 | d(e)),
                !a.TYPED_ARRAY_SUPPORT)
                    for (var r = 0; r < e; ++r)
                        t[r] = 0;
                return t
            }
            function l(t, e) {
                var r = e.length < 0 ? 0 : 0 | d(e.length);
                t = u(t, r);
                for (var n = 0; n < r; n += 1)
                    t[n] = 255 & e[n];
                return t
            }
            function d(t) {
                if (t >= o())
                    throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o().toString(16) + " bytes");
                return 0 | t
            }
            function p(t, e) {
                if (a.isBuffer(t))
                    return t.length;
                if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer))
                    return t.byteLength;
                "string" != typeof t && (t = "" + t);
                var r = t.length;
                if (0 === r)
                    return 0;
                for (var n = !1; ; )
                    switch (e) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return r;
                    case "utf8":
                    case "utf-8":
                    case void 0:
                        return k(t).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return 2 * r;
                    case "hex":
                        return r >>> 1;
                    case "base64":
                        return F(t).length;
                    default:
                        if (n)
                            return k(t).length;
                        e = ("" + e).toLowerCase(),
                        n = !0
                    }
            }
            function g(t, e, r) {
                var n = !1;
                if ((void 0 === e || e < 0) && (e = 0),
                e > this.length)
                    return "";
                if ((void 0 === r || r > this.length) && (r = this.length),
                r <= 0)
                    return "";
                if ((r >>>= 0) <= (e >>>= 0))
                    return "";
                for (t || (t = "utf8"); ; )
                    switch (t) {
                    case "hex":
                        return v(this, e, r);
                    case "utf8":
                    case "utf-8":
                        return S(this, e, r);
                    case "ascii":
                        return I(this, e, r);
                    case "latin1":
                    case "binary":
                        return _(this, e, r);
                    case "base64":
                        return T(this, e, r);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return R(this, e, r);
                    default:
                        if (n)
                            throw new TypeError("Unknown encoding: " + t);
                        t = (t + "").toLowerCase(),
                        n = !0
                    }
            }
            function b(t, e, r) {
                var n = t[e];
                t[e] = t[r],
                t[r] = n
            }
            function y(t, e, r, n, i) {
                if (0 === t.length)
                    return -1;
                if ("string" == typeof r ? (n = r,
                r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648),
                r = +r,
                isNaN(r) && (r = i ? 0 : t.length - 1),
                r < 0 && (r = t.length + r),
                r >= t.length) {
                    if (i)
                        return -1;
                    r = t.length - 1
                } else if (r < 0) {
                    if (!i)
                        return -1;
                    r = 0
                }
                if ("string" == typeof e && (e = a.from(e, n)),
                a.isBuffer(e))
                    return 0 === e.length ? -1 : m(t, e, r, n, i);
                if ("number" == typeof e)
                    return e &= 255,
                    a.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : m(t, [e], r, n, i);
                throw new TypeError("val must be string, number or Buffer")
            }
            function m(t, e, r, n, i) {
                var s, o = 1, u = t.length, a = e.length;
                if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                    if (t.length < 2 || e.length < 2)
                        return -1;
                    o = 2,
                    u /= 2,
                    a /= 2,
                    r /= 2
                }
                function h(t, e) {
                    return 1 === o ? t[e] : t.readUInt16BE(e * o)
                }
                if (i) {
                    var c = -1;
                    for (s = r; s < u; s++)
                        if (h(t, s) === h(e, -1 === c ? 0 : s - c)) {
                            if (-1 === c && (c = s),
                            s - c + 1 === a)
                                return c * o
                        } else
                            -1 !== c && (s -= s - c),
                            c = -1
                } else
                    for (r + a > u && (r = u - a),
                    s = r; s >= 0; s--) {
                        for (var f = !0, l = 0; l < a; l++)
                            if (h(t, s + l) !== h(e, l)) {
                                f = !1;
                                break
                            }
                        if (f)
                            return s
                    }
                return -1
            }
            function w(t, e, r, n) {
                r = Number(r) || 0;
                var i = t.length - r;
                n ? (n = Number(n)) > i && (n = i) : n = i;
                var s = e.length;
                if (s % 2 != 0)
                    throw new TypeError("Invalid hex string");
                n > s / 2 && (n = s / 2);
                for (var o = 0; o < n; ++o) {
                    var u = parseInt(e.substr(2 * o, 2), 16);
                    if (isNaN(u))
                        return o;
                    t[r + o] = u
                }
                return o
            }
            function A(t, e, r, n) {
                return G(k(e, t.length - r), t, r, n)
            }
            function E(t, e, r, n) {
                return G(function(t) {
                    for (var e = [], r = 0; r < t.length; ++r)
                        e.push(255 & t.charCodeAt(r));
                    return e
                }(e), t, r, n)
            }
            function O(t, e, r, n) {
                return E(t, e, r, n)
            }
            function N(t, e, r, n) {
                return G(F(e), t, r, n)
            }
            function C(t, e, r, n) {
                return G(function(t, e) {
                    for (var r, n, i, s = [], o = 0; o < t.length && !((e -= 2) < 0); ++o)
                        r = t.charCodeAt(o),
                        n = r >> 8,
                        i = r % 256,
                        s.push(i),
                        s.push(n);
                    return s
                }(e, t.length - r), t, r, n)
            }
            function T(t, e, r) {
                return 0 === e && r === t.length ? n.fromByteArray(t) : n.fromByteArray(t.slice(e, r))
            }
            function S(t, e, r) {
                r = Math.min(t.length, r);
                for (var n = [], i = e; i < r; ) {
                    var s, o, u, a, h = t[i], c = null, f = h > 239 ? 4 : h > 223 ? 3 : h > 191 ? 2 : 1;
                    if (i + f <= r)
                        switch (f) {
                        case 1:
                            h < 128 && (c = h);
                            break;
                        case 2:
                            128 == (192 & (s = t[i + 1])) && (a = (31 & h) << 6 | 63 & s) > 127 && (c = a);
                            break;
                        case 3:
                            s = t[i + 1],
                            o = t[i + 2],
                            128 == (192 & s) && 128 == (192 & o) && (a = (15 & h) << 12 | (63 & s) << 6 | 63 & o) > 2047 && (a < 55296 || a > 57343) && (c = a);
                            break;
                        case 4:
                            s = t[i + 1],
                            o = t[i + 2],
                            u = t[i + 3],
                            128 == (192 & s) && 128 == (192 & o) && 128 == (192 & u) && (a = (15 & h) << 18 | (63 & s) << 12 | (63 & o) << 6 | 63 & u) > 65535 && a < 1114112 && (c = a)
                        }
                    null === c ? (c = 65533,
                    f = 1) : c > 65535 && (c -= 65536,
                    n.push(c >>> 10 & 1023 | 55296),
                    c = 56320 | 1023 & c),
                    n.push(c),
                    i += f
                }
                return function(t) {
                    var e = t.length;
                    if (e <= 4096)
                        return String.fromCharCode.apply(String, t);
                    var r = ""
                      , n = 0;
                    for (; n < e; )
                        r += String.fromCharCode.apply(String, t.slice(n, n += 4096));
                    return r
                }(n)
            }
            e.Buffer = a,
            e.SlowBuffer = function(t) {
                +t != t && (t = 0);
                return a.alloc(+t)
            }
            ,
            e.INSPECT_MAX_BYTES = 50,
            a.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
                try {
                    var t = new Uint8Array(1);
                    return t.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function() {
                            return 42
                        }
                    },
                    42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
                } catch (t) {
                    return !1
                }
            }(),
            e.kMaxLength = o(),
            a.poolSize = 8192,
            a._augment = function(t) {
                return t.__proto__ = a.prototype,
                t
            }
            ,
            a.from = function(t, e, r) {
                return h(null, t, e, r)
            }
            ,
            a.TYPED_ARRAY_SUPPORT && (a.prototype.__proto__ = Uint8Array.prototype,
            a.__proto__ = Uint8Array,
            "undefined" != typeof Symbol && Symbol.species && a[Symbol.species] === a && Object.defineProperty(a, Symbol.species, {
                value: null,
                configurable: !0
            })),
            a.alloc = function(t, e, r) {
                return function(t, e, r, n) {
                    return c(e),
                    e <= 0 ? u(t, e) : void 0 !== r ? "string" == typeof n ? u(t, e).fill(r, n) : u(t, e).fill(r) : u(t, e)
                }(null, t, e, r)
            }
            ,
            a.allocUnsafe = function(t) {
                return f(null, t)
            }
            ,
            a.allocUnsafeSlow = function(t) {
                return f(null, t)
            }
            ,
            a.isBuffer = function(t) {
                return !(null == t || !t._isBuffer)
            }
            ,
            a.compare = function(t, e) {
                if (!a.isBuffer(t) || !a.isBuffer(e))
                    throw new TypeError("Arguments must be Buffers");
                if (t === e)
                    return 0;
                for (var r = t.length, n = e.length, i = 0, s = Math.min(r, n); i < s; ++i)
                    if (t[i] !== e[i]) {
                        r = t[i],
                        n = e[i];
                        break
                    }
                return r < n ? -1 : n < r ? 1 : 0
            }
            ,
            a.isEncoding = function(t) {
                switch (String(t).toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "latin1":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return !0;
                default:
                    return !1
                }
            }
            ,
            a.concat = function(t, e) {
                if (!s(t))
                    throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === t.length)
                    return a.alloc(0);
                var r;
                if (void 0 === e)
                    for (e = 0,
                    r = 0; r < t.length; ++r)
                        e += t[r].length;
                var n = a.allocUnsafe(e)
                  , i = 0;
                for (r = 0; r < t.length; ++r) {
                    var o = t[r];
                    if (!a.isBuffer(o))
                        throw new TypeError('"list" argument must be an Array of Buffers');
                    o.copy(n, i),
                    i += o.length
                }
                return n
            }
            ,
            a.byteLength = p,
            a.prototype._isBuffer = !0,
            a.prototype.swap16 = function() {
                var t = this.length;
                if (t % 2 != 0)
                    throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (var e = 0; e < t; e += 2)
                    b(this, e, e + 1);
                return this
            }
            ,
            a.prototype.swap32 = function() {
                var t = this.length;
                if (t % 4 != 0)
                    throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (var e = 0; e < t; e += 4)
                    b(this, e, e + 3),
                    b(this, e + 1, e + 2);
                return this
            }
            ,
            a.prototype.swap64 = function() {
                var t = this.length;
                if (t % 8 != 0)
                    throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (var e = 0; e < t; e += 8)
                    b(this, e, e + 7),
                    b(this, e + 1, e + 6),
                    b(this, e + 2, e + 5),
                    b(this, e + 3, e + 4);
                return this
            }
            ,
            a.prototype.toString = function() {
                var t = 0 | this.length;
                return 0 === t ? "" : 0 === arguments.length ? S(this, 0, t) : g.apply(this, arguments)
            }
            ,
            a.prototype.equals = function(t) {
                if (!a.isBuffer(t))
                    throw new TypeError("Argument must be a Buffer");
                return this === t || 0 === a.compare(this, t)
            }
            ,
            a.prototype.inspect = function() {
                var t = ""
                  , r = e.INSPECT_MAX_BYTES;
                return this.length > 0 && (t = this.toString("hex", 0, r).match(/.{2}/g).join(" "),
                this.length > r && (t += " ... ")),
                "<Buffer " + t + ">"
            }
            ,
            a.prototype.compare = function(t, e, r, n, i) {
                if (!a.isBuffer(t))
                    throw new TypeError("Argument must be a Buffer");
                if (void 0 === e && (e = 0),
                void 0 === r && (r = t ? t.length : 0),
                void 0 === n && (n = 0),
                void 0 === i && (i = this.length),
                e < 0 || r > t.length || n < 0 || i > this.length)
                    throw new RangeError("out of range index");
                if (n >= i && e >= r)
                    return 0;
                if (n >= i)
                    return -1;
                if (e >= r)
                    return 1;
                if (this === t)
                    return 0;
                for (var s = (i >>>= 0) - (n >>>= 0), o = (r >>>= 0) - (e >>>= 0), u = Math.min(s, o), h = this.slice(n, i), c = t.slice(e, r), f = 0; f < u; ++f)
                    if (h[f] !== c[f]) {
                        s = h[f],
                        o = c[f];
                        break
                    }
                return s < o ? -1 : o < s ? 1 : 0
            }
            ,
            a.prototype.includes = function(t, e, r) {
                return -1 !== this.indexOf(t, e, r)
            }
            ,
            a.prototype.indexOf = function(t, e, r) {
                return y(this, t, e, r, !0)
            }
            ,
            a.prototype.lastIndexOf = function(t, e, r) {
                return y(this, t, e, r, !1)
            }
            ,
            a.prototype.write = function(t, e, r, n) {
                if (void 0 === e)
                    n = "utf8",
                    r = this.length,
                    e = 0;
                else if (void 0 === r && "string" == typeof e)
                    n = e,
                    r = this.length,
                    e = 0;
                else {
                    if (!isFinite(e))
                        throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    e |= 0,
                    isFinite(r) ? (r |= 0,
                    void 0 === n && (n = "utf8")) : (n = r,
                    r = void 0)
                }
                var i = this.length - e;
                if ((void 0 === r || r > i) && (r = i),
                t.length > 0 && (r < 0 || e < 0) || e > this.length)
                    throw new RangeError("Attempt to write outside buffer bounds");
                n || (n = "utf8");
                for (var s = !1; ; )
                    switch (n) {
                    case "hex":
                        return w(this, t, e, r);
                    case "utf8":
                    case "utf-8":
                        return A(this, t, e, r);
                    case "ascii":
                        return E(this, t, e, r);
                    case "latin1":
                    case "binary":
                        return O(this, t, e, r);
                    case "base64":
                        return N(this, t, e, r);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return C(this, t, e, r);
                    default:
                        if (s)
                            throw new TypeError("Unknown encoding: " + n);
                        n = ("" + n).toLowerCase(),
                        s = !0
                    }
            }
            ,
            a.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            }
            ;
            function I(t, e, r) {
                var n = "";
                r = Math.min(t.length, r);
                for (var i = e; i < r; ++i)
                    n += String.fromCharCode(127 & t[i]);
                return n
            }
            function _(t, e, r) {
                var n = "";
                r = Math.min(t.length, r);
                for (var i = e; i < r; ++i)
                    n += String.fromCharCode(t[i]);
                return n
            }
            function v(t, e, r) {
                var n = t.length;
                (!e || e < 0) && (e = 0),
                (!r || r < 0 || r > n) && (r = n);
                for (var i = "", s = e; s < r; ++s)
                    i += Y(t[s]);
                return i
            }
            function R(t, e, r) {
                for (var n = t.slice(e, r), i = "", s = 0; s < n.length; s += 2)
                    i += String.fromCharCode(n[s] + 256 * n[s + 1]);
                return i
            }
            function P(t, e, r) {
                if (t % 1 != 0 || t < 0)
                    throw new RangeError("offset is not uint");
                if (t + e > r)
                    throw new RangeError("Trying to access beyond buffer length")
            }
            function U(t, e, r, n, i, s) {
                if (!a.isBuffer(t))
                    throw new TypeError('"buffer" argument must be a Buffer instance');
                if (e > i || e < s)
                    throw new RangeError('"value" argument is out of bounds');
                if (r + n > t.length)
                    throw new RangeError("Index out of range")
            }
            function B(t, e, r, n) {
                e < 0 && (e = 65535 + e + 1);
                for (var i = 0, s = Math.min(t.length - r, 2); i < s; ++i)
                    t[r + i] = (e & 255 << 8 * (n ? i : 1 - i)) >>> 8 * (n ? i : 1 - i)
            }
            function L(t, e, r, n) {
                e < 0 && (e = 4294967295 + e + 1);
                for (var i = 0, s = Math.min(t.length - r, 4); i < s; ++i)
                    t[r + i] = e >>> 8 * (n ? i : 3 - i) & 255
            }
            function D(t, e, r, n, i, s) {
                if (r + n > t.length)
                    throw new RangeError("Index out of range");
                if (r < 0)
                    throw new RangeError("Index out of range")
            }
            function x(t, e, r, n, s) {
                return s || D(t, 0, r, 4),
                i.write(t, e, r, n, 23, 4),
                r + 4
            }
            function M(t, e, r, n, s) {
                return s || D(t, 0, r, 8),
                i.write(t, e, r, n, 52, 8),
                r + 8
            }
            a.prototype.slice = function(t, e) {
                var r, n = this.length;
                if ((t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
                (e = void 0 === e ? n : ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n),
                e < t && (e = t),
                a.TYPED_ARRAY_SUPPORT)
                    (r = this.subarray(t, e)).__proto__ = a.prototype;
                else {
                    var i = e - t;
                    r = new a(i,void 0);
                    for (var s = 0; s < i; ++s)
                        r[s] = this[s + t]
                }
                return r
            }
            ,
            a.prototype.readUIntLE = function(t, e, r) {
                t |= 0,
                e |= 0,
                r || P(t, e, this.length);
                for (var n = this[t], i = 1, s = 0; ++s < e && (i *= 256); )
                    n += this[t + s] * i;
                return n
            }
            ,
            a.prototype.readUIntBE = function(t, e, r) {
                t |= 0,
                e |= 0,
                r || P(t, e, this.length);
                for (var n = this[t + --e], i = 1; e > 0 && (i *= 256); )
                    n += this[t + --e] * i;
                return n
            }
            ,
            a.prototype.readUInt8 = function(t, e) {
                return e || P(t, 1, this.length),
                this[t]
            }
            ,
            a.prototype.readUInt16LE = function(t, e) {
                return e || P(t, 2, this.length),
                this[t] | this[t + 1] << 8
            }
            ,
            a.prototype.readUInt16BE = function(t, e) {
                return e || P(t, 2, this.length),
                this[t] << 8 | this[t + 1]
            }
            ,
            a.prototype.readUInt32LE = function(t, e) {
                return e || P(t, 4, this.length),
                (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
            }
            ,
            a.prototype.readUInt32BE = function(t, e) {
                return e || P(t, 4, this.length),
                16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
            }
            ,
            a.prototype.readIntLE = function(t, e, r) {
                t |= 0,
                e |= 0,
                r || P(t, e, this.length);
                for (var n = this[t], i = 1, s = 0; ++s < e && (i *= 256); )
                    n += this[t + s] * i;
                return n >= (i *= 128) && (n -= Math.pow(2, 8 * e)),
                n
            }
            ,
            a.prototype.readIntBE = function(t, e, r) {
                t |= 0,
                e |= 0,
                r || P(t, e, this.length);
                for (var n = e, i = 1, s = this[t + --n]; n > 0 && (i *= 256); )
                    s += this[t + --n] * i;
                return s >= (i *= 128) && (s -= Math.pow(2, 8 * e)),
                s
            }
            ,
            a.prototype.readInt8 = function(t, e) {
                return e || P(t, 1, this.length),
                128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
            }
            ,
            a.prototype.readInt16LE = function(t, e) {
                e || P(t, 2, this.length);
                var r = this[t] | this[t + 1] << 8;
                return 32768 & r ? 4294901760 | r : r
            }
            ,
            a.prototype.readInt16BE = function(t, e) {
                e || P(t, 2, this.length);
                var r = this[t + 1] | this[t] << 8;
                return 32768 & r ? 4294901760 | r : r
            }
            ,
            a.prototype.readInt32LE = function(t, e) {
                return e || P(t, 4, this.length),
                this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
            }
            ,
            a.prototype.readInt32BE = function(t, e) {
                return e || P(t, 4, this.length),
                this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
            }
            ,
            a.prototype.readFloatLE = function(t, e) {
                return e || P(t, 4, this.length),
                i.read(this, t, !0, 23, 4)
            }
            ,
            a.prototype.readFloatBE = function(t, e) {
                return e || P(t, 4, this.length),
                i.read(this, t, !1, 23, 4)
            }
            ,
            a.prototype.readDoubleLE = function(t, e) {
                return e || P(t, 8, this.length),
                i.read(this, t, !0, 52, 8)
            }
            ,
            a.prototype.readDoubleBE = function(t, e) {
                return e || P(t, 8, this.length),
                i.read(this, t, !1, 52, 8)
            }
            ,
            a.prototype.writeUIntLE = function(t, e, r, n) {
                (t = +t,
                e |= 0,
                r |= 0,
                n) || U(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
                var i = 1
                  , s = 0;
                for (this[e] = 255 & t; ++s < r && (i *= 256); )
                    this[e + s] = t / i & 255;
                return e + r
            }
            ,
            a.prototype.writeUIntBE = function(t, e, r, n) {
                (t = +t,
                e |= 0,
                r |= 0,
                n) || U(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
                var i = r - 1
                  , s = 1;
                for (this[e + i] = 255 & t; --i >= 0 && (s *= 256); )
                    this[e + i] = t / s & 255;
                return e + r
            }
            ,
            a.prototype.writeUInt8 = function(t, e, r) {
                return t = +t,
                e |= 0,
                r || U(this, t, e, 1, 255, 0),
                a.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
                this[e] = 255 & t,
                e + 1
            }
            ,
            a.prototype.writeUInt16LE = function(t, e, r) {
                return t = +t,
                e |= 0,
                r || U(this, t, e, 2, 65535, 0),
                a.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
                this[e + 1] = t >>> 8) : B(this, t, e, !0),
                e + 2
            }
            ,
            a.prototype.writeUInt16BE = function(t, e, r) {
                return t = +t,
                e |= 0,
                r || U(this, t, e, 2, 65535, 0),
                a.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8,
                this[e + 1] = 255 & t) : B(this, t, e, !1),
                e + 2
            }
            ,
            a.prototype.writeUInt32LE = function(t, e, r) {
                return t = +t,
                e |= 0,
                r || U(this, t, e, 4, 4294967295, 0),
                a.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24,
                this[e + 2] = t >>> 16,
                this[e + 1] = t >>> 8,
                this[e] = 255 & t) : L(this, t, e, !0),
                e + 4
            }
            ,
            a.prototype.writeUInt32BE = function(t, e, r) {
                return t = +t,
                e |= 0,
                r || U(this, t, e, 4, 4294967295, 0),
                a.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24,
                this[e + 1] = t >>> 16,
                this[e + 2] = t >>> 8,
                this[e + 3] = 255 & t) : L(this, t, e, !1),
                e + 4
            }
            ,
            a.prototype.writeIntLE = function(t, e, r, n) {
                if (t = +t,
                e |= 0,
                !n) {
                    var i = Math.pow(2, 8 * r - 1);
                    U(this, t, e, r, i - 1, -i)
                }
                var s = 0
                  , o = 1
                  , u = 0;
                for (this[e] = 255 & t; ++s < r && (o *= 256); )
                    t < 0 && 0 === u && 0 !== this[e + s - 1] && (u = 1),
                    this[e + s] = (t / o >> 0) - u & 255;
                return e + r
            }
            ,
            a.prototype.writeIntBE = function(t, e, r, n) {
                if (t = +t,
                e |= 0,
                !n) {
                    var i = Math.pow(2, 8 * r - 1);
                    U(this, t, e, r, i - 1, -i)
                }
                var s = r - 1
                  , o = 1
                  , u = 0;
                for (this[e + s] = 255 & t; --s >= 0 && (o *= 256); )
                    t < 0 && 0 === u && 0 !== this[e + s + 1] && (u = 1),
                    this[e + s] = (t / o >> 0) - u & 255;
                return e + r
            }
            ,
            a.prototype.writeInt8 = function(t, e, r) {
                return t = +t,
                e |= 0,
                r || U(this, t, e, 1, 127, -128),
                a.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
                t < 0 && (t = 255 + t + 1),
                this[e] = 255 & t,
                e + 1
            }
            ,
            a.prototype.writeInt16LE = function(t, e, r) {
                return t = +t,
                e |= 0,
                r || U(this, t, e, 2, 32767, -32768),
                a.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
                this[e + 1] = t >>> 8) : B(this, t, e, !0),
                e + 2
            }
            ,
            a.prototype.writeInt16BE = function(t, e, r) {
                return t = +t,
                e |= 0,
                r || U(this, t, e, 2, 32767, -32768),
                a.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8,
                this[e + 1] = 255 & t) : B(this, t, e, !1),
                e + 2
            }
            ,
            a.prototype.writeInt32LE = function(t, e, r) {
                return t = +t,
                e |= 0,
                r || U(this, t, e, 4, 2147483647, -2147483648),
                a.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
                this[e + 1] = t >>> 8,
                this[e + 2] = t >>> 16,
                this[e + 3] = t >>> 24) : L(this, t, e, !0),
                e + 4
            }
            ,
            a.prototype.writeInt32BE = function(t, e, r) {
                return t = +t,
                e |= 0,
                r || U(this, t, e, 4, 2147483647, -2147483648),
                t < 0 && (t = 4294967295 + t + 1),
                a.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24,
                this[e + 1] = t >>> 16,
                this[e + 2] = t >>> 8,
                this[e + 3] = 255 & t) : L(this, t, e, !1),
                e + 4
            }
            ,
            a.prototype.writeFloatLE = function(t, e, r) {
                return x(this, t, e, !0, r)
            }
            ,
            a.prototype.writeFloatBE = function(t, e, r) {
                return x(this, t, e, !1, r)
            }
            ,
            a.prototype.writeDoubleLE = function(t, e, r) {
                return M(this, t, e, !0, r)
            }
            ,
            a.prototype.writeDoubleBE = function(t, e, r) {
                return M(this, t, e, !1, r)
            }
            ,
            a.prototype.copy = function(t, e, r, n) {
                if (r || (r = 0),
                n || 0 === n || (n = this.length),
                e >= t.length && (e = t.length),
                e || (e = 0),
                n > 0 && n < r && (n = r),
                n === r)
                    return 0;
                if (0 === t.length || 0 === this.length)
                    return 0;
                if (e < 0)
                    throw new RangeError("targetStart out of bounds");
                if (r < 0 || r >= this.length)
                    throw new RangeError("sourceStart out of bounds");
                if (n < 0)
                    throw new RangeError("sourceEnd out of bounds");
                n > this.length && (n = this.length),
                t.length - e < n - r && (n = t.length - e + r);
                var i, s = n - r;
                if (this === t && r < e && e < n)
                    for (i = s - 1; i >= 0; --i)
                        t[i + e] = this[i + r];
                else if (s < 1e3 || !a.TYPED_ARRAY_SUPPORT)
                    for (i = 0; i < s; ++i)
                        t[i + e] = this[i + r];
                else
                    Uint8Array.prototype.set.call(t, this.subarray(r, r + s), e);
                return s
            }
            ,
            a.prototype.fill = function(t, e, r, n) {
                if ("string" == typeof t) {
                    if ("string" == typeof e ? (n = e,
                    e = 0,
                    r = this.length) : "string" == typeof r && (n = r,
                    r = this.length),
                    1 === t.length) {
                        var i = t.charCodeAt(0);
                        i < 256 && (t = i)
                    }
                    if (void 0 !== n && "string" != typeof n)
                        throw new TypeError("encoding must be a string");
                    if ("string" == typeof n && !a.isEncoding(n))
                        throw new TypeError("Unknown encoding: " + n)
                } else
                    "number" == typeof t && (t &= 255);
                if (e < 0 || this.length < e || this.length < r)
                    throw new RangeError("Out of range index");
                if (r <= e)
                    return this;
                var s;
                if (e >>>= 0,
                r = void 0 === r ? this.length : r >>> 0,
                t || (t = 0),
                "number" == typeof t)
                    for (s = e; s < r; ++s)
                        this[s] = t;
                else {
                    var o = a.isBuffer(t) ? t : k(new a(t,n).toString())
                      , u = o.length;
                    for (s = 0; s < r - e; ++s)
                        this[s + e] = o[s % u]
                }
                return this
            }
            ;
            var j = /[^+\/0-9A-Za-z-_]/g;
            function Y(t) {
                return t < 16 ? "0" + t.toString(16) : t.toString(16)
            }
            function k(t, e) {
                var r;
                e = e || 1 / 0;
                for (var n = t.length, i = null, s = [], o = 0; o < n; ++o) {
                    if ((r = t.charCodeAt(o)) > 55295 && r < 57344) {
                        if (!i) {
                            if (r > 56319) {
                                (e -= 3) > -1 && s.push(239, 191, 189);
                                continue
                            }
                            if (o + 1 === n) {
                                (e -= 3) > -1 && s.push(239, 191, 189);
                                continue
                            }
                            i = r;
                            continue
                        }
                        if (r < 56320) {
                            (e -= 3) > -1 && s.push(239, 191, 189),
                            i = r;
                            continue
                        }
                        r = 65536 + (i - 55296 << 10 | r - 56320)
                    } else
                        i && (e -= 3) > -1 && s.push(239, 191, 189);
                    if (i = null,
                    r < 128) {
                        if ((e -= 1) < 0)
                            break;
                        s.push(r)
                    } else if (r < 2048) {
                        if ((e -= 2) < 0)
                            break;
                        s.push(r >> 6 | 192, 63 & r | 128)
                    } else if (r < 65536) {
                        if ((e -= 3) < 0)
                            break;
                        s.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                    } else {
                        if (!(r < 1114112))
                            throw new Error("Invalid code point");
                        if ((e -= 4) < 0)
                            break;
                        s.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                    }
                }
                return s
            }
            function F(t) {
                return n.toByteArray(function(t) {
                    if ((t = function(t) {
                        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
                    }(t).replace(j, "")).length < 2)
                        return "";
                    for (; t.length % 4 != 0; )
                        t += "=";
                    return t
                }(t))
            }
            function G(t, e, r, n) {
                for (var i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i)
                    e[i + r] = t[i];
                return i
            }
        }
        ).call(this, r(8))
    }
    , function(t, e, r) {
        var n;
        n = function() {
            return this
        }();
        try {
            n = n || new Function("return this")()
        } catch (t) {
            n = Object({})
        }
        t.exports = n
    }
    , function(t, e, r) {
        "use strict";
        e.byteLength = function(t) {
            var e = h(t)
              , r = e[0]
              , n = e[1];
            return 3 * (r + n) / 4 - n
        }
        ,
        e.toByteArray = function(t) {
            var e, r, n = h(t), o = n[0], u = n[1], a = new s(function(t, e, r) {
                return 3 * (e + r) / 4 - r
            }(0, o, u)), c = 0, f = u > 0 ? o - 4 : o;
            for (r = 0; r < f; r += 4)
                e = i[t.charCodeAt(r)] << 18 | i[t.charCodeAt(r + 1)] << 12 | i[t.charCodeAt(r + 2)] << 6 | i[t.charCodeAt(r + 3)],
                a[c++] = e >> 16 & 255,
                a[c++] = e >> 8 & 255,
                a[c++] = 255 & e;
            2 === u && (e = i[t.charCodeAt(r)] << 2 | i[t.charCodeAt(r + 1)] >> 4,
            a[c++] = 255 & e);
            1 === u && (e = i[t.charCodeAt(r)] << 10 | i[t.charCodeAt(r + 1)] << 4 | i[t.charCodeAt(r + 2)] >> 2,
            a[c++] = e >> 8 & 255,
            a[c++] = 255 & e);
            return a
        }
        ,
        e.fromByteArray = function(t) {
            for (var e, r = t.length, i = r % 3, s = [], o = 0, u = r - i; o < u; o += 16383)
                s.push(c(t, o, o + 16383 > u ? u : o + 16383));
            1 === i ? (e = t[r - 1],
            s.push(n[e >> 2] + n[e << 4 & 63] + "==")) : 2 === i && (e = (t[r - 2] << 8) + t[r - 1],
            s.push(n[e >> 10] + n[e >> 4 & 63] + n[e << 2 & 63] + "="));
            return s.join("")
        }
        ;
        for (var n = [], i = [], s = "undefined" != typeof Uint8Array ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", u = 0, a = o.length; u < a; ++u)
            n[u] = o[u],
            i[o.charCodeAt(u)] = u;
        function h(t) {
            var e = t.length;
            if (e % 4 > 0)
                throw new Error("Invalid string. Length must be a multiple of 4");
            var r = t.indexOf("=");
            return -1 === r && (r = e),
            [r, r === e ? 0 : 4 - r % 4]
        }
        function c(t, e, r) {
            for (var i, s, o = [], u = e; u < r; u += 3)
                i = (t[u] << 16 & 16711680) + (t[u + 1] << 8 & 65280) + (255 & t[u + 2]),
                o.push(n[(s = i) >> 18 & 63] + n[s >> 12 & 63] + n[s >> 6 & 63] + n[63 & s]);
            return o.join("")
        }
        i["-".charCodeAt(0)] = 62,
        i["_".charCodeAt(0)] = 63
    }
    , function(t, e) {
        e.read = function(t, e, r, n, i) {
            var s, o, u = 8 * i - n - 1, a = (1 << u) - 1, h = a >> 1, c = -7, f = r ? i - 1 : 0, l = r ? -1 : 1, d = t[e + f];
            for (f += l,
            s = d & (1 << -c) - 1,
            d >>= -c,
            c += u; c > 0; s = 256 * s + t[e + f],
            f += l,
            c -= 8)
                ;
            for (o = s & (1 << -c) - 1,
            s >>= -c,
            c += n; c > 0; o = 256 * o + t[e + f],
            f += l,
            c -= 8)
                ;
            if (0 === s)
                s = 1 - h;
            else {
                if (s === a)
                    return o ? NaN : 1 / 0 * (d ? -1 : 1);
                o += Math.pow(2, n),
                s -= h
            }
            return (d ? -1 : 1) * o * Math.pow(2, s - n)
        }
        ,
        e.write = function(t, e, r, n, i, s) {
            var o, u, a, h = 8 * s - i - 1, c = (1 << h) - 1, f = c >> 1, l = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0, d = n ? 0 : s - 1, p = n ? 1 : -1, g = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
            for (e = Math.abs(e),
            isNaN(e) || e === 1 / 0 ? (u = isNaN(e) ? 1 : 0,
            o = c) : (o = Math.floor(Math.log(e) / Math.LN2),
            e * (a = Math.pow(2, -o)) < 1 && (o--,
            a *= 2),
            (e += o + f >= 1 ? l / a : l * Math.pow(2, 1 - f)) * a >= 2 && (o++,
            a /= 2),
            o + f >= c ? (u = 0,
            o = c) : o + f >= 1 ? (u = (e * a - 1) * Math.pow(2, i),
            o += f) : (u = e * Math.pow(2, f - 1) * Math.pow(2, i),
            o = 0)); i >= 8; t[r + d] = 255 & u,
            d += p,
            u /= 256,
            i -= 8)
                ;
            for (o = o << i | u,
            h += i; h > 0; t[r + d] = 255 & o,
            d += p,
            o /= 256,
            h -= 8)
                ;
            t[r + d - p] |= 128 * g
        }
    }
    , function(t, e) {
        var r = {}.toString;
        t.exports = Array.isArray || function(t) {
            return "[object Array]" == r.call(t)
        }
    }
    , function(t, e, r) {
        "use strict";
        r.r(e);
        var n = r(2)
          , i = r(0)
          , s = r(3)
          , o = r(1)
          , u = r(4)
          , a = r(6);
        function h(t) {
            return c.connect(t)
        }
        class c {
            constructor(t) {
                this.closeListeners = [],
                this.errorListeners = [],
                this.draining = !1,
                this.nuid = new a.a,
                this.options = {
                    url: "ws://localhost:4222"
                },
                void 0 === t.payload && (t.payload = s.a.STRING);
                if (!["json", "string", "binary"].includes(t.payload))
                    throw i.c.errorForCode(i.a.INVALID_PAYLOAD_TYPE);
                if (t.user && t.token)
                    throw i.c.errorForCode(i.a.BAD_AUTHENTICATION);
                Object(o.b)(this.options, t)
            }
            static connect(t) {
                return new Promise((e,r)=>{
                    let n = new c(t);
                    u.e.connect(t, n).then(t=>{
                        n.protocol = t,
                        e(n)
                    }
                    ).catch(t=>{
                        r(t)
                    }
                    )
                }
                )
            }
            close() {
                this.protocol.close()
            }
            publish(t, e, r="") {
                return 0 === (t = t || "").length ? (this.errorHandler(i.c.errorForCode(i.a.BAD_SUBJECT)),
                this) : (Object(o.d)(e) || (this.options.payload !== s.a.JSON ? e = e || "" : (e = void 0 === e ? null : e,
                e = JSON.stringify(e)),
                e = Object(o.f)(e)),
                this.protocol.publish(t, e, r),
                this)
            }
            subscribe(t, e, r={}) {
                return new Promise((n,s)=>{
                    this.isClosed() && s(i.c.errorForCode(i.a.CONNECTION_CLOSED)),
                    this.isDraining() && s(i.c.errorForCode(i.a.CONNECTION_DRAINING));
                    let a = Object(u.k)();
                    Object(o.b)(a, r),
                    a.subject = t,
                    a.callback = e,
                    n(this.protocol.subscribe(a))
                }
                )
            }
            request(t, e=1e3, r) {
                return new Promise((n,s)=>{
                    this.isClosed() && s(i.c.errorForCode(i.a.CONNECTION_CLOSED)),
                    this.isDraining() && s(i.c.errorForCode(i.a.CONNECTION_DRAINING));
                    let a = Object(u.j)();
                    Object(o.b)(a, {
                        max: 1
                    }),
                    a.token = this.nuid.next(),
                    a.timeout = setTimeout(()=>{
                        h.cancel(),
                        s("timeout")
                    }
                    , e),
                    a.callback = t=>{
                        n(t)
                    }
                    ;
                    let h = this.protocol.request(a);
                    this.publish(t, r, `${this.protocol.muxSubscriptions.baseInbox}${a.token}`)
                }
                )
            }
            flush(t) {
                if (void 0 === t)
                    return new Promise(t=>{
                        this.protocol.flush(()=>{
                            t()
                        }
                        )
                    }
                    );
                this.protocol.flush(t)
            }
            drain() {
                return this.isClosed() ? Promise.reject(i.c.errorForCode(i.a.CONNECTION_CLOSED)) : this.isDraining() ? Promise.reject(i.c.errorForCode(i.a.CONNECTION_DRAINING)) : (this.draining = !0,
                this.protocol.drain())
            }
            errorHandler(t) {
                this.errorListeners.forEach(e=>{
                    try {
                        e(t)
                    } catch (t) {}
                }
                )
            }
            closeHandler() {
                this.closeListeners.forEach(t=>{
                    try {
                        t()
                    } catch (t) {}
                }
                )
            }
            addEventListener(t, e) {
                "close" === t ? this.closeListeners.push(e) : "error" === t && this.errorListeners.push(e)
            }
            isClosed() {
                return this.protocol.isClosed()
            }
            isDraining() {
                return this.draining
            }
        }
        var f = r(5);
        r.d(e, "DataBuffer", (function() {
            return n.a
        }
        )),
        r.d(e, "ErrorCode", (function() {
            return i.a
        }
        )),
        r.d(e, "Messages", (function() {
            return i.b
        }
        )),
        r.d(e, "NatsError", (function() {
            return i.c
        }
        )),
        r.d(e, "connect", (function() {
            return h
        }
        )),
        r.d(e, "Connection", (function() {
            return c
        }
        )),
        r.d(e, "ParserState", (function() {
            return u.d
        }
        )),
        r.d(e, "createInbox", (function() {
            return u.i
        }
        )),
        r.d(e, "Connect", (function() {
            return u.a
        }
        )),
        r.d(e, "defaultSub", (function() {
            return u.k
        }
        )),
        r.d(e, "defaultReq", (function() {
            return u.j
        }
        )),
        r.d(e, "Request", (function() {
            return u.f
        }
        )),
        r.d(e, "Subscription", (function() {
            return u.g
        }
        )),
        r.d(e, "MuxSubscription", (function() {
            return u.c
        }
        )),
        r.d(e, "Subscriptions", (function() {
            return u.h
        }
        )),
        r.d(e, "MsgBuffer", (function() {
            return u.b
        }
        )),
        r.d(e, "ProtocolHandler", (function() {
            return u.e
        }
        )),
        r.d(e, "WSTransport", (function() {
            return f.a
        }
        )),
        r.d(e, "isArrayBuffer", (function() {
            return o.d
        }
        )),
        r.d(e, "extend", (function() {
            return o.b
        }
        )),
        r.d(e, "extractProtocolMessage", (function() {
            return o.c
        }
        )),
        r.d(e, "buildWSMessage", (function() {
            return o.a
        }
        )),
        r.d(e, "settle", (function() {
            return o.e
        }
        )),
        r.d(e, "stringToUint8Array", (function() {
            return o.f
        }
        ))
    }
    ])
}
));