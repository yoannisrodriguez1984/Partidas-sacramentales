 
(function($, exports, window) {
if (!exports) {
    exports = {};
    if (!$) {
        window.fieldSelection = exports;
    }
}

if ($) {
    /**
     * Extend jQuery's prototype
     * @param {String} [text]
     * @return {Object|jQuery}
     */
    $.fn.fieldSelection = function(text) {
        var ret;

        this.each(function() {
            this.focus();
            ret = text == null ? exports.get(this) : exports.replace(this, text);
        });

        return ret || this;
    };
}

/**
 * Get selection.
 *
 * @param {Object} elem
 * @return {Object}
 */
exports.get = function(elem) {
    var data = {start: 0, end: elem.value.length, length: 0},
        range, textRange, dTextRange;

    // DOM 3
    if (elem.selectionStart >= 0) {
        data.start = elem.selectionStart;
        data.end = elem.selectionEnd;
        data.length = data.end - data.start;
        data.text = elem.value.substr(data.start, data.length);
    // IE
    } else if (elem.ownerDocument.selection) {
        range = elem.ownerDocument.selection.createRange();
        if (!range) return data;
        textRange = elem.createTextRange(),
        dTextRange = textRange.duplicate();
        textRange.moveToBookmark(range.getBookmark());
        dTextRange.setEndPoint('EndToStart', textRange);
        data.start = dTextRange.text.length;
        data.end = dTextRange.text.length + range.text.length;
        data.text = range.text;
        data.length = range.text.length;
    }

    return data;
}

/**
 * Replace selection.
 *
 * @param {Object} elem
 * @param {String} text
 */
exports.replace = function(elem, text) {
    var start, end,
        pos, scrollTop, scrollLeft,
        range;

    // DOM 3
    if (elem.selectionStart >= 0) {
        start = elem.selectionStart;
        end = elem.selectionEnd;
        scrollTop = elem.scrollTop;
        scrollLeft = elem.scrollLeft;
        elem.value = elem.value.substr(0, start) + text + elem.value.substr(end);
        pos = start + text.length;
        elem.selectionStart = pos;
        elem.selectionEnd = pos;

        // Restore scroll position in FF after replacement.
        elem.scrollTop = scrollTop;
        elem.scrollLeft = scrollLeft;
    // IE
    } else if (elem.ownerDocument.selection) {
        range = elem.ownerDocument.selection.createRange();
        range.text = text;
        range.move('character', 0);
        range.select();
    } else {

        // Browser not supported - set at the end.
        elem.value += text;

        // Scroll to the end of textarea to show inserted.
        elem.scrollTop = 100000;
    }
};

}(typeof jQuery != 'undefined' ? jQuery : null,
  typeof exports != 'undefined' ? exports : null,
  window));


