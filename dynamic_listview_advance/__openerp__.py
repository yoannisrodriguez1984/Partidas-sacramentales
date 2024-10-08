# -*- coding: utf-8 -*-
# © 2017 Quanam (ATEL SA., Uruguay)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

{
    'name': 'Dynamic ListView Advance',
    'summary': 'Change The Odoo List view On the fly without any technical knowledge. pmultas',
    'version': '9.0.1.0',
    'category': 'Web',
    'description': """

    """,
    'author': 'Quanam',
    'website': 'http://www.quanam.com',
    'license': 'AGPL-3',

    'depends': ['web'],
    'data': [
        'views/templates.xml',
        'security/show_fields_security.xml',
        'security/ir.model.access.csv',
    ],
    'installable': True,
    'auto_install': False,
    'application': False,
    'qweb': ['static/src/xml/listview_button_view.xml'],
    'images': [
    ],
}
