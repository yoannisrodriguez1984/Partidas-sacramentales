# -*- coding: utf-8 -*-

{
    'name': 'Send to ORM readonly fields',
    'version': '1.0',
    'author':   'Sacra',
    'website':  '',
    'release_date': '2018-05-06',
    'category': '',
    'summary': '',
    'description': """
Permite mandar al ORM los cambios ocurridos en un campo definido como lectura.
<field name="readonlyfield_name" options="{'save_readonly':True}"/>
""",
    'depends': ['base'],
    'data': [
        'static/src/xml/static_imports.xml',
    ],
    'demo': [
    ],
    'application': False,
    'installable': True,
    'auto_install': False,
}
