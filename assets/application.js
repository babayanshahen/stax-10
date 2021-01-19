// $(window).bind("load", function() {
// $(".stax_start_banner").css({
// 	display:"none"
// })
// 	$(".all-content").css({
// 	display:"block"
// })




let windowUrl = window.location.href;
if (windowUrl.includes('size-guide')) {
    function getSelectedProduct(array) {
        let btnSizeCharts = '';
        let btnSizeChartsLeft = '';


        // 		btnSizeChartsLeft+= `<div clas="size-chart-left">`;

        // 		$(name).each(function(index,element){
        // 			btnSizeChartsLeft += `

        // 	<div class="ks-table-header">
        //                         ${element}
        //        </div>
        // ` ;

        // 		});
        // 		btnSizeChartsLeft += `</div>`
        // $('.sizeChartContainer').append(btnSizeChartsLeft);
        let btnSizeChartsRight = document.createElement('div');
        btnSizeChartsRight.classList.add('size-chart-right');
        let iteration = 0;

        for (let i = 0; i < array.length; i++) {
            jQuery.getJSON(array[i], function(product) {
                fetch(`https://app.kiwisizing.com/api/getSizingChart?shop=stax-livin.myshopify.com&product=${product.id}`)
                    .then((response) => {
                        return response.json();
                    })
                    .then((productChart) => {


                        if (productChart.sizings.length > 0) {

                            if (iteration == 0) {
                                btnSizeCharts += `<div class="${i} ks-chart-container sizing-chart-container bn-size-chart-container ks-container-with-modal selected">`;
                                iteration++;


                            } else {
                                btnSizeCharts += `<div class="${i} ks-chart-container sizing-chart-container bn-size-chart-container ks-container-with-modal noselected">`;
                                iteration++;
                            }

                            btnSizeCharts += `
   <div class="ks-modal-content-hidden bn-size-chart-content" id="ks-chart-content-${i}" style="width: 70%;>
      <div>
         <div class="ks-modal-content ">
            <div class="ks-chart-tab-container">
               <div class="ks-chart-individual">
                  <div class="ks-table-content-wrapper ks-toggle-style-1">
                     <div class="ks-table-header">
                        ${productChart.sizings[0].tables.cZTC6JU.header}
                     </div>
                     <div class="ks-table-wrapper">
                        <table class="ks-table">
                           <tbody>`;

                            $(productChart.sizings[0].tables.cZTC6JU.data).each(function(index, element) {
                                btnSizeCharts += `<tr class="ks-table-row">`;
                                $(element).each(function(indexInner, elementInner) {
                                    btnSizeCharts += `<td class="ks-table-cell ks-table-header-cell">${elementInner.value}</td>`;
                                })

                                btnSizeCharts += `</tr>`;

                            })

                            btnSizeCharts += `
                           </tbody>
                        </table>
                     </div>
                     
                  </div>
                  <div class="ks-tab ks-tab-style1 ks-tab-vertical">
                     <div class="ks-tab-headers">`;
                            if (productChart.sizings[0].layout.data[0].type == 0) {
                                $(productChart.sizings[0].layout.data[2].data).each(function(index, element) {
                                    if (index == 0) {
                                        btnSizeCharts += `<input type="radio" name="tabset-${product.id}" id="tab-${product.id}-${index}" checked="">
                        	<label for="tab-${product.id}-${index}">${element.title}</label>`;
                                    } else {
                                        btnSizeCharts += `<input type="radio" name="tabset-${product.id}" id="tab-${product.id}-${index}">
                        	<label for="tab-${product.id}-${index}">${element.title}</label>`;
                                    }
                                });
                            } else {
                                $(productChart.sizings[0].layout.data[1].data).each(function(indexInner, elementInner) {
                                    if (indexInner == 0) {
                                        btnSizeCharts += `<input type="radio" name="tabset-${product.id}" id="tab-${product.id}-${indexInner}" checked="">
                        	<label for="tab-${product.id}-${indexInner}">${elementInner.title}</label>`;
                                    } else {
                                        btnSizeCharts += `<input type="radio" name="tabset-${product.id}" id="tab-${product.id}-${indexInner}">
                        	<label for="tab-${product.id}-${indexInner}">${elementInner.title}</label>`;
                                    }

                                })
                            }



                            btnSizeCharts += ` </div>
                     <div class="ks-tab-panels" style="min-height: 270px;">`;
                            if (productChart.sizings[0].layout.data[0].type == 0) {
                                $(productChart.sizings[0].layout.data[2].data).each(function(index1, element1) {
                                    if (index1 == 0) {

                                        btnSizeCharts += `<section id="content-${product.id}-${index1}" class="ks-tab-panel selected">
                           <div class="ks-html-content">
                              ${element1.layout.data[0].value}
                            
                           </div>
                        </section>`;
                                    } else {
                                        btnSizeCharts += `<section id="content-${product.id}-${index1}" class="ks-tab-panel">
                           <div class="ks-html-content">
                              ${element1.layout.data[0].value}
                            
                           </div>
                        </section>`;


                                    }
                                })
                            } else {
                                $(productChart.sizings[0].layout.data[1].data).each(function(index2, element2) {
                                    if (index2 == 0) {
                                        btnSizeCharts += `<section id="content-${product.id}-${index2}" class="ks-tab-panel selected">
                           <div class="ks-html-content">
                              ${element2.layout.data[0].value}
                            
                           </div>
                        </section>`;

                                    } else {
                                        btnSizeCharts += `<section id="content-${product.id}-${index2}" class="ks-tab-panel">
                           <div class="ks-html-content">
                              ${element2.layout.data[0].value}
                            
                           </div>
                        </section>`;
                                    }
                                })
                            }

                            btnSizeCharts += `
                     </div>
                  </div>
                  
               </div>
            </div>
         </div>
      </div>
   </div>
   </div>
   <hr>`;
                            $(btnSizeChartsRight).append(btnSizeCharts);
                            btnSizeCharts = '';
                        }


                    })
            })

        }
        $('.sizeChartContainer1').append(btnSizeChartsRight);
    }
    let LinksArray = ['/products/best-black-tights-full-length.js',
        '/products/stax-wmns-tights-black.js',
        '/products/white-bike-shorts.js',
        '/products/jhc2-crop-top-pistachio.js',
        '/products/stax-of-support-tee-unisex.js',
        '/products/stax-mens-v1-box-tee-bone.js',
        '/products/stax-mens-v3-shorts-charcoal.js'
    ];

    getSelectedProduct(LinksArray);
}

window.theme = window.theme || {}, window.theme = window.theme || {}, theme.Sections = function() {
    this.constructors = {}, this.instances = [], $(document).on("shopify:section:load", this._onSectionLoad.bind(this)).on("shopify:section:unload", this._onSectionUnload.bind(this)).on("shopify:section:select", this._onSelect.bind(this)).on("shopify:section:deselect", this._onDeselect.bind(this)).on("shopify:block:select", this._onBlockSelect.bind(this)).on("shopify:block:deselect", this._onBlockDeselect.bind(this)), $(document).on("shopify:section:select", function(e) {
        "sidebar-menu" !== e.detail.sectionId && theme.LeftDrawer.close()
    })
}, theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
    _createInstance: function(e, t) {
        var n = $(e),
            a = n.attr("data-section-id"),
            o = n.attr("data-section-type");
        if (t = t || this.constructors[o], !_.isUndefined(t)) {
            var i = _.assignIn(new t(e), {
                id: a,
                type: o,
                container: e
            });
            this.instances.push(i)
        }
    },
    _onSectionLoad: function(e) {
        var t = $("[data-section-id]", e.target)[0];
        t && this._createInstance(t)
    },
    _onSectionUnload: function(e) {
        this.instances = _.filter(this.instances, function(t) {
            var n = t.id === e.detail.sectionId;
            return n && _.isFunction(t.onUnload) && t.onUnload(e), !n
        })
    },
    _onSelect: function(e) {
        var t = _.find(this.instances, function(t) {
            return t.id === e.detail.sectionId
        });
        !_.isUndefined(t) && _.isFunction(t.onSelect) && t.onSelect(e)
    },
    _onDeselect: function(e) {
        var t = _.find(this.instances, function(t) {
            return t.id === e.detail.sectionId
        });
        !_.isUndefined(t) && _.isFunction(t.onDeselect) && t.onDeselect(e)
    },
    _onBlockSelect: function(e) {
        var t = _.find(this.instances, function(t) {
            return t.id === e.detail.sectionId
        });
        !_.isUndefined(t) && _.isFunction(t.onBlockSelect) && t.onBlockSelect(e)
    },
    _onBlockDeselect: function(e) {
        var t = _.find(this.instances, function(t) {
            return t.id === e.detail.sectionId
        });
        !_.isUndefined(t) && _.isFunction(t.onBlockDeselect) && t.onBlockDeselect(e)
    },
    register: function(e, t) {
        this.constructors[e] = t, $("[data-section-type=" + e + "]").each(function(e, n) {
            this._createInstance(n, t)
        }.bind(this))
    }
}), window.a11y = window.a11y || {}, a11y.trapFocus = function(e, t) {
    var n = t ? "focusin." + t : "focusin";
    e.attr("tabindex", "-1").focus(), $(document).on(n, function(t) {
        e[0] === t.target || e.has(t.target).length || e.focus()
    })
}, a11y.removeTrapFocus = function(e, t) {
    var n = t ? "focusin." + t : "focusin";
    e.removeAttr("tabindex"), $(document).off(n)
}, window.Modals = function() {
    var e = function(e, t, n) {
        var a = {
            close: ".js-modal-close",
            open: ".js-modal-open-" + t,
            openClass: "modal--is-active"
        };
        if (this.$modal = $("#" + e), !this.$modal.length) return !1;
        this.nodes = {
            $parent: $("body, html")
        }, this.config = $.extend(a, n), this.modalIsOpen = !1, this.$focusOnOpen = this.config.$focusOnOpen ? $(this.config.$focusOnOpen) : this.$modal, this.init()
    };
    return e.prototype.init = function() {
        $(this.config.open).attr("aria-expanded", "false"), $(this.config.open).on("click", $.proxy(this.open, this)), this.$modal.find(this.config.close).on("click", $.proxy(this.close, this))
    }, e.prototype.open = function(e) {
        var t = !1;
        if (!this.modalIsOpen) {
            if (e ? e.preventDefault() : t = !0, e && e.stopPropagation && (e.stopPropagation(), this.$activeSource = $(e.currentTarget)), this.modalIsOpen && !t) return this.close();
            this.$modal.prepareTransition().addClass(this.config.openClass), this.nodes.$parent.addClass(this.config.openClass), this.modalIsOpen = !0, a11y.trapFocus(this.$focusOnOpen, "modal_focus"), this.$activeSource && this.$activeSource.attr("aria-expanded") && this.$activeSource.attr("aria-expanded", "true"), this.bindEvents()
        }
    }, e.prototype.close = function() {
        this.modalIsOpen && ($(document.activeElement).trigger("blur"), this.$modal.prepareTransition().removeClass(this.config.openClass), this.nodes.$parent.removeClass(this.config.openClass), this.modalIsOpen = !1, a11y.removeTrapFocus(this.$focusOnOpen, "modal_focus"), this.$activeSource && this.$activeSource.attr("aria-expanded") && this.$activeSource.attr("aria-expanded", "false"), this.unbindEvents())
    }, e.prototype.bindEvents = function() {
        this.nodes.$parent.on("keyup.modal", $.proxy(function(e) {
            27 === e.keyCode && this.close()
        }, this))
    }, e.prototype.unbindEvents = function() {
        this.nodes.$parent.off(".modal")
    }, e
}(), window.ShopifyCanvas = window.ShopifyCanvas || {}, ShopifyCanvas.init = function() {
    ShopifyCanvas.cacheSelectors(), ShopifyCanvas.checkUrlHash(), ShopifyCanvas.initEventListeners(), ShopifyCanvas.resetPasswordSuccess(), ShopifyCanvas.customerAddressForm()
}, ShopifyCanvas.cacheSelectors = function() {
    ShopifyCanvas.cache = {
        $html: $("html"),
        $body: $("body")
    }
}, ShopifyCanvas.initEventListeners = function() {
    $("#RecoverPassword").on("click", function(e) {
        e.preventDefault(), ShopifyCanvas.toggleRecoverPasswordForm()
    }), $("#HideRecoverPasswordLink").on("click", function(e) {
        e.preventDefault(), ShopifyCanvas.toggleRecoverPasswordForm()
    })
}, ShopifyCanvas.toggleRecoverPasswordForm = function() {
    $("#RecoverPasswordForm").toggleClass("hide"), $("#CustomerLoginForm").toggleClass("hide")
}, ShopifyCanvas.resetPasswordSuccess = function() {
    $(".reset-password-success").length && $("#ResetSuccess").removeClass("hide")
}, ShopifyCanvas.customerAddressForm = function() {
    var e = $("#AddressNewForm");
    e.length && (new Shopify.CountryProvinceSelector("AddressCountryNew", "AddressProvinceNew", {
        hideElement: "AddressProvinceContainerNew"
    }), $(".address-country-option").each(function() {
        var e = $(this).data("form-id"),
            t = "AddressCountry_" + e,
            n = "AddressProvince_" + e,
            a = "AddressProvinceContainer_" + e;
        new Shopify.CountryProvinceSelector(t, n, {
            hideElement: a
        })
    }), $(".address-new-toggle").on("click", function() {
        e.toggleClass("hide")
    }), $(".address-edit-toggle").on("click", function() {
        var e = $(this).data("form-id");
        $("#EditAddress_" + e).toggleClass("hide")
    }), $(".address-delete").on("click", function() {
        var e = $(this),
            t = e.data("form-id"),
            n = e.data("confirm-message");
        confirm(n || "Are you sure you wish to delete this address?") && Shopify.postLink("/account/addresses/" + t, {
            parameters: {
                _method: "delete"
            }
        })
    }))
}, ShopifyCanvas.checkUrlHash = function() {
    "#recover" === ShopifyCanvas.getHash() && ShopifyCanvas.toggleRecoverPasswordForm()
}, ShopifyCanvas.getHash = function() {
    return window.location.hash
}, $(ShopifyCanvas.init);
var vendorPrefix = function() {
        var e, t = /^(Moz|Webkit|O|ms)(?=[A-Z])/,
            n = $("script")[0].style,
            a = "";
        for (e in n)
            if (t.test(e)) {
                a = e.match(t)[0];
                break
            } return "WebkitOpacity" in n && (a = "Webkit"), "KhtmlOpacity" in n && (a = "Khtml"),
            function(e) {
                return a + (a.length > 0 ? e.charAt(0).toUpperCase() + e.slice(1) : e)
            }
    }(),
    slickTheme = function(e, t) {
        "use strict";
        var n, a, o, i, s, c, r, h, d, l, u, f = 0;
        return r = function() {
            slickTheme.cache = {
                $html: t("html"),
                $window: t(window),
                $heroImage: t(".hero__image")
            }, slickTheme.vars = {
                slideClass: "slick-slide",
                activeClass: "slick-active",
                hiddenClass: "hero__slide--hidden",
                heroHeaderClass: "hero__header"
            }
        }, n = function(e) {
            i = e.$slider, s = i.find("." + slickTheme.vars.slideClass), c = i.find("." + slickTheme.vars.activeClass), o.isTouch || (s.addClass(slickTheme.vars.hiddenClass), c.removeClass(slickTheme.vars.hiddenClass)), h(), slickTheme.cache.$html.hasClass("supports-csstransforms3d") && l(), slickTheme.cache.$window.trigger("slick-initialized")
        }, a = function(e, t, n) {
            o.isTouch || s.removeClass(slickTheme.vars.hiddenClass), f = n, slickTheme.cache.$html.hasClass("supports-csstransforms3d") && u(f)
        }, h = function() {
            d(), slickTheme.cache.$window.on("resize", t.debounce(250, d))
        }, d = function() {
            theme.cache.$announcementBar.length ? slickTheme.cache.$window.height() / 2 - theme.cache.$announcementBar.height() : slickTheme.cache.$window.height() / 2
        }, l = function() {
            vendorPrefix ? vendorPrefix("transform") : "transform", slickTheme.cache.$window.on("scroll", function() {
                u(f)
            })
        }, u = function(e) {
            slickTheme.cache.$window.scrollTop()
        }, {
            init: function(e) {
                r(), o = {
                    $element: null,
                    $headerClass: null,
                    isTouch: !!slickTheme.cache.$html.hasClass("supports-touch"),
                    arrows: !1,
                    dots: !1,
                    adaptiveHeight: !0,
                    autoplay: !0,
                    autoplaySpeed: 7e3,
                    speed: 3e3
                }, t.extend(o, e), o.$element.slick({
                    arrows: o.arrows,
                    dots: o.dots,
                    draggable: !1,
                    fade: !0,
                    autoplay: o.autoplay,
                    autoplaySpeed: o.autoplaySpeed,
                    speed: o.speed,
                    pauseOnHover: !1,
                    onInit: this.onInit,
                    onBeforeChange: this.beforeChange,
                    onAfterChange: this.afterChange
                })
            },
            onInit: n,
            beforeChange: a,
            afterChange: function() {
                o.isTouch || (c = i.find("." + slickTheme.vars.activeClass), s.addClass(slickTheme.vars.hiddenClass), c.removeClass(slickTheme.vars.hiddenClass))
            }
        }
    }(0, jQuery);
theme.Drawers = function() {
    var e = function(e, t, n) {
        var a = {
            close: ".js-drawer-close",
            open: ".js-drawer-open-" + t,
            openClass: "js-drawer-open",
            dirOpenClass: "js-drawer-open-" + t
        };
        if (this.nodes = {
                $parent: $("body, html"),
                $page: $("#PageContainer")
            }, this.config = $.extend(a, n), this.position = t, this.$drawer = $("#" + e), !this.$drawer.length) return !1;
        this.drawerIsOpen = !1, this.init()
    };
    return e.prototype.init = function() {
        $(this.config.open).on("click", $.proxy(this.open, this)), this.$drawer.on("click", this.config.close, $.proxy(this.close, this))
    }, e.prototype.open = function(e) {
        var t = !1;
        if (e ? e.preventDefault() : t = !0, e && e.stopPropagation && (e.stopPropagation(), this.$activeSource = $(e.currentTarget)), this.drawerIsOpen && !t) return this.close();
        this.$drawer.prepareTransition(), this.nodes.$parent.addClass(this.config.openClass + " " + this.config.dirOpenClass), this.drawerIsOpen = !0, this.trapFocus({
            $container: this.$drawer,
            $elementToFocus: this.$drawer.find(".drawer__close-button"),
            namespace: "drawer_focus"
        }), this.config.onDrawerOpen && "function" == typeof this.config.onDrawerOpen && (t || this.config.onDrawerOpen()), this.$activeSource && this.$activeSource.attr("aria-expanded") && this.$activeSource.attr("aria-expanded", "true"), this.nodes.$parent.on("keyup.drawer", $.proxy(function(e) {
            27 === e.keyCode && this.close()
        }, this)), this.nodes.$page.on("touchmove.drawer", function() {
            return !1
        }), this.nodes.$page.on("click.drawer", $.proxy(function() {
            return this.close(), !1
        }, this))
    }, e.prototype.close = function() {
        this.drawerIsOpen && ($(document.activeElement).trigger("blur"), this.$drawer.prepareTransition(), this.nodes.$parent.removeClass(this.config.dirOpenClass + " " + this.config.openClass), this.drawerIsOpen = !1, this.removeTrapFocus({
            $container: this.$drawer,
            namespace: "drawer_focus"
        }), this.nodes.$page.off(".drawer"), this.nodes.$parent.off(".drawer"))
    }, e.prototype.trapFocus = function(e) {
        var t = e.namespace ? "focusin." + e.namespace : "focusin";
        e.$elementToFocus || (e.$elementToFocus = e.$container), e.$container.attr("tabindex", "-1"), e.$elementToFocus.focus(), $(document).on(t, function(t) {
            e.$container[0] === t.target || e.$container.has(t.target).length || e.$container.focus()
        })
    }, e.prototype.removeTrapFocus = function(e) {
        var t = e.namespace ? "focusin." + e.namespace : "focusin";
        e.$container && e.$container.length && e.$container.removeAttr("tabindex"), $(document).off(t)
    }, e
}(), theme.ActionBar = function() {
    function e() {
        var e = $(".action-bar--show");
        if (e.width() > theme.variables.windowWidth) {
            var t = e.find(".action-bar--active");
            if (theme.cache.$actionBarWrapper.addClass("scrollable-js"), t.length) {
                var n = t.offset().left,
                    a = 0;
                n > theme.variables.windowWidth / 2 && (a = n - theme.variables.windowWidth / 3, theme.cache.$actionBar.animate({
                    scrollLeft: a
                }))
            }
        } else theme.cache.$actionBarWrapper.removeClass("scrollable-js"), theme.cache.$actionBar.animate({
            scrollLeft: 0
        });
        theme.cache.$actionBar.on("scroll", $.throttle(100, function() {
            e.offset().left < -100 ? theme.cache.$actionBarWrapper.addClass("scrolled") : theme.cache.$actionBarWrapper.removeClass("scrolled")
        }))
    }

    function t() {
        var e = theme.cache.$window.width();
        e !== theme.variables.windowWidth && (theme.variables.windowWidth = e, n())
    }

    function n() {
        theme.cache.$actionBar.length && (theme.variables.actionBarOffsetTop = theme.cache.$actionBar.offset().top, theme.variables.actionBarOffsetBottom = theme.cache.$actionBar.height() + theme.cache.$actionBar.offset().top, a())
    }

    function a() {
        var e = theme.cache.$siteHeader.height();
        theme.variables.isIndexTemplate || theme.cache.$siteHeaderWrapper.css("height", e)
    }

    function o() {
        var e = theme.cache.$window.scrollTop();
        if (e > theme.variables.previousScrollPosition && e > theme.variables.actionBarOffsetBottom) {
            theme.cache.$body.addClass(theme.variables.stickyClass);
            var t = setTimeout(function() {
                theme.cache.$body.addClass(theme.variables.actionBarOpenTransitionClass)
            }, 50);
            theme.variables.previousScrollPosition = e
        }
        e < theme.variables.previousScrollPosition && (clearTimeout(t), e <= theme.variables.actionBarOffsetTop && (theme.cache.$body.removeClass(theme.variables.stickyClass).removeClass(theme.variables.actionBarOpenTransitionClass), theme.variables.previousScrollPosition = e))
    }
    return {
        init: function() {
            ! function() {
                var e = {
                    $actionBar: $(".action-bar"),
                    $actionArea: $(".action-area"),
                    $actionBarWrapper: $(".action-bar-wrapper"),
                    $actionBarMenus: $(".action-bar__menu"),
                    $actionBarMenuHasDropdown: $(".action-bar--has-dropdown"),
                    $activeActionBarHasSubMenu: $(".action-bar--has-dropdown.action-bar--active"),
                    $actionBarMainMenu: $(".action-bar__menu--main"),
                    $actionBarSubMenus: $(".action-bar__menu--sub"),
                    $actionBarBack: $(".action-bar__back"),
                    $actionBarMainMenuFirst: $(".action-bar__menu--main .action-bar__link").eq(0)
                };
                $.extend(theme.cache, e);
                var t = {
                    previousScrollPosition: 0,
                    hasActionBar: theme.cache.$actionBar.length,
                    actionBarOffsetTop: 0,
                    actionBarOffsetBottom: 0
                };
                $.extend(theme.variables, t)
            }(), theme.cache.$actionBar.length ? theme.cache.$hero.length ? theme.cache.$window.on("slick-initialized", function() {
                theme.cache.$heroWrapper.addClass("hero-initialized"), n(), o(), theme.cache.$window.on("scroll", o)
            }) : (n(), o(), theme.cache.$window.on("scroll", o)) : a(), e(), theme.cache.$actionBarMenuHasDropdown.length && (s = theme.cache.$actionBarSubMenus.find(".action-bar--active"), c = theme.cache.$activeActionBarHasSubMenu.attr("data-child-list-handle"), r = "action-bar--show", theme.cache.$actionBarBack.on("click", function() {
                theme.cache.$actionBarSubMenus.removeClass(r), theme.cache.$actionBarMainMenu.prepareTransition().addClass(r), theme.setFocus(theme.cache.$actionBarMainMenuFirst, "action-bar"), e()
            }), theme.cache.$actionBarMainMenu.on("click", ".action-bar--disabled", function(t) {
                t.preventDefault(), theme.cache.$actionBarMainMenu.removeClass(r), theme.cache.$actionBarSubMenus.each(function() {
                    var e = $(this);
                    c === e.attr("data-child-list-handle") && (e.prepareTransition().addClass(r), theme.setFocus(e.find(".action-bar__link").eq(0), "action-bar"))
                }), e()
            }), s.length && (i = s.parents(".action-bar__menu--sub").last(), theme.cache.$actionBarMainMenu.removeClass(r), i.addClass(r), theme.cache.$actionBarMenuHasDropdown.each(function() {
                var e = $(this),
                    t = e.attr("data-child-list-handle");
                t === i.attr("data-child-list-handle") && (e.addClass("action-bar--disabled"), c = t)
            }), e())), theme.cache.$window.on("resize", $.debounce(500, e)), theme.cache.$window.on("resize", $.debounce(250, t));
            var i, s, c, r
        }
    }
}(), theme.Collection = function() {
    var e = {
        collectionGrid: ".collection-grid",
        collectionSort: "#SortBy",
        tagSort: "#SortTags",
        showMoreButton: ".js-show-more"
    };

    function t(e) {
        e.preventDefault(), theme.cache.$showMoreButton.hasClass("btn--ajax-disabled") || theme.cache.$showMoreButton.hasClass("btn--disabled") || (theme.cache.$showMoreButton.addClass("btn--ajax-disabled"), $.ajax({
            url: theme.cache.$showMoreButton.attr("href"),
            type: "GET",
            dataType: "html"
        }).done(function(e) {
            var t = $(e),
                n = t.find(".product-item"),
                a = t.find(".js-show-more").attr("href");
            theme.cache.$collectionGrid.append(n), theme.cache.$productGridItem = $(".product-item"), a.length ? theme.cache.$showMoreButton.attr("href", a) : theme.cache.$showMoreButton.addClass("btn--disabled")
        }).always(function() {
            theme.cache.$showMoreButton.removeClass("btn--ajax-disabled")
        }))
    }
    return {
        init: function() {
            var n;
            n = {
                    $collectionGrid: $(e.collectionGrid),
                    $collectionSort: $(e.collectionSort),
                    $tagSort: $(e.tagSort),
                    $showMoreButton: $(e.showMoreButton)
                }, $.extend(theme.cache, n),
                function() {
                    theme.queryParams = {};
                    var e = theme.cache.$collectionSort;
                    if (e.length) {
                        if (location.search.length)
                            for (var t, n = 0, a = location.search.substr(1).split("&"); n < a.length; n++)(t = a[n].split("=")).length > 1 && (theme.queryParams[decodeURIComponent(t[0])] = decodeURIComponent(t[1]));
                        e.val(e.attr("data-value")).on("change", function() {
                            theme.queryParams.sort_by = $(this).val(), location.search = $.param(theme.queryParams).replace(/\+/g, "%20")
                        })
                    }
                }(), theme.cache.$tagSort.on("change", function() {
                    var e = $(this).val();
                    e && (window.location.href = $(this).val())
                }), theme.cache.$showMoreButton.length && theme.cache.$showMoreButton.on("click", t)
        }
    }
}();
$(".preOrder-btn").click(function() {

    if (prodisSelected) {
        console.log('prodisSelected', prodisSelected);
        console.log($(this).closest("form"));
        console.log($(this).closest("form").find("button[val='pre-order']"));


        let line_item = '<p style="display:none;" class="line-item-property__field">' +
            `<input id="pre-sale" type="hidden" name="properties[Order Type]" value="Pre Sale">` +
            '</p>';
        //        $('#AddToCartForm-product-template').prepend(line_item);
        //        $('#AddToCartForm-product-template-mobile').prepend(line_item);
        // 	   $('#AddToCartForm-product-template-unisex').prepend(line_item);
        //        $('#AddToCartForm-product-template-unisex-mobile').prepend(line_item);

        $('[id^=AddToCartForm-product-template]').prepend(line_item);

    }
    //      $('#AddToCartForm-product-template').find("button[val='pre-order']").trigger("click");
    $(`button[val='pre-order']`).trigger("click");


})


