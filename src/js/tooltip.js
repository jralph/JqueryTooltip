(function($, window, document, undefined)
{
    /**
     * Define the plugin name and default options.
     */
    var pluginName = 'simpleTooltip',
        defaults = {
            content: 'This is a tooltip.',
            classes: 'left-arrow',
            inAnimation: 'fadeIn',
            outAnimation: 'fadeOut',
            inAnimationSpeed: 200,
            outAnimationSpeed: 200
        };

    /**
     * Define the main plugin prototype and its construct method.
     */
    function simpleTooltip(element, options)
    {
        this.element = element;
        this.selector = element.selector;

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    /**
     * Run when the plugin is initiated.
     */
    simpleTooltip.prototype.init = function()
    {
        if (!this.hasTooltip()) {
            this.addTooltip();
        }
    };

    simpleTooltip.prototype.addTooltip = function()
    {
        $(this.element).wrap('<div class="tooltip-container"></div>');
        $(this.element).parent().append('<div class="tooltip '+this.options.classes+'">'+this.options.content+'</div>');
    };

    simpleTooltip.prototype.removeTooltip = function()
    {
        console.log($(this.element).parent().hasClass('tooltip-container'));
        if ( $(this.element).parent().hasClass('tooltip-container') )
        {
            $(this.element).unwrap();
            $('.tooltip', $(this.element).parent()).remove();
        }
    };

    simpleTooltip.prototype.showTooltip = function()
    {
        var container;

        if ( $(this.element).parent().hasClass('tooltip-container') )
        {
            container = $(this.element).parent();
        } else {
            return false;
        }

        $('.tooltip', container)[this.options.inAnimation](inAnimationSpeed);
    };

    simpleTooltip.prototype.hideTooltip = function()
    {
        if (!this.hasTooltip) {
            return false;
        }

        var container = $(this.element).parent();

        $('.tooltip', container)[this.options.outAnimation](outAnimationSpeed);
    };

    simpleTooltip.prototype.toggleTooltip = function()
    {
        if (!this.hasTooltip) {
            return false;
        }

        var container = $(this.element).parent();

        $('.tooltip', container).fadeToggle();
    };

    simpleTooltip.prototype.hasTooltip = function()
    {
        var container;

        if ( $(this.element).parent().hasClass('tooltip-container') && $(this.element).parent().has('tooltip'))
        {
            return true;
        } else {
            return false;
        }
    };

    simpleTooltip.prototype.changeContent = function(tooltipContent)
    {
        if (this.hasTooltip()) {
            $('.tooltip', $(this.element).parent()).html(tooltipContent);
        }
    };

    simpleTooltip.prototype.removeClass = function(className)
    {
        if (this.hasTooltip()) {
            $('.tooltip', $(this.element).parent()).removeClass(className);
        } else {
            return false;
        }
    };

    simpleTooltip.prototype.addClass = function(className)
    {
        if (this.hasTooltip()) {
            $('.tooltip', $(this.element).parent()).addClass(className);
        } else {
            return false;
        }
    };

    simpleTooltip.prototype.toggleClass = function(className)
    {
        if (this.hasTooltip()) {
            $('.tooltip', $(this.element).parent()).toggleClass(className);
        } else {
            return false;
        }
    };

    /**
     * Register the jquery plugin.
     */
    $.fn[pluginName] = function(options)
    {
        if (!$.data(this, 'plugin_'+pluginName)) {
            $.data(this, 'plugin_'+pluginName, new simpleTooltip(this, options));
        }

        return $.data(this, 'plugin_'+pluginName);
    };

}(jQuery, window, document));