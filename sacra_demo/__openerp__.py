# -*- coding: utf-8 -*-
{
'name': 'sacra_demo',
'description': u'Módulo de apoyo a la seguridad',
"summary": u"Módulo de apoyo a la seguridad",
'author': 'sacra',
'depends': ['base', 'web', 'sacramentum'],
'application': True,
'data': [
    'data/config_parameters.xml',
    'view/custom_view.xml',
    ],
'qweb': [
        # 'views/aviso.xml',
    ],
'installable': True,
'auto_install': True,
}