/*!
handlebars v1.3.0

Copyright (C) 2011 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
var Handlebars = function() {
    var e = function() {
        "use strict";

        function t(e) {
            this.string = e
        }
        var e;
        t.prototype.toString = function() {
            return "" + this.string
        };
        e = t;
        return e
    }();
    var t = function(e) {
        "use strict";

        function o(e) {
            return r[e] || "&"
        }

        function u(e, t) {
            for (var n in t) {
                if (Object.prototype.hasOwnProperty.call(t, n)) {
                    e[n] = t[n]
                }
            }
        }

        function c(e) {
            if (e instanceof n) {
                return e.toString()
            } else if (!e && e !== 0) {
                return ""
            }
            e = "" + e;
            if (!s.test(e)) {
                return e
            }
            return e.replace(i, o)
        }

        function h(e) {
            if (!e && e !== 0) {
                return true
            } else if (l(e) && e.length === 0) {
                return true
            } else {
                return false
            }
        }
        var t = {};
        var n = e;
        var r = {
            "&": "&",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        };
        var i = /[&<>"'`]/g;
        var s = /[&<>"'`]/;
        t.extend = u;
        var a = Object.prototype.toString;
        t.toString = a;
        var f = function(e) {
            return typeof e === "function"
        };
        if (f(/x/)) {
            f = function(e) {
                return typeof e === "function" && a.call(e) === "[object Function]"
            }
        }
        var f;
        t.isFunction = f;
        var l = Array.isArray || function(e) {
            return e && typeof e === "object" ? a.call(e) === "[object Array]" : false
        };
        t.isArray = l;
        t.escapeExpression = c;
        t.isEmpty = h;
        return t
    }(e);
    var n = function() {
        "use strict";

        function n(e, n) {
            var r;
            if (n && n.firstLine) {
                r = n.firstLine;
                e += " - " + r + ":" + n.firstColumn
            }
            var i = Error.prototype.constructor.call(this, e);
            for (var s = 0; s < t.length; s++) {
                this[t[s]] = i[t[s]]
            }
            if (r) {
                this.lineNumber = r;
                this.column = n.firstColumn
            }
        }
        var e;
        var t = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
        n.prototype = new Error;
        e = n;
        return e
    }();
    var r = function(e, t) {
        "use strict";

        function h(e, t) {
            this.helpers = e || {};
            this.partials = t || {};
            p(this)
        }

        function p(e) {
            e.registerHelper("helperMissing", function(e) {
                if (arguments.length === 2) {
                    return undefined
                } else {
                    throw new i("Missing helper: '" + e + "'")
                }
            });
            e.registerHelper("blockHelperMissing", function(t, n) {
                var r = n.inverse || function() {},
                    i = n.fn;
                if (f(t)) {
                    t = t.call(this)
                }
                if (t === true) {
                    return i(this)
                } else if (t === false || t == null) {
                    return r(this)
                } else if (a(t)) {
                    if (t.length > 0) {
                        return e.helpers.each(t, n)
                    } else {
                        return r(this)
                    }
                } else {
                    return i(t)
                }
            });
            e.registerHelper("each", function(e, t) {
                var n = t.fn,
                    r = t.inverse;
                var i = 0,
                    s = "",
                    o;
                if (f(e)) {
                    e = e.call(this)
                }
                if (t.data) {
                    o = m(t.data)
                }
                if (e && typeof e === "object") {
                    if (a(e)) {
                        for (var u = e.length; i < u; i++) {
                            if (o) {
                                o.index = i;
                                o.first = i === 0;
                                o.last = i === e.length - 1
                            }
                            s = s + n(e[i], {
                                data: o
                            })
                        }
                    } else {
                        for (var l in e) {
                            if (e.hasOwnProperty(l)) {
                                if (o) {
                                    o.key = l;
                                    o.index = i;
                                    o.first = i === 0
                                }
                                s = s + n(e[l], {
                                    data: o
                                });
                                i++
                            }
                        }
                    }
                }
                if (i === 0) {
                    s = r(this)
                }
                return s
            });
            e.registerHelper("if", function(e, t) {
                if (f(e)) {
                    e = e.call(this)
                }
                if (!t.hash.includeZero && !e || r.isEmpty(e)) {
                    return t.inverse(this)
                } else {
                    return t.fn(this)
                }
            });
            e.registerHelper("unless", function(t, n) {
                return e.helpers["if"].call(this, t, {
                    fn: n.inverse,
                    inverse: n.fn,
                    hash: n.hash
                })
            });
            e.registerHelper("with", function(e, t) {
                if (f(e)) {
                    e = e.call(this)
                }
                if (!r.isEmpty(e)) return t.fn(e)
            });
            e.registerHelper("log", function(t, n) {
                var r = n.data && n.data.level != null ? parseInt(n.data.level, 10) : 1;
                e.log(r, t)
            })
        }

        function v(e, t) {
            d.log(e, t)
        }
        var n = {};
        var r = e;
        var i = t;
        var s = "1.3.0";
        n.VERSION = s;
        var o = 4;
        n.COMPILER_REVISION = o;
        var u = {
            1: "<= 1.0.rc.2",
            2: "== 1.0.0-rc.3",
            3: "== 1.0.0-rc.4",
            4: ">= 1.0.0"
        };
        n.REVISION_CHANGES = u;
        var a = r.isArray,
            f = r.isFunction,
            l = r.toString,
            c = "[object Object]";
        n.HandlebarsEnvironment = h;
        h.prototype = {
            constructor: h,
            logger: d,
            log: v,
            registerHelper: function(e, t, n) {
                if (l.call(e) === c) {
                    if (n || t) {
                        throw new i("Arg not supported with multiple helpers")
                    }
                    r.extend(this.helpers, e)
                } else {
                    if (n) {
                        t.not = n
                    }
                    this.helpers[e] = t
                }
            },
            registerPartial: function(e, t) {
                if (l.call(e) === c) {
                    r.extend(this.partials, e)
                } else {
                    this.partials[e] = t
                }
            }
        };
        var d = {
            methodMap: {
                0: "debug",
                1: "info",
                2: "warn",
                3: "error"
            },
            DEBUG: 0,
            INFO: 1,
            WARN: 2,
            ERROR: 3,
            level: 3,
            log: function(e, t) {
                if (d.level <= e) {
                    var n = d.methodMap[e];
                    if (typeof console !== "undefined" && console[n]) {
                        console[n].call(console, t)
                    }
                }
            }
        };
        n.logger = d;
        n.log = v;
        var m = function(e) {
            var t = {};
            r.extend(t, e);
            return t
        };
        n.createFrame = m;
        return n
    }(t, n);
    var i = function(e, t, n) {
        "use strict";

        function a(e) {
            var t = e && e[0] || 1,
                n = o;
            if (t !== n) {
                if (t < n) {
                    var r = u[n],
                        i = u[t];
                    throw new s("Template was precompiled with an older version of Handlebars than the current runtime. " + "Please update your precompiler to a newer version (" + r + ") or downgrade your runtime to an older version (" + i + ").")
                } else {
                    throw new s("Template was precompiled with a newer version of Handlebars than the current runtime. " + "Please update your runtime to a newer version (" + e[1] + ").")
                }
            }
        }

        function f(e, t) {
            if (!t) {
                throw new s("No environment passed to template")
            }
            var n = function(e, n, r, i, o, u) {
                var a = t.VM.invokePartial.apply(this, arguments);
                if (a != null) {
                    return a
                }
                if (t.compile) {
                    var f = {
                        helpers: i,
                        partials: o,
                        data: u
                    };
                    o[n] = t.compile(e, {
                        data: u !== undefined
                    }, t);
                    return o[n](r, f)
                } else {
                    throw new s("The partial " + n + " could not be compiled when running in runtime-only mode")
                }
            };
            var r = {
                escapeExpression: i.escapeExpression,
                invokePartial: n,
                programs: [],
                program: function(e, t, n) {
                    var r = this.programs[e];
                    if (n) {
                        r = c(e, t, n)
                    } else if (!r) {
                        r = this.programs[e] = c(e, t)
                    }
                    return r
                },
                merge: function(e, t) {
                    var n = e || t;
                    if (e && t && e !== t) {
                        n = {};
                        i.extend(n, t);
                        i.extend(n, e)
                    }
                    return n
                },
                programWithDepth: t.VM.programWithDepth,
                noop: t.VM.noop,
                compilerInfo: null
            };
            return function(n, i) {
                i = i || {};
                var s = i.partial ? i : t,
                    o, u;
                if (!i.partial) {
                    o = i.helpers;
                    u = i.partials
                }
                var a = e.call(r, s, n, o, u, i.data);
                if (!i.partial) {
                    t.VM.checkRevision(r.compilerInfo)
                }
                return a
            }
        }

        function l(e, t, n) {
            var r = Array.prototype.slice.call(arguments, 3);
            var i = function(e, i) {
                i = i || {};
                return t.apply(this, [e, i.data || n].concat(r))
            };
            i.program = e;
            i.depth = r.length;
            return i
        }

        function c(e, t, n) {
            var r = function(e, r) {
                r = r || {};
                return t(e, r.data || n)
            };
            r.program = e;
            r.depth = 0;
            return r
        }

        function h(e, t, n, r, i, o) {
            var u = {
                partial: true,
                helpers: r,
                partials: i,
                data: o
            };
            if (e === undefined) {
                throw new s("The partial " + t + " could not be found")
            } else if (e instanceof Function) {
                return e(n, u)
            }
        }

        function p() {
            return ""
        }
        var r = {};
        var i = e;
        var s = t;
        var o = n.COMPILER_REVISION;
        var u = n.REVISION_CHANGES;
        r.checkRevision = a;
        r.template = f;
        r.programWithDepth = l;
        r.program = c;
        r.invokePartial = h;
        r.noop = p;
        return r
    }(t, n, r);
    var s = function(e, t, n, r, i) {
        "use strict";
        var s;
        var o = e;
        var u = t;
        var a = n;
        var f = r;
        var l = i;
        var c = function() {
            var e = new o.HandlebarsEnvironment;
            f.extend(e, o);
            e.SafeString = u;
            e.Exception = a;
            e.Utils = f;
            e.VM = l;
            e.template = function(t) {
                return l.template(t, e)
            };
            return e
        };
        var h = c();
        h.create = c;
        s = h;
        return s
    }(r, e, n, t, i);
    var o = function(e) {
        "use strict";

        function r(e) {
            e = e || {};
            this.firstLine = e.first_line;
            this.firstColumn = e.first_column;
            this.lastColumn = e.last_column;
            this.lastLine = e.last_line
        }
        var t;
        var n = e;
        var i = {
            ProgramNode: function(e, t, n, s) {
                var o, u;
                if (arguments.length === 3) {
                    s = n;
                    n = null
                } else if (arguments.length === 2) {
                    s = t;
                    t = null
                }
                r.call(this, s);
                this.type = "program";
                this.statements = e;
                this.strip = {};
                if (n) {
                    u = n[0];
                    if (u) {
                        o = {
                            first_line: u.firstLine,
                            last_line: u.lastLine,
                            last_column: u.lastColumn,
                            first_column: u.firstColumn
                        };
                        this.inverse = new i.ProgramNode(n, t, o)
                    } else {
                        this.inverse = new i.ProgramNode(n, t)
                    }
                    this.strip.right = t.left
                } else if (t) {
                    this.strip.left = t.right
                }
            },
            MustacheNode: function(e, t, n, s, o) {
                r.call(this, o);
                this.type = "mustache";
                this.strip = s;
                if (n != null && n.charAt) {
                    var u = n.charAt(3) || n.charAt(2);
                    this.escaped = u !== "{" && u !== "&"
                } else {
                    this.escaped = !!n
                }
                if (e instanceof i.SexprNode) {
                    this.sexpr = e
                } else {
                    this.sexpr = new i.SexprNode(e, t)
                }
                this.sexpr.isRoot = true;
                this.id = this.sexpr.id;
                this.params = this.sexpr.params;
                this.hash = this.sexpr.hash;
                this.eligibleHelper = this.sexpr.eligibleHelper;
                this.isHelper = this.sexpr.isHelper
            },
            SexprNode: function(e, t, n) {
                r.call(this, n);
                this.type = "sexpr";
                this.hash = t;
                var i = this.id = e[0];
                var s = this.params = e.slice(1);
                var o = this.eligibleHelper = i.isSimple;
                this.isHelper = o && (s.length || t)
            },
            PartialNode: function(e, t, n, i) {
                r.call(this, i);
                this.type = "partial";
                this.partialName = e;
                this.context = t;
                this.strip = n
            },
            BlockNode: function(e, t, i, s, o) {
                r.call(this, o);
                if (e.sexpr.id.original !== s.path.original) {
                    throw new n(e.sexpr.id.original + " doesn't match " + s.path.original, this)
                }
                this.type = "block";
                this.mustache = e;
                this.program = t;
                this.inverse = i;
                this.strip = {
                    left: e.strip.left,
                    right: s.strip.right
                };
                (t || i).strip.left = e.strip.right;
                (i || t).strip.right = s.strip.left;
                if (i && !t) {
                    this.isInverse = true
                }
            },
            ContentNode: function(e, t) {
                r.call(this, t);
                this.type = "content";
                this.string = e
            },
            HashNode: function(e, t) {
                r.call(this, t);
                this.type = "hash";
                this.pairs = e
            },
            IdNode: function(e, t) {
                r.call(this, t);
                this.type = "ID";
                var i = "",
                    s = [],
                    o = 0;
                for (var u = 0, a = e.length; u < a; u++) {
                    var f = e[u].part;
                    i += (e[u].separator || "") + f;
                    if (f === ".." || f === "." || f === "this") {
                        if (s.length > 0) {
                            throw new n("Invalid path: " + i, this)
                        } else if (f === "..") {
                            o++
                        } else {
                            this.isScoped = true
                        }
                    } else {
                        s.push(f)
                    }
                }
                this.original = i;
                this.parts = s;
                this.string = s.join(".");
                this.depth = o;
                this.isSimple = e.length === 1 && !this.isScoped && o === 0;
                this.stringModeValue = this.string
            },
            PartialNameNode: function(e, t) {
                r.call(this, t);
                this.type = "PARTIAL_NAME";
                this.name = e.original
            },
            DataNode: function(e, t) {
                r.call(this, t);
                this.type = "DATA";
                this.id = e
            },
            StringNode: function(e, t) {
                r.call(this, t);
                this.type = "STRING";
                this.original = this.string = this.stringModeValue = e
            },
            IntegerNode: function(e, t) {
                r.call(this, t);
                this.type = "INTEGER";
                this.original = this.integer = e;
                this.stringModeValue = Number(e)
            },
            BooleanNode: function(e, t) {
                r.call(this, t);
                this.type = "BOOLEAN";
                this.bool = e;
                this.stringModeValue = e === "true"
            },
            CommentNode: function(e, t) {
                r.call(this, t);
                this.type = "comment";
                this.comment = e
            }
        };
        t = i;
        return t
    }(n);
    var u = function() {
        "use strict";
        var e;
        var t = function() {
            function t(e, t) {
                return {
                    left: e.charAt(2) === "~",
                    right: t.charAt(0) === "~" || t.charAt(1) === "~"
                }
            }

            function r() {
                this.yy = {}
            }
            var e = {
                trace: function() {},
                yy: {},
                symbols_: {
                    error: 2,
                    root: 3,
                    statements: 4,
                    EOF: 5,
                    program: 6,
                    simpleInverse: 7,
                    statement: 8,
                    openInverse: 9,
                    closeBlock: 10,
                    openBlock: 11,
                    mustache: 12,
                    partial: 13,
                    CONTENT: 14,
                    COMMENT: 15,
                    OPEN_BLOCK: 16,
                    sexpr: 17,
                    CLOSE: 18,
                    OPEN_INVERSE: 19,
                    OPEN_ENDBLOCK: 20,
                    path: 21,
                    OPEN: 22,
                    OPEN_UNESCAPED: 23,
                    CLOSE_UNESCAPED: 24,
                    OPEN_PARTIAL: 25,
                    partialName: 26,
                    partial_option0: 27,
                    sexpr_repetition0: 28,
                    sexpr_option0: 29,
                    dataName: 30,
                    param: 31,
                    STRING: 32,
                    INTEGER: 33,
                    BOOLEAN: 34,
                    OPEN_SEXPR: 35,
                    CLOSE_SEXPR: 36,
                    hash: 37,
                    hash_repetition_plus0: 38,
                    hashSegment: 39,
                    ID: 40,
                    EQUALS: 41,
                    DATA: 42,
                    pathSegments: 43,
                    SEP: 44,
                    $accept: 0,
                    $end: 1
                },
                terminals_: {
                    2: "error",
                    5: "EOF",
                    14: "CONTENT",
                    15: "COMMENT",
                    16: "OPEN_BLOCK",
                    18: "CLOSE",
                    19: "OPEN_INVERSE",
                    20: "OPEN_ENDBLOCK",
                    22: "OPEN",
                    23: "OPEN_UNESCAPED",
                    24: "CLOSE_UNESCAPED",
                    25: "OPEN_PARTIAL",
                    32: "STRING",
                    33: "INTEGER",
                    34: "BOOLEAN",
                    35: "OPEN_SEXPR",
                    36: "CLOSE_SEXPR",
                    40: "ID",
                    41: "EQUALS",
                    42: "DATA",
                    44: "SEP"
                },
                productions_: [0, [3, 2],
                    [3, 1],
                    [6, 2],
                    [6, 3],
                    [6, 2],
                    [6, 1],
                    [6, 1],
                    [6, 0],
                    [4, 1],
                    [4, 2],
                    [8, 3],
                    [8, 3],
                    [8, 1],
                    [8, 1],
                    [8, 1],
                    [8, 1],
                    [11, 3],
                    [9, 3],
                    [10, 3],
                    [12, 3],
                    [12, 3],
                    [13, 4],
                    [7, 2],
                    [17, 3],
                    [17, 1],
                    [31, 1],
                    [31, 1],
                    [31, 1],
                    [31, 1],
                    [31, 1],
                    [31, 3],
                    [37, 1],
                    [39, 3],
                    [26, 1],
                    [26, 1],
                    [26, 1],
                    [30, 2],
                    [21, 1],
                    [43, 3],
                    [43, 1],
                    [27, 0],
                    [27, 1],
                    [28, 0],
                    [28, 2],
                    [29, 0],
                    [29, 1],
                    [38, 1],
                    [38, 2]
                ],
                performAction: function(n, r, i, s, o, u, a) {
                    var f = u.length - 1;
                    switch (o) {
                        case 1:
                            return new s.ProgramNode(u[f - 1], this._$);
                            break;
                        case 2:
                            return new s.ProgramNode([], this._$);
                            break;
                        case 3:
                            this.$ = new s.ProgramNode([], u[f - 1], u[f], this._$);
                            break;
                        case 4:
                            this.$ = new s.ProgramNode(u[f - 2], u[f - 1], u[f], this._$);
                            break;
                        case 5:
                            this.$ = new s.ProgramNode(u[f - 1], u[f], [], this._$);
                            break;
                        case 6:
                            this.$ = new s.ProgramNode(u[f], this._$);
                            break;
                        case 7:
                            this.$ = new s.ProgramNode([], this._$);
                            break;
                        case 8:
                            this.$ = new s.ProgramNode([], this._$);
                            break;
                        case 9:
                            this.$ = [u[f]];
                            break;
                        case 10:
                            u[f - 1].push(u[f]);
                            this.$ = u[f - 1];
                            break;
                        case 11:
                            this.$ = new s.BlockNode(u[f - 2], u[f - 1].inverse, u[f - 1], u[f], this._$);
                            break;
                        case 12:
                            this.$ = new s.BlockNode(u[f - 2], u[f - 1], u[f - 1].inverse, u[f], this._$);
                            break;
                        case 13:
                            this.$ = u[f];
                            break;
                        case 14:
                            this.$ = u[f];
                            break;
                        case 15:
                            this.$ = new s.ContentNode(u[f], this._$);
                            break;
                        case 16:
                            this.$ = new s.CommentNode(u[f], this._$);
                            break;
                        case 17:
                            this.$ = new s.MustacheNode(u[f - 1], null, u[f - 2], t(u[f - 2], u[f]), this._$);
                            break;
                        case 18:
                            this.$ = new s.MustacheNode(u[f - 1], null, u[f - 2], t(u[f - 2], u[f]), this._$);
                            break;
                        case 19:
                            this.$ = {
                                path: u[f - 1],
                                strip: t(u[f - 2], u[f])
                            };
                            break;
                        case 20:
                            this.$ = new s.MustacheNode(u[f - 1], null, u[f - 2], t(u[f - 2], u[f]), this._$);
                            break;
                        case 21:
                            this.$ = new s.MustacheNode(u[f - 1], null, u[f - 2], t(u[f - 2], u[f]), this._$);
                            break;
                        case 22:
                            this.$ = new s.PartialNode(u[f - 2], u[f - 1], t(u[f - 3], u[f]), this._$);
                            break;
                        case 23:
                            this.$ = t(u[f - 1], u[f]);
                            break;
                        case 24:
                            this.$ = new s.SexprNode([u[f - 2]].concat(u[f - 1]), u[f], this._$);
                            break;
                        case 25:
                            this.$ = new s.SexprNode([u[f]], null, this._$);
                            break;
                        case 26:
                            this.$ = u[f];
                            break;
                        case 27:
                            this.$ = new s.StringNode(u[f], this._$);
                            break;
                        case 28:
                            this.$ = new s.IntegerNode(u[f], this._$);
                            break;
                        case 29:
                            this.$ = new s.BooleanNode(u[f], this._$);
                            break;
                        case 30:
                            this.$ = u[f];
                            break;
                        case 31:
                            u[f - 1].isHelper = true;
                            this.$ = u[f - 1];
                            break;
                        case 32:
                            this.$ = new s.HashNode(u[f], this._$);
                            break;
                        case 33:
                            this.$ = [u[f - 2], u[f]];
                            break;
                        case 34:
                            this.$ = new s.PartialNameNode(u[f], this._$);
                            break;
                        case 35:
                            this.$ = new s.PartialNameNode(new s.StringNode(u[f], this._$), this._$);
                            break;
                        case 36:
                            this.$ = new s.PartialNameNode(new s.IntegerNode(u[f], this._$));
                            break;
                        case 37:
                            this.$ = new s.DataNode(u[f], this._$);
                            break;
                        case 38:
                            this.$ = new s.IdNode(u[f], this._$);
                            break;
                        case 39:
                            u[f - 2].push({
                                part: u[f],
                                separator: u[f - 1]
                            });
                            this.$ = u[f - 2];
                            break;
                        case 40:
                            this.$ = [{
                                part: u[f]
                            }];
                            break;
                        case 43:
                            this.$ = [];
                            break;
                        case 44:
                            u[f - 1].push(u[f]);
                            break;
                        case 47:
                            this.$ = [u[f]];
                            break;
                        case 48:
                            u[f - 1].push(u[f]);
                            break
                    }
                },
                table: [{
                    3: 1,
                    4: 2,
                    5: [1, 3],
                    8: 4,
                    9: 5,
                    11: 6,
                    12: 7,
                    13: 8,
                    14: [1, 9],
                    15: [1, 10],
                    16: [1, 12],
                    19: [1, 11],
                    22: [1, 13],
                    23: [1, 14],
                    25: [1, 15]
                }, {
                    1: [3]
                }, {
                    5: [1, 16],
                    8: 17,
                    9: 5,
                    11: 6,
                    12: 7,
                    13: 8,
                    14: [1, 9],
                    15: [1, 10],
                    16: [1, 12],
                    19: [1, 11],
                    22: [1, 13],
                    23: [1, 14],
                    25: [1, 15]
                }, {
                    1: [2, 2]
                }, {
                    5: [2, 9],
                    14: [2, 9],
                    15: [2, 9],
                    16: [2, 9],
                    19: [2, 9],
                    20: [2, 9],
                    22: [2, 9],
                    23: [2, 9],
                    25: [2, 9]
                }, {
                    4: 20,
                    6: 18,
                    7: 19,
                    8: 4,
                    9: 5,
                    11: 6,
                    12: 7,
                    13: 8,
                    14: [1, 9],
                    15: [1, 10],
                    16: [1, 12],
                    19: [1, 21],
                    20: [2, 8],
                    22: [1, 13],
                    23: [1, 14],
                    25: [1, 15]
                }, {
                    4: 20,
                    6: 22,
                    7: 19,
                    8: 4,
                    9: 5,
                    11: 6,
                    12: 7,
                    13: 8,
                    14: [1, 9],
                    15: [1, 10],
                    16: [1, 12],
                    19: [1, 21],
                    20: [2, 8],
                    22: [1, 13],
                    23: [1, 14],
                    25: [1, 15]
                }, {
                    5: [2, 13],
                    14: [2, 13],
                    15: [2, 13],
                    16: [2, 13],
                    19: [2, 13],
                    20: [2, 13],
                    22: [2, 13],
                    23: [2, 13],
                    25: [2, 13]
                }, {
                    5: [2, 14],
                    14: [2, 14],
                    15: [2, 14],
                    16: [2, 14],
                    19: [2, 14],
                    20: [2, 14],
                    22: [2, 14],
                    23: [2, 14],
                    25: [2, 14]
                }, {
                    5: [2, 15],
                    14: [2, 15],
                    15: [2, 15],
                    16: [2, 15],
                    19: [2, 15],
                    20: [2, 15],
                    22: [2, 15],
                    23: [2, 15],
                    25: [2, 15]
                }, {
                    5: [2, 16],
                    14: [2, 16],
                    15: [2, 16],
                    16: [2, 16],
                    19: [2, 16],
                    20: [2, 16],
                    22: [2, 16],
                    23: [2, 16],
                    25: [2, 16]
                }, {
                    17: 23,
                    21: 24,
                    30: 25,
                    40: [1, 28],
                    42: [1, 27],
                    43: 26
                }, {
                    17: 29,
                    21: 24,
                    30: 25,
                    40: [1, 28],
                    42: [1, 27],
                    43: 26
                }, {
                    17: 30,
                    21: 24,
                    30: 25,
                    40: [1, 28],
                    42: [1, 27],
                    43: 26
                }, {
                    17: 31,
                    21: 24,
                    30: 25,
                    40: [1, 28],
                    42: [1, 27],
                    43: 26
                }, {
                    21: 33,
                    26: 32,
                    32: [1, 34],
                    33: [1, 35],
                    40: [1, 28],
                    43: 26
                }, {
                    1: [2, 1]
                }, {
                    5: [2, 10],
                    14: [2, 10],
                    15: [2, 10],
                    16: [2, 10],
                    19: [2, 10],
                    20: [2, 10],
                    22: [2, 10],
                    23: [2, 10],
                    25: [2, 10]
                }, {
                    10: 36,
                    20: [1, 37]
                }, {
                    4: 38,
                    8: 4,
                    9: 5,
                    11: 6,
                    12: 7,
                    13: 8,
                    14: [1, 9],
                    15: [1, 10],
                    16: [1, 12],
                    19: [1, 11],
                    20: [2, 7],
                    22: [1, 13],
                    23: [1, 14],
                    25: [1, 15]
                }, {
                    7: 39,
                    8: 17,
                    9: 5,
                    11: 6,
                    12: 7,
                    13: 8,
                    14: [1, 9],
                    15: [1, 10],
                    16: [1, 12],
                    19: [1, 21],
                    20: [2, 6],
                    22: [1, 13],
                    23: [1, 14],
                    25: [1, 15]
                }, {
                    17: 23,
                    18: [1, 40],
                    21: 24,
                    30: 25,
                    40: [1, 28],
                    42: [1, 27],
                    43: 26
                }, {
                    10: 41,
                    20: [1, 37]
                }, {
                    18: [1, 42]
                }, {
                    18: [2, 43],
                    24: [2, 43],
                    28: 43,
                    32: [2, 43],
                    33: [2, 43],
                    34: [2, 43],
                    35: [2, 43],
                    36: [2, 43],
                    40: [2, 43],
                    42: [2, 43]
                }, {
                    18: [2, 25],
                    24: [2, 25],
                    36: [2, 25]
                }, {
                    18: [2, 38],
                    24: [2, 38],
                    32: [2, 38],
                    33: [2, 38],
                    34: [2, 38],
                    35: [2, 38],
                    36: [2, 38],
                    40: [2, 38],
                    42: [2, 38],
                    44: [1, 44]
                }, {
                    21: 45,
                    40: [1, 28],
                    43: 26
                }, {
                    18: [2, 40],
                    24: [2, 40],
                    32: [2, 40],
                    33: [2, 40],
                    34: [2, 40],
                    35: [2, 40],
                    36: [2, 40],
                    40: [2, 40],
                    42: [2, 40],
                    44: [2, 40]
                }, {
                    18: [1, 46]
                }, {
                    18: [1, 47]
                }, {
                    24: [1, 48]
                }, {
                    18: [2, 41],
                    21: 50,
                    27: 49,
                    40: [1, 28],
                    43: 26
                }, {
                    18: [2, 34],
                    40: [2, 34]
                }, {
                    18: [2, 35],
                    40: [2, 35]
                }, {
                    18: [2, 36],
                    40: [2, 36]
                }, {
                    5: [2, 11],
                    14: [2, 11],
                    15: [2, 11],
                    16: [2, 11],
                    19: [2, 11],
                    20: [2, 11],
                    22: [2, 11],
                    23: [2, 11],
                    25: [2, 11]
                }, {
                    21: 51,
                    40: [1, 28],
                    43: 26
                }, {
                    8: 17,
                    9: 5,
                    11: 6,
                    12: 7,
                    13: 8,
                    14: [1, 9],
                    15: [1, 10],
                    16: [1, 12],
                    19: [1, 11],
                    20: [2, 3],
                    22: [1, 13],
                    23: [1, 14],
                    25: [1, 15]
                }, {
                    4: 52,
                    8: 4,
                    9: 5,
                    11: 6,
                    12: 7,
                    13: 8,
                    14: [1, 9],
                    15: [1, 10],
                    16: [1, 12],
                    19: [1, 11],
                    20: [2, 5],
                    22: [1, 13],
                    23: [1, 14],
                    25: [1, 15]
                }, {
                    14: [2, 23],
                    15: [2, 23],
                    16: [2, 23],
                    19: [2, 23],
                    20: [2, 23],
                    22: [2, 23],
                    23: [2, 23],
                    25: [2, 23]
                }, {
                    5: [2, 12],
                    14: [2, 12],
                    15: [2, 12],
                    16: [2, 12],
                    19: [2, 12],
                    20: [2, 12],
                    22: [2, 12],
                    23: [2, 12],
                    25: [2, 12]
                }, {
                    14: [2, 18],
                    15: [2, 18],
                    16: [2, 18],
                    19: [2, 18],
                    20: [2, 18],
                    22: [2, 18],
                    23: [2, 18],
                    25: [2, 18]
                }, {
                    18: [2, 45],
                    21: 56,
                    24: [2, 45],
                    29: 53,
                    30: 60,
                    31: 54,
                    32: [1, 57],
                    33: [1, 58],
                    34: [1, 59],
                    35: [1, 61],
                    36: [2, 45],
                    37: 55,
                    38: 62,
                    39: 63,
                    40: [1, 64],
                    42: [1, 27],
                    43: 26
                }, {
                    40: [1, 65]
                }, {
                    18: [2, 37],
                    24: [2, 37],
                    32: [2, 37],
                    33: [2, 37],
                    34: [2, 37],
                    35: [2, 37],
                    36: [2, 37],
                    40: [2, 37],
                    42: [2, 37]
                }, {
                    14: [2, 17],
                    15: [2, 17],
                    16: [2, 17],
                    19: [2, 17],
                    20: [2, 17],
                    22: [2, 17],
                    23: [2, 17],
                    25: [2, 17]
                }, {
                    5: [2, 20],
                    14: [2, 20],
                    15: [2, 20],
                    16: [2, 20],
                    19: [2, 20],
                    20: [2, 20],
                    22: [2, 20],
                    23: [2, 20],
                    25: [2, 20]
                }, {
                    5: [2, 21],
                    14: [2, 21],
                    15: [2, 21],
                    16: [2, 21],
                    19: [2, 21],
                    20: [2, 21],
                    22: [2, 21],
                    23: [2, 21],
                    25: [2, 21]
                }, {
                    18: [1, 66]
                }, {
                    18: [2, 42]
                }, {
                    18: [1, 67]
                }, {
                    8: 17,
                    9: 5,
                    11: 6,
                    12: 7,
                    13: 8,
                    14: [1, 9],
                    15: [1, 10],
                    16: [1, 12],
                    19: [1, 11],
                    20: [2, 4],
                    22: [1, 13],
                    23: [1, 14],
                    25: [1, 15]
                }, {
                    18: [2, 24],
                    24: [2, 24],
                    36: [2, 24]
                }, {
                    18: [2, 44],
                    24: [2, 44],
                    32: [2, 44],
                    33: [2, 44],
                    34: [2, 44],
                    35: [2, 44],
                    36: [2, 44],
                    40: [2, 44],
                    42: [2, 44]
                }, {
                    18: [2, 46],
                    24: [2, 46],
                    36: [2, 46]
                }, {
                    18: [2, 26],
                    24: [2, 26],
                    32: [2, 26],
                    33: [2, 26],
                    34: [2, 26],
                    35: [2, 26],
                    36: [2, 26],
                    40: [2, 26],
                    42: [2, 26]
                }, {
                    18: [2, 27],
                    24: [2, 27],
                    32: [2, 27],
                    33: [2, 27],
                    34: [2, 27],
                    35: [2, 27],
                    36: [2, 27],
                    40: [2, 27],
                    42: [2, 27]
                }, {
                    18: [2, 28],
                    24: [2, 28],
                    32: [2, 28],
                    33: [2, 28],
                    34: [2, 28],
                    35: [2, 28],
                    36: [2, 28],
                    40: [2, 28],
                    42: [2, 28]
                }, {
                    18: [2, 29],
                    24: [2, 29],
                    32: [2, 29],
                    33: [2, 29],
                    34: [2, 29],
                    35: [2, 29],
                    36: [2, 29],
                    40: [2, 29],
                    42: [2, 29]
                }, {
                    18: [2, 30],
                    24: [2, 30],
                    32: [2, 30],
                    33: [2, 30],
                    34: [2, 30],
                    35: [2, 30],
                    36: [2, 30],
                    40: [2, 30],
                    42: [2, 30]
                }, {
                    17: 68,
                    21: 24,
                    30: 25,
                    40: [1, 28],
                    42: [1, 27],
                    43: 26
                }, {
                    18: [2, 32],
                    24: [2, 32],
                    36: [2, 32],
                    39: 69,
                    40: [1, 70]
                }, {
                    18: [2, 47],
                    24: [2, 47],
                    36: [2, 47],
                    40: [2, 47]
                }, {
                    18: [2, 40],
                    24: [2, 40],
                    32: [2, 40],
                    33: [2, 40],
                    34: [2, 40],
                    35: [2, 40],
                    36: [2, 40],
                    40: [2, 40],
                    41: [1, 71],
                    42: [2, 40],
                    44: [2, 40]
                }, {
                    18: [2, 39],
                    24: [2, 39],
                    32: [2, 39],
                    33: [2, 39],
                    34: [2, 39],
                    35: [2, 39],
                    36: [2, 39],
                    40: [2, 39],
                    42: [2, 39],
                    44: [2, 39]
                }, {
                    5: [2, 22],
                    14: [2, 22],
                    15: [2, 22],
                    16: [2, 22],
                    19: [2, 22],
                    20: [2, 22],
                    22: [2, 22],
                    23: [2, 22],
                    25: [2, 22]
                }, {
                    5: [2, 19],
                    14: [2, 19],
                    15: [2, 19],
                    16: [2, 19],
                    19: [2, 19],
                    20: [2, 19],
                    22: [2, 19],
                    23: [2, 19],
                    25: [2, 19]
                }, {
                    36: [1, 72]
                }, {
                    18: [2, 48],
                    24: [2, 48],
                    36: [2, 48],
                    40: [2, 48]
                }, {
                    41: [1, 71]
                }, {
                    21: 56,
                    30: 60,
                    31: 73,
                    32: [1, 57],
                    33: [1, 58],
                    34: [1, 59],
                    35: [1, 61],
                    40: [1, 28],
                    42: [1, 27],
                    43: 26
                }, {
                    18: [2, 31],
                    24: [2, 31],
                    32: [2, 31],
                    33: [2, 31],
                    34: [2, 31],
                    35: [2, 31],
                    36: [2, 31],
                    40: [2, 31],
                    42: [2, 31]
                }, {
                    18: [2, 33],
                    24: [2, 33],
                    36: [2, 33],
                    40: [2, 33]
                }],
                defaultActions: {
                    3: [2, 2],
                    16: [2, 1],
                    50: [2, 42]
                },
                parseError: function(t, n) {
                    throw new Error(t)
                },
                parse: function(t) {
                    function v(e) {
                        r.length = r.length - 2 * e;
                        i.length = i.length - e;
                        s.length = s.length - e
                    }

                    function m() {
                        var e;
                        e = n.lexer.lex() || 1;
                        if (typeof e !== "number") {
                            e = n.symbols_[e] || e
                        }
                        return e
                    }
                    var n = this,
                        r = [0],
                        i = [null],
                        s = [],
                        o = this.table,
                        u = "",
                        a = 0,
                        f = 0,
                        l = 0,
                        c = 2,
                        h = 1;
                    this.lexer.setInput(t);
                    this.lexer.yy = this.yy;
                    this.yy.lexer = this.lexer;
                    this.yy.parser = this;
                    if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
                    var p = this.lexer.yylloc;
                    s.push(p);
                    var d = this.lexer.options && this.lexer.options.ranges;
                    if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
                    var g, y, b, w, E, S, x = {},
                        T, N, C, k;
                    while (true) {
                        b = r[r.length - 1];
                        if (this.defaultActions[b]) {
                            w = this.defaultActions[b]
                        } else {
                            if (g === null || typeof g == "undefined") {
                                g = m()
                            }
                            w = o[b] && o[b][g]
                        }
                        if (typeof w === "undefined" || !w.length || !w[0]) {
                            var L = "";
                            if (!l) {
                                k = [];
                                for (T in o[b])
                                    if (this.terminals_[T] && T > 2) {
                                        k.push("'" + this.terminals_[T] + "'")
                                    } if (this.lexer.showPosition) {
                                    L = "Parse error on line " + (a + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + k.join(", ") + ", got '" + (this.terminals_[g] || g) + "'"
                                } else {
                                    L = "Parse error on line " + (a + 1) + ": Unexpected " + (g == 1 ? "end of input" : "'" + (this.terminals_[g] || g) + "'")
                                }
                                this.parseError(L, {
                                    text: this.lexer.match,
                                    token: this.terminals_[g] || g,
                                    line: this.lexer.yylineno,
                                    loc: p,
                                    expected: k
                                })
                            }
                        }
                        if (w[0] instanceof Array && w.length > 1) {
                            throw new Error("Parse Error: multiple actions possible at state: " + b + ", token: " + g)
                        }
                        switch (w[0]) {
                            case 1:
                                r.push(g);
                                i.push(this.lexer.yytext);
                                s.push(this.lexer.yylloc);
                                r.push(w[1]);
                                g = null;
                                if (!y) {
                                    f = this.lexer.yyleng;
                                    u = this.lexer.yytext;
                                    a = this.lexer.yylineno;
                                    p = this.lexer.yylloc;
                                    if (l > 0) l--
                                } else {
                                    g = y;
                                    y = null
                                }
                                break;
                            case 2:
                                N = this.productions_[w[1]][1];
                                x.$ = i[i.length - N];
                                x._$ = {
                                    first_line: s[s.length - (N || 1)].first_line,
                                    last_line: s[s.length - 1].last_line,
                                    first_column: s[s.length - (N || 1)].first_column,
                                    last_column: s[s.length - 1].last_column
                                };
                                if (d) {
                                    x._$.range = [s[s.length - (N || 1)].range[0], s[s.length - 1].range[1]]
                                }
                                S = this.performAction.call(x, u, f, a, this.yy, w[1], i, s);
                                if (typeof S !== "undefined") {
                                    return S
                                }
                                if (N) {
                                    r = r.slice(0, -1 * N * 2);
                                    i = i.slice(0, -1 * N);
                                    s = s.slice(0, -1 * N)
                                }
                                r.push(this.productions_[w[1]][0]);
                                i.push(x.$);
                                s.push(x._$);
                                C = o[r[r.length - 2]][r[r.length - 1]];
                                r.push(C);
                                break;
                            case 3:
                                return true
                        }
                    }
                    return true
                }
            };
            var n = function() {
                var e = {
                    EOF: 1,
                    parseError: function(t, n) {
                        if (this.yy.parser) {
                            this.yy.parser.parseError(t, n)
                        } else {
                            throw new Error(t)
                        }
                    },
                    setInput: function(e) {
                        this._input = e;
                        this._more = this._less = this.done = false;
                        this.yylineno = this.yyleng = 0;
                        this.yytext = this.matched = this.match = "";
                        this.conditionStack = ["INITIAL"];
                        this.yylloc = {
                            first_line: 1,
                            first_column: 0,
                            last_line: 1,
                            last_column: 0
                        };
                        if (this.options.ranges) this.yylloc.range = [0, 0];
                        this.offset = 0;
                        return this
                    },
                    input: function() {
                        var e = this._input[0];
                        this.yytext += e;
                        this.yyleng++;
                        this.offset++;
                        this.match += e;
                        this.matched += e;
                        var t = e.match(/(?:\r\n?|\n).*/g);
                        if (t) {
                            this.yylineno++;
                            this.yylloc.last_line++
                        } else {
                            this.yylloc.last_column++
                        }
                        if (this.options.ranges) this.yylloc.range[1]++;
                        this._input = this._input.slice(1);
                        return e
                    },
                    unput: function(e) {
                        var t = e.length;
                        var n = e.split(/(?:\r\n?|\n)/g);
                        this._input = e + this._input;
                        this.yytext = this.yytext.substr(0, this.yytext.length - t - 1);
                        this.offset -= t;
                        var r = this.match.split(/(?:\r\n?|\n)/g);
                        this.match = this.match.substr(0, this.match.length - 1);
                        this.matched = this.matched.substr(0, this.matched.length - 1);
                        if (n.length - 1) this.yylineno -= n.length - 1;
                        var i = this.yylloc.range;
                        this.yylloc = {
                            first_line: this.yylloc.first_line,
                            last_line: this.yylineno + 1,
                            first_column: this.yylloc.first_column,
                            last_column: n ? (n.length === r.length ? this.yylloc.first_column : 0) + r[r.length - n.length].length - n[0].length : this.yylloc.first_column - t
                        };
                        if (this.options.ranges) {
                            this.yylloc.range = [i[0], i[0] + this.yyleng - t]
                        }
                        return this
                    },
                    more: function() {
                        this._more = true;
                        return this
                    },
                    less: function(e) {
                        this.unput(this.match.slice(e))
                    },
                    pastInput: function() {
                        var e = this.matched.substr(0, this.matched.length - this.match.length);
                        return (e.length > 20 ? "..." : "") + e.substr(-20).replace(/\n/g, "")
                    },
                    upcomingInput: function() {
                        var e = this.match;
                        if (e.length < 20) {
                            e += this._input.substr(0, 20 - e.length)
                        }
                        return (e.substr(0, 20) + (e.length > 20 ? "..." : "")).replace(/\n/g, "")
                    },
                    showPosition: function() {
                        var e = this.pastInput();
                        var t = (new Array(e.length + 1)).join("-");
                        return e + this.upcomingInput() + "\n" + t + "^"
                    },
                    next: function() {
                        if (this.done) {
                            return this.EOF
                        }
                        if (!this._input) this.done = true;
                        var e, t, n, r, i, s;
                        if (!this._more) {
                            this.yytext = "";
                            this.match = ""
                        }
                        var o = this._currentRules();
                        for (var u = 0; u < o.length; u++) {
                            n = this._input.match(this.rules[o[u]]);
                            if (n && (!t || n[0].length > t[0].length)) {
                                t = n;
                                r = u;
                                if (!this.options.flex) break
                            }
                        }
                        if (t) {
                            s = t[0].match(/(?:\r\n?|\n).*/g);
                            if (s) this.yylineno += s.length;
                            this.yylloc = {
                                first_line: this.yylloc.last_line,
                                last_line: this.yylineno + 1,
                                first_column: this.yylloc.last_column,
                                last_column: s ? s[s.length - 1].length - s[s.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + t[0].length
                            };
                            this.yytext += t[0];
                            this.match += t[0];
                            this.matches = t;
                            this.yyleng = this.yytext.length;
                            if (this.options.ranges) {
                                this.yylloc.range = [this.offset, this.offset += this.yyleng]
                            }
                            this._more = false;
                            this._input = this._input.slice(t[0].length);
                            this.matched += t[0];
                            e = this.performAction.call(this, this.yy, this, o[r], this.conditionStack[this.conditionStack.length - 1]);
                            if (this.done && this._input) this.done = false;
                            if (e) return e;
                            else return
                        }
                        if (this._input === "") {
                            return this.EOF
                        } else {
                            return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                                text: "",
                                token: null,
                                line: this.yylineno
                            })
                        }
                    },
                    lex: function() {
                        var t = this.next();
                        if (typeof t !== "undefined") {
                            return t
                        } else {
                            return this.lex()
                        }
                    },
                    begin: function(t) {
                        this.conditionStack.push(t)
                    },
                    popState: function() {
                        return this.conditionStack.pop()
                    },
                    _currentRules: function() {
                        return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
                    },
                    topState: function() {
                        return this.conditionStack[this.conditionStack.length - 2]
                    },
                    pushState: function(t) {
                        this.begin(t)
                    }
                };
                e.options = {};
                e.performAction = function(t, n, r, i) {
                    function s(e, t) {
                        return n.yytext = n.yytext.substr(e, n.yyleng - t)
                    }
                    var o = i;
                    switch (r) {
                        case 0:
                            if (n.yytext.slice(-2) === "\\\\") {
                                s(0, 1);
                                this.begin("mu")
                            } else if (n.yytext.slice(-1) === "\\") {
                                s(0, 1);
                                this.begin("emu")
                            } else {
                                this.begin("mu")
                            }
                            if (n.yytext) return 14;
                            break;
                        case 1:
                            return 14;
                            break;
                        case 2:
                            this.popState();
                            return 14;
                            break;
                        case 3:
                            s(0, 4);
                            this.popState();
                            return 15;
                            break;
                        case 4:
                            return 35;
                            break;
                        case 5:
                            return 36;
                            break;
                        case 6:
                            return 25;
                            break;
                        case 7:
                            return 16;
                            break;
                        case 8:
                            return 20;
                            break;
                        case 9:
                            return 19;
                            break;
                        case 10:
                            return 19;
                            break;
                        case 11:
                            return 23;
                            break;
                        case 12:
                            return 22;
                            break;
                        case 13:
                            this.popState();
                            this.begin("com");
                            break;
                        case 14:
                            s(3, 5);
                            this.popState();
                            return 15;
                            break;
                        case 15:
                            return 22;
                            break;
                        case 16:
                            return 41;
                            break;
                        case 17:
                            return 40;
                            break;
                        case 18:
                            return 40;
                            break;
                        case 19:
                            return 44;
                            break;
                        case 20:
                            break;
                        case 21:
                            this.popState();
                            return 24;
                            break;
                        case 22:
                            this.popState();
                            return 18;
                            break;
                        case 23:
                            n.yytext = s(1, 2).replace(/\\"/g, '"');
                            return 32;
                            break;
                        case 24:
                            n.yytext = s(1, 2).replace(/\\'/g, "'");
                            return 32;
                            break;
                        case 25:
                            return 42;
                            break;
                        case 26:
                            return 34;
                            break;
                        case 27:
                            return 34;
                            break;
                        case 28:
                            return 33;
                            break;
                        case 29:
                            return 40;
                            break;
                        case 30:
                            n.yytext = s(1, 2);
                            return 40;
                            break;
                        case 31:
                            return "INVALID";
                            break;
                        case 32:
                            return 5;
                            break
                    }
                };
                e.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:[\s\S]*?--\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{!--)/, /^(?:\{\{![\s\S]*?\}\})/, /^(?:\{\{(~)?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:-?[0-9]+(?=([~}\s)])))/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)]))))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:$)/];
                e.conditions = {
                    mu: {
                        rules: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
                        inclusive: false
                    },
                    emu: {
                        rules: [2],
                        inclusive: false
                    },
                    com: {
                        rules: [3],
                        inclusive: false
                    },
                    INITIAL: {
                        rules: [0, 1, 32],
                        inclusive: true
                    }
                };
                return e
            }();
            e.lexer = n;
            r.prototype = e;
            e.Parser = r;
            return new r
        }();
        e = t;
        return e
    }();
    var a = function(e, t) {
        "use strict";

        function s(e) {
            if (e.constructor === i.ProgramNode) {
                return e
            }
            r.yy = i;
            return r.parse(e)
        }
        var n = {};
        var r = e;
        var i = t;
        n.parser = r;
        n.parse = s;
        return n
    }(u, o);
    var f = function(e) {
        "use strict";

        function r() {}

        function i(e, t, r) {
            if (e == null || typeof e !== "string" && e.constructor !== r.AST.ProgramNode) {
                throw new n("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + e)
            }
            t = t || {};
            if (!("data" in t)) {
                t.data = true
            }
            var i = r.parse(e);
            var s = (new r.Compiler).compile(i, t);
            return (new r.JavaScriptCompiler).compile(s, t)
        }

        function s(e, t, r) {
            function s() {
                var n = r.parse(e);
                var i = (new r.Compiler).compile(n, t);
                var s = (new r.JavaScriptCompiler).compile(i, t, undefined, true);
                return r.template(s)
            }
            if (e == null || typeof e !== "string" && e.constructor !== r.AST.ProgramNode) {
                throw new n("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + e)
            }
            t = t || {};
            if (!("data" in t)) {
                t.data = true
            }
            var i;
            return function(e, t) {
                if (!i) {
                    i = s()
                }
                return i.call(this, e, t)
            }
        }
        var t = {};
        var n = e;
        t.Compiler = r;
        r.prototype = {
            compiler: r,
            disassemble: function() {
                var e = this.opcodes,
                    t, n = [],
                    r, i;
                for (var s = 0, o = e.length; s < o; s++) {
                    t = e[s];
                    if (t.opcode === "DECLARE") {
                        n.push("DECLARE " + t.name + "=" + t.value)
                    } else {
                        r = [];
                        for (var u = 0; u < t.args.length; u++) {
                            i = t.args[u];
                            if (typeof i === "string") {
                                i = '"' + i.replace("\n", "\\n") + '"'
                            }
                            r.push(i)
                        }
                        n.push(t.opcode + " " + r.join(" "))
                    }
                }
                return n.join("\n")
            },
            equals: function(e) {
                var t = this.opcodes.length;
                if (e.opcodes.length !== t) {
                    return false
                }
                for (var n = 0; n < t; n++) {
                    var r = this.opcodes[n],
                        i = e.opcodes[n];
                    if (r.opcode !== i.opcode || r.args.length !== i.args.length) {
                        return false
                    }
                    for (var s = 0; s < r.args.length; s++) {
                        if (r.args[s] !== i.args[s]) {
                            return false
                        }
                    }
                }
                t = this.children.length;
                if (e.children.length !== t) {
                    return false
                }
                for (n = 0; n < t; n++) {
                    if (!this.children[n].equals(e.children[n])) {
                        return false
                    }
                }
                return true
            },
            guid: 0,
            compile: function(e, t) {
                this.opcodes = [];
                this.children = [];
                this.depths = {
                    list: []
                };
                this.options = t;
                var n = this.options.knownHelpers;
                this.options.knownHelpers = {
                    helperMissing: true,
                    blockHelperMissing: true,
                    each: true,
                    "if": true,
                    unless: true,
                    "with": true,
                    log: true
                };
                if (n) {
                    for (var r in n) {
                        this.options.knownHelpers[r] = n[r]
                    }
                }
                return this.accept(e)
            },
            accept: function(e) {
                var t = e.strip || {},
                    n;
                if (t.left) {
                    this.opcode("strip")
                }
                n = this[e.type](e);
                if (t.right) {
                    this.opcode("strip")
                }
                return n
            },
            program: function(e) {
                var t = e.statements;
                for (var n = 0, r = t.length; n < r; n++) {
                    this.accept(t[n])
                }
                this.isSimple = r === 1;
                this.depths.list = this.depths.list.sort(function(e, t) {
                    return e - t
                });
                return this
            },
            compileProgram: function(e) {
                var t = (new this.compiler).compile(e, this.options);
                var n = this.guid++,
                    r;
                this.usePartial = this.usePartial || t.usePartial;
                this.children[n] = t;
                for (var i = 0, s = t.depths.list.length; i < s; i++) {
                    r = t.depths.list[i];
                    if (r < 2) {
                        continue
                    } else {
                        this.addDepth(r - 1)
                    }
                }
                return n
            },
            block: function(e) {
                var t = e.mustache,
                    n = e.program,
                    r = e.inverse;
                if (n) {
                    n = this.compileProgram(n)
                }
                if (r) {
                    r = this.compileProgram(r)
                }
                var i = t.sexpr;
                var s = this.classifySexpr(i);
                if (s === "helper") {
                    this.helperSexpr(i, n, r)
                } else if (s === "simple") {
                    this.simpleSexpr(i);
                    this.opcode("pushProgram", n);
                    this.opcode("pushProgram", r);
                    this.opcode("emptyHash");
                    this.opcode("blockValue")
                } else {
                    this.ambiguousSexpr(i, n, r);
                    this.opcode("pushProgram", n);
                    this.opcode("pushProgram", r);
                    this.opcode("emptyHash");
                    this.opcode("ambiguousBlockValue")
                }
                this.opcode("append")
            },
            hash: function(e) {
                var t = e.pairs,
                    n, r;
                this.opcode("pushHash");
                for (var i = 0, s = t.length; i < s; i++) {
                    n = t[i];
                    r = n[1];
                    if (this.options.stringParams) {
                        if (r.depth) {
                            this.addDepth(r.depth)
                        }
                        this.opcode("getContext", r.depth || 0);
                        this.opcode("pushStringParam", r.stringModeValue, r.type);
                        if (r.type === "sexpr") {
                            this.sexpr(r)
                        }
                    } else {
                        this.accept(r)
                    }
                    this.opcode("assignToHash", n[0])
                }
                this.opcode("popHash")
            },
            partial: function(e) {
                var t = e.partialName;
                this.usePartial = true;
                if (e.context) {
                    this.ID(e.context)
                } else {
                    this.opcode("push", "depth0")
                }
                this.opcode("invokePartial", t.name);
                this.opcode("append")
            },
            content: function(e) {
                this.opcode("appendContent", e.string)
            },
            mustache: function(e) {
                this.sexpr(e.sexpr);
                if (e.escaped && !this.options.noEscape) {
                    this.opcode("appendEscaped")
                } else {
                    this.opcode("append")
                }
            },
            ambiguousSexpr: function(e, t, n) {
                var r = e.id,
                    i = r.parts[0],
                    s = t != null || n != null;
                this.opcode("getContext", r.depth);
                this.opcode("pushProgram", t);
                this.opcode("pushProgram", n);
                this.opcode("invokeAmbiguous", i, s)
            },
            simpleSexpr: function(e) {
                var t = e.id;
                if (t.type === "DATA") {
                    this.DATA(t)
                } else if (t.parts.length) {
                    this.ID(t)
                } else {
                    this.addDepth(t.depth);
                    this.opcode("getContext", t.depth);
                    this.opcode("pushContext")
                }
                this.opcode("resolvePossibleLambda")
            },
            helperSexpr: function(e, t, r) {
                var i = this.setupFullMustacheParams(e, t, r),
                    s = e.id.parts[0];
                if (this.options.knownHelpers[s]) {
                    this.opcode("invokeKnownHelper", i.length, s)
                } else if (this.options.knownHelpersOnly) {
                    throw new n("You specified knownHelpersOnly, but used the unknown helper " + s, e)
                } else {
                    this.opcode("invokeHelper", i.length, s, e.isRoot)
                }
            },
            sexpr: function(e) {
                var t = this.classifySexpr(e);
                if (t === "simple") {
                    this.simpleSexpr(e)
                } else if (t === "helper") {
                    this.helperSexpr(e)
                } else {
                    this.ambiguousSexpr(e)
                }
            },
            ID: function(e) {
                this.addDepth(e.depth);
                this.opcode("getContext", e.depth);
                var t = e.parts[0];
                if (!t) {
                    this.opcode("pushContext")
                } else {
                    this.opcode("lookupOnContext", e.parts[0])
                }
                for (var n = 1, r = e.parts.length; n < r; n++) {
                    this.opcode("lookup", e.parts[n])
                }
            },
            DATA: function(e) {
                this.options.data = true;
                if (e.id.isScoped || e.id.depth) {
                    throw new n("Scoped data references are not supported: " + e.original, e)
                }
                this.opcode("lookupData");
                var t = e.id.parts;
                for (var r = 0, i = t.length; r < i; r++) {
                    this.opcode("lookup", t[r])
                }
            },
            STRING: function(e) {
                this.opcode("pushString", e.string)
            },
            INTEGER: function(e) {
                this.opcode("pushLiteral", e.integer)
            },
            BOOLEAN: function(e) {
                this.opcode("pushLiteral", e.bool)
            },
            comment: function() {},
            opcode: function(e) {
                this.opcodes.push({
                    opcode: e,
                    args: [].slice.call(arguments, 1)
                })
            },
            declare: function(e, t) {
                this.opcodes.push({
                    opcode: "DECLARE",
                    name: e,
                    value: t
                })
            },
            addDepth: function(e) {
                if (e === 0) {
                    return
                }
                if (!this.depths[e]) {
                    this.depths[e] = true;
                    this.depths.list.push(e)
                }
            },
            classifySexpr: function(e) {
                var t = e.isHelper;
                var n = e.eligibleHelper;
                var r = this.options;
                if (n && !t) {
                    var i = e.id.parts[0];
                    if (r.knownHelpers[i]) {
                        t = true
                    } else if (r.knownHelpersOnly) {
                        n = false
                    }
                }
                if (t) {
                    return "helper"
                } else if (n) {
                    return "ambiguous"
                } else {
                    return "simple"
                }
            },
            pushParams: function(e) {
                var t = e.length,
                    n;
                while (t--) {
                    n = e[t];
                    if (this.options.stringParams) {
                        if (n.depth) {
                            this.addDepth(n.depth)
                        }
                        this.opcode("getContext", n.depth || 0);
                        this.opcode("pushStringParam", n.stringModeValue, n.type);
                        if (n.type === "sexpr") {
                            this.sexpr(n)
                        }
                    } else {
                        this[n.type](n)
                    }
                }
            },
            setupFullMustacheParams: function(e, t, n) {
                var r = e.params;
                this.pushParams(r);
                this.opcode("pushProgram", t);
                this.opcode("pushProgram", n);
                if (e.hash) {
                    this.hash(e.hash)
                } else {
                    this.opcode("emptyHash")
                }
                return r
            }
        };
        t.precompile = i;
        t.compile = s;
        return t
    }(n);
    var l = function(e, t) {
        "use strict";

        function u(e) {
            this.value = e
        }

        function a() {}
        var n;
        var r = e.COMPILER_REVISION;
        var i = e.REVISION_CHANGES;
        var s = e.log;
        var o = t;
        a.prototype = {
            nameLookup: function(e, t) {
                var n, r;
                if (e.indexOf("depth") === 0) {
                    n = true
                }
                if (/^[0-9]+$/.test(t)) {
                    r = e + "[" + t + "]"
                } else if (a.isValidJavaScriptVariableName(t)) {
                    r = e + "." + t
                } else {
                    r = e + "['" + t + "']"
                }
                if (n) {
                    return "(" + e + " && " + r + ")"
                } else {
                    return r
                }
            },
            compilerInfo: function() {
                var e = r,
                    t = i[e];
                return "this.compilerInfo = [" + e + ",'" + t + "'];\n"
            },
            appendToBuffer: function(e) {
                if (this.environment.isSimple) {
                    return "return " + e + ";"
                } else {
                    return {
                        appendToBuffer: true,
                        content: e,
                        toString: function() {
                            return "buffer += " + e + ";"
                        }
                    }
                }
            },
            initializeBuffer: function() {
                return this.quotedString("")
            },
            namespace: "Handlebars",
            compile: function(e, t, n, r) {
                this.environment = e;
                this.options = t || {};
                s("debug", this.environment.disassemble() + "\n\n");
                this.name = this.environment.name;
                this.isChild = !!n;
                this.context = n || {
                    programs: [],
                    environments: [],
                    aliases: {}
                };
                this.preamble();
                this.stackSlot = 0;
                this.stackVars = [];
                this.registers = {
                    list: []
                };
                this.hashes = [];
                this.compileStack = [];
                this.inlineStack = [];
                this.compileChildren(e, t);
                var i = e.opcodes,
                    u;
                this.i = 0;
                for (var a = i.length; this.i < a; this.i++) {
                    u = i[this.i];
                    if (u.opcode === "DECLARE") {
                        this[u.name] = u.value
                    } else {
                        this[u.opcode].apply(this, u.args)
                    }
                    if (u.opcode !== this.stripNext) {
                        this.stripNext = false
                    }
                }
                this.pushSource("");
                if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
                    throw new o("Compile completed with content left on stack")
                }
                return this.createFunctionContext(r)
            },
            preamble: function() {
                var e = [];
                if (!this.isChild) {
                    var t = this.namespace;
                    var n = "helpers = this.merge(helpers, " + t + ".helpers);";
                    if (this.environment.usePartial) {
                        n = n + " partials = this.merge(partials, " + t + ".partials);"
                    }
                    if (this.options.data) {
                        n = n + " data = data || {};"
                    }
                    e.push(n)
                } else {
                    e.push("")
                }
                if (!this.environment.isSimple) {
                    e.push(", buffer = " + this.initializeBuffer())
                } else {
                    e.push("")
                }
                this.lastContext = 0;
                this.source = e
            },
            createFunctionContext: function(e) {
                var t = this.stackVars.concat(this.registers.list);
                if (t.length > 0) {
                    this.source[1] = this.source[1] + ", " + t.join(", ")
                }
                if (!this.isChild) {
                    for (var n in this.context.aliases) {
                        if (this.context.aliases.hasOwnProperty(n)) {
                            this.source[1] = this.source[1] + ", " + n + "=" + this.context.aliases[n]
                        }
                    }
                }
                if (this.source[1]) {
                    this.source[1] = "var " + this.source[1].substring(2) + ";"
                }
                if (!this.isChild) {
                    this.source[1] += "\n" + this.context.programs.join("\n") + "\n"
                }
                if (!this.environment.isSimple) {
                    this.pushSource("return buffer;")
                }
                var r = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];
                for (var i = 0, o = this.environment.depths.list.length; i < o; i++) {
                    r.push("depth" + this.environment.depths.list[i])
                }
                var u = this.mergeSource();
                if (!this.isChild) {
                    u = this.compilerInfo() + u
                }
                if (e) {
                    r.push(u);
                    return Function.apply(this, r)
                } else {
                    var a = "function " + (this.name || "") + "(" + r.join(",") + ") {\n  " + u + "}";
                    s("debug", a + "\n\n");
                    return a
                }
            },
            mergeSource: function() {
                var e = "",
                    t;
                for (var n = 0, r = this.source.length; n < r; n++) {
                    var i = this.source[n];
                    if (i.appendToBuffer) {
                        if (t) {
                            t = t + "\n    + " + i.content
                        } else {
                            t = i.content
                        }
                    } else {
                        if (t) {
                            e += "buffer += " + t + ";\n  ";
                            t = undefined
                        }
                        e += i + "\n  "
                    }
                }
                return e
            },
            blockValue: function() {
                this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
                var e = ["depth0"];
                this.setupParams(0, e);
                this.replaceStack(function(t) {
                    e.splice(1, 0, t);
                    return "blockHelperMissing.call(" + e.join(", ") + ")"
                })
            },
            ambiguousBlockValue: function() {
                this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
                var e = ["depth0"];
                this.setupParams(0, e);
                var t = this.topStack();
                e.splice(1, 0, t);
                this.pushSource("if (!" + this.lastHelper + ") { " + t + " = blockHelperMissing.call(" + e.join(", ") + "); }")
            },
            appendContent: function(e) {
                if (this.pendingContent) {
                    e = this.pendingContent + e
                }
                if (this.stripNext) {
                    e = e.replace(/^\s+/, "")
                }
                this.pendingContent = e
            },
            strip: function() {
                if (this.pendingContent) {
                    this.pendingContent = this.pendingContent.replace(/\s+$/, "")
                }
                this.stripNext = "strip"
            },
            append: function() {
                this.flushInline();
                var e = this.popStack();
                this.pushSource("if(" + e + " || " + e + " === 0) { " + this.appendToBuffer(e) + " }");
                if (this.environment.isSimple) {
                    this.pushSource("else { " + this.appendToBuffer("''") + " }")
                }
            },
            appendEscaped: function() {
                this.context.aliases.escapeExpression = "this.escapeExpression";
                this.pushSource(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"))
            },
            getContext: function(e) {
                if (this.lastContext !== e) {
                    this.lastContext = e
                }
            },
            lookupOnContext: function(e) {
                this.push(this.nameLookup("depth" + this.lastContext, e, "context"))
            },
            pushContext: function() {
                this.pushStackLiteral("depth" + this.lastContext)
            },
            resolvePossibleLambda: function() {
                this.context.aliases.functionType = '"function"';
                this.replaceStack(function(e) {
                    return "typeof " + e + " === functionType ? " + e + ".apply(depth0) : " + e
                })
            },
            lookup: function(e) {
                this.replaceStack(function(t) {
                    return t + " == null || " + t + " === false ? " + t + " : " + this.nameLookup(t, e, "context")
                })
            },
            lookupData: function() {
                this.pushStackLiteral("data")
            },
            pushStringParam: function(e, t) {
                this.pushStackLiteral("depth" + this.lastContext);
                this.pushString(t);
                if (t !== "sexpr") {
                    if (typeof e === "string") {
                        this.pushString(e)
                    } else {
                        this.pushStackLiteral(e)
                    }
                }
            },
            emptyHash: function() {
                this.pushStackLiteral("{}");
                if (this.options.stringParams) {
                    this.push("{}");
                    this.push("{}")
                }
            },
            pushHash: function() {
                if (this.hash) {
                    this.hashes.push(this.hash)
                }
                this.hash = {
                    values: [],
                    types: [],
                    contexts: []
                }
            },
            popHash: function() {
                var e = this.hash;
                this.hash = this.hashes.pop();
                if (this.options.stringParams) {
                    this.push("{" + e.contexts.join(",") + "}");
                    this.push("{" + e.types.join(",") + "}")
                }
                this.push("{\n    " + e.values.join(",\n    ") + "\n  }")
            },
            pushString: function(e) {
                this.pushStackLiteral(this.quotedString(e))
            },
            push: function(e) {
                this.inlineStack.push(e);
                return e
            },
            pushLiteral: function(e) {
                this.pushStackLiteral(e)
            },
            pushProgram: function(e) {
                if (e != null) {
                    this.pushStackLiteral(this.programExpression(e))
                } else {
                    this.pushStackLiteral(null)
                }
            },
            invokeHelper: function(e, t, n) {
                this.context.aliases.helperMissing = "helpers.helperMissing";
                this.useRegister("helper");
                var r = this.lastHelper = this.setupHelper(e, t, true);
                var i = this.nameLookup("depth" + this.lastContext, t, "context");
                var s = "helper = " + r.name + " || " + i;
                if (r.paramsInit) {
                    s += "," + r.paramsInit
                }
                this.push("(" + s + ",helper " + "? helper.call(" + r.callParams + ") " + ": helperMissing.call(" + r.helperMissingParams + "))");
                if (!n) {
                    this.flushInline()
                }
            },
            invokeKnownHelper: function(e, t) {
                var n = this.setupHelper(e, t);
                this.push(n.name + ".call(" + n.callParams + ")")
            },
            invokeAmbiguous: function(e, t) {
                this.context.aliases.functionType = '"function"';
                this.useRegister("helper");
                this.emptyHash();
                var n = this.setupHelper(0, e, t);
                var r = this.lastHelper = this.nameLookup("helpers", e, "helper");
                var i = this.nameLookup("depth" + this.lastContext, e, "context");
                var s = this.nextStack();
                if (n.paramsInit) {
                    this.pushSource(n.paramsInit)
                }
                this.pushSource("if (helper = " + r + ") { " + s + " = helper.call(" + n.callParams + "); }");
                this.pushSource("else { helper = " + i + "; " + s + " = typeof helper === functionType ? helper.call(" + n.callParams + ") : helper; }")
            },
            invokePartial: function(e) {
                var t = [this.nameLookup("partials", e, "partial"), "'" + e + "'", this.popStack(), "helpers", "partials"];
                if (this.options.data) {
                    t.push("data")
                }
                this.context.aliases.self = "this";
                this.push("self.invokePartial(" + t.join(", ") + ")")
            },
            assignToHash: function(e) {
                var t = this.popStack(),
                    n, r;
                if (this.options.stringParams) {
                    r = this.popStack();
                    n = this.popStack()
                }
                var i = this.hash;
                if (n) {
                    i.contexts.push("'" + e + "': " + n)
                }
                if (r) {
                    i.types.push("'" + e + "': " + r)
                }
                i.values.push("'" + e + "': (" + t + ")")
            },
            compiler: a,
            compileChildren: function(e, t) {
                var n = e.children,
                    r, i;
                for (var s = 0, o = n.length; s < o; s++) {
                    r = n[s];
                    i = new this.compiler;
                    var u = this.matchExistingProgram(r);
                    if (u == null) {
                        this.context.programs.push("");
                        u = this.context.programs.length;
                        r.index = u;
                        r.name = "program" + u;
                        this.context.programs[u] = i.compile(r, t, this.context);
                        this.context.environments[u] = r
                    } else {
                        r.index = u;
                        r.name = "program" + u
                    }
                }
            },
            matchExistingProgram: function(e) {
                for (var t = 0, n = this.context.environments.length; t < n; t++) {
                    var r = this.context.environments[t];
                    if (r && r.equals(e)) {
                        return t
                    }
                }
            },
            programExpression: function(e) {
                this.context.aliases.self = "this";
                if (e == null) {
                    return "self.noop"
                }
                var t = this.environment.children[e],
                    n = t.depths.list,
                    r;
                var i = [t.index, t.name, "data"];
                for (var s = 0, o = n.length; s < o; s++) {
                    r = n[s];
                    if (r === 1) {
                        i.push("depth0")
                    } else {
                        i.push("depth" + (r - 1))
                    }
                }
                return (n.length === 0 ? "self.program(" : "self.programWithDepth(") + i.join(", ") + ")"
            },
            register: function(e, t) {
                this.useRegister(e);
                this.pushSource(e + " = " + t + ";")
            },
            useRegister: function(e) {
                if (!this.registers[e]) {
                    this.registers[e] = true;
                    this.registers.list.push(e)
                }
            },
            pushStackLiteral: function(e) {
                return this.push(new u(e))
            },
            pushSource: function(e) {
                if (this.pendingContent) {
                    this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent)));
                    this.pendingContent = undefined
                }
                if (e) {
                    this.source.push(e)
                }
            },
            pushStack: function(e) {
                this.flushInline();
                var t = this.incrStack();
                if (e) {
                    this.pushSource(t + " = " + e + ";")
                }
                this.compileStack.push(t);
                return t
            },
            replaceStack: function(e) {
                var t = "",
                    n = this.isInline(),
                    r, i, s;
                if (n) {
                    var o = this.popStack(true);
                    if (o instanceof u) {
                        r = o.value;
                        s = true
                    } else {
                        i = !this.stackSlot;
                        var a = !i ? this.topStackName() : this.incrStack();
                        t = "(" + this.push(a) + " = " + o + "),";
                        r = this.topStack()
                    }
                } else {
                    r = this.topStack()
                }
                var f = e.call(this, r);
                if (n) {
                    if (!s) {
                        this.popStack()
                    }
                    if (i) {
                        this.stackSlot--
                    }
                    this.push("(" + t + f + ")")
                } else {
                    if (!/^stack/.test(r)) {
                        r = this.nextStack()
                    }
                    this.pushSource(r + " = (" + t + f + ");")
                }
                return r
            },
            nextStack: function() {
                return this.pushStack()
            },
            incrStack: function() {
                this.stackSlot++;
                if (this.stackSlot > this.stackVars.length) {
                    this.stackVars.push("stack" + this.stackSlot)
                }
                return this.topStackName()
            },
            topStackName: function() {
                return "stack" + this.stackSlot
            },
            flushInline: function() {
                var e = this.inlineStack;
                if (e.length) {
                    this.inlineStack = [];
                    for (var t = 0, n = e.length; t < n; t++) {
                        var r = e[t];
                        if (r instanceof u) {
                            this.compileStack.push(r)
                        } else {
                            this.pushStack(r)
                        }
                    }
                }
            },
            isInline: function() {
                return this.inlineStack.length
            },
            popStack: function(e) {
                var t = this.isInline(),
                    n = (t ? this.inlineStack : this.compileStack).pop();
                if (!e && n instanceof u) {
                    return n.value
                } else {
                    if (!t) {
                        if (!this.stackSlot) {
                            throw new o("Invalid stack pop")
                        }
                        this.stackSlot--
                    }
                    return n
                }
            },
            topStack: function(e) {
                var t = this.isInline() ? this.inlineStack : this.compileStack,
                    n = t[t.length - 1];
                if (!e && n instanceof u) {
                    return n.value
                } else {
                    return n
                }
            },
            quotedString: function(e) {
                return '"' + e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"'
            },
            setupHelper: function(e, t, n) {
                var r = [],
                    i = this.setupParams(e, r, n);
                var s = this.nameLookup("helpers", t, "helper");
                return {
                    params: r,
                    paramsInit: i,
                    name: s,
                    callParams: ["depth0"].concat(r).join(", "),
                    helperMissingParams: n && ["depth0", this.quotedString(t)].concat(r).join(", ")
                }
            },
            setupOptions: function(e, t) {
                var n = [],
                    r = [],
                    i = [],
                    s, o, u;
                n.push("hash:" + this.popStack());
                if (this.options.stringParams) {
                    n.push("hashTypes:" + this.popStack());
                    n.push("hashContexts:" + this.popStack())
                }
                o = this.popStack();
                u = this.popStack();
                if (u || o) {
                    if (!u) {
                        this.context.aliases.self = "this";
                        u = "self.noop"
                    }
                    if (!o) {
                        this.context.aliases.self = "this";
                        o = "self.noop"
                    }
                    n.push("inverse:" + o);
                    n.push("fn:" + u)
                }
                for (var a = 0; a < e; a++) {
                    s = this.popStack();
                    t.push(s);
                    if (this.options.stringParams) {
                        i.push(this.popStack());
                        r.push(this.popStack())
                    }
                }
                if (this.options.stringParams) {
                    n.push("contexts:[" + r.join(",") + "]");
                    n.push("types:[" + i.join(",") + "]")
                }
                if (this.options.data) {
                    n.push("data:data")
                }
                return n
            },
            setupParams: function(e, t, n) {
                var r = "{" + this.setupOptions(e, t).join(",") + "}";
                if (n) {
                    this.useRegister("options");
                    t.push("options");
                    return "options=" + r
                } else {
                    t.push(r);
                    return ""
                }
            }
        };
        var f = ("break else new var" + " case finally return void" + " catch for switch while" + " continue function this with" + " default if throw" + " delete in try" + " do instanceof typeof" + " abstract enum int short" + " boolean export interface static" + " byte extends long super" + " char final native synchronized" + " class float package throws" + " const goto private transient" + " debugger implements protected volatile" + " double import public let yield").split(" ");
        var l = a.RESERVED_WORDS = {};
        for (var c = 0, h = f.length; c < h; c++) {
            l[f[c]] = true
        }
        a.isValidJavaScriptVariableName = function(e) {
            if (!a.RESERVED_WORDS[e] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(e)) {
                return true
            }
            return false
        };
        n = a;
        return n
    }(r, n);
    var c = function(e, t, n, r, i) {
        "use strict";
        var s;
        var o = e;
        var u = t;
        var a = n.parser;
        var f = n.parse;
        var l = r.Compiler;
        var c = r.compile;
        var h = r.precompile;
        var p = i;
        var d = o.create;
        var v = function() {
            var e = d();
            e.compile = function(t, n) {
                return c(t, n, e)
            };
            e.precompile = function(t, n) {
                return h(t, n, e)
            };
            e.AST = u;
            e.Compiler = l;
            e.JavaScriptCompiler = p;
            e.Parser = a;
            e.parse = f;
            return e
        };
        o = v();
        o.create = v;
        s = o;
        return s
    }(s, o, a, f, l);
    return c
}();
/*============================================================================
  Ajax the add to cart experience by revealing it in a side drawer
  (c) Copyright 2015 Shopify Inc. All Rights Reserved.

  This requires:
    - jQuery 1.11+
    - handlebars.min.js (for cart template)
    - modernizer.min.js
    - snippet/ajax-cart-template.liquid
==============================================================================*/

