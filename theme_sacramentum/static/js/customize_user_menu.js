odoo.define('theme_multas.customize_user_menu', function (require) {
    "use strict";
    var Model = require('web.Model');
    var session = require('web.session');
	var core = require('web.core');
    var UserMenu = require('web.UserMenu');
    UserMenu.include({
        do_update: function () {
			var self = this;
			var fct = function() {
				var $avatar = self.$el.find('.oe_topbar_avatar');
				$avatar.attr('src', $avatar.data('default-src'));
				if (!session.uid)
					return;
				var func = new Model("res.users").get_func("read");
				return self.alive(func(session.uid, ["name","login"])).then(function(res) {
					var topbar_name = res.name+"("+res.login+")";
					self.$el.find('.oe_topbar_name').text(topbar_name);            
					var avatar_src = session.url('/web/image', {model:'res.users', field: 'image_small', id: session.uid});
					$avatar.attr('src', avatar_src);

					core.bus.trigger('resize');  // Re-trigger the reflow logic
				});
			};
			this.update_promise = this.update_promise.then(fct, fct);
		},
    });
})