openerp.sacramentum = function (openerp) {
        openerp.web.form.widgets.add('FieldText3',     'openerp.web.form.FieldText3');
        openerp.web.form.FieldText3 = openerp.web.form.Field.extend({
        template: 'FieldText3',
        init: function (view, node) {
			var self = this;
			this._super(view, node);	
			op_name = node.attrs.name			
			if (op_name == "literal_text"){
				this.context_menu = [[['nombre','Nombre bautizado'],['apellido1','Apellido1 bautizado'],['apellido2','Apellido2 bautizado'],['fecha_baut','Fecha de bautismo'],['lugar_nac','Lugar de nacimiento'],['fecha_nac','Fecha de nacimiento']],
				[['p_nombre','Nombre padre'],['p_apellido1','Apellido1 padre'],['p_apellido2','Apellido2 padre'],['p_lugar_nac','Lugar de nacimiento del padre']],
				[['m_nombre','Nombre madre'],['m_apellido1','Apellido1 madre'],['m_apellido2','Apellido2 madre'],['m_lugar_nac','Lugar de nacimiento de la madre']],
				[['p_p_nombre','Padre paterno'],['m_p_nombre','Madre paterna'],['p_m_nombre','Padre materno'],['m_m_nombre','Madre paterna']],
				[['padrino','Padrino'],['madrina','Madrina'],
				['tomo','Tomo'],['folio','Folio'],['numero',"Numero"]]];
			}else if (op_name == "literal_text2"){				
				this.context_menu = [[['nombre_esposo','Nombre del esposo'],['apellido1_esposo','Apellido1 del esposo'],['apellido2_esposo','Apellido2 del esposo'],['lugar_nac_esposo','Lugar de nacimiento del esposo'],['fecha_nac_esposo','Fecha de nacimiento del esposo'],['profesion_esposo','Profesión del esposo'],['direccion_esposo','Dirección del esposo'],['carnet_esposo','Carné del esposo']],
				[['p_nombre','Nombre padre'],['p_apellido1','Apellido1 padre'],['p_apellido2','Apellido2 padre'],['p_lugar_nac','Lugar de nacimiento del padre']],
				[['m_nombre','Nombre madre'],['m_apellido1','Apellido1 madre'],['m_apellido2','Apellido2 madre'],['m_lugar_nac','Lugar de nacimiento de la madre']],
				[['p_p_nombre','Padre paterno'],['m_p_nombre','Madre paterna'],['p_m_nombre','Padre materno'],['m_m_nombre','Madre paterna']],
				[['padrino','Padrino'],['madrina','Madrina'],
				['tomo','Tomo'],['folio','Folio'],['numero',"Numero"]]];
			}
			
			
			//console.log(view);
			//alert("myObject is " + openerp.web.form.toSource());
			//console.log(node);
        },
		start: function() {
		    
            this._super.apply(this, arguments);	
			this.$element.find('textarea').change(this.on_ui_change);
			
		    for (j=0; j < this.context_menu.length;j++){
			for (i=0; i < this.context_menu[j].length;i++){
			
				var clave = this.context_menu[j][i][0];
				$('menuitem#'+clave).click(function (obj) {
                    				
					n_selector = "[name="+op_name+"]"
					
					select = $(n_selector).fieldSelection()['text'] ;
					select = _.str.trim(select);
					select_length = $(n_selector).fieldSelection()['length'] ;
					
					var meses = [];
					meses["enero"] = "01";
					meses["febrero"] = "02";
					meses["marzo"] = "03";
					meses["abril"] = "04";
					meses["mayo"] = "05";
					meses["junio"] = "06";
					meses["julio"] = "07";
					meses["agosto"] = "08";
					meses["septiembre"] = "09";
					meses["octubre"] = "10";
					meses["noviembre"] = "11";
					meses["diciembre"] = "12";

					var maaa =new Array( "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre");
					var monthkeys = new Array( "01","02","03","04","05","06","07","08","09","10","11","12");

					if (select_length > 0){
						re = obj.target.id +":" + select;	
						//Identificar si es una fecha y transformarla al formato requerido
					
					var m1 = /^\s*(\d){1,2}\s*(\d+){4}/
					var m2 = /^\s*(\d){4}\s*(\d+){1,2}/
					if (/\d{1,2}.+\d{4}/.test(select)){
						var match =/(\d{1,2}).+(\d{4})/.exec(select);
						if (/(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i.test(select) &&  match[1] >0  &&  match[1] <32 ){
							var match2 = /(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i.exec(select);
							key = meses[match2[1].toLowerCase()];
							select = match[1] +"/"+key+"/"+match[2];
						}else{
							alert("Revise su fecha");						
						}	
						
					}else if(/\d{4}.+\d{1,2}/.test(select)){
						var match =/(\d{4}).+(\s\d{1,2})/.exec(select);
						dia = _.str.trim(match[2]);
						if (/(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i.test(select) &&  dia >0  &&  dia <32 ){
							var match2 = /(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i.exec(select);
							key = meses[match2[1].toLowerCase()];
							select = dia +"/"+key+"/"+match[1];
						}else{
							alert("Revise su fecha");						
						}	
					}						
						$("[name="+obj.target.id+']').val(select);
						$("[name="+obj.target.id+']').trigger('change');
					
					}
					
					$('menuitem#'+obj.target.id).attr({"checked":true});
				} );
			}
			}
		},
		on_ui_change: function() {
        this.dirty = true;
        this.invalid = false;
        if (this.is_valid()) {
            this.set_value_from_ui();
            this.view.do_onchange(this);
            this.view.on_form_changed(true);
            this.view.do_notify_change();
        } else {
            this.update_dom(true);
        }
    },
	    set_value: function(value) {
			this._super.apply(this, arguments);
			var show_value = openerp.web.format_value(value, this, '');
			this.$element.find('textarea').val(show_value);
			if (!this.resized && this.view.options.resize_textareas) {
				this.do_resize(this.view.options.resize_textareas);
				this.resized = true;
			}
		},
		update_dom: function() {
			this._super.apply(this, arguments);
			this.$element.find('textarea').prop('readonly', this.readonly);
		},
		set_value_from_ui: function() {
			this.value = openerp.web.parse_value(this.$element.find('textarea').val(), this);
			this._super();
		},
		validate: function() {
			this.invalid = false;
			try {
				var value = openerp.web.parse_value(this.$element.find('textarea').val(), this, '');
				this.invalid = this.required && value === '';
			} catch(e) {
				this.invalid = true;
			}
		},
		focus: function($element) {
			this._super($element || this.$element.find('textarea:first'));
		},
		do_resize: function(max_height) {
			max_height = parseInt(max_height, 10);
			var $input = this.$element.find('textarea'),
				$div = $('<div style="position: absolute; z-index: 1000; top: 0"/>').width($input.width()),
				new_height;
			$div.text($input.val());
			_.each('font-family,font-size,white-space'.split(','), function(style) {
				$div.css(style, $input.css(style));
			});
			$div.appendTo($('body'));
			new_height = $div.height();
			if (new_height < 90) {
				new_height = 90;
			}
			if (!isNaN(max_height) && new_height > max_height) {
				new_height = max_height;
			}
			$div.remove();
			$input.height(new_height);
		},
		reset: function() {
			this.resized = false;
			this.$element.find('menuitem').attr({"checked":false});
			
		}
 });
}