/*============================================================================
  Override POST to cart/add.js. Returns cart JSON.
    - Allow use of form element instead of just id
    - Allow custom error callback
==============================================================================*/
function delete_cookie(name, value) {
    document.cookie = name + '=' + value + '; path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

function setCookie(name, value) {

    document.cookie = name + "=" + value + "; path=/";
};


var  chechked_socks_item = false
var  chechked_cap_item = false
var chechked_bag_item = false
var bagAndCapModalCondition = false


// function freeProduct() {
//     fetch('/cart.js')
//         .then(response => response.json())
//         .then(data => {
//             let item_price = data.total_price;
//             let percent = item_price / 20000 * 100;
//             let capPercent = item_price / 30000 * 100;
//             let newPercent = item_price / 40000 * 100;
//             console.log(newPercent, "new");
//             console.log(percent, "old");
//             console.log(item_price, "item");
//             let  modal = document.getElementById("bn-ALlmyModal");
//             let bagmodal = document.getElementById("modalBagMain_container");
//             let socksmodal = document.getElementById("modal_Socks_container");
//             let capmodal = document.getElementById("modalCapMain_container");
//             let spend200 = document.getElementById("bn_spend_200");
//             let spend300 = document.getElementById("bn_spend_300");
//             let spend400 = document.getElementById("bn_spend_400");
                
           

//             if (percent >= 100  && chechked_socks_item == false && capPercent <=100 && !getCookie('free_added')) {
//                 console.log("mtela")
//                     setCookie("free_added", true);
//                     // percent = 100;
//                     chechked_socks_item = true
//                     modal.style.display = "block";
//                     socksmodal.style.display = "block";
//                     capmodal.style.display = "none";
//                     bagmodal.style.display = "none";
//                     $('.bn_popup_slick').slick({
//                         arrows: true,
//                         dots: false,
//                         prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
//                         nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
//                         slidesToScroll: 1,
//                         autoplay: false,
//                         slidesToShow: 5,
//                         // centerPadding: '100px',
//                         infinite: true,
//                         speed: 300,
//                         adaptiveHeight: true,
//                         responsive: [{
//                             breakpoint: 426,
//                             settings: {
//                                 arrows: true,
//                                 prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
//                                 nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
//                                 slidesToShow: 2,
//                                 slidesToScroll: 1,
//                                 infinite: true,
//                                 dots: false
//                             }
//                         }
//                         ]
//                     });
//                 }else if(capPercent >= 100  && chechked_socks_item == false && chechked_cap_item == false && newPercent <=100 && !getCookie('free_added')){
//                     console.log("eli mtel")
//                         setCookie("free_added", true);
//                         chechked_socks_item = true
//                         chechked_cap_item = true
//                         modal.style.display = "block";
//                         socksmodal.style.display = "block";
//                         capmodal.style.display = "block";
//                         bagmodal.style.display = "none";
//                         $('.bn_popup_slick').slick({
//                             arrows: true,
//                             dots: false,
//                             prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
//                             nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
//                             slidesToScroll: 1,
//                             autoplay: false,
//                             slidesToShow: 5,
//                             // centerPadding: '100px',
//                             infinite: true,
//                             speed: 300,
//                             adaptiveHeight: true,
//                             responsive: [{
//                                 breakpoint: 426,
//                                 settings: {
//                                     arrows: true,
//                                     prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
//                                     nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
//                                     slidesToShow: 2,
//                                     slidesToScroll: 1,
//                                     infinite: true,
//                                     dots: false
//                                 }
//                             }
//                             ]
//                         });
//                         $('.bn_popup_cap_slick').slick({
//                             arrows: true,
//                             dots: false,
//                             prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
//                             nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
//                             slidesToScroll: 1,
//                             autoplay: false,
//                             slidesToShow: 5,
//                             // centerPadding: '100px',
//                             infinite: true,
//                             speed: 300,
//                             adaptiveHeight: true,
//                             responsive: [{
//                                 breakpoint: 426,
//                                 settings: {
//                                     arrows: true,
//                                     prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
//                                     nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
//                                     slidesToShow: 2,
//                                     slidesToScroll: 1,
//                                     infinite: true,
//                                     dots: false
//                                 }
//                             }
//                             ]
                    
//                         });
//                     }else if(capPercent >= 100 && chechked_socks_item == true && chechked_cap_item == false && newPercent <=100 && !getCookie('free_added_cap')  && getCookie('free_added')){
//                         console.log("miatela mtel")
//                             setCookie("free_added_cap", true);
//                             chechked_cap_item = true
//                             modal.style.display = "block";
//                             socksmodal.style.display = "none";
//                             capmodal.style.display = "block";
//                             bagmodal.style.display = "none";
//                             $('.bn_popup_cap_slick').slick({
//                                 arrows: true,
//                                 dots: false,
//                                 prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
//                                 nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
//                                 slidesToScroll: 1,
//                                 autoplay: false,
//                                 slidesToShow: 5,
//                                 // centerPadding: '100px',
//                                 infinite: true,
//                                 speed: 300,
//                                 adaptiveHeight: true,
//                                 responsive: [{
//                                     breakpoint: 426,
//                                     settings: {
//                                         arrows: true,
//                                         prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
//                                         nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
//                                         slidesToShow: 2,
//                                         slidesToScroll: 1,
//                                         infinite: true,
//                                         dots: false
//                                     }
//                                 }
//                                 ]
                        
//                             });
//                         }else if(newPercent >=100 && chechked_socks_item == false && chechked_cap_item == false && chechked_bag_item == false && !getCookie('free_added_bag')  && getCookie('free_added') && getCookie('free_added_cap')){
//                                 console.log("verji angama mtel")
//                                     setCookie("free_added_bag", true);
//                                     setCookie("free_added", true);
//                                     setCookie("free_added_cap", true);
//                                     chechked_bag_item = true
//                                     modal.style.display = "block";
//                                     socksmodal.style.display = "block";
//                                     capmodal.style.display = "block";
//                                     bagmodal.style.display = "block";
//                                     $('.bn_popup_slick').slick({
//                                         arrows: true,
//                                         dots: false,
//                                         prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
//                                         nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
//                                         slidesToScroll: 1,
//                                         autoplay: false,
//                                         slidesToShow: 5,
//                                         // centerPadding: '100px',
//                                         infinite: true,
//                                         speed: 300,
//                                         adaptiveHeight: true,
//                                         responsive: [{
//                                             breakpoint: 426,
//                                             settings: {
//                                                 arrows: true,
//                                                 prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
//                                                 nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
//                                                 slidesToShow: 2,
//                                                 slidesToScroll: 1,
//                                                 infinite: true,
//                                                 dots: false
//                                             }
//                                         }
//                                         ]
                                
//                                     });
//                                     $('.bn_popup_cap_slick').slick({
//                                         arrows: true,
//                                         dots: false,
//                                         prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
//                                         nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
//                                         slidesToScroll: 1,
//                                         autoplay: false,
//                                         slidesToShow: 5,
//                                         // centerPadding: '100px',
//                                         infinite: true,
//                                         speed: 300,
//                                         adaptiveHeight: true,
//                                         responsive: [{
//                                             breakpoint: 426,
//                                             settings: {
//                                                 arrows: true,
//                                                 prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
//                                                 nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
//                                                 slidesToShow: 2,
//                                                 slidesToScroll: 1,
//                                                 infinite: true,
//                                                 dots: false
//                                             }
//                                         }
//                                         ]
                                
//                                     });
//                                     $('.bn_popup_bag_slick').slick({ 
//                                         arrows: true,
//                                         dots: false,
//                                         prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
//                                         nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
//                                         slidesToScroll: 1,
//                                         autoplay: false,
//                                         slidesToShow: 5,
//                                         // centerPadding: '100px',
//                                         infinite: true,
//                                         speed: 300,
//                                         adaptiveHeight: true,
//                                         responsive: [{
//                                             breakpoint: 426,
//                                             settings: {
//                                                 arrows: true,
//                                                 prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
//                                                 nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
//                                                 slidesToShow: 2,
//                                                 slidesToScroll: 1,
//                                                 infinite: true,
//                                                 dots: false
//                                             }
//                                         }
//                                         ]
                                
//                                     });
//                                 }else if(newPercent >=100 && chechked_socks_item == true && chechked_cap_item == false && chechked_bag_item == false && !getCookie('free_added_cap') && !getCookie('free_added_bag')){
//                                     console.log("norica mtel")
//                                     console.log(chechked_socks_item)
//                                     setCookie("free_added_bag", true);
//                                         setCookie("free_added_cap", true);
//                                         chechked_socks_item = true
//                                         chechked_cap_item = true
//                                         chechked_bag_item = true
//                                         bagAndCapModalCondition = true
//                                         modal.style.display = "block";
//                                         socksmodal.style.display = "none";
//                                         capmodal.style.display = "block";
//                                         bagmodal.style.display = "none";
//                                         $('.bn_popup_cap_slick').slick({
//                                             arrows: true,
//                                             dots: false,
//                                             prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
//                                             nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
//                                             slidesToScroll: 1,
//                                             autoplay: false,
//                                             slidesToShow: 5,
//                                             // centerPadding: '100px',
//                                             infinite: true,
//                                             speed: 300,
//                                             adaptiveHeight: true,
//                                             responsive: [{
//                                                 breakpoint: 426,
//                                                 settings: {
//                                                     arrows: true,
//                                                     prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
//                                                     nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
//                                                     slidesToShow: 2,
//                                                     slidesToScroll: 1,
//                                                     infinite: true,
//                                                     dots: false
//                                                 }
//                                             }
//                                             ]
                                    
//                                         });

//                                     }else if (newPercent >=100 && chechked_socks_item == true && chechked_cap_item == true && chechked_bag_item == false && getCookie('free_added_cap') && !getCookie('free_added_bag') ) {
//                                         setCookie("free_added_bag", true);
//                                         modal.style.display = "block";
//                                         socksmodal.style.display = "none";
//                                         capmodal.style.display = "none";
//                                         bagmodal.style.display = "block";
//                                         $('.bn_popup_bag_slick').slick({
//                                             arrows: true,
//                                             dots: false,
//                                             prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
//                                             nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
//                                             slidesToScroll: 1,
//                                             autoplay: false,
//                                             slidesToShow: 5,
//                                             // centerPadding: '100px',
//                                             infinite: true,
//                                             speed: 300,
//                                             adaptiveHeight: true,
//                                             responsive: [{
//                                                 breakpoint: 426,
//                                                 settings: {
//                                                     arrows: true,
//                                                     prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
//                                                     nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
//                                                     slidesToShow: 2,
//                                                     slidesToScroll: 1,
//                                                     infinite: true,
//                                                     dots: false
//                                                 }
//                                             }
//                                             ]
                                    
//                                         });
//                                     }
//                                     else if (percent < 100  ) { 
//                                         modal.style.display = "none";
//                                                     delete_cookie('free_added', '');
//                                                     delete_cookie('free_added_bag', '');
//                                                     delete_cookie('free_added_cap', '');
//                                                     chechked_socks_item = false;
//                                                     chechked_cap_item = false;
//                                                     chechked_bag_item = false;
//                                     }
//                                     console.log(chechked_socks_item,chechked_cap_item,chechked_bag_item);


            

                               
//             // if (percent <= 100) {
//             //     $('.free-loader-inner').css({
//             //         width: percent + '%' 
//             //     })
//             //     spend200.style.display = "block";
//             //     spend300.style.display = "none";
//             //     spend400.style.display = "none";
//             // }
//             //  if (percent >= 100 && capPercent <= 100) {
//             //     // setTimeout(function(){ }, 1000);
//             //         $('.free-loader-inner').css({
//             //             width: capPercent + '%' 
//             //         }); 
//             //         spend200.style.display = "none";
//             //         spend300.style.display = "block";
//             //         spend400.style.display = "none";
                
//             // }
//             //  if (capPercent >= 100) {
//             //     $('.free-loader-inner').css({
//             //         width: newPercent + '%' 
//             //     })
//             //     spend200.style.display = "none";
//             //     spend300.style.display = "none";
//             //     spend400.style.display = "block";
//             // }
//                                     // let buy_any_prod = 20000 - item_price;
//                                     $('.bn_free_gift_baner').show();
                                    
                                    
//                                     // console.log(buy_now,"nerkayis arevtur")
//                                     // console.log(popup_open_count,"anvchar nvereneri qanak")
//                                     // console.log(balance,"mnacord")
//                                     // console.log(achive_free_gift,"achive gift")
//                                     // console.log(finally_achive_gift,"finally gift")
//                                     $('.bn_free_gift_content_text').html('Spend $200.00 And get free socks<br>Spend $300 and get free socks & cap <br> Spend $400+ and get free socks, cap & gym bag ')

//                                     // if (buy_any_prod < 20000) {
//                                     //     $('.bn_free_gift_content_text').html('You are ' + Shopify.formatMoney((buy_any_prod),theme.settings.moneyFormat) + ' away from free Gift ')
//                                     // }
//                                     // else if (buy_now > 30000 && balance < 0) {
//                                     //     $('.bn_free_gift_content_text').html('You are ' + Shopify.formatMoney((30000),theme.settings.moneyFormat) + " away from free Gift (applies to PSV3 only)")
//                                     // }
//                                     // else if (buy_now > 30000 ) {
//                                     //     $('.bn_free_gift_content_text').html('You are ' + Shopify.formatMoney((30000 - balance),theme.settings.moneyFormat) + " away from free Gift (applies to PSV3 only)")
//                                     // }
                         
                                                              
//         });
// }
// freeProduct();
var popup_open_count =0
var PsvPopup_open_count =0
// let  modal = document.getElementById("bn-myModal");

// PSV popup start

//   function freePsvCollectionProduct(gift) {
//      var gift_price = 0;
//      var count_psv_collection = 0
//     //   console.log($(this).attr("data-variant-price"), "sssssss")
   
//     //   console.log($(gift).attr("data-variant-price"), "second")

//         var promo_price = $(gift).attr("data-variant-price");
//         // console.log(promo_price,"gift price")
//         fetch('/cart.js')
//             .then(response => response.json())
//             .then(data => {
//                 // console.log($(data) ,"data")
//                 var bn_data = $(data)
//                 let psv_item_price = data.total_price;
//                 let percent = psv_item_price / 20000 ;
//                 let  modal = document.getElementById("bn-ALlmyModal");
//                 // console.log(psv_item_price, "total psv");
//                 // console.log(percent, " psv");
//                 var gift_count=0
//                 var products_dont_get_points


//                 // $.getJSON('/collections/bn-specific-collection-psv3/products.json', function(response) {
//                 //     $.getJSON('/collections/bn-free-gift-products/products.json', function(requiredResponse) {

//                 $.getJSON('/collections/tie-dye-2-collection/products.json', function(response) {
//                     $.getJSON('/collections/bn-gift-glasses/products.json', function(requiredResponse) {
//                     // console.log(bn_data,"bn_data")
//                     // products_not_get_points=response
//                     // console.log(response, "free");
//                     // console.log(products_not_get_points, "not get");


//                     for (let i = 0; i < bn_data[0].items.length; i++) {
//                         for (let j = 0; j < response.products.length; j++) {
//                         for (let k = 0; k < response.products[j].variants.length; k++) {
//                             if(response.products[j].variants[k].id == bn_data[0].items[i].id){
//                                 gift_price += (bn_data[0].items[i].price*bn_data[0].items[i].quantity)
//                                 var anything = response.products;
//                                 var bndataany = bn_data[0].item_count;
//                                 count_psv_collection++

//                                 console.log(count_psv_collection,"ffgfhfghjgjhj")
//                                 // console.log(anything,"anythingi hamar")
                               
                                
                                    
                                    

//                             }
//                         }
//                         }
//                     }
//                     var free_gift_container = document.getElementById("bn_free_gift_baner_section");
// //                     if (count_psv_collection < 1) {
// //                         free_gift_container.style.display = "none";
// //                         // console.log("done");
// //                     }else {
// //                         free_gift_container.style.display = "flex";
// //                         // console.log("undone");
// //                     }
//                     // console.log(count_psv_collection,"renesanse")

                    
//                         // console.log(requiredResponse, "dgdgdgd");
                        
//                         for (let i = 0; i < bn_data[0].items.length; i++) {
//                             for (let j = 0; j < requiredResponse.products.length; j++) {
//                             for (let k = 0; k < requiredResponse.products[j].variants.length; k++) {
//                                 if(requiredResponse.products[j].variants[k].id == bn_data[0].items[i].id){
                                    
//                                         gift_count +=bn_data[0].items[i].quantity
//                                         console.log(gift_count, "price=0");
                                        
//                                      if (bn_data[0].items[i].final_price != 0) {
//                                         gift_count--
//                                         console.log(gift_count, "price!=0");

//                                     }
//                                 }
//                             }
//                             }
//                         }
                        
    
//                         // console.log(gift_count,"free count")
//                         // console.log(gift_price,"gin")
        
//                         var buy_now = gift_price -(gift_count * 20000)
//                         console.log(buy_now,"newbuynow")
//                                                 console.log(gift_price,"newgiftprice")
//                                                 console.log(gift_count,"newgiftcount")

//                         PsvPopup_open_count = Math.floor(buy_now / 20000)
//                         console.log(PsvPopup_open_count, "popupfloor");
//                         var balance = buy_now -  (PsvPopup_open_count * 20000)
//                         var achive_free_gift  =  20000 - gift_price;
//                         var finally_achive_gift = 20000 - Math.abs(achive_free_gift)
//                         // console.log(buy_now,"nerkayis arevtur")
//                         // console.log(popup_open_count,"anvchar nvereneri qanak")
//                         // console.log(balance,"mnacord")
//                         // console.log(achive_free_gift,"achive gift")
//                         // console.log(finally_achive_gift,"finally gift")

// //                         if (buy_now < 20000) {
// //                             $('.bn_free_gift_content_text').html('You are ' + Shopify.formatMoney((20000 - buy_now),theme.settings.moneyFormat) + ' away from free Gift')
// //                         }else if (buy_now > 20000 && balance < 0) {
// //                             $('.bn_free_gift_content_text').html('You are ' + Shopify.formatMoney((20000),theme.settings.moneyFormat) + " away from free Gift")
// //                         }
// //                         else if (buy_now > 20000 ) {
// //                             $('.bn_free_gift_content_text').html('You are ' + Shopify.formatMoney((20000 - balance),theme.settings.moneyFormat) + " away from free Gift")
// //                         }
//                         if (PsvPopup_open_count >0) {
//                             modal.style.display = "block";
//                             $('.bn_popup_slick').slick({
//                                 arrows: true,
//                                 dots: false,
//                                 prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
//                                 nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
//                                 slidesToScroll: 1,
//                                 autoplay: true,
//                                 slidesToShow: 5,
//                                 // centerPadding: '100px',
//                                 infinite: true,
//                                 speed: 300,
//                                 adaptiveHeight: true,
//                                 responsive: [{
//                                     breakpoint: 426,
//                                     settings: {
//                                         arrows: true,
//                                         prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
//                                         nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
//                                         slidesToShow: 2,
//                                         slidesToScroll: 1,
// //                                       	centerMode: true,
//                                       centerPadding: '100px',
//                                         infinite: true,
//                                         dots: false
//                                     }
//                                 }
//                                 ]
//                             });
//                             PsvPopup_open_count--
//                                                     console.log(PsvPopup_open_count, "popup--");

//                         }
                        

//                       });
                
//                 });

                
                
    
    
//             })

            
//         }
//         freePsvCollectionProduct()
var popup_opens_count =0;                      
let counterr =1

// const getCartTotalForDifferenceFunc= ()=>{
//     let getCartTotalForDifference = fetch('/cart.js')
//             .then(response => response.json())
//             .then(data => {
//                 // getCartTotalForDifference = data.total_price;
//                 return data.total_price;
//             })
//             return getCartTotalForDifference;
           
// }

// var getCartTotalForDifference =  getCartTotalForDifferenceFunc();
var oldPriceTotal = 0;
function freeAnyProduct (){
    fetch('/cart.js')
            .then(response => response.json())
            .then(data => {
                var bn_data = $(data)
                let any_item_price = data.total_price;
                let smallProduct = true;
                let anyFreeCount = 0
                let sum = 0
                bn_data[0].items.forEach(item=>{
                    var differenceOfTotal = item.line_price - oldPriceTotal;
                    console.log('diference-1',differenceOfTotal);
                    
                    if(  (item.line_price>40000  || item.price>40000) && differenceOfTotal >= 40000 ){
                        smallProduct=false
                    }
                })
                    let anymodal = document.getElementById("bn-myModal");
                        anyFreeCount * 40000;
                    let totalText = any_item_price - (popup_opens_count * 40000) ;
//                     var pricetoshow = 40000-totalText
      				 if(any_item_price > 40000){
                        var pricetoshow = 40000 - (any_item_price-(Math.floor(any_item_price/40000)*40000))
                    }else{
                         var pricetoshow = 40000 - any_item_price
                    }
                    let delitel = 40000
                        popup_open_count = Math.floor(totalText / 40000)
                    var balance = totalText -  (popup_open_count * 40000);

                    $('.bn_free_gift_baner').show();
                    $('#bn_free_gift_content_text').html('You are ' + Shopify.formatMoney((pricetoshow),theme.settings.moneyFormat) + ' away from free Gift')
                
                if(smallProduct){
                    if(Math.floor(any_item_price/40000)>=counterr){
                        console.log(Math.floor(any_item_price/40000),'priser');
                        counterr++
                        anymodal.style.display = "block";
                        $('.bn_popup_slick').slick({
                            arrows: true,
                            dots: false,
                            prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
                            nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
                            slidesToScroll: 1,
                            autoplay: true,
                            slidesToShow: 5,
                            // centerPadding: '100px',
                            infinite: true,
                            speed: 300,
                            adaptiveHeight: true,
                            responsive: [{
                                breakpoint: 426,
                                settings: {
                                    arrows: true,
                                    prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
                                    nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
                                    slidesToShow: 2,
                                    slidesToScroll: 1,
        //                                       	centerMode: true,
                                    centerPadding: '100px',
                                    infinite: true,
                                    dots: false
                                }
                            }
                            ]
                        });
                    }
                    console.log(Math.floor(any_item_price/40000),any_item_price,"divni");
                }else{
                    davFunction(Math.floor(any_item_price/40000));
                    smallProduct = true;
                }
                
                
            })
    // getCartTotalForDifference =  getCartTotalForDifferenceFunc();
}
var count = 0
// function freeAnyProduct (){
// // setCookie("money",'');
//     fetch('/cart.js')
//             .then(response => response.json())
//             .then(data => {
//                 var bn_data = $(data)
//                 let any_item_price = data.total_price;
//                 let smallProduct = true;
//                 let anyFreeCount = 0
//                 // delete_cookie("money")
//                 if(getCookie("money")){
//                      count = Math.floor(any_item_price / 40000) - Number(getCookie("money"))
//                     if(Math.floor(any_item_price / 40000) > Number(getCookie("money"))) {
//                         setCookie("money",Math.floor(any_item_price / 40000))
//                                                               console.log(count,"countifcookie")

//                     }

//                 }else{
//                     setCookie("money",Math.floor(any_item_price / 40000))
//                     count = Math.floor(any_item_price / 40000)
// //                                       console.log(count,"countelse")

//                 }
//                 let anymodal = document.getElementById("bn-myModal");

//                 if(count>0){
//                   console.log(count,"count");
//                     anymodal.style.display = "block";
//                         $('.bn_popup_slick').slick({
//                             arrows: true,
//                             dots: false,
//                             prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
//                             nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
//                             slidesToScroll: 1,
//                             autoplay: true,
//                             slidesToShow: 5,
//                             // centerPadding: '100px',
//                             infinite: true,
//                             speed: 300,
//                             adaptiveHeight: true,
//                             responsive: [{
//                                 breakpoint: 426,
//                                 settings: {
//                                     arrows: true,
//                                     prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
//                                     nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
//                                     slidesToShow: 2,
//                                     slidesToScroll: 1,
//         //                                          centerMode: true,
//                                     centerPadding: '100px',
//                                     infinite: true,
//                                     dots: false
//                                 }
//                             }
//                             ]
//                         });
//                         count--
//                 }
//                 console.log(bn_data[0],"bn data 0");
//                 bn_data[0].items.forEach(item=>{
//                     var differenceOfTotal = item.line_price - oldPriceTotal;
                    
// //                     if(  (item.line_price>40000  || item.price>40000) && differenceOfTotal >= 40000 ){
// //                         smallProduct=false
// //                     }
                  
//                 })
//                     anyFreeCount * 40000;
//                     let totalText = any_item_price - (popup_opens_count * 40000) ;
//                     if(any_item_price > 40000){
//                         var pricetoshow = 40000 - (any_item_price-(Math.floor(any_item_price/40000)*40000))
//                     }else{
//                          var pricetoshow = 40000 - any_item_price
//                     }
               

//                         popup_open_count = Math.floor(totalText / 40000)
                   

//                     $('.bn_free_gift_baner').show();
//                     $('#bn_free_gift_content_text').html('You are ' + Shopify.formatMoney((pricetoshow),theme.settings.moneyFormat) + ' away from free Gift')

                
                
//             })
// }

freeAnyProduct();

Shopify.addItemFromForm = function(o, t, n) {
    var e = {
        type: "POST",
        url: "/cart/add.js",
        data: jQuery(o).serialize(),
        dataType: "json",
        success: function(n) {
            "function" == typeof t ? t(n, o) : Shopify.onItemAdded(n, o)
        },
        error: function(o, t) {
            "function" == typeof n ? n(o, t) : Shopify.onError(o, t)
        }
    };
    jQuery.ajax(e)
}, Shopify.changeItem = function(o, t, n) {
    // alert(o);
    console.log(o,'o');
    var e = {
       
        type: "POST",
        url: "/cart/change.js",
        data: "quantity=" + t + "&line=" + o,
        dataType: "json",
        success: function(o) {
            
            "function" == typeof n ? n(o) : Shopify.onCartUpdate(o)
            setTimeout(()=>{
//                 freeProduct()
//                 freePsvCollectionProduct($(this))
                freeAnyProduct()
            },500)
            
        },
        error: function(o, t) {
            Shopify.onError(o, t)
        }
    };
    jQuery.ajax(e)
}, Shopify.getCart = function(o) {
    jQuery.getJSON("/cart.js", function(t, n) {
        "function" == typeof o ? o(t) : Shopify.onCartUpdate(t)
    })
};

/*============================================================================
  Ajax Shopify Add To Cart
==============================================================================*/
var ajaxCart = (function(module, $) {
    "use strict";
    var init, loadCart, settings, isUpdating, $body, $formContainer, $errorsContainer, $addToCart, $cartCountSelector, $cartCostSelector, $cartContainer, $drawerContainer, updateCountPrice, formOverride, itemAddedCallback, itemErrorCallback, cartUpdateCallback, buildCart, cartCallback, adjustCart, adjustCartCallback, qtySelectors, validateQty;
    init = function(t) {
        settings = {
            formSelector: 'form[action^="/cart/add"]',
            errorSelector: ".product-single__errors",
            cartContainer: "#CartContainer",
            addToCartSelector: 'input[type="submit"]',
            cartCountSelector: null,
            cartCostSelector: null,
            moneyFormat: "$",
            disableAjaxCart: !1,
            enableQtySelectors: !0
        }, $.extend(settings, t), $formContainer = $(settings.formSelector), $errorsContainer = $(settings.errorSelector), $cartContainer = $(settings.cartContainer), $addToCart = $formContainer.find(settings.addToCartSelector), $cartCountSelector = $(settings.cartCountSelector), $cartCostSelector = $(settings.cartCostSelector), $body = $("body"), isUpdating = !1, settings.enableQtySelectors && qtySelectors(), !settings.disableAjaxCart && $addToCart.length && formOverride(), adjustCart()
    }, loadCart = function() {
        $body.addClass("drawer--is-loading"), Shopify.getCart(cartUpdateCallback)
    }, updateCountPrice = function(t) {
        $cartCountSelector && ($cartCountSelector.html(t.item_count).removeClass("hidden-count"), 0 === t.item_count && $cartCountSelector.addClass("hidden-count")), $cartCostSelector && $cartCostSelector.html(Shopify.formatMoney(t.total_price, settings.moneyFormat))
    }, formOverride = function() {
        $formContainer.on("submit", function(t) {
            t.preventDefault(), $addToCart.removeClass("is-added").addClass("is-adding"), $(".qty-error").remove(), Shopify.addItemFromForm(t.target, itemAddedCallback, itemErrorCallback)
        })
    }, itemAddedCallback = function(t) {
        $addToCart.removeClass("is-adding").addClass("is-added"), Shopify.getCart(cartUpdateCallback)
    }, itemErrorCallback = function(XMLHttpRequest, textStatus) {
        var data = eval("(" + XMLHttpRequest.responseText + ")");
        $addToCart.removeClass("is-adding is-added"), $cartContainer.trigger("ajaxCart.updatedQty"), data.message && 422 == data.status && $errorsContainer.html('<div class="errors qty-error">' + data.description + "</div>")
    }, cartUpdateCallback = function(t) {
        updateCountPrice(t), buildCart(t)
    };
    buildCart = function(cart) {
        // Start with a fresh cart div
        $cartContainer.empty();

        // Show empty cart
        if (cart.item_count === 0) {
            $cartContainer
                .append('<p class="cart--empty-message">' + "Your cart is currently empty." + '</p>\n' +
                    '<p class="cart--cookie-message">' + "Enable cookies to use the shopping cart" + '</p>');
            cartCallback(cart);
            return;
        }

        // Handlebars.js cart layout
        var items = [],
            item = {},
            data = {},
            source = $("#CartTemplate").html(),
            template = Handlebars.compile(source);

        // Add each item to our handlebars.js data
        $.each(cart.items, function(index, cartItem) {

            /* Hack to get product image thumbnail
             *   - If image is not null
             *     - Remove file extension, add _small, and re-add extension
             *     - Create server relative link
             *   - A hard-coded url of no-image
             */
            if (cartItem.image != null) {
                var prodImg = cartItem.image.replace(/(\.[^.]*)$/, "_small$1").replace('http:', '');
            } else {
                var prodImg = "//cdn.shopify.com/s/assets/admin/no-image-medium-cc9732cb976dd349a0df1d39816fbcc7.gif";
            }

            if (cartItem.properties !== null) {
                $.each(cartItem.properties, function(key, value) {
                    if (key.charAt(0) === '_' || !value) {
                        delete cartItem.properties[key];
                    }
                });
            }

            // Create item's data object and add to 'items' array
            item = {
                key: cartItem.key,
                line: index + 1, // Shopify uses a 1+ index in the API
                url: cartItem.url,
                img: prodImg,
                name: cartItem.product_title,
                variation: cartItem.variant_title,
                properties: cartItem.properties,
                itemAdd: cartItem.quantity + 1,
                itemMinus: cartItem.quantity - 1,
                itemQty: cartItem.quantity,
                price: Shopify.formatMoney(cartItem.price, settings.moneyFormat),
                vendor: cartItem.vendor,
                linePrice: Shopify.formatMoney(cartItem.line_price, settings.moneyFormat),
                originalLinePrice: Shopify.formatMoney(cartItem.original_line_price, settings.moneyFormat),
                discounts: cartItem.discounts,
                discountsApplied: cartItem.line_price === cartItem.original_line_price ? false : true
            };

            items.push(item);
        });

        // Gather all cart data and add to DOM
        data = {
            items: items,
            note: cart.note,
            totalPrice: Shopify.formatMoney(cart.total_price, settings.moneyFormat),
            totalCartDiscount: cart.total_discount === 0 ? 0 : "You're saving [savings]".replace('[savings]', Shopify.formatMoney(cart.total_discount, settings.moneyFormat)),
            totalCartDiscountApplied: cart.total_discount === 0 ? false : true
        }

        $cartContainer.append(template(data));

        cartCallback(cart);
        bn_gift_card()
    };

    cartCallback = function(t) {
        $body.removeClass("drawer--is-loading"), $cartContainer.trigger("ajaxCart.afterCartLoad", t), window.Shopify && Shopify.StorefrontExpressButtons && Shopify.StorefrontExpressButtons.initialize()
    }, adjustCart = function() {
         function t(t, a) {
             fetch('/cart.js')
                        .then(response => response.json())
                        .then(data => {
                            // getCartTotalForDifference = data.total_price;
                            console.log(data.total_price);
                            oldPriceTotal =  data.total_price;
                            return data.total_price;
                        })
                        
            isUpdating = !0;
            var n = $('.ajaxcart__product[data-line="' + t + '"]').addClass("is-loading");
            0 === a && n.parent().addClass("is-removed"), setTimeout(function() {
             
             Shopify.changeItem(t, a, adjustCartCallback) 
            }, 250), $cartContainer.trigger("ajaxCart.updatingQty")
        }
        $cartContainer.on("click", ".ajaxcart__qty-adjust", function() {
        
            if (!isUpdating) {
                var a = $(this),
                    n = a.data("line"),
                    i = a.siblings(".ajaxcart__qty-num"),
                    e = parseInt(i.val().replace(/\D/g, ""));
                e = validateQty(e);
                a.hasClass("ajaxcart__qty--plus") ? e += 1 : (e -= 1) <= 0 && (e = 0), n ? t(n, e) : i.val(e)
            }
        }), $cartContainer.on("change", ".ajaxcart__qty-num", function() {
            if (!isUpdating) {
                var a = $(this),
                    n = a.data("line"),
                    i = parseInt(a.val().replace(/\D/g, ""));
                i = validateQty(i);
                n && t(n, i)
            }
        }), $cartContainer.on("focus", ".ajaxcart__qty-num", function(t) {
            var a = $(t.target);
            a[0].setSelectionRange(0, a[0].value.length)
        }), $cartContainer.on("submit", "form.ajaxcart", function(t) {
            isUpdating && t.preventDefault()
        }), $cartContainer.on("focus", ".ajaxcart__qty-adjust", function() {
            var t = $(this);
            setTimeout(function() {
                t.select()
            }, 50)
        }), $cartContainer.on("change", 'textarea[name="note"]', function() {
            var t = $(this).val();
            Shopify.updateCartNote(t, function(t) {})
        })
    }, adjustCartCallback = function(t) {
        updateCountPrice(t), setTimeout(function() {
            isUpdating = !1, Shopify.getCart(buildCart)
        }, 150)
    }, qtySelectors = function() {
        var t = $('input[type="number"][data-ajax-qty]'),
            a = 0;
        t.length && (t.each(function() {
            var t = $(this),
                a = t.val(),
                n = t.attr("name"),
                i = t.attr("id"),
                e = a + 1,
                r = a - 1,
                o = a,
                s = $("#JsQty").html(),
                c = Handlebars.compile(s),
                u = {
                    key: t.data("id"),
                    itemQty: o,
                    itemAdd: e,
                    itemMinus: r,
                    inputName: n,
                    inputId: i
                };
            t.after(c(u)).remove()
        }), $(".js-qty__adjust").on("click", function() {
            var t = $(this),
                n = (t.data("id"), t.siblings(".js-qty__num")),
                i = parseInt(n.val().replace(/\D/g, ""));
            i = validateQty(i);
            a = $body.hasClass("template-product") ? 1 : a, t.hasClass("js-qty__adjust--plus") ? i += 1 : (i -= 1) <= a && (i = a), n.val(i)
            jQuery.post('/cart/change.js', {  id: $(".js-qty__num").attr("data-id").split(":")[0].trim() ,quantity: $(this).parent().find($(".js-qty__num")).val()})
            setTimeout(function(){
                location.reload()
            },2000)
        }))
    }, validateQty = function(t) {
        return (parseFloat(t) != parseInt(t) || isNaN(t)) && (t = 1), t
    }, module = {
        init: init,
        load: loadCart
    };

    return module;

}(ajaxCart || {}, jQuery));



let prodisSelected = false;
/* ========= Logic in click Buy Now or Pre Order Buttons ========= */

// $(".only-btn-by-shop").click(function(){
// 	if(!prodisSelected){
// 		alert("please choose one size of the product")
// 	}
// 	else{
// 		prodisSelected = false;
// 		$(this).closest("form").submit();

// 	}

//   })

/*================ SECTIONS ================*/
function gm_authFailure() {
    Shopify.designMode ? (theme.$currentMapContainer.addClass("page-width map-section--load-error"), theme.$currentMapContainer.find(".map-section__content-wrapper").remove(), theme.$currentMapContainer.find(".map-section__wrapper").html('<div class="errors text-center" style="width: 100%;">' + theme.strings.authError + "</div>")) : theme.$currentMapContainer.removeClass("map-section--display-map")
}
theme.SlideshowSection = function() {
    return function(e) {
        var t = this.$container = $(e),
            i = this.slideshow = "#Hero",
            a = t.find(".hero__image");
        slickTheme.init({
            $element: $(i),
            $headerClass: $(".site-header-wrapper"),
            speed: 1e3,
            autoplaySpeed: 4e3
        }), $("html").hasClass("is-ios") && Shopify.designMode && $(i).addClass("is-ios-editor"), a.imagesLoaded({
            background: !0
        }).progress(function() {
            $(".hero__image").addClass("image-loaded")
        }), theme.drawersInit()
    }
}(), theme.SlideshowSection.prototype = _.assignIn({}, theme.SlideshowSection.prototype, {
    onUnload: function() {
        $(this.slideshow).unslick()
    },
    onSelect: function() {
        theme.LeftDrawer.close()
    },
    onBlockSelect: function(e) {
        var t = $(".hero__slide--" + e.detail.blockId).attr("index");
        $(this.slideshow).slickGoTo(t).slickPause()
    },
    onBlockDeselect: function() {
        $(this.slideshow).slickPlay()
    }
});

theme.SidebarMenuSection = function() {
    return function() {}
}(), theme.SidebarMenuSection.prototype = _.assignIn({}, theme.SidebarMenuSection.prototype, {
    onSelect: function() {
        theme.RightDrawer.close(), theme.SearchDrawer.close(), theme.LeftDrawer.open()
    },
    onDeselect: function() {
        theme.LeftDrawer.close()
    }
}), theme.HeaderSection = function() {
    return function() {
        theme.drawersInit()
    }
}(), theme.HeaderSection.prototype = _.assignIn({}, theme.HeaderSection.prototype, {
    onSelect: function() {
        theme.LeftDrawer.close()
    }
}), theme.ActionBarSection = function() {
    return function() {
        theme.ActionBar.init()
    }
}(), theme.ActionBarSection.prototype = _.assignIn({}, theme.ActionBarSection.prototype, {
    onSelect: function() {
        theme.LeftDrawer.close()
    }
}), theme.CollectionTemplate = function() {
    return function(e) {
        theme.Collection.container = e, theme.Collection.init()
    }
}(), theme.Product = function() {
    var e = {
            imageSize: null
        },
        t = {
            addToCart: ".btn--add-to-cart",
            btnText: ".btn__text",
            cartContainer: "#CartContainer",
            originalSelectorId: "ProductSelect",
            productForm: ".product__form--add-to-cart",
            productPrice: ".product__price--reg",
            salePrice: ".product__price .js-price",
            salePriceWrapper: ".product__price--sale",
            variantImage: ".product__photo--variant",
            variantImageWrapper: ".product__photo--variant-wrapper",
            SKU: ".variant-sku",
            pageLink: "[data-page-link]",
            historyState: "[data-history-state]",
            shopifyPaymentButton: ".shopify-payment-button"
        };

    function i(i) {
        var a = this.$container = $(i),
            r = a.attr("data-section-id"),
            n = !!a.is(t.historyState),
            o = 0;
        this.addToCartButton = $(t.addToCart, a), this.addToCartText = this.addToCartButton.find(t.btnText), void 0 !== $(t.variantImage, this.$container).attr("src") && (o = Shopify.Image.imageSize($(t.variantImage, this.$container).attr("src"))), this.settings = $.extend({}, e, {
            sectionId: r,
            originalSelectorId: t.originalSelectorId + "-" + r,
            historyState: n,
            imageSize: o,
            addToCartFormId: "#AddToCartForm-" + r,
            addToCartBtnId: "#AddToCart-" + r
        }), $("#ProductJson-" + r).html() && (this.productSingleObject = JSON.parse(document.getElementById("ProductJson-" + r).innerHTML), this.init(), Shopify.Image.preload(this.productSingleObject.images, this.settings.imageSize))
    }
    return i.prototype = _.assignIn({}, i.prototype, {
        init: function() {
            this.initVariantSelectors(this.settings.originalSelectorId), "drawer" === theme.settings.cartType && ajaxCart.init({
                formSelector: this.settings.addToCartFormId,
                cartContainer: t.cartContainer,
                addToCartSelector: this.settings.addToCartBtnId,
                moneyFormat: theme.settings.moneyFormat
            })
        },
        initVariantSelectors: function(e) {
            this.optionSelector = new Shopify.OptionSelectors(e, {
                product: this.productSingleObject,
                onVariantSelected: this.productVariantCallback.bind(this),
                enableHistoryState: this.settings.historyState
            });
            var t = this.optionSelector.selectors[0];
            if (1 === this.productSingleObject.options.length && 0 === $(t.element).siblings("label").length) {
                var i = document.createElement("label");
                i.htmlFor = t.element.id, i.innerHTML = t.name, $(i).insertBefore($(t.element))
            }
            this.simplifyVariantLabels(this.productSingleObject, this.$container)
        },
        simplifyVariantLabels: function(e, t) {
            1 === e.variants.length && 1 === e.options.length && e.options[0].toLowerCase().indexOf("title") >= 0 && e.variants[0].title.toLowerCase().indexOf("default title") >= 0 && $(".selector-wrapper", t).hide()
        },
        productVariantCallback: function(e) {
            var i = $(t.pageLink, this.$container);
            if (e) {
                if (e.featured_image) {
                    var a = e.featured_image.id,
                        r = $(t.variantImageWrapper + "[data-image-id='" + a + "']", this.$container),
                        n = $(t.variantImageWrapper + ":not([data-image-id='" + a + "'])", this.$container);
                    r.removeClass("hide fade-in"), n.addClass("hide")
                } else $(t.variantImageWrapper, this.$container).removeClass("fade-in");
                if (e.available ? ($(t.addToCart, this.$container).removeClass("disabled").prop("disabled", !1), this.addToCartText.html(theme.strings.addToCart), $(t.shopifyPaymentButton, this.$container).show()) : ($(t.addToCart, this.$container).addClass("disabled").prop("disabled", !0), this.addToCartText.html(theme.strings.soldOut), $(t.shopifyPaymentButton, this.$container).hide()), $(t.productPrice, this.$container).html(Shopify.formatMoney(e.price, theme.settings.moneyFormat).replace(/((,00)|(\.00))$/g, "")), $(t.SKU, this.$container).html(e.sku), e.compare_at_price > e.price ? ($(t.salePriceWrapper, this.$container).removeClass("hide"), $(t.productPrice, this.$container).html(Shopify.formatMoney(e.compare_at_price, theme.settings.moneyFormat).replace(/((,00)|(\.00))$/g, "")), $(t.salePrice, this.$container).html(Shopify.formatMoney(e.price, theme.settings.moneyFormat).replace(/((,00)|(\.00))$/g, "")), $(t.productPrice, this.$container).addClass("on-sale")) : ($(t.productPrice, this.$container).html(Shopify.formatMoney(e.price, theme.settings.moneyFormat).replace(/((,00)|(\.00))$/g, "")), $(t.salePriceWrapper, this.$container).addClass("hide"), $(t.productPrice, this.$container).removeClass("on-sale")), i.length > 0) {
                    var o = this._updateUrlParameter(i.attr("href"), "variant", e.id);
                    i.attr("href", o)
                }
            } else $(t.addToCart, this.$container).addClass("disabled").prop("disabled", !0), this.addToCartText.html(theme.strings.unavailable), $(t.shopifyPaymentButton, this.$container).hide()
        },
        _updateUrlParameter: function(e, t, i) {
            var a = new RegExp("([?&])" + t + "=.*?(&|$)", "i"),
                r = -1 === e.indexOf("?") ? "?" : "&";
            return e.match(a) ? e.replace(a, "$1" + t + "=" + i + "$2") : e + r + t + "=" + i
        }
    }), i
}(), theme.RichTextSection = function() {
    return function() {}
}(), theme.RichTextSection.prototype = _.assignIn({}, theme.RichTextSection.prototype, {
    onSelect: function() {
        theme.styleTextLinks()
    }
}), theme.Maps = function() {
    var e = {
            zoom: 14
        },
        t = null,
        i = [];

    function a(e) {
        theme.$currentMapContainer = this.$container = $(e);
        var a = this.$container.data("api-key");
        if ("string" == typeof a && "" !== a)
            if ("loaded" === t) {
                var r = this;
                0 === $('script[src*="' + a + '&"]').length ? $.getScript("https://maps.googleapis.com/maps/api/js?key=" + a).then(function() {
                    t = "loaded", r.createMap()
                }) : this.createMap()
            } else i.push(this), "loading" !== t && (t = "loading", void 0 === window.google && $.getScript("https://maps.googleapis.com/maps/api/js?key=" + a).then(function() {
                t = "loaded", $.each(i, function(e, t) {
                    t.createMap()
                })
            }))
    }
    return a.prototype = _.assignIn({}, a.prototype, {
        createMap: function() {
            var t = this.$container.find(".map-section__container");
            return function(e) {
                var t = $.Deferred(),
                    i = new google.maps.Geocoder,
                    a = e.data("address-setting");
                return i.geocode({
                    address: a
                }, function(e, i) {
                    i !== google.maps.GeocoderStatus.OK && t.reject(i), t.resolve(e)
                }), t
            }(t).then(function(i) {
                var a = {
                        zoom: e.zoom,
                        styles: e.styles,
                        center: i[0].geometry.location,
                        draggable: !1,
                        clickableIcons: !1,
                        scrollwheel: !1,
                        disableDoubleClickZoom: !0,
                        disableDefaultUI: !0
                    },
                    r = this.map = new google.maps.Map(t[0], a),
                    n = this.center = r.getCenter();
                new google.maps.Marker({
                    map: r,
                    position: n
                });
                google.maps.event.addDomListener(window, "resize", $.debounce(250, function() {
                    google.maps.event.trigger(r, "resize"), r.setCenter(n)
                }))
            }.bind(this)).fail(function() {
                var e;
                switch (status) {
                    case "ZERO_RESULTS":
                        e = theme.strings.addressNoResults;
                        break;
                    case "OVER_QUERY_LIMIT":
                        e = theme.strings.addressQueryLimit;
                        break;
                    default:
                        e = theme.strings.addressError
                }
                var i = t.parents(".map-section");
                Shopify.designMode ? (i.addClass("page-width map-section--load-error"), i.find(".map-section__content-wrapper").remove(), i.find(".map-section__wrapper").html('<div class="errors text-center" style="width: 100%;">' + e + "</div>")) : i.removeClass("map-section--display-map")
            })
        },
        onUnload: function() {
            void 0 !== window.google && google.maps.event.clearListeners(this.map, "resize")
        }
    }), a
}(), theme.FeaturedVideoSection = function() {
    return function() {
        theme.responsiveVideos()
    }
}(), theme.FeaturedVideoSection.prototype = _.assignIn({}, theme.FeaturedVideoSection.prototype, {
    onSelect: function() {
        theme.responsiveVideos()
    }
}), theme.init = function() {
    theme.cacheSelectors(), theme.stringOverrides(), theme.drawersInit(), theme.initCart(), theme.afterCartLoad(), theme.rteImages(), theme.styleTextLinks(), theme.searchSubmit(), theme.socialSharing(), theme.passwordTemplate(), theme.responsiveVideos(), theme.checkIfIOS()
}, theme.cacheSelectors = function() {
    theme.cache = {
        $window: $(window),
        $html: $("html"),
        $body: $("body"),
        $indexTemplate: $(".template-index"),
        $cartSectionTemplate: $(".cart-template-section"),
        $drawerRight: $(".drawer--right"),
        $drawerProduct: $(".drawer--product"),
        $cartContainer: $("#CartContainer"),
        $productGridItem: $(".product-item"),
        $shareButtons: $(".social-sharing"),
        $indentedRteImages: $(".rte--indented-images"),
        $loginModal: $("#LoginModal"),
        $announcementBar: $(".announcement-bar"),
        $siteHeaderWrapper: $(".site-header-wrapper"),
        $siteHeader: $(".site-header-container"),
        $siteHeaderCart: $(".site-header__cart"),
        $searchInput: $(".search-bar__input"),
        $searchSubmit: $(".search-bar__submit"),
        $heroWrapper: $(".hero-wrapper"),
        $hero: $("#Hero"),
        $heroImages: $(".hero__image"),
        cartNoCookies: "cart--no-cookies"
    }, theme.variables = {
        isIndexTemplate: theme.cache.$indexTemplate.length,
        footerTop: 0,
        windowWidth: theme.cache.$window.width()
    }
}, theme.stringOverrides = function() {
    window.productStrings = window.productStrings || {}, $.extend(theme.strings, window.productStrings)
};
$(".drawer-nav__toggle").on("click", function() {
    $(this).parent().toggleClass("drawer-nav--expanded");
    $(this).parent().hasClass("drawer-nav--expanded") ? ($(this).children(".drawer-nav__toggle-button").attr("aria-expanded", !0), $(this).find(".icon-plus").removeClass("icon-plus").addClass("icon-minus")) : ($(this).children(".drawer-nav__toggle-button").attr("aria-expanded", !1), $(this).find(".icon-minus").removeClass("icon-minus").addClass("icon-plus"))
})
theme.initCart = function() {

    ajaxCart.init({
        moneyFormat: theme.settings.moneyFormat
    });


    if (!theme.cookiesEnabled()) {
        theme.cache.$cartContainer.addClass(theme.cache.cartNoCookies);
        theme.cache.$cartSectionTemplate.addClass(theme.cache.cartNoCookies);
    }
};

theme.cookiesEnabled = function() {
    var e = navigator.cookieEnabled;
    return e || (document.cookie = "testcookie", e = -1 !== document.cookie.indexOf("testcookie")), e
};

theme.drawersInit = function() {
    // Add required classes to HTML
    $('#PageContainer').addClass('drawer-page-content');
    $('.js-drawer-open-right').attr('aria-controls', 'CartDrawer').attr('aria-expanded', 'false');
    $('.js-drawer-open-left').attr('aria-controls', 'NavDrawer').attr('aria-expanded', 'false');
    $('.js-drawer-open-top').attr('aria-controls', 'SearchDrawer').attr('aria-expanded', 'false');

    theme.LeftDrawer = new theme.Drawers('NavDrawer', 'left');
    theme.RightDrawer = new theme.Drawers('CartDrawer', 'right', {
        'onDrawerOpen': ajaxCart.load
    });
    theme.SearchDrawer = new theme.Drawers('SearchDrawer', 'top', {
        'onDrawerOpen': theme.searchFocus
    });
};

theme.searchFocus = function() {
    theme.cache.$searchInput.focus(), theme.cache.$searchInput[0].setSelectionRange(0, theme.cache.$searchInput[0].value.length)
}, theme.searchSubmit = function() {
    theme.cache.$searchSubmit.on("click", function(e) {
        0 == theme.cache.$searchInput.val().length && (e.preventDefault(), theme.cache.$searchInput.focus())
    })
};

theme.socialSharing = function() {
    // Stop initializing if settings are disabled

    return;


    // General selectors
    var $buttons = theme.cache.$shareButtons,
        $shareLinks = $buttons.find("a"),
        permalink = $buttons.attr("data-permalink");
    $shareLinks.on("click", function(a) {
        a.preventDefault();
        var e = $(this),
            t = e.attr("class").replace("-", "_"),
            r = e.attr("href"),
            s = 700,
            n = 400;
        switch (t) {
            case "share-twitter":
                n = 300;
                break;
            case "share-fancy":
                s = 480, n = 720;
                break;
            case "share-google":
                s = 500
        }
        window.open(r, t, "width=" + s + ", height=" + n)
    });
}

function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}
$(".quickBuy_Homepage-btn").click(function(e) {

    e.stopPropagation();
    e.preventDefault();

    if ($(this).find("div").hasClass("continue-pre-sale")) {
        let line_item = '<p style="display:none;" class="line-item-property__field">' +
            `<input id="pre-sale" type="hidden" name="properties[Order Type]" value=" Pre Sale">` +
            '</p>';
        $(this).closest(".size-prod-content").find("form").prepend(line_item);
    } else {
        $(this).closest(".size-prod-content").find(".line-item-property__field").remove();
    }

    var t = $(this).parent().attr("data-q-li") - 1;
    let r = $(this).closest(".quickBuyButtons").find("form");
    o = $(r).find("select");
    $(o).children().eq(t).prop("selected", true);
    jQuery.post('/cart/add.js', $(r).serialize());
    setTimeout(function() {
        ajaxCart.load();
        theme.RightDrawer.open()
    }, 1000);
    if ($(this).hasClass('bn-size-message')) {

    }
});

