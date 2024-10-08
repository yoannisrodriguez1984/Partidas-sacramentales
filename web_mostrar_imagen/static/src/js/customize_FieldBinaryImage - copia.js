odoo.define('web_mostar_imagen.FieldBinaryImageMostrar', function(require) {
"use strict";

var core = require('web.core');
var formats = require('web.formats');
var form_widgets = require('web.form_widgets');
var session = require('web.session');
var utils = require('web.utils');

var QWeb = core.qweb;

var FieldBinaryMostrar = form_widgets.FieldBinary.include({
	initialize_content: function() {
        var self= this;
        this.$('input.o_form_input_file').change(this.on_file_change);
        this.$('button.oe_form_binary_file_save').click(this.on_save_as);
        this.$('.oe_form_binary_file_clear').click(this.on_clear);
        this.$('.oe_form_binary_file_mostrar').click(this.on_mostrar);
        this.$('.oe_form_binary_file_edit').click(function() {
            self.$('input.o_form_input_file').click();
        });
    },
});	

var FieldBinaryImageMostrar = form_widgets.FieldBinaryImage.include({
	render_value: function() {
        var self = this;
        var url;
        this.session = session;
        if (this.get('value') && !utils.is_bin_size(this.get('value'))) {
            url = 'data:image/png;base64,' + this.get('value');
        } else if (this.get('value')) {
            var id = JSON.stringify(this.view.datarecord.id || null);
            var field = this.name;
            if (this.options.preview_image)
                field = this.options.preview_image;
            url = session.url('/web/image', {
                                        model: this.view.dataset.model,
                                        id: id,
                                        field: field,
                                        unique: (this.view.datarecord.__last_update || '').replace(/[^0-9]/g, ''),
            });
        } else {
            url = this.placeholder;
        }
        var $img = $(QWeb.render("FieldBinaryImage-img", { widget: this, url: url }));
        $($img).click(function(e) {
            if(self.view.get("actual_mode") == "view") {
                var $button = $(".oe_form_button_edit");
                $button.openerpBounce();
                e.stopPropagation();
            }
        });
        this.$el.find('> img').remove();
        this.$el.prepend($img);
        $img.load(function() {
            if (! self.options.size)
                return;
            $img.css("max-width", "" + self.options.size[0] + "px");
            $img.css("max-height", "" + self.options.size[1] + "px");
        });
        $img.on('error', function() {
            self.on_clear();
            $img.attr('src', self.placeholder);
            self.do_warn(_t("Image"), _t("Could not display the selected image."));
        });
	this.$img = $img
    },
	on_mostrar: function() {
        //this.$img.set_image_maxwidth();
        var ancho = this.$img.attr('width');
        var alto = this.$img.attr('height');
        var src = this.$img.attr('src');
        var derecha = (screen.width-ancho)/2;
        var arriba = (screen.height-alto)/2;
        var string = "toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width="+ancho+",height="+alto+",left="+derecha+",top="+arriba+"";
        //fin=window.open(this.$image.attr('src'),"",string);
        //$("#div_image_id").dialog({autoOpen: true,show: "blind",hide: "explode"});    
        var html = '<div style="display:none" id="div_image_id"><img src="'
        html +=src+'" width="'
        html +=ancho+'" height="'
        html +=alto+'" /></div>'
        var dialog = $(html).appendTo('body');
        dialog.dialog({
            close: function(event, ui) {  dialog.remove();    },
            modal: false,
            hide: { effect: "explode", duration: 1000 },
            show: { effect: "inplode", duration: 1000 },
            position: { my: "left top", at: "rigth top", of: window },
            title: 'Imagen completa',
            width:screen.width/2,
            height:screen.height*3/4,
            maxHeight: false,
            maxWidth: false
        });
    }
});

});
