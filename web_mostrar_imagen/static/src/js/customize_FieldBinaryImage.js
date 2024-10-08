odoo.define('web_mostar_imagen.FieldBinaryImageMostrar', function(require) {
"use strict";

var core = require('web.core');
var formats = require('web.formats');
var form_widgets = require('web.form_widgets');
var session = require('web.session');
var utils = require('web.utils');
var common = require('web.form_common');

var QWeb = core.qweb;

var FieldBinaryImageMostrar = common.AbstractField.extend(common.ReinitializeFieldMixin, {
	template: 'FieldBinaryImage',
    placeholder: "/web/static/src/img/placeholder.png",
    init: function(field_manager, node) {
        var self = this;
        this._super(field_manager, node);
        this.binary_value = false;
        this.useFileAPI = !!window.FileReader;
        this.max_upload_size = 100 * 1024 * 1024; // 25Mo
        if (!this.useFileAPI) {
            this.fileupload_id = _.uniqueId('oe_fileupload');
            $(window).on(this.fileupload_id, function() {
                var args = [].slice.call(arguments).slice(1);
                self.on_file_uploaded.apply(self, args);
            });
        }
    },
    stop: function() {
        if (!this.useFileAPI) {
            $(window).off(this.fileupload_id);
        }
        this._super.apply(this, arguments);
    },
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
    on_file_change: function(e) {
        var self = this;
        var file_node = e.target;
        if ((this.useFileAPI && file_node.files.length) || (!this.useFileAPI && $(file_node).val() !== '')) {
            if (this.useFileAPI) {
                var file = file_node.files[0];
                if (file.size > this.max_upload_size) {
                    var msg = _t("The selected file exceed the maximum file size of %s.");
                    this.do_warn(_t("File upload"), _.str.sprintf(msg, utils.human_size(this.max_upload_size)));
                    return false;
                }
                var filereader = new FileReader();
                filereader.readAsDataURL(file);
                filereader.onloadend = function(upload) {
                    var data = upload.target.result;
                    data = data.split(',')[1];
                    self.on_file_uploaded(file.size, file.name, file.type, data);
                };
            } else {
                this.$el.find('form.o_form_binary_form input[name=session_id]').val(this.session.session_id);
                this.$el.find('form.o_form_binary_form').submit();
            }
            this.$el.find('.oe_form_binary_progress').show();
            this.$el.find('.oe_form_binary').hide();
        }
    },
    on_file_uploaded: function(size, name, content_type, file_base64) {
        if (size === false) {
            this.do_warn(_t("File Upload"), _t("There was a problem while uploading your file"));
            // TODO: use openerp web crashmanager
            console.warn("Error while uploading file : ", name);
        } else {
            this.filename = name;
            this.on_file_uploaded_and_valid.apply(this, arguments);
        }
        this.$el.find('.oe_form_binary_progress').hide();
        this.$el.find('.oe_form_binary').show();
    },
    on_save_as: function(ev) {
        var value = this.get('value');
        if (!value) {
            this.do_warn(_t("Save As..."), _t("The field is empty, there's nothing to save !"));
            ev.stopPropagation();
        } else {
            framework.blockUI();
            var c = crash_manager;
            var filename_fieldname = this.node.attrs.filename;
            var filename_field = this.view.fields && this.view.fields[filename_fieldname];
            this.session.get_file({
                'url': '/web/content',
                'data': {
                    'model': this.view.dataset.model,
                    'id': this.view.datarecord.id,
                    'field': this.name,
                    'filename_field': filename_fieldname,
                    'filename': filename_field ? filename_field.get('value') : null,
                    'download': true,
                    'data': utils.is_bin_size(value) ? null : value,
                },
                'complete': framework.unblockUI,
                'error': c.rpc_error.bind(c)
            });
            ev.stopPropagation();
            return false;
        }
    },
    set_filename: function(value) {
        var filename = this.node.attrs.filename;
        if (filename) {
            var field = this.field_manager.fields[filename];
            if (field) {
                field.set_value(value);
                field._dirty_flag = true;
            }
        }
    },
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
    on_file_uploaded_and_valid: function(size, name, content_type, file_base64) {
        this.internal_set_value(file_base64);
        this.binary_value = true;
        this.render_value();
        this.set_filename(name);
    },
    on_clear: function() {
        if (this.get('value') !== false) {
            this.binary_value = false;
            this.internal_set_value(false);
        }        
        this.render_value();
        this.set_filename('');
		return false;
    },
    set_value: function(value_){
        var changed = value_ !== this.get_value();
        this._super.apply(this, arguments);
        // By default, on binary images read, the server returns the binary size
        // This is possible that two images have the exact same size
        // Therefore we trigger the change in case the image value hasn't changed
        // So the image is re-rendered correctly
        if (!changed){
            this.trigger("change:value", this, {
                oldValue: value_,
                newValue: value_
            });
        }
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

core.form_widget_registry.add('image_show', FieldBinaryImageMostrar);

return {
    FieldBinaryImageMostrar: FieldBinaryImageMostrar,
};

});
