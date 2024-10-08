{
    'name': 'Tema para SACRAMENTUM',
    'version': '1.0',
    'author': '',
    'description': '''
        Tema para el Sistema de Gestión de Archivos Sacramentales
    ''',
    'category': 'Theme',
    'depends': ['base',],
    'data': [
        'views/custom_view.xml',
    ],
    'images':[
            
    ],
    'qweb': [
        'views/customize_user_menu.xml',
    ],
    'css': ['static/src/css/styles.css'],
    'application': True,
    'auto_install': False,
    'installable': True,
}