function selectTriggerProd(e) {
    var t = e.getAttribute("data-q-li") - 1;
    document.getElementById("AddToCartForm-product-template");
    document.getElementById("ProductSelect-product-template").selectedIndex = t, document.getElementById("AddToCart-product-template").click()
}
$(document).ready(function() {
    let elem = $("body").find(".quickBuyButtons-product");
    if (elem.length == 0) {
        prodisSelected = true;
    }
    // if($(this).attr('data-add-for') != 'from-pop-up'){
    //     prodisSelected = true
    // }
})
$(".btn--add-to-cart").click(function(e) {


    
    if (prodisSelected  ) {
        e.stopPropagation();
        //     document.querySelectorAll('#pre-sale').forEach(function(i,v){i.remove()})
        //     only-btn-by-shop
        if (getCookie("popup") == null) {
            $(".popup_collection").addClass("show");
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            let date = new Date();
            let year = date.getUTCFullYear();
            let month = date.getUTCMonth();
            let day = date.getUTCDate();
            var fulltime = date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
            var nextDay = new Date(day);
            nextDay.setUTCDate(date.getUTCDate() + 1);
            document.cookie = `popup=Buy Now Popup today opened; ${nextDay} ${month} ${year} ${fulltime} UTC;`;
        }
        console.log($(this));
        jQuery.post('/cart/add.js', $($(this).closest("body").find(".product-details form")).serialize());
        setTimeout(function() {

            //       console.log(cartContents.feed);
//             freeProduct();
//             freePsvCollectionProduct($(this))
            freeAnyProduct()
            ajaxCart.load();
            theme.RightDrawer.open()
        }, 1000);
    } else {
        alert("Please select your size")
    }
});

