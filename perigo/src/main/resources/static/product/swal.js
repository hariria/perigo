var me = {
            title: "",
            titleText: "",
            text: "",
            html: "",
            footer: "",
            type: null,
            toast: !1,
            customClass: "",
            target: "body",
            backdrop: !0,
            animation: !0,
            heightAuto: !0,
            allowOutsideClick: !0,
            allowEscapeKey: !0,
            allowEnterKey: !0,
            stopKeydownPropagation: !0,
            keydownListenerCapture: !1,
            showConfirmButton: !0,
            showCancelButton: !1,
            preConfirm: null,
            confirmButtonText: "OK",
            confirmButtonAriaLabel: "",
            confirmButtonColor: null,
            confirmButtonClass: null,
            cancelButtonText: "Cancel",
            cancelButtonAriaLabel: "",
            cancelButtonColor: null,
            cancelButtonClass: null,
            buttonsStyling: !0,
            reverseButtons: !1,
            focusConfirm: !0,
            focusCancel: !1,
            showCloseButton: !1,
            closeButtonAriaLabel: "Close this dialog",
            showLoaderOnConfirm: !1,
            imageUrl: null,
            imageWidth: null,
            imageHeight: null,
            imageAlt: "",
            imageClass: null,
            timer: null,
            width: null,
            padding: null,
            background: null,
            input: null,
            inputPlaceholder: "",
            inputValue: "",
            inputOptions: {},
            inputAutoTrim: !0,
            inputClass: null,
            inputAttributes: {},
            inputValidator: null,
            validationMessage: null,
            grow: !1,
            position: "center",
            progressSteps: [],
            currentProgressStep: null,
            progressStepsDistance: null,
            onBeforeOpen: null,
            onAfterClose: null,
            onOpen: null,
            onClose: null,
            useRejections: !1,
            expectRejections: !1
        },
        he = ["useRejections", "expectRejections", "extraParams"],
        ge = ["allowOutsideClick", "allowEnterKey", "backdrop", "focusConfirm", "focusCancel", "heightAuto", "keydownListenerCapture"],
        be = function(e) {
            return me.hasOwnProperty(e) || "extraParams" === e
        },
        ve = function(e) {
            return -1 !== he.indexOf(e)
        },
        ye = function(e) {
            for (var t in e) be(t) || R('Unknown parameter "'.concat(t, '"')), e.toast && -1 !== ge.indexOf(t) && R('The parameter "'.concat(t, '" is incompatible with toasts')), ve(t) && m('The parameter "'.concat(t, '" is deprecated and will be removed in the next major release.'))
        },
        we = '"setDefaults" & "resetDefaults" methods are deprecated in favor of "mixin" method and will be removed in the next major release. For new projects, use "mixin". For past projects already using "setDefaults", support will be provided through an additional package.',
        Ce = {};
    var ke = [],
        xe = function() {
            var e = k();
            e || De(""), e = k();
            var t = Q(),
                n = E(),
                o = L();
            K(t), K(n), z([e, t], _.loading), n.disabled = !0, o.disabled = !0, e.setAttribute("data-loading", !0), e.setAttribute("aria-busy", !0), e.focus()
        },
        Ae = Object.freeze({
            isValidParameter: be,
            isDeprecatedParameter: ve,
            argsToParams: function(n) {
                var o = {};
                switch (q(n[0])) {
                    case "object":
                        r(o, n[0]);
                        break;
                    default:
                        ["title", "html", "type"].forEach(function(e, t) {
                            switch (q(n[t])) {
                                case "string":
                                    o[e] = n[t];
                                    break;
                                case "undefined":
                                    break;
                                default:
                                    I("Unexpected type of ".concat(e, '! Expected "string", got ').concat(q(n[t])))
                            }
                        })
                }
                return o
            },
            adaptInputValidator: function(n) {
                return function(e, t) {
                    return n.call(this, e, t).then(function() {}, function(e) {
                        return e
                    })
                }
            },
            close: de,
            closePopup: de,
            closeModal: de,
            closeToast: de,
            isVisible: function() {
                return !!k()
            },
            clickConfirm: function() {
                return E().click()
            },
            clickCancel: function() {
                return L().click()
            },
            getContainer: w,
            getPopup: k,
            getTitle: A,
            getContent: B,
            getImage: S,
            getIcons: x,
            getCloseButton: $,
            getButtonsWrapper: function() {
                return m("swal.getButtonsWrapper() is deprecated and will be removed in the next major release, use swal.getActions() instead"), C(_.actions)
            },
            getActions: Q,
            getConfirmButton: E,
            getCancelButton: L,
            getFooter: Y,
            getFocusableElements: J,
            getValidationMessage: O,
            isLoading: function() {
                return k().hasAttribute("data-loading")
            },
            fire: function() {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                return l(this, t)
            },
            mixin: function(n) {
                return fe(function(e) {
                    function t() {
                        return s(this, t), d(this, c(t).apply(this, arguments))
                    }
                    return a(t, e), i(t, [{
                        key: "_main",
                        value: function(e) {
                            return p(c(t.prototype), "_main", this).call(this, r({}, n, e))
                        }
                    }]), t
                }(this))
            },
            queue: function(e) {
                var r = this;
                ke = e;
                var a = function() {
                        ke = [], document.body.removeAttribute("data-swal2-queue-step")
                    },
                    s = [];
                return new Promise(function(i) {
                    ! function t(n, o) {
                        n < ke.length ? (document.body.setAttribute("data-swal2-queue-step", n), r(ke[n]).then(function(e) {
                            void 0 !== e.value ? (s.push(e.value), t(n + 1, o)) : (a(), i({
                                dismiss: e.dismiss
                            }))
                        })) : (a(), i({
                            value: s
                        }))
                    }(0)
                })
            },
            getQueueStep: function() {
                return document.body.getAttribute("data-swal2-queue-step")
            },
            insertQueueStep: function(e, t) {
                return t && t < ke.length ? ke.splice(t, 0, e) : ke.push(e)
            },
            deleteQueueStep: function(e) {
                void 0 !== ke[e] && ke.splice(e, 1)
            },
            showLoading: xe,
            enableLoading: xe,
            getTimerLeft: function() {
                return le.timeout && le.timeout.getTimerLeft()
            }
        }),
        Be = "function" == typeof Symbol ? Symbol : function() {
            var t = 0;

            function e(e) {
                return "__" + e + "_" + Math.floor(1e9 * Math.random()) + "_" + ++t + "__"
            }
            return e.iterator = e("Symbol.iterator"), e
        }(),
        Se = "function" == typeof WeakMap ? WeakMap : function(n, o, t) {
            function e() {
                o(this, n, {
                    value: Be("WeakMap")
                })
            }
            return e.prototype = {
                delete: function(e) {
                    delete e[this[n]]
                },
                get: function(e) {
                    return e[this[n]]
                },
                has: function(e) {
                    return t.call(e, this[n])
                },
                set: function(e, t) {
                    o(e, this[n], {
                        configurable: !0,
                        value: t
                    })
                }
            }, e
        }(Be("WeakMap"), Object.defineProperty, {}.hasOwnProperty),
        Pe = {
            promise: new Se,
            innerParams: new Se,
            domCache: new Se
        };