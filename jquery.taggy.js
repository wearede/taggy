(function($) {
    var pluginName = "taggy",
        defaults   = { items: [] };

    function Plugin(element, options) {
        this.$element = $(element);
        this.options  = $.extend({}, defaults, options);

        this.$element.wrap($('<div class="taggy-wrapper" />'));

        var $this    = this,
            $wrapper = this.$element.parent(".taggy-wrapper");

        $.each(this.options.items, function() {
            var $item = $('<span class="taggy-item" style="position: absolute; opacity: 0;" data-x="' + this.x + '" data-y="' + this.y + '" />');

            if (typeof(this.class) === "string") {
                $item.addClass(this.class);
            }

            $wrapper.append($item);
        });

        $(window).resize(function() { $this.draw(); });

        $this.draw();
    }

    Plugin.prototype.draw = function() {
        var $element = this.$element,
            $wrapper = $element.parent(".taggy-wrapper");

        $wrapper.find("span").each(function() {
            var $this = $(this);

            var top  = $this.data("y") * $element.height(),
                left = $this.data("x") * $element.width();

            $this.css({
                "top":  top  - $this.outerHeight(true) / 2,
                "left": left - $this.outerWidth(true)  / 2
            });
        });
    };

    $.fn[pluginName] = function(options) {
        return this.each(function () {
            if (typeof($.data(this, "plugin_" + pluginName)) === "undefined") {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };
})(jQuery);