$('.quickBuySizeInput').click(function(h) {
    h.stopPropagation();
    console.log($(this), "qwert");
    // jQuery.post('/cart/add.js', $($(this).closest("body").find(".quickBuyRow form")).serialize()); setTimeout(function(){

    //       console.log(cartContents.feed);
    setTimeout(()=>{
//         freeProduct()
//         freePsvCollectionProduct($(this))
        freeAnyProduct()
    },500)
//     freeProduct();
    // ajaxCart.load();theme.RightDrawer.open()},1000);
});
$('.bn_going_to').click(function(){
    setTimeout(()=>{
        // freeProduct()
//         freePsvCollectionProduct($(this))
        freeAnyProduct()
    },500)
});

$(".quickBuySizeInput-product").click(function(h) {
    console.log($(this).hasClass("disabled"));
    console.log(this.classList.contains('disabled'));
    // if ($( window ).width()<768 ) {	
    // 		$([document.documentElement, document.body]).animate({
    //           scrollTop: $(".unisex-image-container").offset().top,
    //           scrollTop: $(".product-image-container-mobile").offset().top
    // 			}, 500);
    // }

    setTimeout(function() {
        $(".preOrder-btn").addClass('jello-horizontal');
        $('.btn--add-to-cart').addClass('jello-horizontal');
    }, 700)

    setTimeout(function() {
        $('.btn--add-to-cart').removeClass('jello-horizontal');
        $(".preOrder-btn").removeClass('jello-horizontal');
    }, 1300)

    if (this.classList.contains('disabled')) {
        //     	document.querySelector('.buy-now-preOrder-btns').style.display = 'none' ;

        $('.buy-now-preOrder-btns').hide();
        $('.btn--add-to-cart').not('.only-btn-by-shop').hide();
        $('#AddToCart-product-template').hide();


    } else {

        $('.buy-now-preOrder-btns').show();
        $('#AddToCart-product-template').show();
        $('.btn--add-to-cart').not('.only-btn-by-shop').show();

        //     	document.querySelector('.buy-now-preOrder-btns').style.display = 'block' ;
    }
    document.querySelectorAll(".quickBuyButtons-product li").forEach(function(e) {
        e.classList.remove("set-li-selected")
    });
    $(this).addClass("set-li-selected");
    if ($(this).find("div").hasClass("continue-pre-sale")) {
        $(".weeks-4-6").show();
        if ($(this).find("div").hasClass("green")) {
            $(".weeks-4-6").addClass("green");
            $(".preOrder-btn").hide();
            $(".buy-now-btn").addClass("green")
                .html("IN STOCK")
                .show();

        } else {
            $(".weeks-4-6").removeClass("green");
            $(".buy-now-btn").hide();
            $(".preOrder-btn").css({
                marginLeft: 0
            });
            $(".preOrder-btn").show();
        }


    } else {
        $(".weeks-4-6").hide();
        $(".buy-now-btn").show();
        $(".preOrder-btn").hide();
    }
    var t = $(this).attr("data-q-li") - 1;
    console.log(t);
    prodisSelected = true;
    document.getElementById("AddToCartForm-product-template-card");
    $(`#ProductSelect-product-template,#ProductSelect-product-template-mobile,#ProductSelect-product-official-mobile,#ProductSelect-product-official,#ProductSelect-product-template-unisex,#ProductSelect-product-template-unisex-mobile,#ProductSelect-product-template-giftbox,#ProductSelect-product-template-giftbox-mobile`).prop("selectedIndex", t);
    // console.log($(this));
});
theme.sizeCartDrawerFooter = function() {
    if (theme.cache.$drawerRight.hasClass("drawer--has-fixed-footer")) {
        var e = $(".ajaxcart__footer").removeAttr("style"),
            t = $(".ajaxcart__inner").removeAttr("style"),
            r = e.outerHeight();
        t.css("bottom", r), e.css("height", r)
    }
}, theme.afterCartLoad = function() {
    theme.cache.$cartContainer.on("ajaxCart.afterCartLoad", function(e, t) {
        theme.RightDrawer.open(), t.item_count > 0 ? theme.cache.$siteHeaderCart.addClass("cart-bubble--visible") : theme.cache.$siteHeaderCart.removeClass("cart-bubble--visible"), theme.sizeCartDrawerFooter()
    }), theme.cache.$cartContainer.on("ajaxCart.updatingQty", function() {
        $(".cart__checkout").addClass("btn--ajax-disabled")
    })
}, theme.rteImages = function() {
    if (theme.cache.$indentedRteImages.length) {
        var e = theme.cache.$indentedRteImages.find("img");
        imagesLoaded(e).on("always", function(t, r) {
            e.each(function() {
                var e = $(this),
                    t = e.width(),
                    r = e.attr("style");
                r && "float: none;" != r || t < 1.4 * theme.cache.$indentedRteImages.width() && e.addClass("rte__no-indent")
            })
        })
    }
}, theme.styleTextLinks = function() {
    $(".rte").find("a:not(:has(img))").addClass("text-link")
}, theme.setFocus = function(e, t) {
    var r = t ? "focusin." + t : "focusin";
    e.attr("tabindex", "-1"), e.focus(), $(document).on(r, function(t) {
        e[0] === t.target || e.has(t.target).length || (e.focus(), $(document).off(r), e.removeAttr("tabindex"))
    })
}, theme.passwordTemplate = function() {
    theme.cache.$loginModal.length && (theme.PasswordModal = new window.Modals("LoginModal", "login-modal", {
        $focusOnOpen: "#Password"
    }), theme.cache.$loginModal.find(".errors").length && theme.PasswordModal.open())
}, theme.responsiveVideos = function() {
    var e = $('iframe[src*="youtube.com/embed"], iframe[src*="player.vimeo"]'),
        t = e.add("iframe#admin_bar_iframe");
    e.each(function() {
        $(this).parent().hasClass("video-wrapper") || $(this).wrap('<div class="video-wrapper"></div>')
    }), t.each(function() {
        this.src = this.src
    })
}, theme.checkIfIOS = function() {
    var e = navigator.userAgent.toLowerCase();
    /ipad|iphone|ipod/.test(e) && !window.MSStream && $("html").addClass("is-ios")
}, $(document).ready(function() {
    $(".shopify-currency-form select").on("change", function() {
        $(this).parents("form").submit()
    });
    let currency_flags = {
            AUD: "https://cdn.shopify.com/s/files/1/0854/5504/files/aud.svg?15010",
            EUR: "https://cdn.shopify.com/s/files/1/0854/5504/files/eur.svg?15010",
            NZD: "https://cdn.shopify.com/s/files/1/0854/5504/files/nzd.svg?15010",
            CAD: "https://cdn.shopify.com/s/files/1/0854/5504/files/cad.svg?15010",
            SEK: "https://cdn.shopify.com/s/files/1/0854/5504/files/sek.svg?15010",
            SGD: "https://cdn.shopify.com/s/files/1/0854/5504/files/sgd.svg?15010",
            HKD: "https://cdn.shopify.com/s/files/1/0854/5504/files/hkd.svg?15010",
            DKK: "https://cdn.shopify.com/s/files/1/0854/5504/files/dkk.svg?15010",
            GBP: "https://cdn.shopify.com/s/files/1/0854/5504/files/gbp.svg?15010",
            JPY: "https://cdn.shopify.com/s/files/1/0854/5504/files/jpy.svg?15010",
            USD: "https://cdn.shopify.com/s/files/1/0854/5504/files/usd.svg?15010"
        },
        img_link_selected = $(".custom-currency-flag-selected").val().split(" ")[0],
        valuText_selected = document.createElement("p");
    $(valuText_selected).text($(".custom-currency-flag-selected").val());
    let flag_img_selected = document.createElement("img");
    $(flag_img_selected).addClass("selected_currency lazyload");
    let clone_selected_currency = $(".clone_selected_currency");
    flag_img_selected.setAttribute("data-src", currency_flags[img_link_selected]);
    $(".clone_selected_currency").append(flag_img_selected);
    $(".clone_selected_currency").append(valuText_selected);
    $(".custom-currency-flag").each(function(e, c) {
        let s = c.value;
        c.setAttribute("data-id", s);
        let t = document.createElement("p");
        $(t).text(s);
        let l = document.createElement("img");
        $(l).addClass("no-selected_currency lazyload");
        l.setAttribute("data-src", currency_flags[s]);
        let n = $(".clone_currency");
        i = document.createElement("li");
        $(i).append(l), $(i).append(t), n.append(i)
    });
    $(".clone_selected_currency").click(function(e) {
        e.stopPropagation(), $(".clone_currency").toggleClass("currency_showing")
    }), $(window).click(function(e) {
        if ($(".clone_currency").hasClass("currency_showing")) {
            $(".clone_selected_currency").trigger("click")
        }
    });
    $(".clone_currency li").click(function() {
        let e = $(this).find("p").html();
        console.log(e);
        $(`option[data-id='${e}'`).prop("selected", "selected");
        $(".shopify-currency-form").submit()
    });
    /*let e=$(".video_outher video").innerHeight();for(let e of $("video").get())e.play()*/
    ;
    theme.init();
    var t = new theme.Sections;
    t.register("action-bar-section", theme.ActionBarSection), t.register("slideshow-section", theme.SlideshowSection), t.register("sidebar-menu-section", theme.SidebarMenuSection), t.register("header-section", theme.HeaderSection), t.register("collection-template-section", theme.CollectionTemplate), t.register("product", theme.Product), t.register("rich-text-section", theme.RichTextSection), t.register("featured-video-section", theme.FeaturedVideoSection), t.register("map-section", theme.Maps)
});
var linkWrapper = $(".product-item__link-wrapper");
document.documentElement.clientWidth > 1200 && (linkWrapper.hover(function() {
    let e = this.querySelector(".product-item__image").getAttribute("data-second-image");
    this.querySelector(".product-item__image").setAttribute("src", e);
}), linkWrapper.mouseleave(function() {
    let e = this.querySelector(".product-item__image").getAttribute("data-src");
    this.querySelector(".product-item__image").setAttribute("src", e);
})), $(".collection-list.collection-list--1574465381747 .sales_gif").hide();

