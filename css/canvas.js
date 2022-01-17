(window.webpackJsonp = window.webpackJsonp || []).push([
    [22], {
        323: function(t, i, s) {
            "use strict";
            s(324), s(91), s(326), s(94);

            function e(t, i) {
                return Math.floor(Math.random() * (i - t + 1) + t)
            }
            var h = function(t, i) {
                this.x = t, this.y = i, this.magnitude = t * t + i * i, this.computed = 0, this.force = 0
            };
            h.prototype.add = function(t) {
                return new h(this.x + t.x, this.y + t.y)
            };
            var o = function(t, i) {
                this.scene = t, this.freedomCoef = i.freedomCoef;
                var s = t.height / 8 * i.sizeCoef,
                    o = s * ((Math.random() > .5 ? 1 : -1) * Math.random() * i.sizeRandomness);
                this.size = Math.max(1.5 * t.step, s + o), this.vel = new h((Math.random() > .5 ? 1 : -1) * Math.random() * 9 * i.velCoef, (Math.random() > .5 ? 1 : -1) * Math.random() * 9 * i.velCoef), this.orig = {
                    x: Math.floor(t.width * i.originX / 100),
                    y: Math.floor(t.height * i.originY / 100)
                };
                var r = e(0, Math.floor(this.orig.x * i.freedomCoef * .5)),
                    n = e(0, Math.floor(this.orig.y * i.freedomCoef * .5));
                this.pos = new h(this.orig.x + r * (Math.random() > .5 ? 1 : -1), this.orig.y + n * (Math.random() > .5 ? 1 : -1))
            };
            o.prototype.move = function() {
                if (null !== this.scene.pointerX && null !== this.scene.pointerY) {
                    var t = this.scene.pointerX - this.pos.x,
                        i = this.scene.pointerY - this.pos.y,
                        s = Math.atan2(i, t),
                        o = -Math.min(20, 400 / Math.sqrt(t * t + i * i));
                    this.pos = this.pos.add(new h(Math.cos(s) * o, Math.sin(s) * o))
                }
                var r = this.orig.x - this.pos.x,
                    n = (Math.abs(r) + this.size) / (this.scene.width - this.orig.x),
                    a = this.orig.y - this.pos.y,
                    l = (Math.abs(a) + this.size) / (this.scene.height - this.orig.y),
                    c = Math.max(Math.abs(this.vel.x), Math.abs(this.vel.y)),
                    p = 0 === Math.floor(e(0, Math.floor(5 / c))),
                    d = e(0, 99) > 100 * this.freedomCoef;
                if (p && d) {
                    var f = Math.random();
                    r > 0 && n > f ? this.vel.x = Math.abs(this.vel.x) : r < 0 && n > f && (this.vel.x = -1 * Math.abs(this.vel.x)), a > 0 && l > f ? this.vel.y = Math.abs(this.vel.y) : a < 0 && l > f && (this.vel.y = -1 * Math.abs(this.vel.y))
                }
                this.pos.x + this.size >= this.scene.width ? (this.vel.x > 0 && (this.vel.x = -this.vel.x), this.pos.x = this.scene.width - this.size) : this.pos.x <= this.size && (this.vel.x < 0 && (this.vel.x = -this.vel.x), this.pos.x = this.size), this.pos.y + this.size >= this.scene.height ? (this.vel.y > 0 && (this.vel.y = -this.vel.y), this.pos.y = this.scene.height - this.size) : this.pos.y <= this.size && (this.vel.y < 0 && (this.vel.y = -this.vel.y), this.pos.y = this.size), this.pos = this.pos.add(this.vel)
            };
            var r = function(t) {
                var i = this,
                    s = {
                        canvas: document.querySelector(".screen-1"),
                        background: "#FFF",
                        foreground: "#CAF7FF",
                        enableMouse: !1
                    },
                    e = Object.assign(s, t);
                this.step = 20, this.canvas = e.canvas, this.canvas.width = this.canvas.offsetWidth, this.canvas.height = this.canvas.offsetHeight, this.width = this.canvas.offsetWidth, this.height = this.canvas.offsetHeight, this.ctx = this.canvas.getContext("2d"), this.sx = Math.floor(this.width / this.step), this.sy = Math.floor(this.height / this.step), this.paint = !1, this.metaFill = e.foreground, this.backFill = e.background, this.plx = [0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0], this.ply = [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1], this.mscases = [0, 3, 0, 3, 1, 3, 0, 3, 2, 2, 0, 2, 1, 1, 0], this.ix = [1, 0, -1, 0, 0, 1, 0, -1, -1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1], this.grid = [], this.balls = [], this.iter = 0, this.sign = 1, this.pointerX = null, this.pointerY = null, this.requestId = void 0;
                for (var r = 0; r < (this.sx + 2) * (this.sy + 2); r++) this.grid[r] = new h(r % (this.sx + 2) * this.step, Math.floor(r / (this.sx + 2)) * this.step);
                e.groups.forEach((function(t) {
                    for (var s = 0; s < t.quantity; s++) {
                        var e = new o(i, {
                            sizeCoef: t.sizeCoef,
                            sizeRandomness: t.sizeRandomness,
                            velCoef: t.velCoef,
                            freedomCoef: t.freedomCoef,
                            originX: t.originX,
                            originY: t.originY
                        });
                        i.balls.push(e)
                    }
                })), this.canvas.addEventListener("mousemove", (function(t) {
                    e.enableMouse && (i.pointerX = t.clientX, i.pointerY = t.clientY)
                })), o.prototype.width = this.width, o.prototype.height = this.height
            };
            r.prototype.computeForce = function(t, i, s) {
                var e = s || t + i * (this.sx + 2);
                if (0 === t || 0 === i || t === this.sx || i === this.sy) var h = .6 * this.sign;
                else {
                    for (var o, r = this.grid[e], n = (h = 0, 0); o = this.balls[n++];) h += o.size * o.size / (-2 * r.x * o.pos.x - 2 * r.y * o.pos.y + o.pos.magnitude + r.magnitude);
                    h *= this.sign
                }
                return this.grid[e].force = h, h
            }, r.prototype.marchingSquares = function(t) {
                var i = t[0],
                    s = t[1],
                    e = t[2],
                    h = i + s * (this.sx + 2);
                if (this.grid[h].computed === this.iter) return !1;
                for (var o, r = 0, n = 0; n < 4; n++) {
                    var a = i + this.ix[n + 12] + (s + this.ix[n + 16]) * (this.sx + 2),
                        l = this.grid[a].force;
                    (l > 0 && this.sign < 0 || l < 0 && this.sign > 0 || !l) && (l = this.computeForce(i + this.ix[n + 12], s + this.ix[n + 16], a)), Math.abs(l) > 1 && (r += Math.pow(2, n))
                }
                if (15 === r) return [i, s - 1, !1];
                5 === r ? o = 2 === e ? 3 : 1 : 10 === r ? o = 3 === e ? 0 : 2 : (o = this.mscases[r], this.grid[h].computed = this.iter);
                var c = this.step / (Math.abs(Math.abs(this.grid[i + this.plx[4 * o + 2] + (s + this.ply[4 * o + 2]) * (this.sx + 2)].force) - 1) / Math.abs(Math.abs(this.grid[i + this.plx[4 * o + 3] + (s + this.ply[4 * o + 3]) * (this.sx + 2)].force) - 1) + 1);
                return this.ctx.lineTo(this.grid[i + this.plx[4 * o + 0] + (s + this.ply[4 * o + 0]) * (this.sx + 2)].x + this.ix[o] * c, this.grid[i + this.plx[4 * o + 1] + (s + this.ply[4 * o + 1]) * (this.sx + 2)].y + this.ix[o + 4] * c), this.paint = !0, [i + this.ix[o + 4], s + this.ix[o + 8], o]
            }, r.prototype.renderMetaballs = function() {
                for (var t, i = 0; t = this.balls[i++];) t.move();
                for (this.iter++, this.sign = -this.sign, this.paint = !1, this.ctx.fillStyle = this.metaFill, this.ctx.beginPath(), i = 0; t = this.balls[i++];) {
                    var s = [Math.round(t.pos.x / this.step), Math.round(t.pos.y / this.step), !1];
                    do {
                        s = this.marchingSquares(s)
                    } while (s);
                    this.paint && (this.ctx.fill(), this.ctx.closePath(), this.ctx.beginPath(), this.paint = !1)
                }
            }, r.prototype.run = function() {
                this.requestId = void 0, this.ctx.fillStyle = this.backFill, this.ctx.fillRect(0, 0, this.width, this.height), this.renderMetaballs(), this.start()
            }, r.prototype.start = function() {
                this.requestId || (this.requestId = window.requestAnimationFrame(this.run.bind(this)))
            }, r.prototype.stop = function() {
                this.requestId && (window.cancelAnimationFrame(this.requestId), this.requestId = void 0)
            }, i.a = r
        },
        324: function(t, i, s) {
            var e = s(0),
                h = s(325),
                o = s(92);
            e({
                target: "Array",
                proto: !0
            }, {
                fill: h
            }), o("fill")
        },
        325: function(t, i, s) {
            "use strict";
            var e = s(10),
                h = s(93),
                o = s(13);
            t.exports = function(t) {
                for (var i = e(this), s = o(i.length), r = arguments.length, n = h(r > 1 ? arguments[1] : void 0, s), a = r > 2 ? arguments[2] : void 0, l = void 0 === a ? s : h(a, s); l > n;) i[n++] = t;
                return i
            }
        },
        326: function(t, i, s) {
            s(0)({
                target: "Function",
                proto: !0
            }, {
                bind: s(164)
            })
        },
        531: function(t, i, s) {
            "use strict";
            s.r(i);
            var e = s(323),
                h = {
                    props: {
                        options: {
                            type: Object
                        }
                    },
                    data: function() {
                        return {
                            scene: void 0,
                            observer: void 0
                        }
                    },
                    mounted: function() {
                        var t = this;
                        this.observer = new IntersectionObserver((function(i, s) {
                            i[0].isIntersecting ? (i[0].target.classList.add("in-viewport"), t.scene.start()) : (i[0].target.classList.remove("in-viewport"), t.scene.stop())
                        })), this.observer.observe(this.$el), this.scene = new e.a(Object.assign({
                            canvas: this.$el.querySelector("canvas")
                        }, this.options))
                    }
                },
                o = s(38),
                r = Object(o.a)(h, (function() {
                    var t = this.$createElement;
                    this._self._c;
                    return this._m(0)
                }), [function() {
                    var t = this.$createElement,
                        i = this._self._c || t;
                    return i("div", {
                        staticClass: "blob-group"
                    }, [i("canvas")])
                }], !1, null, null, null);
            i.default = r.exports
        }
    }
]);