$(window).load(function() {
    let mobAfterpay = $(".afterpay-paragraph").clone(true);
    let dectopAfterPay = $("#custom-afterpay");
    dectopAfterPay.append(mobAfterpay);
})
if ($(document).width() < 420) {
    let quickBtns = $(".quickBuyRow.quick-inline");
    $(quickBtns).each(function() {
        let quickContent = $(this).closest(".quickbtnsContent").find(".prod-caption");
        $(this).removeClass("quick-inline");
        $(this).insertBefore(quickContent);
    })
}


$(".tut_close").click(function() {
    $(".tooltip").css({
        display: "none"
    })
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    let date = new Date();
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth();
    let day = date.getUTCDate();
    var fulltime = date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
    var nextDay = new Date(day);
    nextDay.setUTCDate(date.getUTCDate() + 1);
    document.cookie = `tutorialPopup=Buy Now Popup today opened; ${nextDay} ${month} ${year} ${fulltime} UTC;`;
});
$(".row.quickBuyRow").on("mousemove touchstart touchend", function(e) {

    e.stopPropagation();
});
$(".close-popup-col").click(function() {
    $(".popup_collection").removeClass("show");
})
$(".quickBuyRow.quick-inline").click(function(e) {
    e.stopPropagation();
    e.preventDefault();
})

$(document).ready(function() {

    // 	if(window.location.href.toString().includes("products")){
    // 		Array.prototype.unique = function() {
    //     var a = this.concat();
    //     for(var i=0; i<a.length; ++i) {
    //         for(var j=i+1; j<a.length; ++j) {
    //             if(a[i] === a[j])
    //                 a.splice(j--, 1);
    //         }
    //     }

    //     return a;
    // };

    // 	 let thisProduct = {};
    //       jQuery.ajax({
    //         type: 'GET',
    //         url: `${window.location.href}.js`,
    //         data: thisProduct,
    //         dataType: 'json',
    //         success: function(data) {
    //         	let cechall = [];
    //         	if(getCookie("prodTags")==null || getCookie("prodTags")==""){
    //         		for(tags of data.tags){
    //         			if(!tags.includes("do-not-promote")){
    //         		cechall.push(tags);
    //         		}

    //         	}
    //         	var json_str = JSON.stringify(cechall);

    // 			document.cookie=`prodTags = ${json_str}`;
    //         	}
    //         	else{
    //         		for(tags of data.tags){
    //         			if(!tags.includes("do-not-promote")){
    //         		cechall.push(tags);
    //         		}
    //         	}
    //         	let oldArr=$.parseJSON(getCookie("prodTags"));
    //         	oldArr = oldArr.concat(cechall).unique();
    // 			var json_strnew = JSON.stringify(oldArr);
    // 			document.cookie=`prodTags = ${json_strnew}`;
    //         	}
    //         }
    //       });


    //       let prodArray = $.parseJSON(getCookie("prodTags"));

    //       console.log(prodArray);
    //       function containsAll(needles, haystack){ 
    //   for(var i = 0; i < needles.length; i++){
    //      if($.inArray(needles[i], haystack) != -1) return $.inArray(needles[i], haystack);
    //   }
    //   return false;
    // }

    //       /*======--->  REQUEST ALL PRODUCTS IN STAX BY TOKEN <---=======*/
    //       let slickRecomend = $("#recomendedSection");
    //       const username = ""; // API USERNAME
    //       const password = ""; // API PASSWORD 
    //       const url = "https://stax-livin.myshopify.com/admin/api/2020-01/products.json?limit=250"; // STAX ADMIN URL FOR ALL PRODUCTS (JSON file)
    // 	  const proxyurl = "https://cors-anywhere.herokuapp.com/"; // site that doesn’t send Access-Control-*
    // 	  const token = btoa(`${username}:${password}`, 'utf8').toString('base64') // API USERNAME & PASSWORD BY BASE64 ENCODING
    // 	  /*==== FETCH REQUEST IN AUTHORIZATION ====*/
    // 	  fetch(proxyurl + url, {
    //   		headers: new Headers({
    //    			'Authorization': `Basic ${token}`
    //   		})
    // 	  })
    // 		.then(response => response.json())  // STATUS CODE 200
    // 		.then(data => {
    // 			let maxTags = [];
    // 			data.products.forEach(function(prod,index){
    // 				if(containsAll(prod.tags.split(','),prodArray)>0 && !prod.tags.includes("do-not-promote")){
    // 					console.log(prod.tags)
    // 						let a = {
    // 						id:index,
    // 						count : containsAll(prod.tags.split(','),prodArray)
    // 					}
    // 					maxTags.push(a);


    // 				}
    // 			})
    // 			console.log(maxTags);
    // 					const uniqueMax = Array.from(new Set(maxTags.map(s=>s.count)))
    // 					.map(count => {
    // 						return{
    // 							count:count,
    // 							id: maxTags.find(s => s.count === count ).id
    // 						};
    // 					});
    // 					let topMaxTegs = uniqueMax.sort((b,a) => a.count-b.count).slice(0,3);
    // 					console.log(topMaxTegs,"aaaaa");
    // 					while(topMaxTegs.length!=6){
    // 						let random_Tag = parseInt(Math.random()*data.products.length);
    // 						let prodBool = true;
    // 						prodBool = data.products[random_Tag].tags.includes("promote");
    // 						console.log(prodBool);
    // 						let withoutIndex = topMaxTegs.findIndex(x => x.id == random_Tag);
    // 						if(withoutIndex==-1 && !prodBool){
    // 							let a = {
    // 						id:random_Tag,
    // 						count : 1
    // 					}
    // 					topMaxTegs.push(a);
    // 						}


    // 					}
    // 					topMaxTegs.forEach(function(element,index){
    // 						let imgDiv = document.createElement("div");
    // 						let title_price = document.createElement("div");
    // 						let price_recomendedContent = document.createElement("span");
    // 						price_recomendedContent.classList.add("prod-price");
    // 						let price_recomended = document.createElement("span");
    // 						price_recomended.classList.add("money");
    // 						price_recomended.innerHTML = Shopify.formatMoney(data.products[element.id].variants[0].price,theme.settings.moneyFormat);
    // 						price_recomendedContent.appendChild(price_recomended);
    // 						let title_recomended = document.createElement("p");
    // 						title_recomended.classList.add("correct_text");
    // 						title_recomended.innerHTML = data.products[element.id].title;
    // 						title_price.appendChild(title_recomended);
    // 						title_price.appendChild(price_recomendedContent);

    // 						title_price.classList.add("title_price_recomended");
    // 						console.log(data.products[0]);
    // 						imgDiv.classList.add("recomended-content");

    // 						let tagLinkContent  = document.createElement("a");

    // 						tagLinkContent.setAttribute("href",`/products/${data.products[element.id].handle}`)
    // 						let tagImg = document.createElement("img");
    // 						tagImg.setAttribute("src",data.products[element.id].images[0].src);
    // 						tagLinkContent.appendChild(tagImg)
    // 						tagLinkContent.appendChild(title_price);
    // 						imgDiv.appendChild(tagLinkContent);
    // 						slickRecomend.append(imgDiv);
    // 					})
    // 					$("#recomendedSection").slick({
    // 						arrows:false,
    // 		dots: true,
    // 		slidesToScroll: 1,
    // 		autoplay: true,
    // 		slidesToShow: 4,
    // 		infinity: true,
    // 		speed: 300,
    // 		responsive: [
    //     {
    //       breakpoint: 425,
    //       settings: {
    //       	arrows:false,
    //         slidesToShow: 1,
    //         slidesToScroll: 1,
    //         infinite: true,
    //         dots: false
    //       }
    //     }]
    // 					})
    // 		})
    // 		.catch(error => console.error(error))
    // 	}




    if (getCookie("tutorialPopup") != null) {

        $(".tooltip").css({
            display: "none"
        })
    }
    $(".multiple-collection-carousel").slick({
        arrows: false,
        dots: false,
        vertical: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        speed: 300,
        verticalSwiping: true
    });
    $(".collection-carousel").slick({
        arrows: true,
        dots: false,
        prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
        nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
        slidesToScroll: 1,
        autoplay: false,
        slidesToShow: 4,
        centerPadding: '100px',
        infinity: true,
        speed: 300,
        responsive: [{
                breakpoint: 769,
                settings: {
                    arrows: false,
                    prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
                    nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 426,
                settings: {
                    arrows: false,
                    prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
                    nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            }
        ]
    });
    
//     if ($(window).width() < 425) {

//         $(".feature-row__image-wrapper .feature-row__image ").each(function(index, element) {

//             let feature_image_custom = $(".feature-row__image-wrapper .feature-row__image ")[index];
//             let asseptRatio = $(element).attr("aspect-mobile");
//             $(element).closest('.feature-row__image-wrapper').css({
//                 paddingTop: `${asseptRatio}%`
//             });
//             let mobImage = $(element).attr("img-mobile");
//             $(feature_image_custom).attr("src", mobImage);
//             //         feature_image_custom_top.setAttribute("data-src",mobImageTop);
//         })


//         let mainBannerMobileLink = $(".top_image_content img").attr("img-mobile");
//         $(".top_image_content img").attr("src", mainBannerMobileLink);
//     }
$(window).load(function(){
        
    $('.bn_image_with_text_height').css("height","auto");
    if ($(window).width() < 426) {

        $(".feature-row__image-wrapper .feature-row__image ").each(function(index, element) {

            let feature_image_custom = $(".feature-row__image-wrapper .feature-row__image ")[index];
            
            let asseptRatio = $(element).attr("aspect-mobile");
            $(element).closest('.feature-row__image-wrapper').css({
                paddingTop: `${asseptRatio}%`
            });
            let mobImage = $(element).attr("img-mobile");
            $(feature_image_custom).attr("src", mobImage);
            
            //         feature_image_custom_top.setAttribute("data-src",mobImageTop);
        })


        let mainBannerMobileLink = $(".top_image_content img").attr("img-mobile");
        $(".top_image_content img").attr("src", mainBannerMobileLink);
    }else{
        $(".feature-row__image-wrapper .feature-row__image ").each(function(index, element) {

            let deskImage = $(element).attr("data-src");
        let feature_image_custom = $(".feature-row__image-wrapper .feature-row__image ")[index];
        $(feature_image_custom).attr("src", deskImage);
        // console.log( $(feature_image_custom).attr("src"));
            
        })
        
    }
})


});
$(".card-select-input").click(function() {
    $("#ProductSelect-product-template-card,#ProductSelect-product-template-card-mobile").prop("selectedIndex", $(this).attr("data-q-li") - 1);

})




$(".only-btn-by-shop").click(function(e) {
    document.querySelectorAll('#pre-sale').forEach(function(i, v) {
        i.remove()
    })
})
$('.bn-size-message').click(function() {
    let message = `<p>WOMENS size <span>${$(this).attr('data-variant-title').split('/')[0]}</span>  &nbsp;&nbsp;&nbsp;   MENS size <span>${$(this).attr('data-variant-title').split('/')[1]}</span></p>`;
    $('.message-content').html(message);
});

if ($(window).width() > 768) {
    $('.product-item__image-container').mousemove(function(e) {

        let data
        var y = e.pageY - $(e.currentTarget).offset().top;
        var x = e.pageX - $(e.currentTarget).offset().left;

        var dataZoom = $(this).find(".zooming-image").attr("data-zoom-src");
        // console.log($(this).find(".zooming-image").attr("data-zoom-src"));



        $(this).find(".zooming-image").attr("src", dataZoom);
        $(this).find(".zooming-image").css({

            "left": `${(this.clientHeight/2)-x}px`,
            "top": `${(this.clientWidth/3)*1.96-y}px`,
            "transform": `scale(2)`

        });

    });
}
$('.product-item__image-container').mouseleave(function() {
    $(this).find(".zooming-image").css({
        "left": 0,
        "top": 0
    });
});
$('.bn-custom-product-page-zoom .slick-slide').mouseenter(setDataZoom());

function setDataZoom() {

    $('.bn-custom-product-page-zoom .zooming-image').each(function(index, val) {
        let zoomingImage = $(val).attr("data-zoom-src");
        console.log(zoomingImage);
        $(val).attr("src", zoomingImage);
    });



}
// $(document).off('mouseenter','.bn-custom-product-page-zoom .slick-slide');
setTimeout(() => {
    $('.bn-custom-product-page-zoom .slick-slide').mousemove(function(e) {


        // $('.bn-custom-product-page-zoom').find(".zooming-image").attr("src",zoomingImage)
        var y = e.pageY - $(e.currentTarget).offset().top;
        var x = e.pageX - $(e.currentTarget).offset().left;


        $(this).find(".zooming-image").css({

            "left": `${(this.clientHeight/2)-x}px`,
            "top": `${(this.clientWidth/3)*1.96-y}px`,
            "transform": `scale(2.3)`

        });

        // console.log($(val));
        // val.style.left = $( (this.clientHeight/2)-x +'px')
        // $val.css({
        //   "left":`${(this.clientHeight/2)-x}px`,
        //   "top":`${(this.clientWidth/3)*1.96-y}px`,
        //   "transform":`scale(2)`
        // });

    });
}, 0)




var oneSizeBoxSize = 63;
// var BuyNowButton = document.querySelector('');
var countSizeBox = document.querySelectorAll('.quickBuyButtons-product li').length;

var fullSizeOfBoxes = (oneSizeBoxSize * countSizeBox) - 10 - (2 * oneSizeBoxSize);
$('.for-size-chart-and-buynow .bn-buy-buttons').css({
    'width': `${fullSizeOfBoxes}px`
})
// BuyNowButton.style.width = fullSizeOfBoxes + "px";
// alert(fullSizeOfBoxes);

$(".action-bar__menu-item.action-bar--has-dropdown").hover(function() {
    let height = $(this).find(".menu-hover-out").innerHeight();
    if ($(window).width() > 1890) {
        $(".bg-white").css({
            top: '44px'
        })
    } else {
        $(".bg-white").css({
            top: '40px'
        })
    }

    $(".bg-white").css({
        zIndex: 1,
        opacity: 1,
        height: `${height + 90}px`
    })
    $(".shopify-section.index-section").addClass("blur-effect");
    $(".container.page-full-width").addClass("blur-effect");
    $("#section-insta").addClass("blur-effect");
    $(".vip_list_main").addClass("blur-effect");
});


$(".action-bar__menu-item").mouseleave(function() {

    $(".bg-white").css({
        opacity: 0,
        height: 0
    })
    $(".shopify-section.index-section").removeClass("blur-effect");
    $(".container.page-full-width").removeClass("blur-effect");
    $("#section-insta").removeClass("blur-effect");
    $(".vip_list_main").removeClass("blur-effect");
});
// $(window).scroll(function() {
// var  intElemScrollTop = $(window).scrollTop();
// console.log(intElemScrollTop)
// });

$(window).scroll(function() {
    if ($(window).scrollTop() >= 100) {
        // alert(1);
        $(".bg-white").css({
            position: 'fixed',
            top: 0,
            left: 0
        })
        $('.action-bar__link').addClass("bn-custom-action-bar-link");
        $('.bn-logotype').removeClass("bn-logotype-display-none");
    } else if ($(window).scrollTop() < 152) {
        $(".bg-white").css({
            position: 'absolute',
            top: '40px'
        })
        $('.action-bar__link').removeClass("bn-custom-action-bar-link");
        $('.bn-logotype').addClass("bn-logotype-display-none");
    } else {
        $(".bg-white").css({
            position: 'fixed',
            top: '40px'
        })
        $('.bn-logotype').addClass("bn-logotype-display-none");
    }
});


$(window).scroll(function(event) {
    var scroll = $(window).scrollTop();
    if (scroll > 85) {
        $(".action-area").addClass("js-sticky-action-bar");

    } else {
        $(".action-area").removeClass("js-sticky-action-bar");
    }
});

// $(".custom-vertical-slideshow").slick({
//     slidesToShow: 4,
//     slidesToScroll: 1,
//   	arrows: false,
//   vertical: true
// });


// Add something to given element placeholder
function addToPlaceholder(toAdd, el) {
    el.attr('placeholder', el.attr('placeholder') + toAdd);
    // Delay between symbols "typing" 
    return new Promise(resolve => setTimeout(resolve, 100));
}

// Cleare placeholder attribute in given element
function clearPlaceholder(el) {
    el.attr("placeholder", "");
}

// Print one phrase
function printPhrase(phrase, el) {
    return new Promise(resolve => {
        // Clear placeholder before typing next phrase
        clearPlaceholder(el);
        let letters = phrase.split('');
        // For each letter in phrase
        letters.reduce(
            (promise, letter, index) => promise.then(_ => {
                // Resolve promise when all letters are typed
                if (index === letters.length - 1) {
                    // Delay before start next phrase "typing"
                    setTimeout(resolve, 1000);
                }
                return addToPlaceholder(letter, el);
            }),
            Promise.resolve()
        );
    });
}

// Print given phrases to element
function printPhrases(phrases, el) {
    // For each phrase
    // wait for phrase to be typed
    // before start typing next
    phrases.reduce(
        (promise, phrase) => promise.then(_ => printPhrase(phrase, el)),
        Promise.resolve()
    );
}

// Start typing
function run() {
    let phrases = [
        "Search Our Website "

    ];

    printPhrases(phrases, $('#SearchInput'));
}
$('.icon-search').click(function() {
    run();

})




// if (window.width < 425) {
//   $('.bn-custom-video-banner-container').addClass('hidde_video');
//   $('.bn-custom-mobile-video-container').removeClass('hidde_video');
// }



// let handle  = $(".quickBuySizeInput-product").attr("handle");	
// function myFunction() {
// 	jQuery.getJSON(`/products/${handle}.js`, function(product) {
// 	var txt;
// 	console.log(product)
//     if (confirm("Press a button!")) {
//         txt = product.handle;
//     } else {
//         txt = "You pressed Cancel!";
//     }
//     document.getElementById("demo").innerHTML = txt;


// });

// }

// Get the modal
var modal = document.getElementById("bn-myModal");
let bagmodal = document.getElementById("modalBagMain_container");
 let capmodal = document.getElementById("modalCapMain_container");
// var socksbtn = document.getElementsByClassName("");
// var socksbtn = document.getElementById("socksId");
var bagbtn = document.getElementById("bagId");
var capbtn = document.getElementById("capId");

let AllCloseModalGlobal =  document.getElementById("bn-ALlmyModal");

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("bn-close")[0];

btn = document.createElement('button');
btnClose = document.getElementById('bn-modal-btn-close');
btn.setAttribute("id", "myBtn");
Allbtn = document.createElement('button');
btn.setAttribute("id", "AllmyBtn");


// When the user clicks the button, open the modal 
btn.onclick = function() {
  AllCloseModalGlobal.style.display = "block";

}
Allbtn.onclick = function() {
  modal.style.display = "block";

}

$('#bn-Allmodal-btn-close').click(function(){
    // AllCloseModalGlobal.style.display = "none";
    $("#bn-ALlmyModal").hide();
});
$('#bn-Allmodal_bags-btn-close').click(function(){
    $("#bn-ALlmyModal").hide();
});
$('#bn-Allmodal_caps-btn-close').click(function(){
    $("#bn-ALlmyModal").hide();
});

btnClose.onclick = function() {
    modal.style.display = "none";
    setTimeout(function(){ 
          if (count > 0) {
              modal.style.display = "block";
              $('.bn_popup_slick').slick({
                  arrows: true,
                  dots: false,
                  prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
                  nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
                  slidesToScroll: 1,
                  autoplay: true,
                  slidesToShow: 5,
                  // centerPadding: '100px',
                  infinite: true,
                  speed: 300,
                  adaptiveHeight: true,
                  responsive: [{
                      breakpoint: 426,
                      settings: {
                          arrows: true,
                          prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
                          nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
                          slidesToShow: 2,
                          slidesToScroll: 1,
                        centerPadding: '100px',
                          infinite: true,
                          dots: false
                      }
                  }
                  ]
              });
  
  
              // if (globalTotalModalOpenCount > 0) {
              //     modal.style.display = "block";
              // }
              count--;
  
          }
          }, 1000);
  
  
  }


// socksbtn.onclick = function() {
//     setTimeout(function(){ 
//         modal.style.display = "none";
//         // $('.bn_form_submit_btn').css({
//         //     "display":"none"
//         // })
//     }, 1000);

// }

$('.bn_form_submit_btn').on('click', function (){
    modal.style.display = "none";
    setTimeout(function(){ 
        if (count > 0) {
            modal.style.display = "block";
            $('.bn_popup_slick').slick({
                arrows: true,
                dots: false,
                prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
                nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
                slidesToScroll: 1,
                autoplay: true,
                slidesToShow: 5,
                // centerPadding: '100px',
                infinite: true,
                speed: 300,
                adaptiveHeight: true,
                responsive: [{
                    breakpoint: 426,
                    settings: {
                        arrows: true,
                        prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
                        nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
                        slidesToShow: 2,
                        slidesToScroll: 1,
                      centerPadding: '100px',
                        infinite: true,
                        dots: false
                    }
                }
                ]
            });


            // if (globalTotalModalOpenCount > 0) {
            //     modal.style.display = "block";
            // }
            count--;

        }
        }, 1000);
})

$('.bn_socks_form_submit_btn').click(function(){
    $("#bn-ALlmyModal").hide();
})

$('.bn_bag_form_submit_btn').on('click',function(){
    
        setTimeout(function(){ 
            $("#bn-ALlmyModal").hide();
            }, 1000);
        
    
})
$('.bn_cap_form_submit_btn').on('click',function(){
   if(bagAndCapModalCondition == false){
        setTimeout(function(){ 
            $("#bn-ALlmyModal").hide();
        }, 1000);
       
   }
  if (bagAndCapModalCondition == true) {
    bagmodal.style.display = "block"
    capmodal.style.display = "none"
    //      setTimeout(function(){
    $('.bn_popup_bag_slick').slick({ 
        arrows: true,
        dots: false,
        prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
        nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
        slidesToScroll: 1,
        autoplay: false,
        slidesToShow: 5,
        // centerPadding: '100px',
        infinite: true,
        speed: 300,
        adaptiveHeight: true,
        responsive: [{
            breakpoint: 426,
            settings: {
                arrows: true,
                prevArrow: "<button type='button' class='slick-cust-btns prev-cust-button'></button>",
                nextArrow: "<button type='button' class='slick-cust-btns next-cust-button'></button>",
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: false
            }
        }
        ]

    });
//        }, 1000);
   }
}) 


// bagbtn.onclick = function() {
//     setTimeout(function(){ 
//     modal.style.display = "none";
//     }, 1000);
// }
// capbtn.onclick = function() {
//     setTimeout(function(){ 
//     modal.style.display = "none";
//     }, 1000);
// }
  
  

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }



// $(".popup_product_select").change(function(){

//     var selectedPopupOption = $(".popup_product_select option:selected").attr("data-img")
//     $('#modamMainImg').attr("src", selectedPopupOption)
//     $('.bn-custom-popup-prod-title').empty();
//     $('.bn-custom-popup-prod-title').append($(".popup_product_select option:selected").text().split('$')[0].split(' -').join().replace(/,/g, ""));

// })

// $(".popup_product_select_bag").change(function(){

//     var selectedPopupBagOption = $(".popup_product_select_bag option:selected").attr("data-img")
//     $('#modalBagMainImg').attr("src", selectedPopupBagOption)
//     $('.bn-custom-popup-prod-bag-title').empty();
//     $('.bn-custom-popup-prod-bag-title').append($(".popup_product_select_bag option:selected").text().split('$')[0].split(' -').join().replace(/,/g, ""));

// })
// $(".popup_product_select_cap").change(function(){

//     var selectedPopupCapOption = $(".popup_product_select_cap option:selected").attr("data-img")
//     $('#modalCapMainImg').attr("src", selectedPopupCapOption)
//     $('.bn-custom-popup-prod-cap-title').empty();
//     $('.bn-custom-popup-prod-cap-title').append($(".popup_product_select_bag option:selected").text().split('$')[0].split(' -').join().replace(/,/g, ""));

// })


// $("#Bn_banner_section_3_22_video").ready(function(){
// // alert(1);
// 	var videobannerHeight = $('.banner_section_content3_2 video').height();
// 	var vidBannerSectionBn = document.getElementById("Bn_banner_section_3_22_video");
//   	$('.bn_banner_section_content2_222').css({"background-image":"url('https://cdn.shopify.com/s/files/1/0854/5504/files/stax-last.jpg?v=1603407335')","height":videobannerHeight+"px"});
// })

function VideoEqualHeight(){
// 	var videobannerHeight = $('.banner_section_content3_2 video').height();
// 	var vidBannerSectionBn = document.getElementById("Bn_banner_section_3_22_video");
// // 	  $('.bn_banner_section_content2_222').height(videobannerHeight);	  
//   $('.bn_banner_section_content2_222').css({"background-image":"url('https://cdn.shopify.com/s/files/1/0854/5504/files/stax-last.jpg?v=1603407335')","height":videobannerHeight+"px"});


}


       
function bnVideoInit(){
    var videobannerHeight = $('#banner_custom_1').height();
	$('.bn_banner_section_content2_222').css({"height":(videobannerHeight-5)+"px"});

}


 if ($(window).width() <= 425) {
		$('.bn_top_Product_2').removeClass("bn_border_right_none");
   		$('.bn_top_Product_2').addClass("bn_border_right");
  		$('.bn_top_Product_4').removeClass("bn_border_right_none");
   		$('.bn_top_Product_4').addClass("bn_border_right");
   		$('.bn_top_Product_5').addClass("bn_border_right_none");
   		$('.bn_top_Product_6').removeClass("bn_border_right_none");
   		$('.bn_top_Product_6').addClass("bn_border_right");
   		$('.bn_top_Product_6').addClass("bn_border_bottom_none");
   		$('.bn_top_Product_7').addClass("bn_border_bottom_none");
   		$('.bn_top_Product_8').removeClass("bn_border_right_none");
   		$('.bn_top_Product_8').addClass("bn_border_right");
   		$('.bn_top_Product_8').addClass("bn_border_bottom_none");
    }
    if ($(window).width() <= 425) {
        var mobile_count_down_image = $('.bn_count_down_background').attr("data-mobile-style");
        $('.bn_count_down_background').attr("style",mobile_count_down_image);
    }




$(document).ready(function(){
    var countS = 25;
    $("#session").html(countS);
    var countB = 5;
    $("#break").html(countB);
    var pos = "pomodoro";
    $("#stats").html(pos);
    var clock = $(".timer").FlipClock(0, {
      countdown: true,
      clockFace: 'DailyCounter',
      autoStart: false,
      callbacks: {
        interval: function(){
          if (clock.getTime() == 0){
            if (pos == "session"){
              clock.setTime(countB*60);
              clock.start();
              pos = "break";
              $("#stats").html(pos);
            } else if (pos == "break"){
              clock.setTime(countS*60);
              clock.start();
              pos = "session";
              $("#stats").html(pos);
            }
          }        
        }
      }
    }) ;
    let year = $("#clock .year").data('select');
    let days = $("#clock .days").data('select');
    let hours = $("#clock .hours").data('select');
    let minutes = $("#clock .minutes").data('select');
    let seconds = $("#clock .seconds").data('select');
    let timezone = $("#clock .timezone").data('select');
    console.log(new Date().getTime());
    var countDownDate = new Date(`${days}, ${year} ${hours}:${minutes}:${seconds} +${timezone}00`).getTime();   //  22222222222222222222
    var countdown = ((new Date().getTime())/1000); // from: 11/12/2020 05:45 pm +0400
    let all_in_seconds =countDownDate/1000 -  countdown;
    console.log(countDownDate);
    clock.setTime(all_in_seconds);
    clock.start();   
    
  });


  $(document).on("click",".bn_gift_card_checker",function(){
    let addData = {
      "id":$(".bn_gift_box_select").val().split(",")[0],
      'quantity':1
    };
  fetch('/cart/add.js', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addData)
    })
    setTimeout(function() {
        ajaxCart.load();
        theme.RightDrawer.open()
        }, 2000);
  fetch('/cart.js')
     .then(response => response.json())
     .then(data => {
       console.log(data)
    })
    // $(".bn_gift_card").css({"display":"none"})
    // jQuery.post('/cart/update.js', {updates: {5835316002845: 5}});
})
function bn_gift_card(){
    var good_be =0
    fetch('/cart.js')
     .then(response => response.json())
     .then(data => {
        console.log(data,"aaaa")
       for(i=0;i<data.items.length;i++){
            $(".bn_options").each(function(){
              if(data.items[i].id == $(this).attr("data-id")){
                $(this).attr("disabled",true)
                good_be ++
              }
            })
        }
        if(good_be == 3){
                $(".bn_gift_card").css({"display":"none"})
            }else{
                $(".bn_gift_card").css({"display":"flex"})
            }
    })
}
bn_gift_card()
$(".bn_gift_card_checker_cart_page").click(function(){
    let addData = {
      "id":$(".bn_gift_box_select").val().split(",")[0],
      'quantity':1
    };
  fetch('/cart/add.js', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addData)
    })
   setTimeout(function() {
        location.reload()
        }, 1000);
    // $(".bn_gift_card").css({"display":"none"})
})
if($(".bn_quantitiy")){
    setTimeout(function(){
        $(".bn_quantitiy .js-qty__num").removeAttr("type")
        $(".bn_quantitiy .js-qty__num").attr("type","number")
    },1000)
}

function mobileMenuOpen() {
    document.getElementById("gmDropdown").classList.toggle("show");
}

$('.bn_fa_window_close').click(function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.bn_simplemenu').removeClass('show')
});



if ($(window).width() <= 425) {
    $('.bn_count_down_image').addClass('bn_image_none');
    $('.bn_count_down_mobileimage').removeClass('bn_image_none');

    
}

function bn_gift_box_select_change(e){
    console.log(e)
    $(".bn_gift_card_text").empty()
    $(".bn_gift_card_text").html("Add gift box for " + Shopify.formatMoney(e.value.split(",")[1], theme.settings.moneyFormat))
}
$(".bn_my_li").click(function(){
    $(".bn_cart_price").empty()
    $(".bn_cart_price").html(Shopify.formatMoney($(this).attr("data_variant_price"), theme.settings.moneyFormat))
})

function bn_gift_box_select_click(e){
    console.log($(e).prev()[0]);
    // e.previousElementSibling.dispatchEvent(new Event('click'));
    $(e).prev()[0].dispatchEvent(new Event('onchange'));
}

// $('.bn_fa_angle_down').click(function(e){
//     e.preventDefault();
//     e.stopPropagation();
//     alert(0)
// });


function cartLeftItemsOpen(){
    $('.cart-page-products-bn').addClass('show');
    $('.cart-page-prod-container-bn').slick({
        slidesToShow:3,
        slidesToScroll:1,
        // autoplay: true,
        arrows:false,
        nextArrow: '<button class="a-arrow-next_1 a-arrows"><i class="bn_white_arrows fas fa-chevron-right"></i></button>',
        prevArrow: '<button class="a-arrow-prev_2 a-arrows"><i class="bn_white_arrows fas fa-chevron-left"></i></button>',
        infinite:true,
        speed:600,
        autoplaySpeed:2000,
        responsive: [{
            breakpoint: 1300,
            settings: {
                infinite: true,
                autoplay: false,
                speed: 600,
                arrows: false,
                slidesToShow: 2,
                dots: false,
                slidesToScroll: 1
            }
        }]
    })
}

function cartLeftItemsClose(){
    $('.cart-page-products-bn').removeClass('show');
    $('.cart-page-prod-container-bn').slick("unslick");
}
$('.close-cart-products').click(()=>{
    cartLeftItemsClose();
})

$('.bn_header_cart_drawer').click(function(){
    setTimeout(function(){
      cartLeftItemsOpen()
       },500)
  })
  $(window).click(function(){
      cartLeftItemsClose();
     
  })
  
  $('.cart-page-products-bn .quickBuySizeInput').click(function(){
      cartLeftItemsClose();
  })

// ////////////////////////////////////
///////////* New JS STAX *////////////
//////////////////////////////////////
$('.bn-size-select').change(function(){
    let badge = $(this).find(':selected').data('badge');
    if(badge){
        $(this).closest('.select-size-container').find('.continue-pre-content').html(badge);
        $(this).closest('.select-size-container').find('.continue-pre-sale').show();
        
    }
    else{
        $(this).closest('.select-size-container').find('.continue-pre-sale').hide();
        
    }
    
    console.log(badge);
})
$('.bn-add-to-cart').click(function(){
    let partnerContainer = $(this).closest('.select-size-container');
    let selectedValue = partnerContainer.find('select').val();
    let selectedId = partnerContainer.find('select option:selected').data('variant-id');


    /*

Example code showing how to add an item to 
the cart in Shopify using the Fetch API. 

The important line is where we add the 
X-Requested-With header. Without that the 
fetch call will fail with a bad request error.

*/


(function(){

    var addData = {
      'id':selectedId,
      'quantity':1
    };
  
    fetch('/cart/add.js', {
      body: JSON.stringify(addData),
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With':'xmlhttprequest' /* XMLHttpRequest is ok too, it's case insensitive */
      },
      method: 'POST'
    }).then(function(){
        ajaxCart.load(); // OPENING CART DRAWER AFTER ADDING PRODUCT IN CART
    }).catch(function(err) {
      /* we have error. */
      console.error(err)
    });
    
  })();
})
